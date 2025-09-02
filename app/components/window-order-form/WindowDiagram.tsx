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
};

const STROKES = {
  windowBox: 2,
  windowSplit: 2,
  panelFrame: 6,
  panelSplit: 4,
  panelCellStroke: 2,
};

/** ==== Helpers ==== */

function hasMeasurements(measurements?: FourSidedMeasurements | null) {
  if (!measurements) return false;
  const { top, bottom, left, right } = measurements;
  return top != null && bottom != null && left != null && right != null;
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
  // very defensive defaults
  const safeCfg = cfg ?? {
    config: { kind: 'Single Window', pieces: 1 },
    vertical_splits: [],
    vertical_configs: [{ kind: 'Single Piece', pieces: 1 }],
    horizontal_splits: [[]],
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
  verticalXs: number[];          // interior vertical lines (px)
  horizontalYsPerPane: number[][]; // per pane y-lines (px)
  paneXs: number[];              // pane x-boundaries (px), length n+1
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


export default function WindowDiagram({
  measurements,
  windowSplits,
  panelSplits,
  svgWidth = 720,
  svgHeight = 480,
  svgPadding = 20,
  panelCellPadding = 6,
}: DiagramProps) {
  // 1) Readiness flags
  const readyMeasurements = hasMeasurements(measurements);
  const windowCfgReady = !!windowSplits?.config?.pieces;
  const panelCfgReady  = !!panelSplits?.config?.pieces;

  // If we don't even have measurements, show placeholder and bail out
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

  // 2) Measurements -> px scaler & bounding box
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

  // 3) Normalize configs ONLY if we’ll use them
  const windowCfg = useMemo(
    () => (windowCfgReady ? normalizeForRender(windowSplits) : null),
    [windowCfgReady, windowSplits]
  );
  const panelCfg = useMemo(
    () => (panelCfgReady ? normalizeForRender(panelSplits) : null),
    [panelCfgReady, panelSplits]
  );

  // 4) Precompute split lines conditionally
  const windowPaneXsPx = useMemo(() => {
    if (!windowCfg) return [];
    const w_n = windowCfg.config.pieces;
    const xsIn = paneBoundariesInches(widthIn, windowCfg.vertical_splits, w_n);
    return xsIn.map(scaler.xPx);
  }, [windowCfg, widthIn, scaler]);

  const windowHorizLineYsPx = useMemo(() => {
    if (!windowCfg) return [];
    const arr = windowCfg.horizontal_splits.map(inner => {
      const yBoundIn = rowBoundariesInches(heightIn, inner);
      return yBoundIn.map(scaler.yFromBottomPx);
    });
    // use interior boundaries only (drop first & last)
    return arr.map(b => b.slice(1, Math.max(b.length - 1, 1)));
  }, [windowCfg, heightIn, scaler]);

  const panelPaneXsPx = useMemo(() => {
    if (!panelCfg) return [];
    const p_n = panelCfg.config.pieces;
    const xsIn = paneBoundariesInches(widthIn, panelCfg.vertical_splits, p_n);
    return xsIn.map(scaler.xPx);
  }, [panelCfg, widthIn, scaler]);

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

  // 5) Render
  return (
    <svg width={svgWidth} height={svgHeight}>
      {/* Always show the bounding box when measurements are ready */}
      <WindowBoundingBoxRect {...box} />

      {/* Window splits only if window config ready */}
      {windowCfg && windowPaneXsPx.length > 0 && (
        <SplitLines
          verticalXs={windowPaneXsPx.slice(1, -1)}
          horizontalYsPerPane={windowHorizLineYsPx}
          paneXs={windowPaneXsPx}
          box={box}
          color={COLORS.windowSplit}
          strokeWidth={STROKES.windowSplit}
        />
      )}

      {/* Panel frame always uses the same bounding box */}
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


