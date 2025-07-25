'use client';

import { useState } from 'react';

export default function FrameTest() {
  const [productId, setProductId] = useState('');
  const [form, setForm] = useState<any>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'loaded' | 'error'>('idle');

  const fetchProduct = async () => {
    console.log("inside fetch product, productId is")
    console.log(productId)
    setStatus('loading');
    const res = await fetch('/api/products/get', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Product_Id: productId }),
    });

    const data = await res.json();
    if (data.success) {
      console.log("data fetch success")
      setForm(data.data);
      setStatus('loaded');
    } else {

      setForm({Product_Id:productId})
      console.log("data fetch failure")
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
    console.log("inside handle submit")
    console.log("this is the form data")
    console.log(form)
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
      <h1 className="text-xl font-bold mb-4">Magnetic Panel</h1>

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
          <input
            className="w-full p-2 border mb-2"
            placeholder="Order ID"
            value={form.Order_Id || ''}
            onChange={(e) => updateField('Order_Id', e.target.value)}
          />
          <input
            className="w-full p-2 border mb-2"
            placeholder="Client ID"
            value={form.Client_Id || ''}
            onChange={(e) => updateField('Client_Id', e.target.value)}
          />
          <input
            className="w-full p-2 border mb-2"
            placeholder="W1"
            type="number"
            value={form.W1 || ''}
            onChange={(e) => updateField('W1', parseFloat(e.target.value))}
          />
          <input
            className="w-full p-2 border mb-2"
            placeholder="H1"
            type="number"
            value={form.H1 || ''}
            onChange={(e) => updateField('H1', parseFloat(e.target.value))}
          />

          <label className="block mb-1 font-semibold">Extension?</label>
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

          {form.Extension?.extension && (
            <>
              <input
                className="w-full p-2 border mb-2"
                placeholder="Extension Depth"
                type="number"
                value={form.Extension.extension_depth || ''}
                onChange={(e) => updateExtensionField('extension_depth', parseFloat(e.target.value))}
              />
              <input
                className="w-full p-2 border mb-2"
                placeholder="Current Frame Depth"
                type="number"
                value={form.Extension.current_frame_depth || ''}
                onChange={(e) => updateExtensionField('current_frame_depth', parseFloat(e.target.value))}
              />
              <select
                className="w-full p-2 border mb-2"
                value={form.Extension.extension_type || ''}
                onChange={(e) => updateExtensionField('extension_type', e.target.value)}
              >
                <option value="interior">Interior</option>
                <option value="exterior">Exterior</option>
              </select>
            </>
          )}

          <button onClick={handleSubmit} className="mt-4 bg-green-600 text-white px-4 py-2 rounded">
            Save Product
          </button>
        </>
      )}
    </div>
  );
}
