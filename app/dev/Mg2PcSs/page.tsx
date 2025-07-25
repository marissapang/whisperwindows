'use client';

import { useState } from 'react';

export default function Mg2PcSs() {
  const [productId, setProductId] = useState('');
  const [form, setForm] = useState<any>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'loaded' | 'error'>('idle');

  const fetchProduct = async () => {
    setStatus('loading');
    const res = await fetch('/api/products/get', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Product_Id: productId }),
    });

    const data = await res.json();
    if (data.success) {
      setForm(data.data);
      setStatus('loaded');
    } else {

      setForm({Product_Id:productId})
      setStatus('error');
      alert(data.error);
    }
  };

  const updateField = (key: string, value: any) => {
    setForm((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  const updateExtensionField = (key: string, value: any) => {
    setForm((prev: any) => ({
      ...prev,
      Extension: {
        ...prev.Extension,
        [key]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    const res = await fetch('/api/products/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    alert(data.success ? 'Product saved.' : 'Failed to save.');
  };

  return (
    <div className="p-4 max-w-md">
      <h1 className="text-xl font-bold mb-4">Magnetic Panel: 2Pc Side-by-Side</h1>

      {/* Load by Product ID */}
      <input
        className="w-full p-2 border mb-2"
        placeholder="Enter Product ID"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
      />
      <button onClick={fetchProduct} className="mb-4 bg-blue-600 text-white px-4 py-2 rounded">
        Load Product
      </button>

      {/* Form Fields */}
      {form && (
        <>
          <br/>
          Order ID
          <input
            className="w-full p-2 border mb-2"
            placeholder="Order ID"
            value={form.Order_Id || ''}
            onChange={(e) => updateField('Order_Id', e.target.value)}
          />
          <br/>Client ID
          <input
            className="w-full p-2 border mb-2"
            placeholder="Client ID"
            value={form.Client_Id || ''}
            onChange={(e) => updateField('Client_Id', e.target.value)}
          />
          <br/>Panel Thickness
          <select
            className="w-full p-2 border mb-2"
            value={form.Panel_Thickness || ''}
            onChange={(e) => updateField('Panel_Thickness', e.target.value)}
          >
            <option value=""></option>
            <option value="1/4in">1/4"</option>
            <option value="3/8in">3/8"</option>
          </select>
          <br/><br/>
          <label className="block mb-1 font-semibold">Frame Extension?</label>
          <select
            className="w-full p-2 border mb-2"
            value={form.Extension?.extension ? 'true' : 'false'}
            onChange={(e) =>
              updateField('Extension', e.target.value === 'true' ? {
                extension: true,
                extension_depth: '',
                current_frame_depth: '',
                extension_type: 'interior',
              } : { extension: false })
            }
          >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>

          <div className="ml-6">
          {form.Extension?.extension && (
            <>
              Extension Depth
              <input
                className="w-full p-2 border mb-2"
                placeholder="Extension Depth"
                type="number"
                value={form.Extension.extension_depth || ''}
                onChange={(e) => updateExtensionField('extension_depth', parseFloat(e.target.value))}
              />
              Current Window Frame Depth
              <input
                className="w-full p-2 border mb-2"
                placeholder="Current Frame Depth"
                type="number"
                value={form.Extension.current_frame_depth ?? ''}
                onChange={(e) => updateExtensionField('current_frame_depth', parseFloat(e.target.value))}
              />
              Extension Method
              <select
                className="w-full p-2 border mb-2"
                value={form.Extension.extension_type || ''}
                onChange={(e) => updateExtensionField('extension_type', e.target.value)}
              >
                <option value="inside">Inside Window Frame</option>
                <option value="around">Around Window Frame</option>
              </select>
            </>
          )}
          </div>

          <br/><div className="font-semibold mb-1">Window Measurements</div>
          <div className="ml-6">
            Min Width Measurement (Inches)
            <input
              className="w-full p-2 border mb-2"
              placeholder="Inches"
              type="number"
              value={form.Min_W || ''}
              onChange={(e) => updateField('Min_W', parseFloat(e.target.value))}
            />
            Min Height Measurement (Inches)
            <input
              className="w-full p-2 border mb-2"
              placeholder="Inches"
              type="number"
              value={form.Min_H || ''}
              onChange={(e) => updateField('Min_H', parseFloat(e.target.value))}
            />
            General Window Eveness
            <select
                className="w-full p-2 border mb-2"
                value={form.Window_Eveness || ''}
                onChange={(e) => updateField('Window_Eveness', e.target.value)}
              >
                <option value=""></option>
                <option value="very_even">Very Even: &lt;3/16" difference between all measurements</option>
                <option value="somewhat_even">Somewhat Even: &lt;3/8" difference between all measurements</option>
                <option value="somewhat_uneven">Uneven: &gt;1/2" difference between some measurements</option>
                <option value="very_uneven">Very Uneven: &gt;1" difference between some measurements</option>
            </select>
            Fit Preference
            <select
                className="w-full p-2 border mb-2"
                value={form.Fit_Preference || ''}
                onChange={(e) => updateField('Fit_Preference', e.target.value)}
              >
                <option value=""></option>
                <option value="tight_fit">Prioritize Tight Fit +1/8" on measurements</option>
                <option value="exact">Use exact inputted measurement</option>
                <option value="minimize_cutting">Minimize Cutting: -1/8" for constrained dimensions</option>

            </select>
          </div>

          {form.Extension?.extension && (
            <>
            <div className="font-semibold mt-4 mb-1">Extension Pieces Calculation</div>
              Extension Material Thickness: 3/4"
              <br/><br/>

              Main Extension Planks Cuts <br/>
              (3/4" Thick x {form.Extension.extension_depth}"" Wide Planks)<br/>
              <div className="ml-6">
                Top: {form.Min_W}"<br/>
                Bottom: {form.Min_W}"<br/>
                Left: {form.Min_H - 0.75*2}"<br/>
                Right: {form.Min_H - 0.75*2}"<br/>
              </div>

              { form.Extension?.current_frame_depth < 1 && (
                <div>
                  <div className="mt-6">
                    Bottom Support for Extension with no support
                  </div>
                  <div> !To be filled in!</div>
                  <div className="mt-6">
                    Side Supports for Frame Extension with no support 
                  </div>
                  <div> !To be filled in!</div>
                </div>
              )}
            </>
          )}

          <div>
            <div className="mt-6 mb-1 font-semibold">
              Metal & Plastic Trim Cuts
            </div>
            <div className="ml-6">
                Top: {form.Min_W}"<br/>
                Bottom: {form.Min_W}"<br/>
                Left: {form.Min_H - 0.75*2}"<br/>
                Right: {form.Min_H - 0.75*2}"<br/>
              </div>
          </div>



          <button onClick={handleSubmit} className="mt-4 bg-green-600 text-white px-4 py-2 rounded">
            Save Product
          </button>
        </>
      )}
    </div>
  );
}
