import type { ExtensionConfigModel, MaterialId } from '@/app/components/window-order-form/libs/types';
import { getMaterial } from './materials'; // we’ll add a small catalog in materials.ts

/**
 * Compute the inner box (in inches) where the panel/frame should live,
 * and the 4 rectangles representing the extension boards (also in inches).
 *
 * Coords are in window inches: x from LEFT, y from BOTTOM.
 */
export function computeExtensionGeometryInches(
  widthIn: number,
  heightIn: number,
  ext?: ExtensionConfigModel | null
): {
  innerBox: { x0: number; y0: number; x1: number; y1: number };
  sides: Array<{ side: 'top'|'left'|'bottom'|'right'; x: number; y: number; w: number; h: number }>;
} {
  // Defaults: no extension
  if (!ext?.enabled) {
    return {
      innerBox: { x0: 0, y0: 0, x1: widthIn, y1: heightIn },
      sides: [],
    };
  }

  const matTop = getMaterial(ext.materials.top);
  const matLeft = getMaterial(ext.materials.left);
  const matBottom = getMaterial(ext.materials.bottom);
  const matRight = getMaterial(ext.materials.right);

  // “width” is used as effective board thickness around the box
  const tTop = ext.thicknessOverride?.top ?? matTop.width;
  const tLeft = ext.thicknessOverride?.left ?? matLeft.width;
  const tBottom = ext.thicknessOverride?.bottom ?? matBottom.width;
  const tRight = ext.thicknessOverride?.right ?? matRight.width;

  // Paddings (reduce inner box)
  const padTop = ext.paddings?.top  ? (ext.paddings.top.amount  || getMaterial(ext.paddings.top.material).width)     : 0;
  const padLeft = ext.paddings?.left ? (ext.paddings.left.amount || getMaterial(ext.paddings.left.material).width)    : 0;
  const padBottom = ext.paddings?.bottom ? (ext.paddings.bottom.amount || getMaterial(ext.paddings.bottom.material).width) : 0;
  const padRight = ext.paddings?.right ? (ext.paddings.right.amount || getMaterial(ext.paddings.right.material).width) : 0;

  let x0 = 0, y0 = 0, x1 = widthIn, y1 = heightIn;
  const sides: Array<{ side: 'top'|'left'|'bottom'|'right'; x: number; y: number; w: number; h: number }> = [];

  if (ext.mount === 'interior') {
    // boards consume interior real estate
    x0 += tLeft;  x1 -= tRight;
    y0 += tBottom; y1 -= tTop;

    // add paddings
    x0 += padLeft;  x1 -= padRight;
    y0 += padBottom; y1 -= padTop;

    // Side rectangles (draw inside original box)
    sides.push(
      { side: 'left',   x: 0,         y: 0,          w: tLeft,   h: heightIn },
      { side: 'right',  x: widthIn-tRight, y: 0,     w: tRight,  h: heightIn },
      { side: 'bottom', x: 0,         y: 0,          w: widthIn, h: tBottom },
      { side: 'top',    x: 0,         y: heightIn-tTop, w: widthIn, h: tTop },
    );
  } else {
    // exterior: boards wrap outside; inner box typically remains original (minus optional paddings)
    x0 += padLeft;  x1 -= padRight;
    y0 += padBottom; y1 -= padTop;

    // represent exterior boards by rectangles just outside the original
    sides.push(
      { side: 'left',   x: -tLeft,    y: 0,            w: tLeft,  h: heightIn },
      { side: 'right',  x: widthIn,   y: 0,            w: tRight, h: heightIn },
      { side: 'bottom', x: 0,         y: -tBottom,     w: widthIn, h: tBottom },
      { side: 'top',    x: 0,         y: heightIn,     w: widthIn, h: tTop },
    );
  }

  // Clamp inner box
  x0 = Math.max(0, x0); y0 = Math.max(0, y0);
  x1 = Math.max(x0, x1); y1 = Math.max(y0, y1);

  return { innerBox: { x0, y0, x1, y1 }, sides };
}
