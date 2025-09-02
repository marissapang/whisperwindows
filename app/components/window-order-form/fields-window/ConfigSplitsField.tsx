import { useMemo } from 'react';
import { NumberInchesField } from '../fields-generic/NumberInchesField'; // adjust path as needed


type Props = {
  value: ConfigSplits;
  editable: boolean;
  onChange: (newValue: ConfigSplits) => void;
  className?: string;
};

// ===== Helpers =====

const clampPieces = (n: number) => (Number.isFinite(n) && n > 0 ? Math.floor(n) : 1);

const DEFAULT_VERTICAL_CFG: VerticalConfigOptions = { kind: 'Single Piece', pieces: 1 };

function makeHorizontalKind(kind: HorizontalConfigOptions['kind'], n?: number): HorizontalConfigOptions {
  switch (kind) {
    case 'Single Window':         return { kind, pieces: 1 };
    case '2Pc Side-by-Side':      return { kind, pieces: 2 };
    case '3Pc Side-by-Side':      return { kind, pieces: 3 };
    case 'Multi-Pc Side by Side': return { kind, pieces: clampPieces(n ?? 4) };
  }
}

function ensureLengths(cfg: ConfigSplits): ConfigSplits {
  const n = clampPieces(cfg.config.pieces);

  // vertical_splits: length n-1
  const vertical_splits = cfg.vertical_splits.slice(0, Math.max(n - 1, 0));
  while (vertical_splits.length < Math.max(n - 1, 0)) {
    vertical_splits.push({ position: 0, direction: 'left-to-right' });
  }

  // vertical_configs: length n
  const vertical_configs = cfg.vertical_configs
    ? cfg.vertical_configs.slice(0, n)
    : [];
  while (vertical_configs.length < n) {
    vertical_configs.push(DEFAULT_VERTICAL_CFG);
  }

  // horizontal_splits: outer length n; inner length per pane = vertical_configs[i].pieces - 1
  const horizontal_splits: HorizontalSplit[][] = [];
  for (let i = 0; i < n; i++) {
    const need = Math.max(vertical_configs[i].pieces - 1, 0);
    const existing = (cfg.horizontal_splits?.[i] ?? []).slice(0, need);
    while (existing.length < need) {
      existing.push({ position: 0, direction: 'bottom-to-top' });
    }
    horizontal_splits.push(existing);
  }

  return { ...cfg, vertical_splits, vertical_configs, horizontal_splits };
}

