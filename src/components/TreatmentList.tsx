'use client';

import { useState } from 'react';
import { useGetTreatmentsQuery } from '../features/patients/patientsApi';
import { filterTreatments } from '@/utils/filterTreatments';

interface TreatmentListProps {
  patientId: number;
}

export default function TreatmentList({ patientId }: TreatmentListProps) {
  const { data: treatments, isLoading, error } = useGetTreatmentsQuery(patientId);
  const [filterType, setFilterType] = useState('');
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');

  if (isLoading) {
    return <p className="text-center">Loading treatments...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error loading treatments</p>;
  }

const filteredTreatments = filterTreatments(treatments, filterType, filterStartDate, filterEndDate);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Treatment History</h2>
      
      <div className="mb-4 space-y-3">
      <div>
    <label
      htmlFor="filter-type"
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      Filter by treatment type
    </label>
        <input
          id="filter-type"
          type="text"
          placeholder="Search treatments..."
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="w-full border rounded px-3 py-2 flex-1"
          aria-label="Filter treatments by type"
        />
        </div>
      <div>
          <label htmlFor="filter-start-date" className="block text-sm font-medium text-gray-700 mb-1">
            Start Date
          </label>
          <input
            id="filter-start-date"
            type="date"
            value={filterStartDate}
            onChange={(e) => setFilterStartDate(e.target.value)}
            className="border rounded px-3 py-2 text-sm w-full"
            aria-label="Filter treatments by start date"
          />
        </div>

        <div>
          <label htmlFor="filter-end-date" className="block text-sm font-medium text-gray-700 mb-1">
            End Date
          </label>
          <input
            id="filter-end-date"
            type="date"
            value={filterEndDate}
            onChange={(e) => setFilterEndDate(e.target.value)}
            className="border rounded px-3 py-2 text-sm w-full"
            aria-label="Filter treatments by end date"
          />
        </div>

        {(filterType || filterStartDate || filterEndDate) && (
          <button
            onClick={() => {
              setFilterType('');
              setFilterStartDate('');
              setFilterEndDate('');
            }}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Clear Filters
          </button>
        )}
      </div>
    {/* Results */}
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
  <div className="text-center py-10 text-gray-500">
    <p className="font-medium">
      No treatments found
    </p>
    {(filterType || filterStartDate || filterEndDate) ? (
      <p className="text-sm mt-2">
        Try clearing or adjusting your filters.
      </p>
    ) : (
      <p className="text-sm mt-2">
        This patient has no treatment history yet.
      </p>
    )}
  </div>
)}
    </div>
  );
}