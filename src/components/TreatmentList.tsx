'use client';

import { useState } from 'react';
import { useGetTreatmentsQuery } from '../features/patients/patientsApi';

interface TreatmentListProps {
  patientId: number;
}

export default function TreatmentList({ patientId }: TreatmentListProps) {
  const { data: treatments, isLoading, error } = useGetTreatmentsQuery(patientId);
  const [filterType, setFilterType] = useState('');
  const [filterDate, setFilterDate] = useState('');

  console.log('Treatments data:', treatments);
  console.log('Loading treatments:', isLoading);
  console.log('Error treatments:', error);

  if (isLoading) {
    return <p className="text-center">Loading treatments...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error loading treatments</p>;
  }

  const filteredTreatments = treatments?.filter((treatment) => {
    const matchesType = !filterType || 
      treatment.type.toLowerCase().includes(filterType.toLowerCase());
    const matchesDate = !filterDate || 
      new Date(treatment.date).toISOString().startsWith(filterDate);
    
    return matchesType && matchesDate;
  });

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Treatment History</h2>
      
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Filter by type"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border rounded px-3 py-2 flex-1"
        />
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="border rounded px-3 py-2"
        />
      </div>

      {filteredTreatments && filteredTreatments.length > 0 ? (
        <ul className="space-y-2">
          {filteredTreatments.map((treatment) => (
            <li key={treatment.id} className="border rounded-lg p-4 bg-white shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <strong className="text-lg">{treatment.type}</strong>
                <span className="text-gray-600 text-sm">
                  {new Date(treatment.date).toLocaleDateString()}
                </span>
              </div>
              {treatment.notes && (
                <p className="text-gray-700 text-sm">{treatment.notes}</p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center py-8">No treatments found</p>
      )}
    </div>
  );
}