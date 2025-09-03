'use client';

import { MATERIALS } from '../diagram/libs/materials';
import type { ExtensionConfigModel, MaterialId, MountSide } from '../libs/types';

type Props = {
  value: ExtensionConfigModel | null | undefined;
  editable: boolean;
  onChange: (next: ExtensionConfigModel) => void;
};

const DEFAULT_EXT: ExtensionConfigModel = {
  enabled: false,
  mount: 'interior',
  materials: { top: 'pvc_1x2', left: 'pvc_1x2', bottom: 'pvc_1x2', right: 'pvc_1x2' },
  thicknessOverride: {},
  paddings: {},
};

export default function ExtensionField({ value, editable, onChange }: Props) {
  const v = value ?? DEFAULT_EXT;

  const update = (patch: Partial<ExtensionConfigModel>) => {
    onChange({ ...v, ...patch });
  };

  const updateMaterial = (side: 'top'|'left'|'bottom'|'right', mat: MaterialId) => {
    update({ materials: { ...v.materials, [side]: mat } });
  };

  const updatePadding = (side: 'top'|'left'|'bottom'|'right', amountStr: string, mat?: MaterialId) => {
    const amount = Number(amountStr);
    const existing = v.paddings || {};
    const prev = existing[side] || { material: mat ?? 'pvc_1x2', amount: 0 };
    const next = { ...existing, [side]: { material: prev.material, amount: isNaN(amount) ? 0 : amount } };
    update({ paddings: next });
  };

  const matOptions = Object.values(MATERIALS);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <label className="text-sm font-medium">Extension Enabled</label>
        <input
          type="checkbox"
          checked={v.enabled}
          disabled={!editable}
          onChange={(e) => update({ enabled: e.target.checked })}
        />
      </div>

      <div className="flex items-center gap-3">
        <label className="text-sm font-medium">Mount</label>
        <label className="text-sm">
          <input
            type="radio"
            name="ext-mount"
            value="interior"
            checked={v.mount === 'interior'}
            disabled={!editable}
            onChange={() => update({ mount: 'interior' })}
          /> Interior
        </label>
        <label className="text-sm">
          <input
            type="radio"
            name="ext-mount"
            value="exterior"
            checked={v.mount === 'exterior'}
            disabled={!editable}
            onChange={() => update({ mount: 'exterior' })}
          /> Exterior
        </label>
      </div>

      <div>
        <div className="text-sm font-medium mb-2">Materials (per side)</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {(['top','left','bottom','right'] as const).map(side => (
            <div key={side} className="flex flex-col gap-1">
              <label className="text-xs text-gray-600 capitalize">{side}</label>
              <select
                className="p-2 border rounded"
                value={v.materials[side]}
                disabled={!editable}
                onChange={(e) => updateMaterial(side, e.target.value as MaterialId)}
              >
                {matOptions.map(m => <option key={m.id} value={m.id}>{m.label}</option>)}
              </select>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="text-sm font-medium mb-2">Paddings (inches)</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {(['top','left','bottom','right'] as const).map(side => (
            <div key={side} className="flex flex-col gap-1">
              <label className="text-xs text-gray-600 capitalize">{side}</label>
              <input
                type="number"
                min={0}
                step={0.125}
                className="p-2 border rounded"
                value={v.paddings?.[side]?.amount ?? 0}
                disabled={!editable}
                onChange={(e) => updatePadding(side, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
