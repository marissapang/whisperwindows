'use client';

import { useState } from 'react';

export default function TestClientPage() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleCreate = async () => {
    const newClient = {
      Client_Id: 'client_test_001',
      First_Name: 'Alice',
      Last_Name: 'Smith',
      Address: {
        address_line_1: '123 Main St',
        address_line_2: 'Apt 4B',
        zip_code: '10001',
      },
    };

    const res = await fetch('/api/clients/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newClient),
    });

    if (res.ok) {
      setStatus('success');
    } else {
      setStatus('error');
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={handleCreate}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Create Test Client
      </button>

      {status === 'success' && <p className="text-green-600 mt-2">Client created!</p>}
      {status === 'error' && <p className="text-red-600 mt-2">Something went wrong.</p>}
    </div>
  );
}
