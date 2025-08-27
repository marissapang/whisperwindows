'use client';

import { useState } from 'react';
import { fieldComponentMap } from './fields';
import { createSingleOrDoubleHungWindow } from '@/app/schemas/createSingleOrDoubleHungWindow';
import { prepareOrderForDatabase } from '@/app/libs/orderProcessing';


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

	// Filter out group-only layers from path
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

	const getNestedValue = (obj: any, path: string): any => {
		const realPath = pruneMetaPath(orderMeta, path);
		const keys = realPath.split('.');
		let cursor = obj;

		for (const key of keys) {
			if (cursor && typeof cursor === 'object' && key in cursor) {
				cursor = cursor[key];
			} else {
				return undefined;
			}
		}

		return cursor;
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
      // Process order with extension calculations before saving
      const processedOrder = prepareOrderForDatabase(order);

      const res = await fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(processedOrder),
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
      
      // Type assertion for config to fix TypeScript errors
      const fieldConfig = config as any;

      if (fieldConfig.type === 'group') {
        fields.push(
          <div key={fullPath} className={`mt-4 mb-2 ${padding}`}>
            <div className={fieldConfig.style}>
              {fieldConfig.label || key.replace(/_/g, ' ')}
            </div>
            {renderFields(data, fieldConfig.fields, onChange, fullPath, indentLevel + 1)}
          </div>
        );
        continue;
      }

      if (fieldConfig.type === 'nested_object') {
        fields.push(
          <div key={fullPath} className={`mt-4 mb-2 ${padding}`}>
            <div className="font-semibold text-gray-600 mb-1 text-lg">
              {fieldConfig.label || key}
            </div>
            {renderFields(data, fieldConfig.fields, onChange, fullPath, indentLevel + 1)}
          </div>
        );
        continue;
      }

      if (fieldConfig.type === 'array') {
        const perms = resolvePermissions(fullPath, orderMeta);
        if (!perms.visibleTo.includes(view)) {
          continue;
        }
        
        const editable = perms.editableBy.includes(view) && !perms.readOnlyStages.includes(order.Order_Status);
        
        // Determine the create function based on the array content
        let createNewItem = () => ({});
        if (key === 'Windows' && fieldConfig.itemMeta) {
          createNewItem = createSingleOrDoubleHungWindow;
        }
        
        const ArrayFieldComponent = fieldComponentMap['array'];
        fields.push(
          <div key={fullPath} className={`mt-4 mb-2 ${padding}`}>
            <ArrayFieldComponent
              value={value || []}
              editable={editable}
              label={fieldConfig.label || key}
              itemMeta={fieldConfig.itemMeta}
              createNewItem={createNewItem}
              onChange={(newArray: any[]) => {
                const updated = updateNestedField(order, fullPath, newArray);
                setOrder(updated);
              }}
            />
          </div>
        );
        continue;
      }

      const perms = resolvePermissions(fullPath, orderMeta);
      if (!perms.visibleTo.includes(view)){
      	continue;
      } 



      const editable = perms.editableBy.includes(view) && !perms.readOnlyStages.includes(order.Order_Status);
      const label = fieldConfig.label || key;
      const type = fieldConfig.type;

      const FieldComponent = fieldComponentMap[type];

      if (!FieldComponent) {
        console.warn(`No field component registered for type: ${type}`);
        continue;
      }

      // Handling for vertical splits field to add Save functionality
      if (type === 'vertical_splits_array') {
        // Handle nested path for vertical_splits_saved
        // Replace 'original_vertical_splits' with 'vertical_splits_saved' in the path
        const verticalSplitsSavedPath = fullPath.replace('original_vertical_splits', 'vertical_splits_saved');
        const isVerticalSplitsSaved = getNestedValue(order, verticalSplitsSavedPath);
        
        
        fields.push(
          <div key={`wrapper-${fullPath}`} className={padding}>
            <FieldComponent
              value={value}
              editable={editable}
              label={label}
              options={fieldConfig.options}
              showSaveButton={editable && !isVerticalSplitsSaved}
              onSaveVerticalSplits={() => {
                // Mark vertical splits as saved and trigger horizontal subsections generation
                const updatedOrder = updateNestedField(order, verticalSplitsSavedPath, true);
                setOrder(updatedOrder);
              }}
              onChange={(v: any) => {
                const updated = updateNestedField(order, fullPath, v);
                setOrder(updated);
              }}
            />
          </div>
        );
      } else {
        fields.push(
          <div key={`wrapper-${fullPath}`} className={padding}>
            <FieldComponent
              value={value}
              editable={editable}
              label={label}
              options={fieldConfig.options}
              onChange={(v: any) => {
                const updated = updateNestedField(order, fullPath, v);
                setOrder(updated);
              }}
            />
          </div>
        );
      }


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