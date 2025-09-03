'use client';

import { useMemo } from 'react';

/** ==== Props ==== */
type DiagramProps = {
  measurements: FourSidedMeasurements;
  windowSplits: ConfigSplits;
  panelSplits: ConfigSplits;
  svgWidth?: number;
  svgHeight?: number;
  svgPadding?: number;
  panelCellPadding?: number;
};

/** ==== Styles ==== */
const COLORS = {
  windowBox: '#374151',
  windowSplit: '#374151',
  panelFrame: 'rgba(128, 90, 213, 0.5)',
  panelSplit: 'rgba(128, 90, 213, 0.5)',
  panelCellStroke: '#3B82F6',
  panelCellFill: 'rgba(59, 130, 246, 0.10)',
  label: '#374151',
};

const STROKES = {
  windowBox: 2,
  windowSplit: 2,
  panelFrame: 6,
  panelSplit: 4,
  panelCellStroke: 2,
};

/** ==== Helpers ==== */

/** Format inches as mixed fraction (to nearest 1/16") like 12 3/16" */
function formatInches(val: number): string {
  if (!Number.isFinite(val)) return '0"';
  const sign = val < 0 ? '-' : '';
  const abs = Math.abs(val);
  const whole = Math.floor(abs);
  const frac = abs - whole;

  const den = 16;
  let num = Math.round(frac * den);
  let w = whole;
  if (num === den) { w += 1; num = 0; }

  if (num === 0) return `${sign}${w}"`;

  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const g = gcd(num, den);
  const n = num / g;
  const d = den / g;

  if (w === 0) return `${sign}${n}/${d}"`;
  return `${sign}${w} ${n}/${d}"`;
}

/** window width/height in inches (min edges, never negative) */
function getWindowInches(meas: FourSidedMeasurements) {
  const wTop = meas.top ?? 0;
  const wBottom = meas.bottom ?? 0;
  const hLeft = meas.left ?? 0;
  const hRight = meas.right ?? 0;
  return {
    widthIn: Math.max(0, Math.min(wTop, wBottom)),
    heightIn: Math.max(0, Math.min(hLeft, hRight)),
  };
}

/** scaler for inches → px, preserving aspect, origin at top-left of box */
function makeScaler(
  widthIn: number,
  heightIn: number,
  svgWidth: number,
  svgHeight: number,
  pad: number,
) {
  const innerW = Math.max(0, svgWidth - 2 * pad);
  const innerH = Math.max(0, svgHeight - 2 * pad);
  const sx = widthIn > 0 ? innerW / widthIn : 0;
  const sy = heightIn > 0 ? innerH / heightIn : 0;
  const scale = Math.min(sx || 0, sy || 0);
  const originX = pad + (innerW - widthIn * scale) / 2;
  const originY = pad + (innerH - heightIn * scale) / 2;

  const xPx = (inchesFromLeft: number) => originX + inchesFromLeft * scale;
  // y is measured from BOTTOM in your data; SVG y increases downward
  const yFromBottomPx = (inchesFromBottom: number) =>
    originY + (heightIn - inchesFromBottom) * scale;

  const wPx = (inches: number) => inches * scale;
  const hPx = (inches: number) => inches * scale;

  return { originX, originY, xPx, yFromBottomPx, wPx, hPx, scale };
}

/** n panes → n+1 x-boundaries (in inches). Vertical split positions sorted. */
function paneBoundariesInches(widthIn: number, vSplits: VerticalSplit[], n: number) {
  const xs = vSplits.map(s => s.position).slice(0, Math.max(n - 1, 0)).sort((a, b) => a - b);
  return [0, ...xs, widthIn];
}

/** Given pane row split positions (inches from bottom), emit y-boundary list [0, ...splits, height] */
function rowBoundariesInches(heightIn: number, splits: HorizontalSplit[]) {
  const ys = splits.map(s => s.position).sort((a, b) => a - b);
  return [0, ...ys, heightIn];
}

