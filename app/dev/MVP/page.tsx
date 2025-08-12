'use client';

import { useState } from 'react';
import { createBlankOrder, orderMeta } from '@/app/schemas/createBlankOrder'; // adjust as needed
import { DynamicOrderForm } from '@/app/components/DynamicOrderForm';

export default function MVP() {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState<any>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'loaded' | 'error'>('idle');

  const fetchOrCreateOrder = async () => {
    setStatus('loading');
    const res = await fetch('/api/orders/get', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Order_Id: orderId }),
    });

    const data = await res.json();
    if (data.success) {
      setOrder(data.data);
      setStatus('loaded')
      alert("order loaded");
    } else if (data.error === "Order not found"){
      const newOrder = createBlankOrder();
      setOrder(newOrder)
      setStatus('loaded')
      await fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder),
      });
      alert("new order created!")
    } else {
      setOrder({Order_Id:orderId})
      setStatus('error');
      alert(data.error);
    }
  };



  // top level array push
  const updateArray = (key: string, value: any) => {
    setForm((prev: any) => ({
      ...prev,
      [key]: [...(prev[key]), value],
    }));
  };


  // nested array push
  const updateNestedArray = (path: string, value: any) => {
    setForm((prev: any) => {
      const keys = path.split('.');
      const updated = { ...prev };
      let cursor = updated;

      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        cursor[key] = { ...cursor[key] }; // clone object at each level
        cursor = cursor[key];
      }

      const lastKey = keys[keys.length - 1];
      const currentArray = cursor[lastKey];

      cursor[lastKey] = [...currentArray, value]; // append to existing array

    return updated;
  });
};


  return (
    <div className="p-4">
    	<h1>Get Order</h1>
    	<div className="gap-2 mb-4">
	        <input
	          placeholder="Enter Order ID"
	          value={orderId}
	          onChange={(e) => setOrderId(e.target.value)}
	          className="p-2 border rounded w-full"
	        />
	        <button
	          onClick={fetchOrCreateOrder}
	          className="bg-blue-600 text-white px-4 py-2 rounded"
	        >
	          Load Order
	        </button>

	        {order && (
	        	<div className='block w-100'>
        			<DynamicOrderForm 
        				order={order} 
        				orderMeta={orderMeta} 
        				setOrder={setOrder}
        				view="Client" />
        		</div>
      		)}
      </div>
	</div>
  );
}