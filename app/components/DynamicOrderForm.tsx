'use client';

import { useState } from 'react';
import { fieldComponentMap } from './fields';


export function DynamicOrderForm({
	order,
	orderMeta,
	setOrder,
	view,
}: {
	order: any;
	orderMeta: any;
	setOrder: (o: any) => void;
	view: 'Client' | 'Sales' | 'Manufacturer' | 'Installer';
}) {

	const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

	// 🔄 Utility: filter out group-only layers from path
  const pruneMetaPath = (meta: any, fullPath: string): string => {
    const keys = fullPath.split('.');
    const truePath: string[] = [];
    let cursorMeta = meta;

    for (const key of keys) {
      const field = cursorMeta?.[key];
      if (!field) break;

      if (field.type !== 'group') {
        truePath.push(key);
      }

      cursorMeta = field.fields || {};
    }

    return truePath.join('.');
  };

	const updateNestedField = (obj: any, path: string, value: any) => {
		const realPath = pruneMetaPath(orderMeta, path);
		const keys = realPath.split('.');
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

	function getValueByPath(obj: any, path: string): any {
		const realPath = pruneMetaPath(orderMeta, path);
		return realPath.split('.').reduce((o, k) => (o ? o[k] : undefined), obj);
	}

	function getMetaAtPath(meta: any, path: string): any {
	  const keys = path.split('.');
	  return keys.reduce((acc, key, idx) => {
	    if (!acc) return undefined;

	    const isLast = idx === keys.length - 1;

	    // Only descend into .fields if it's not the last segment
	    return isLast ? acc[key] : acc[key]?.fields ?? acc[key];
	  }, meta);
	}

	function resolvePermissions(
	  metaPath: string,
	  metaRoot: any
	): {
	  visibleTo: string[];
	  editableBy: string[];
	  readOnlyStages: string[];
	} {
	  const keys = metaPath.split('.');

	  for (let j = keys.length; j > 0; j--) {
	    const subPath = keys.slice(0, j).join('.');
	    const node = getMetaAtPath(metaRoot, subPath);
	    if (node?.fields_permissions) {
	      return {
	        visibleTo: node.fields_permissions.visibleTo ?? [],
	        editableBy: node.fields_permissions.editableBy ?? [],
	        readOnlyStages: node.fields_permissions.readOnlyStages ?? [],
	      };
	    }
	  }

  return { visibleTo: [], editableBy: [], readOnlyStages: [] };
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

    for (const [key, config] of Object.entries(meta)) {
      const fullPath = parentPath ? `${parentPath}.${key}` : key;
      const padding = "pl-0"//`pl-${Math.min(indentLevel * 4, 12)}`;
      const value = getValueByPath(data, fullPath);

      if (config.type === 'group') {
        fields.push(
          <div key={fullPath} className={`mt-4 mb-2 ${padding}`}>
            <div className={config.style}>
              {config.label || key.replace(/_/g, ' ')}
            </div>
            {renderFields(data, config.fields, onChange, fullPath, indentLevel + 1)}
          </div>
        );
        continue;
      }

      if (config.type === 'nested_object') {
        fields.push(
          <div key={fullPath} className={`mt-4 mb-2 ${padding}`}>
            <div className="font-semibold text-gray-600 mb-1 text-lg">
              {config.label || key}
            </div>
            {renderFields(data, config.fields, onChange, fullPath, indentLevel + 1)}
          </div>
        );
        continue;
      }

      const perms = resolvePermissions(fullPath, orderMeta);
      if (!perms.visibleTo.includes(view)){
      	continue;
      } 



      const editable = perms.editableBy.includes(view) && !perms.readOnlyStages.includes(order.Order_Status);
      const label = config.label || key;
      const type = config.type;

      console.log(`field is: ${key}`)
      console.log(perms)
      console.log(editable)

      const FieldComponent = fieldComponentMap[type];

      if (!FieldComponent) {
        console.warn(`No field component registered for type: ${type}`);
        continue;
      }

      fields.push(
        <div key={`wrapper-${fullPath}`} className={padding}>
          <FieldComponent
            value={value}
            editable={editable}
            label={label}
            onChange={(v: any) => {
              const updated = updateNestedField(order, fullPath, v);
              setOrder(updated);
            }}
          />
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