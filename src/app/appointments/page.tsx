'use client'
import React, { useCallback, useEffect, useState } from 'react';
import Table from '../components/Table';

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const handleEdit = useCallback((id: string) => {
    console.log('Edit', id);
    // Route to form or open modal
  },[]);

  const handleDelete = useCallback(async (id: string) => {
    if (!confirm('Are you sure?')) return;
    await fetch(`/api/appointments/${id}`, { method: 'DELETE' });
    setAppointments((prev) => prev.filter((a) => a._id !== id));
  },[]);
  const columns = React.useMemo(
    () => [
      { Header: 'Client', accessor: 'clientName' },
      { Header: 'Email', accessor: 'clientEmail' },
      { Header: 'Phone', accessor: 'clientPhone' },
      {
        Header: 'Date',
        accessor: (row) => new Date(row.date).toLocaleDateString(),
        id: 'date',
      },
      { Header: 'Time', accessor: 'time' },
      { Header: 'Service', accessor: 'service' },
      { Header: 'Notes', accessor: 'notes' },
      {
        Header: 'Actions',
        id: 'actions',
        Cell: ({ row }) => (
          <div className="space-x-2">
            <button
              onClick={() => handleEdit(row.original._id)}
              className="text-blue-600 hover:underline"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(row.original._id)}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    [handleDelete, handleEdit]
  );
  
  useEffect(() => {
    fetch('/api/appointments')
      .then((res) => res.json())
      .then(setAppointments);
  }, []);

 

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Appointments</h2>
      <Table data={appointments} onEdit={handleEdit} onDelete={handleDelete} columns={columns} />
    </div>
  );
}

export default Appointments;