/** Normalize a ConfigSplits to exactly match:
 *  - vertical_splits length = n-1
 *  - vertical_configs length = n
 *  - horizontal_splits outer length = n
 *  - each inner length = vertical_configs[i].pieces - 1
 */
function normalizeForRender(cfg?: ConfigSplits | null): ConfigSplits {
  const safeCfg = cfg ?? {
    config: { kind: 'Single Window', pieces: 1 } as HorizontalConfigOptions,
    vertical_splits: [] as VerticalSplit[],
    vertical_configs: [{ kind: 'Single Piece', pieces: 1 }] as VerticalConfigOptions[],
    horizontal_splits: [[]] as HorizontalSplit[][],
  };

  const n = Math.max(1, Math.floor(safeCfg.config?.pieces ?? 1));

  const vertical_splits = (safeCfg.vertical_splits ?? []).slice(0, Math.max(n - 1, 0));
  while (vertical_splits.length < Math.max(n - 1, 0)) {
    vertical_splits.push({ position: 0, direction: 'left-to-right' });
  }

  const vertical_configs = (safeCfg.vertical_configs ?? []).slice(0, n);
  while (vertical_configs.length < n) {
    vertical_configs.push({ kind: 'Single Piece', pieces: 1 });
  }

  const horizontal_splits: HorizontalSplit[][] = [];
  for (let i = 0; i < n; i++) {
    const need = Math.max((vertical_configs[i]?.pieces ?? 1) - 1, 0);
    const inner = (safeCfg.horizontal_splits?.[i] ?? []).slice(0, need);
    while (inner.length < need) {
      inner.push({ position: 0, direction: 'bottom-to-top' });
    }
    horizontal_splits.push(inner);
  }

  return { ...safeCfg, vertical_splits, vertical_configs, horizontal_splits };
}

/** ==== Primitive SVG parts ==== */

function WindowBoundingBoxRect({
  x, y, width, height,
}: { x: number; y: number; width: number; height: number }) {
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill="none"
      stroke={COLORS.windowBox}
      strokeWidth={STROKES.windowBox}
    />
  );
}

function SplitLines({
  verticalXs,
  horizontalYsPerPane,
  paneXs,
  box,
  color,
  strokeWidth,
}: {
  verticalXs: number[];            // interior vertical lines (px)
  horizontalYsPerPane: number[][]; // per pane y-lines (px)
  paneXs: number[];                // pane x-boundaries (px), length n+1
  box: { x: number; y: number; width: number; height: number };
  color: string;
  strokeWidth: number;
}) {
  return (
    <g stroke={color} strokeWidth={strokeWidth}>
      {verticalXs.map((x, i) => (
        <line key={`v-${i}`} x1={x} x2={x} y1={box.y} y2={box.y + box.height} />
      ))}
      {horizontalYsPerPane.map((ys, paneIdx) =>
        ys.map((y, j) => (
          <line
            key={`h-${paneIdx}-${j}`}
            x1={paneXs[paneIdx]}
            x2={paneXs[paneIdx + 1]}
            y1={y}
            y2={y}
          />
        )),
      )}
    </g>
  );
}

function PanelFrame({
  x, y, width, height,
}: { x: number; y: number; width: number; height: number }) {
  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill="none"
      stroke={COLORS.panelFrame}
      strokeWidth={STROKES.panelFrame}
    />
  );
}

function PanelCells({
  paneXs,
  rowBoundaryYsPerPane,
  inset,
}: {
  paneXs: number[];
  rowBoundaryYsPerPane: number[][];
  inset: number;
}) {
  const rects: JSX.Element[] = [];
  for (let i = 0; i < paneXs.length - 1; i++) {
    const x0 = paneXs[i];
    const x1 = paneXs[i + 1];
    const rows = rowBoundaryYsPerPane[i] ?? [];

    for (let r = 0; r < rows.length - 1; r++) {
      const a = rows[r];
      const b = rows[r + 1];
      const yTop = Math.min(a, b);
      const yBottom = Math.max(a, b);

      const x = x0 + inset;
      const y = yTop + inset;
      const w = Math.max(0, (x1 - x0) - 2 * inset);
      const h = Math.max(0, (yBottom - yTop) - 2 * inset);

      rects.push(
        <rect
          key={`cell-${i}-${r}`}
          x={x}
          y={y}
          width={w}
          height={h}
          fill={COLORS.panelCellFill}
          stroke={COLORS.panelCellStroke}
          strokeWidth={STROKES.panelCellStroke}
          rx={2}
          ry={2}
        />,
      );
    }
  }
  return <g>{rects}</g>;
}

