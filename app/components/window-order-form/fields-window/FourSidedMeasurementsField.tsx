'use client';
import { NumberInchesField } from '../fields-generic/NumberInchesField';
import { FourSidedMeasurements } from './libs/type';


type Props = {
  /** The four-sided value from your Window object */
  value: FourSidedMeasurements;
  /** Controls edit vs read-only rendering for the inner inputs */
  editable: boolean;
  /** Label for the field */
  label: string;
  /**
   * Emits the full, updated FourSidedMeasurements object.
   * In the parent, you'll forward this into your existing onChange:
   * onChange('Window_Four_Sided_Measurements', next)
   */
  onChange: (v: FourSidedMeasurements) => void;
  /** Called when any field loses focus */
  onBlur?: () => void;
  /** Called when any field gains focus */
  onFocus?: () => void;
  /** Optional layout classes for the whole row */
  className?: string;
};


export function FourSidedMeasurementsField({
  value,
  editable,
  label,
  onChange,
  onBlur,
  onFocus,
  className,
}: Props) {
  const current = value;

  const update =
    (key: keyof FourSidedMeasurements) =>
    (v: number) => {
      // Build a *new* object to keep React state immutable
      onChange({
        ...current,
        [key]: v,
      });
    };

  return (
    <div className={className ?? 'flex gap-6 items-start'}>
      <div>
        <div className="mb-1 text-sm text-gray-700">Top</div>
        <NumberInchesField
          value={current.top ?? 0}      // NumberInchesField currently expects number
          editable={editable}
          label=""                      // we render the label above
          onChange={update('top')}
          onBlur={onBlur}
          onFocus={onFocus}
        />
      </div>

      <div>
        <div className="mb-1 text-sm text-gray-700">Bottom</div>
        <NumberInchesField
          value={current.bottom ?? 0}
          editable={editable}
          label=""
          onChange={update('bottom')}
          onBlur={onBlur}
          onFocus={onFocus}
        />
      </div>

      <div>
        <div className="mb-1 text-sm text-gray-700">Left</div>
        <NumberInchesField
          value={current.left ?? 0}
          editable={editable}
          label=""
          onChange={update('left')}
          onBlur={onBlur}
          onFocus={onFocus}
        />
      </div>

      <div>
        <div className="mb-1 text-sm text-gray-700">Right</div>
        <NumberInchesField
          value={current.right ?? 0}
          editable={editable}
          label=""
          onChange={update('right')}
          onBlur={onBlur}
          onFocus={onFocus}
        />
      </div>
    </div>
  );
}

export default FourSidedMeasurementsField;