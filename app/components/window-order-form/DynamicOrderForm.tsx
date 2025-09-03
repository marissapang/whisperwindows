'use client';

import { useState, useRef, useCallback } from 'react';
import { fieldComponentMap } from './fields-generic';
import { createBlankWindowObject } from './libs/constructors';
import { prepareOrderForDatabase } from './libs/db_update';


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
	
	// Auto-save state management
	const [saveStatus, setSaveStatus] = useState<'idle' | 'pending' | 'saving' | 'saved' | 'error'>('idle');
	const blurCountRef = useRef(0);
	const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const BLUR_THRESHOLD = 3;

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

	// Auto-save functionality
	const handleAutoSave = useCallback(async () => {
		setSaveStatus('saving');
		
		try {
			const processedOrder = prepareOrderForDatabase(order);
			
			const res = await fetch('/api/orders/create', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(processedOrder),
			});
			
			const data = await res.json();
			
			if (data.success) {
				setSaveStatus('saved');
			} else {
				console.error('Auto-save error:', data.error);
				setSaveStatus('error');
			}
		} catch (err) {
			console.error('Auto-save unexpected error:', err);
			setSaveStatus('error');
		}
	}, [order]);
	
	const handleFieldBlur = useCallback(() => {
		blurCountRef.current += 1;
		
		// Show pending state immediately on first blur
		if (blurCountRef.current === 1) {
			setSaveStatus('pending');
		}
		
		if (blurCountRef.current >= BLUR_THRESHOLD) {
			blurCountRef.current = 0;
			handleAutoSave();
		}
	}, [handleAutoSave]);
	
	const handleFieldFocus = useCallback(() => {
		// Reset save status when user clicks into a field
		if (saveStatus === 'saved') {
			setSaveStatus('idle');
			blurCountRef.current = 0; // Reset blur count when user starts editing again
		}
		
		// Clear any pending save timeout
		if (saveTimeoutRef.current) {
			clearTimeout(saveTimeoutRef.current);
			saveTimeoutRef.current = null;
		}
	}, [saveStatus]);
	
	const handleFieldChange = useCallback(() => {
		// This is called on every change but we don't reset status here
		// Only reset when user clicks into field
	}, []);

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

      const perms = resolvePermissions(fullPath, orderMeta);
      if (!perms.visibleTo.includes(view)){
        continue;
      } 

      const editable = perms.editableBy.includes(view) && !perms.readOnlyStages.includes(order.Order_Status);

      if (fieldConfig.type === 'window_object_array') {
        const WindowObjectArrayContainer = fieldComponentMap['window_object_array'];
        fields.push(
          <div key={fullPath} className={`mt-4 mb-2 ${padding}`}>
            <WindowObjectArrayContainer
              value={value || []}
              editable={editable}
              label={fieldConfig.label || key}
              itemMeta={fieldConfig.itemMeta}
              createNewItem={createBlankWindowObject}
              onChange={(newArray: any[]) => {
                handleFieldChange();
                const updated = updateNestedField(order, fullPath, newArray);
                setOrder(updated);
              }}
              onBlur={handleFieldBlur}
              onFocus={handleFieldFocus}
            />
          </div>
        );
        continue;
      }


      
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
                handleFieldChange();
                const updated = updateNestedField(order, fullPath, v);
                setOrder(updated);
              }}
              onBlur={handleFieldBlur}
              onFocus={handleFieldFocus}
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
                handleFieldChange();
                const updated = updateNestedField(order, fullPath, v);
                setOrder(updated);
              }}
              onBlur={handleFieldBlur}
              onFocus={handleFieldFocus}
            />
          </div>
        );
      }


    }

    return fields;
  };

	return (
		<div className="relative">
			{/* Auto-save indicator */}
			<div className="fixed top-4 right-4 z-50">
				{saveStatus === 'saving' && (
					<div className="bg-white border border-gray-200 rounded-lg shadow-lg px-4 py-2 flex items-center gap-2">
						<div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
						<span className="text-sm text-gray-700">Saving...</span>
					</div>
				)}
				
				{saveStatus === 'saved' && (
					<div className="bg-white border border-green-200 rounded-lg shadow-lg px-4 py-2 flex items-center gap-2">
						<div className="rounded-full h-4 w-4 bg-green-500 flex items-center justify-center">
							<svg className="h-2.5 w-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
								<path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
							</svg>
						</div>
						<span className="text-sm text-green-700">Saved</span>
					</div>
				)}
				
				{saveStatus === 'error' && (
					<div className="bg-white border border-red-200 rounded-lg shadow-lg px-4 py-2 flex items-center gap-2">
						<div className="rounded-full h-4 w-4 bg-red-500 flex items-center justify-center">
							<svg className="h-2.5 w-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
								<path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
							</svg>
						</div>
						<span className="text-sm text-red-700">Save failed</span>
						<button 
							onClick={() => setSaveStatus('idle')}
							className="ml-2 text-xs text-red-600 hover:text-red-800"
						>
							×
						</button>
					</div>
				)}
			</div>
			
		<form>
		{renderFields(order, orderMeta, (path, value) => {
			handleFieldChange();
			setOrder((prev) => updateNestedField(prev, path, value));
		})}
		<button 
			type="button"
			className={`px-4 py-2 rounded text-white font-medium ${
				status === 'success' ? 'bg-green-600' : 'bg-black'
			}`}
			onClick={handleSave}
			disabled={status === 'saving'}>
			{status === 'success' ? 'Submitted' : status === 'saving' ? 'Submitting...' : 'Submit'}
		</button>
		</form>
		</div>
		)}