/** Side dimension labels for the window bounding box */
function DimensionLabels({
  box,
  widthIn,
  heightIn,
}: {
  box: { x: number; y: number; width: number; height: number };
  widthIn: number;
  heightIn: number;
}) {
  const cx = box.x + box.width / 2;
  const cy = box.y + box.height / 2;

  return (
    <g fontSize={12} fill={COLORS.label} textAnchor="middle">
      {/* Top width */}
      <text x={cx} y={box.y - 6}>{formatInches(widthIn)}</text>
      {/* Bottom width */}
      <text x={cx} y={box.y + box.height + 16}>{formatInches(widthIn)}</text>

      {/* Left height (rotated) */}
      <g transform={`translate(${box.x - 12}, ${cy}) rotate(-90)`}>
        <text>{formatInches(heightIn)}</text>
      </g>
      {/* Right height (rotated) */}
      <g transform={`translate(${box.x + box.width + 12}, ${cy}) rotate(90)`}>
        <text>{formatInches(heightIn)}</text>
      </g>
    </g>
  );
}

/** Tick + label for vertical split: shows L and R distances */
function VerticalSplitMarkers({
  box,
  xsPx,
  xsIn,      // absolute inches from LEFT (same order as xsPx interior lines)
  widthIn,
  color = COLORS.label,
}: {
  box: { x: number; y: number; width: number; height: number };
  xsPx: number[];    // interior vertical lines (px)
  xsIn: number[];    // corresponding inches from LEFT
  widthIn: number;
  color?: string;
}) {
  return (
    <g stroke={color} fill={color} fontSize={10}>
      {xsPx.map((x, i) => {
        const fromLeft = xsIn[i];
        const fromRight = Math.max(0, widthIn - fromLeft);
        const label = `L: ${formatInches(fromLeft)} | R: ${formatInches(fromRight)}`;

        return (
          <g key={`vm-${i}`}>
            {/* ticks top/bottom */}
            <line x1={x} x2={x} y1={box.y - 8} y2={box.y - 2} />
            <line x1={x} x2={x} y1={box.y + box.height + 2} y2={box.y + box.height + 8} />
            {/* label on top */}
            <text x={x} y={box.y - 12} textAnchor="middle">{label}</text>
          </g>
        );
      })}
    </g>
  );
}

/** Tick + label for horizontal split: shows B and T distances, per pane */
function HorizontalSplitMarkers({
  paneXs, // px boundaries [x0,x1,...]
  ysPxPerPane, // for lines (interior y’s)
  ysInPerPane, // same in inches from BOTTOM
  heightIn,
  color = COLORS.label,
}: {
  paneXs: number[];
  ysPxPerPane: number[][];
  ysInPerPane: number[][];
  heightIn: number;
  color?: string;
}) {
  return (
    <g stroke={color} fill={color} fontSize={10}>
      {ysPxPerPane.map((ysPx, paneIdx) =>
        ysPx.map((y, j) => {
          const fromBottom = ysInPerPane[paneIdx][j];
          const fromTop = Math.max(0, heightIn - fromBottom);
          const label = `B: ${formatInches(fromBottom)} | T: ${formatInches(fromTop)}`;
          const x0 = paneXs[paneIdx];
          const x1 = paneXs[paneIdx + 1];
          // ticks at pane edges; label to the right of pane
          return (
            <g key={`hm-${paneIdx}-${j}`}>
              <line x1={x0 - 6} x2={x0 - 2} y1={y} y2={y} />
              <line x1={x1 + 2} x2={x1 + 6} y1={y} y2={y} />
              <text x={x1 + 10} y={y + 3}>{label}</text>
            </g>
          );
        })
      )}
    </g>
  );
}

