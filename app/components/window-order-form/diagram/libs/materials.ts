// app/components/window-order-form/diagram/libs/materials.ts

export type MaterialId =
  | 'primed_pine1x2'
  | 'primed_pine1x6'
  | 'primed_pine1x8'
  | 'primed_pine1x10'
  | 'primed_pine1x12'
  | 'pvc_1x2'
  | 'wood_2x2'
  | 'composite_2x1_pvc'
  | 'composite_u_channel';

export interface MaterialSpec {
  id: MaterialId;
  label: string;
  width: number;     // face width / effective frame thickness (in)
  thickness: number; // secondary dimension (in)
  depth?: number;
  components?: MaterialId[];
}



export function getMaterial(id: MaterialId): MaterialSpec {
  return MATERIALS[id];
}

import type { MaterialId, MaterialSpec } from '../../../libs/types';

export const MATERIALS: Record<MaterialId, MaterialSpec> = {
  primed_pine1x2: { id: 'primed_pine1x2', label: 'Primed Pine 1x2', width: 1.5, thickness: 0.75 },
  pvc_1x2:        { id: 'pvc_1x2',        label: 'PVC 1x2',          width: 1.5, thickness: 0.625 },
  wood_2x2:       { id: 'wood_2x2',       label: 'Wood 2x2',         width: 1.5, thickness: 1.5 },
  primed_pine1x6: { id: 'primed_pine1x6', label: 'Primed Pine 1x6',  width: 5.5, thickness: 0.75 },
  primed_pine1x8: { id: 'primed_pine1x8', label: 'Primed Pine 1x8',  width: 7.25, thickness: 0.75 },
  primed_pine1x10:{ id: 'primed_pine1x10',label: 'Primed Pine 1x10', width: 9.25, thickness: 0.75 },
  primed_pine1x12:{ id: 'primed_pine1x12',label: 'Primed Pine 1x12', width: 11.25, thickness: 0.75 },
  composite_2x1_pvc: { id: 'composite_2x1_pvc', label: 'Composite (2× PVC 1x2)', width: 3.0, thickness: 0.625, components: ['pvc_1x2','pvc_1x2'] },
  composite_u_channel: { id: 'composite_u_channel', label: 'U-Channel', width: 1.5, thickness: 0.625, components: ['pvc_1x2','pvc_1x2','pvc_1x2'] },
};