export function ConfigSplitsField({ value, editable, onChange, className }: Props) {
  const normalized = useMemo(() => ensureLengths(value), [value]);
  const n = normalized.config.pieces;

  const setConfigKind = (kind: HorizontalConfigOptions['kind']) => {
    const next = ensureLengths({
      ...normalized,
      config: makeHorizontalKind(kind, normalized.config.pieces),
    });
    onChange(next);
  };

  const setConfigPieces = (pieces: number) => {
    const next = ensureLengths({
      ...normalized,
      config: makeHorizontalKind('Multi-Pc Side by Side', pieces),
    });
    onChange(next);
  };

  const updateVerticalSplit = (idx: number, patch: Partial<VerticalSplit>) => {
    const copy = normalized.vertical_splits.slice();
    copy[idx] = { ...copy[idx], ...patch };
    onChange({ ...normalized, vertical_splits: copy });
  };

  const setPaneVerticalConfig = (paneIdx: number, nextCfg: VerticalConfigOptions) => {
    // Update vertical_configs; ensure horizontal_splits inner length matches new pieces
    const vertical_configs = normalized.vertical_configs.slice();
    vertical_configs[paneIdx] = nextCfg;

    const need = Math.max(nextCfg.pieces - 1, 0);
    const hOuter = normalized.horizontal_splits.map(arr => arr.slice());
    const current = hOuter[paneIdx] ?? [];
    const resized = current.slice(0, need);
    while (resized.length < need) {
      resized.push({ position: 0, direction: 'bottom-to-top' });
    }
    hOuter[paneIdx] = resized;

    onChange({ ...normalized, vertical_configs, horizontal_splits: hOuter });
  };

  const updateHorizontalSplit = (paneIdx: number, splitIdx: number, patch: Partial<HorizontalSplit>) => {
    const hOuter = normalized.horizontal_splits.map(arr => arr.slice());
    hOuter[paneIdx][splitIdx] = { ...hOuter[paneIdx][splitIdx], ...patch };
    onChange({ ...normalized, horizontal_splits: hOuter });
  };

  return (
    <div className={className ?? 'space-y-6'}>
      {/* Horizontal (side-by-side) configuration */}
      <div className="flex items-end gap-3">
        <div className="flex flex-col">
          <label className="text-sm text-gray-700 mb-1">Side-by-Side Configuration</label>
          <select
            className="p-2 border rounded"
            value={normalized.config.kind}
            onChange={(e) => setConfigKind(e.target.value as HorizontalConfigOptions['kind'])}
            disabled={!editable}
          >
            <option value="Single Window">Single Window</option>
            <option value="2Pc Side-by-Side">2-Pc Side-by-Side</option>
            <option value="3Pc Side-by-Side">3-Pc Side-by-Side</option>
            <option value="Multi-Pc Side by Side">Multi-Pc Side by Side</option>
          </select>
        </div>

        {normalized.config.kind === 'Multi-Pc Side by Side' && (
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 mb-1">Pieces (N)</label>
            <input
              type="number"
              min={1}
              className="p-2 border rounded w-24"
              value={n}
              onChange={(e) => setConfigPieces(clampPieces(Number(e.target.value)))}
              disabled={!editable}
            />
          </div>
        )}
      </div>

      {/* Vertical splits across the full width (n - 1) */}
      <div className="space-y-2">
        <div className="text-sm font-medium text-gray-800">
          Vertical Splits ({Math.max(n - 1, 0)}) — positions from LEFT edge
        </div>
        <div className="flex flex-wrap gap-4">
          {normalized.vertical_splits.map((s, i) => (
            <div key={`v-${i}`} className="border rounded p-3">
              <div className="text-xs text-gray-600 mb-2">Split {i + 1}</div>

              <NumberInchesField
                value={s.position}
                editable={editable}
                label="Position (in)"
                onChange={(pos) => updateVerticalSplit(i, { position: pos })}
              />

              <label className="block text-xs text-gray-600 mb-1">Direction</label>
              <select
                className="p-2 border rounded w-full"
                value={s.direction}
                onChange={(e) =>
                  updateVerticalSplit(i, { direction: e.target.value as VerticalSplit['direction'] })
                }
                disabled={!editable}
              >
                <option value="left-to-right">left → right</option>
                <option value="right-to-left">right → left</option>
              </select>
            </div>
          ))}
          {normalized.vertical_splits.length === 0 && (
            <div className="text-sm text-gray-500 italic">No vertical splits for this configuration.</div>
          )}
        </div>
      </div>

      {/* Per-pane vertical piece config + horizontal splits inside each pane */}
      <div className="space-y-3">
        <div className="text-sm font-medium text-gray-800">Horizontal Splits per Pane</div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {normalized.vertical_configs.map((vCfg, paneIdx) => {
            const inner = normalized.horizontal_splits[paneIdx] ?? [];
            const need = Math.max(vCfg.pieces - 1, 0);

            return (
              <div key={`pane-${paneIdx}`} className="border rounded p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium">Pane {paneIdx + 1}</div>
                </div>

                {/* Vertical piece config for this pane */}
                <div className="mb-3">
                  <label className="block text-xs text-gray-600 mb-1">Vertical Piece Config</label>
                  <select
                    className="p-2 border rounded w-full"
                    value={vCfg.kind}
                    onChange={(e) => {
                      const kind = e.target.value as VerticalConfigOptions['kind'];
                      const next =
                        kind === 'Single Piece' ? { kind, pieces: 1 }
                      : kind === 'Up-Down'      ? { kind, pieces: 2 }
                      :                             { kind, pieces: 3 }; // Up-Middle-Down
                      setPaneVerticalConfig(paneIdx, next);
                    }}
                    disabled={!editable}
                  >
                    <option value="Single Piece">Single Piece</option>
                    <option value="Up-Down">Up-Down (2 pieces)</option>
                    <option value="Up-Middle-Down">Up-Middle-Down (3 pieces)</option>
                  </select>
                </div>

                {/* Horizontal splits inside this pane */}
                {need === 0 && <div className="text-xs text-gray-500 italic">No horizontal splits.</div>}

                {inner.slice(0, need).map((row, idx) => (
                  <div key={`h-${paneIdx}-${idx}`} className="border rounded p-2 mb-2">
                    <div className="text-xs text-gray-600 mb-2">
                      Split {idx + 1} (from BOTTOM edge)
                    </div>

                    <NumberInchesField
                      value={row.position}
                      editable={editable}
                      label="Position (in)"
                      onChange={(pos) => updateHorizontalSplit(paneIdx, idx, { position: pos })}
                    />

                    <label className="block text-xs text-gray-600 mb-1">Direction</label>
                    <select
                      className="p-2 border rounded w-full"
                      value={row.direction}
                      onChange={(e) =>
                        updateHorizontalSplit(paneIdx, idx, {
                          direction: e.target.value as HorizontalSplit['direction'],
                        })
                      }
                      disabled={!editable}
                    >
                      <option value="bottom-to-top">bottom → top</option>
                      <option value="top-to-bottom">top → bottom</option>
                    </select>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}