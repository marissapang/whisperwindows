// app/components/window-order-form/diagram/libs/configSplits.ts

import {
  ConfigSplits, HorizontalSplit, VerticalSplit
} from '@/app/components/window-order-form/libs/type';


// Normalization + geometry for splits (pure & reusable)

export function ensureLengths(cfg: ConfigSplits): ConfigSplits {
  const n = Math.max(1, Math.floor(cfg.config.pieces));

  const vertical_splits = (cfg.vertical_splits ?? []).slice(0, Math.max(n - 1, 0));
  while (vertical_splits.length < Math.max(n - 1, 0)) {
    vertical_splits.push({ position: 0, direction: 'left-to-right' });
  }

  const vertical_configs = (cfg.vertical_configs ?? []).slice(0, n);
  while (vertical_configs.length < n) {
    vertical_configs.push({ kind: 'Single Piece', pieces: 1 });
  }

  const horizontal_splits: HorizontalSplit[][] = [];
  for (let i = 0; i < n; i++) {
    const need = Math.max((vertical_configs[i]?.pieces ?? 1) - 1, 0);
    const inner = (cfg.horizontal_splits?.[i] ?? []).slice(0, need);
    while (inner.length < need) inner.push({ position: 0, direction: 'bottom-to-top' });
    horizontal_splits.push(inner);
  }

  return { ...cfg, vertical_splits, vertical_configs, horizontal_splits };
}

/** n panes → n+1 x-boundaries (inches), sorted */
export function paneBoundariesInches(widthIn: number, vSplits: VerticalSplit[], n: number) {
  const xs = vSplits.map(s => s.position).slice(0, Math.max(n - 1, 0)).sort((a, b) => a - b);
  return [0, ...xs, widthIn];
}

/** Given row split positions (inches from bottom), emit boundary list [0, ...splits, height] */
export function rowBoundariesInches(heightIn: number, splits: HorizontalSplit[]) {
  const ys = splits.map(s => s.position).sort((a, b) => a - b);
  return [0, ...ys, heightIn];
}

export function isMonotonicIncreasing(nums: number[], allowEqual = false) {
  for (let i = 1; i < nums.length; i++) {
    if (allowEqual ? nums[i] < nums[i-1] : nums[i] <= nums[i-1]) return false;
  }
  return true;
}
