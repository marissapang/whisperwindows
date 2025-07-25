'use client';

// import { updateNestedField } from '@/app/utils/updateHelpers'; // You'll define this
import { useState } from 'react';

export function DynamicOrderForm({
	order,
	orderMeta,
	setOrder,
}: {
	order: any;
	orderMeta: any;
	setOrder: (o: any) => void;
}) {

	const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');


	const updateNestedField = (obj: any, path: string, value: any) => {
		const keys = path.split('.');
		const updated = { ...obj };
		let cursor: any = updated;

		for (let i = 0; i < keys.length - 1; i++) {
			const rawKey = keys[i];
			const key = /^\d+$/.test(rawKey) ? Number(rawKey) : rawKey; // support numeric indices

			// Clone the current level (object or array element)
			if (Array.isArray(cursor)) {
				cursor[key] = { ...(cursor[key] || {}) }; // clone object at index
			} else {
				cursor[key] = { ...(cursor[key] || {}) }; // clone nested object
			}

			cursor = cursor[key];
		}

		const finalRawKey = keys[keys.length - 1];
		const finalKey = /^\d+$/.test(finalRawKey) ? Number(finalRawKey) : finalRawKey;

		cursor[finalKey] = value;
		return updated;
	};

	const update = (path: string, value: any) => {
		setOrder((prev: any) => updateNestedField(prev, path, value));
	};

	function formatInches(value: number): string {
		return value.toFixed(4); // Display up to 1/16" (0.0625)
	}

	function parseInchesInput(value: string): number {
		const parsed = parseFloat(value);
		return isNaN(parsed) ? 0 : Math.round(parsed * 16) / 16;
	}

	function getValueByPath(obj: any, path: string): any {
		return path.split('.').reduce((o, k) => (o ? o[k] : undefined), obj);
	}


  const handleSave = async () => {
    setStatus('saving');

    try {
      const res = await fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      });

      const data = await res.json();

      if (data.success) {
        setStatus('success');
      } else {
        console.error('Error saving order:', data.error);
        setStatus('error');
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setStatus('error');
    }
  };

	// recursively calls on itself to read and render nested fields 
	const renderFields = (
		data: any,
		meta: any,
		onChange: (path: string, value: any) => void,
		parentPath = '',
		indentLevel = 0
		): JSX.Element[] => {
		const fields: JSX.Element[] = [];

		console.log("inside render Fields function, the meta is ")
		console.log(meta)
		console.log("Object.entries(meta)")
		console.log(Object.entries(meta))
		for (const [key, config] of Object.entries(meta)) {
			console.log(`inside for loop, key is`)
			console.log(key)
			console.log(" and config is") 
			console.log(config)

			if (config?.omit){
				continue;
			} else {
				console.log("did not skipped config")
			}

			const fullPath = parentPath ? `${parentPath}.${key}` : key;
			console.log("data here is")
			console.log(data)
			const value = getValueByPath(data, fullPath);

			console.log("fullPath is")
			console.log(fullPath)
			console.log("value is")
			console.log(value)

			const padding = `pl-${Math.min(indentLevel * 4, 12)}`; // Tailwind padding: pl-0 → pl-12

			if (config.type === 'group') {
      fields.push(
        <div key={fullPath} className={`mt-4 mb-2 ${padding}`}>
          <div className="font-semibold text-gray-700 mb-1">
            {config.label || key.replace(/_/g, ' ')}
          </div>
          {renderFields(
            data || {},
            config.fields,
            onChange,
            fullPath,
            indentLevel + 1
          )}
        </div>
      );
      continue;
    }

    // ✅ Base-level input field
    const label = config.label || key;
    const type = config.type;

    const inputProps = {
      className: `w-full p-2 border rounded mb-3 ${padding}`,
      value: type === 'number_inches' ? formatInches(value ?? 0) : value ?? '',
      onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const raw = e.target.value;
        const parsed =
          type === 'number_inches'
            ? parseInchesInput(raw)
            : type === 'number'
            ? parseFloat(raw)
            : raw;

        // onChange(fullPath, parsed);
        const updated = updateNestedField(order, fullPath, parsed);
  			setOrder(updated); // ✅ Direct update with fresh object
      },
    };

    fields.push(
      <div key={`wrapper-${fullPath}`} className={padding}>
        <label className="block font-medium text-sm text-gray-700 mb-1">
          {label}
        </label>
        {type === 'longtext' ? (
          <textarea key={fullPath} rows={4} {...inputProps} />
        ) : (
          <input
            key={fullPath}
            {...inputProps}
            type={type === 'number_inches' || type === 'number' ? 'number' : 'text'}
            step={type === 'number_inches' ? 1 / 16 : 'any'}
          />
        )}
      </div>
    );

		}

		return fields;
	};

	return (
		<div>
		<form>
		{renderFields(order, orderMeta, (path, value) => {
			setOrder((prev) => updateNestedField(prev, path, value));
		})}
		<button 
			type="button"
			className="bg-black text-white"
			onClick={handleSave}>
			submit button
		</button>
		</form>
		</div>
		)}