/** ==== Main ==== */

export default function WindowDiagram({
  measurements,
  windowSplits,
  panelSplits,
  svgWidth = 720,
  svgHeight = 480,
  svgPadding = 20,
  panelCellPadding = 6,
}: DiagramProps) {
  // 0) readiness
  const readyMeasurements =
    !!measurements &&
    measurements.top    != null &&
    measurements.bottom != null &&
    measurements.left   != null &&
    measurements.right  != null;

  const windowCfgReady = !!windowSplits?.config?.pieces;
  const panelCfgReady  = !!panelSplits?.config?.pieces;

  // early return BEFORE any hooks
  if (!readyMeasurements) {
    return (
      <div
        style={{
          width: svgWidth,
          height: svgHeight,
          border: '1px dashed #ccc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#666',
          fontSize: '0.875rem',
        }}
      >
        Enter window dimensions to see the diagram.
      </div>
    );
  }

  // measurements -> px scaler & bounding box
  const { widthIn, heightIn } = useMemo(
    () => getWindowInches(measurements),
    [measurements],
  );

  const scaler = useMemo(
    () => makeScaler(widthIn, heightIn, svgWidth, svgHeight, svgPadding),
    [widthIn, heightIn, svgWidth, svgHeight, svgPadding],
  );

  const box = useMemo(() => ({
    x: scaler.xPx(0),
    y: scaler.yFromBottomPx(heightIn), // top edge
    width: scaler.wPx(widthIn),
    height: scaler.hPx(heightIn),
  }), [scaler, widthIn, heightIn]);

  // normalize configs (or harmless defaults)
  const windowCfg = useMemo(
    () => (windowCfgReady ? normalizeForRender(windowSplits) : null),
    [windowCfgReady, windowSplits]
  );
  const panelCfg = useMemo(
    () => (panelCfgReady ? normalizeForRender(panelSplits) : null),
    [panelCfgReady, panelSplits]
  );

  // compute lines/positions
  const windowPaneXsPx = useMemo(() => {
    if (!windowCfg) return [];
    const n = windowCfg.config.pieces;
    const xsIn = paneBoundariesInches(widthIn, windowCfg.vertical_splits, n);
    return xsIn.map(scaler.xPx);
  }, [windowCfg, widthIn, scaler]);

  const windowInteriorXsPx = useMemo(
    () => windowPaneXsPx.slice(1, Math.max(windowPaneXsPx.length - 1, 1)),
    [windowPaneXsPx]
  );
  const windowInteriorXsIn = useMemo(() => {
    if (!windowCfg) return [];
    const n = windowCfg.config.pieces;
    const xsInAll = paneBoundariesInches(widthIn, windowCfg.vertical_splits, n);
    return xsInAll.slice(1, Math.max(xsInAll.length - 1, 1));
  }, [windowCfg, widthIn]);

  const windowRowBoundaryYsPerPanePx = useMemo(() => {
    if (!windowCfg) return [];
    return windowCfg.horizontal_splits.map(inner => {
      const yBoundIn = rowBoundariesInches(heightIn, inner);
      return yBoundIn.map(scaler.yFromBottomPx);
    });
  }, [windowCfg, heightIn, scaler]);

  const windowHorizLineYsPx = useMemo(
    () => windowRowBoundaryYsPerPanePx.map(b => b.slice(1, Math.max(b.length - 1, 1))),
    [windowRowBoundaryYsPerPanePx],
  );
  const windowHorizLineYsIn = useMemo(() => {
    if (!windowCfg) return [];
    return windowCfg.horizontal_splits.map(inner => inner.map(s => s.position));
  }, [windowCfg]);

  // panel
  const panelPaneXsPx = useMemo(() => {
    if (!panelCfg) return [];
    const n = panelCfg.config.pieces;
    const xsIn = paneBoundariesInches(widthIn, panelCfg.vertical_splits, n);
    return xsIn.map(scaler.xPx);
  }, [panelCfg, widthIn, scaler]);

  const panelInteriorXsPx = useMemo(
    () => panelPaneXsPx.slice(1, Math.max(panelPaneXsPx.length - 1, 1)),
    [panelPaneXsPx]
  );
  const panelInteriorXsIn = useMemo(() => {
    if (!panelCfg) return [];
    const n = panelCfg.config.pieces;
    const xsInAll = paneBoundariesInches(widthIn, panelCfg.vertical_splits, n);
    return xsInAll.slice(1, Math.max(xsInAll.length - 1, 1));
  }, [panelCfg, widthIn]);

  const panelRowBoundaryYsPerPanePx = useMemo(() => {
    if (!panelCfg) return [];
    return panelCfg.horizontal_splits.map(inner => {
      const yBoundIn = rowBoundariesInches(heightIn, inner);
      return yBoundIn.map(scaler.yFromBottomPx);
    });
  }, [panelCfg, heightIn, scaler]);

  const panelHorizLineYsPx = useMemo(
    () => panelRowBoundaryYsPerPanePx.map(b => b.slice(1, Math.max(b.length - 1, 1))),
    [panelRowBoundaryYsPerPanePx],
  );
  const panelHorizLineYsIn = useMemo(() => {
    if (!panelCfg) return [];
    return panelCfg.horizontal_splits.map(inner => inner.map(s => s.position));
  }, [panelCfg]);

  // Render
  return (
    <svg width={svgWidth} height={svgHeight}>
      {/* Bounding Box */}
      <WindowBoundingBoxRect {...box} />
      <DimensionLabels box={box} widthIn={widthIn} heightIn={heightIn} />

      {/* WINDOW (gray) */}
      {windowCfg && windowPaneXsPx.length > 0 && (
        <>
          <SplitLines
            verticalXs={windowPaneXsPx.slice(1, -1)}
            horizontalYsPerPane={windowHorizLineYsPx}
            paneXs={windowPaneXsPx}
            box={box}
            color={COLORS.windowSplit}
            strokeWidth={STROKES.windowSplit}
          />
          <VerticalSplitMarkers
            box={box}
            xsPx={windowInteriorXsPx}
            xsIn={windowInteriorXsIn}
            widthIn={widthIn}
            color={COLORS.windowSplit}
          />
          <HorizontalSplitMarkers
            paneXs={windowPaneXsPx}
            ysPxPerPane={windowHorizLineYsPx}
            ysInPerPane={windowHorizLineYsIn}
            heightIn={heightIn}
            color={COLORS.windowSplit}
          />
        </>
      )}

      {/* PANEL (purple + blue) */}
      {panelCfg && (
        <>
          <PanelFrame {...box} />
          <SplitLines
            verticalXs={panelPaneXsPx.slice(1, -1)}
            horizontalYsPerPane={panelHorizLineYsPx}
            paneXs={panelPaneXsPx}
            box={box}
            color={COLORS.panelSplit}
            strokeWidth={STROKES.panelSplit}
          />
          <VerticalSplitMarkers
            box={box}
            xsPx={panelInteriorXsPx}
            xsIn={panelInteriorXsIn}
            widthIn={widthIn}
            color={COLORS.panelSplit}
          />
          <HorizontalSplitMarkers
            paneXs={panelPaneXsPx}
            ysPxPerPane={panelHorizLineYsPx}
            ysInPerPane={panelHorizLineYsIn}
            heightIn={heightIn}
            color={COLORS.panelSplit}
          />
          <PanelCells
            paneXs={panelPaneXsPx}
            rowBoundaryYsPerPane={panelRowBoundaryYsPerPanePx}
            inset={panelCellPadding}
          />
        </>
      )}
    </svg>
  );
}
