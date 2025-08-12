'use client';

import { useState } from 'react';
import { createBlankOrder, orderMeta } from '@/app/schemas/createBlankOrder'; // adjust as needed
import { DynamicOrderForm } from '@/app/components/DynamicOrderForm';

export default function MVP() {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState<any>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'loaded' | 'error' | 'not-found'>('idle');
  const [view, setView] = useState<'Client' | 'Sales' | 'Manufacturer' | 'Installer'>('Client');
  const [errorMessage, setErrorMessage] = useState('');

  const lookupOrder = async () => {
    if (!orderId.trim()) {
      setErrorMessage('Please enter an Order ID');
      return;
    }
    
    setStatus('loading');
    setErrorMessage('');
    const res = await fetch('/api/orders/get', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Order_Id: orderId }),
    });

    const data = await res.json();
    if (data.success) {
      setOrder(data.data);
      setStatus('loaded');
      alert("Order loaded successfully!");
    } else if (data.error === "Order not found") {
      setStatus('not-found');
      setErrorMessage('This order does not exist.');
    } else {
      setStatus('error');
      setErrorMessage(data.error || 'An error occurred while loading the order.');
    }
  };

  const createNewOrder = async () => {
    setStatus('loading');
    setErrorMessage('');
    const newOrder = createBlankOrder();
    setOrder(newOrder);
    setOrderId(newOrder.Order_Id);
    setStatus('loaded');
    
    await fetch('/api/orders/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newOrder),
    });
    alert("New order created!");
  };



  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Order Management</h1>
      
      {/* Order Lookup Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Look Up Existing Order</h2>
        <div className="flex gap-2 mb-2">
          <input
            placeholder="Enter Order ID"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="p-2 border rounded flex-1"
          />
          <button
            onClick={lookupOrder}
            disabled={status === 'loading'}
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {status === 'loading' ? 'Loading...' : 'Look Up Order'}
          </button>
        </div>
        {errorMessage && (
          <p className="text-red-600 text-sm">{errorMessage}</p>
        )}
      </div>

      {/* Create New Order Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Create New Order</h2>
        <button
          onClick={createNewOrder}
          disabled={status === 'loading'}
          className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {status === 'loading' ? 'Creating...' : 'Create New Order'}
        </button>
      </div>

      {/* View Selection and Order Form */}
      {order && status === 'loaded' && (
        <div className="border-t pt-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Select View</h3>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setView('Client')}
                className={`px-3 py-1 rounded ${view === 'Client' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                Client View
              </button>
              <button
                onClick={() => setView('Sales')}
                className={`px-3 py-1 rounded ${view === 'Sales' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                Sales View
              </button>
              <button
                onClick={() => setView('Manufacturer')}
                className={`px-3 py-1 rounded ${view === 'Manufacturer' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                Manufacturer View
              </button>
              <button
                onClick={() => setView('Installer')}
                className={`px-3 py-1 rounded ${view === 'Installer' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                Installer View
              </button>
            </div>
          </div>
          
          <div className="block w-full">
            <DynamicOrderForm 
              order={order} 
              orderMeta={orderMeta} 
              setOrder={setOrder}
              view={view} 
            />
          </div>
        </div>
      )}
    </div>
  );
}