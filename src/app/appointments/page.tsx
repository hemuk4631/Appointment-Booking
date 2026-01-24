'use client'
import React, { useCallback, useEffect, useState } from 'react';
import Table from '../components/Table';
import { useSession } from 'next-auth/react';
import EditAppointmentModal from '../components/EditAppointmentModal';
import { toast } from 'sonner';

function Appointments() {
  const { data: session } = useSession();
  const [appointments, setAppointments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const fetchAppointments = useCallback(async () => {
    const res = await fetch('/api/appointments');
    const data = await res.json();
    setAppointments(data);
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const handleEdit = useCallback((id: string) => {
    const appointment = appointments.find((a) => a._id === id);
    if (appointment) {
      setSelectedAppointment(appointment);
      setIsModalOpen(true);
    }
  }, [appointments]);

  const handleDelete = useCallback(async (id: string) => {
    if (!confirm('Are you sure?')) return;
    const res = await fetch(`/api/appointments/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setAppointments((prev) => prev.filter((a) => a._id !== id));
      toast.success('Appointment deleted');
    } else {
      toast.error('Failed to delete appointment');
    }
  }, []);

  const handleSave = async (updatedData: any) => {
    const res = await fetch(`/api/appointments/${selectedAppointment._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    });

    if (res.ok) {
      toast.success('Appointment updated');
      fetchAppointments();
    } else {
      toast.error('Failed to update appointment');
    }
  };

  const columns = React.useMemo(
    () => [
      { Header: 'Client', accessor: 'clientName' },
      { Header: 'Email', accessor: 'clientEmail' },
      { Header: 'Phone', accessor: 'clientPhone' },
      {
        Header: 'Date',
        accessor: 'date',
        Cell: ({ value }) => new Date(value).toLocaleDateString(),
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
    [handleDelete, handleEdit, session?.user?.role]
  );

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Appointments</h2>
      <Table data={appointments} columns={columns} />

      <EditAppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        appointment={selectedAppointment}
        onSave={handleSave}
      />
    </div>
  );
}

export default Appointments;
