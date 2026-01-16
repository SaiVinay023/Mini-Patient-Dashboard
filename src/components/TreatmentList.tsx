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
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-gray-600">Loading treatments...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-red-600 font-semibold">Error loading treatments</p>
      </div>
    )
  }

const filteredTreatments = filterTreatments(treatments, filterType, filterStartDate, filterEndDate);
const hasFilters = filterType || filterStartDate || filterEndDate;


  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
    <div>
      <h2 className="text-xl font-bold mb-4 text-gray-900">Treatment History</h2>
      <p className="text-xs sm:text-sm text-gray-600 mt-1">
          Total: {filteredTreatments?.length || 0} treatments
        </p>
    </div>

    {/* Filter- Responsive Grid */}

    <div className="space-y-3 sm:space-y-4 p-4 sm:p-5 bg-gray-50 rounded-lg border border-gray-200">
        <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3">
          {/* Filter by Type */}
          <div className="md:col-span-1">
            <label
              htmlFor="filter-type"
              className="block text-xs sm:text-sm font-medium text-gray-700 mb-2"
            >
              Filter by Type
            </label>
            <input
              id="filter-type"
              type="text"
              placeholder="Search treatments..."
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-3 py-2 sm:py-2.5 text-sm border border-gray-300 
                        rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                        transition-colors"
              aria-label="Filter treatments by type"
            />
          </div>

          {/* Filter by Start Date */}
          <div className="md:col-span-1">
            <label
              htmlFor="filter-start-date"
              className="block text-xs sm:text-sm font-medium text-gray-700 mb-2"
            >
              Start Date
            </label>
            <input
              id="filter-start-date"
              type="date"
              value={filterStartDate}
              onChange={(e) => setFilterStartDate(e.target.value)}
              className="w-full px-3 py-2 sm:py-2.5 text-sm border border-gray-300 
                        rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                        transition-colors"
              aria-label="Filter treatments by start date"
            />
          </div>

          {/* Filter by End Date */}
          <div className="md:col-span-1">
            <label
              htmlFor="filter-end-date"
              className="block text-xs sm:text-sm font-medium text-gray-700 mb-2"
            >
              End Date
            </label>
            <input
              id="filter-end-date"
              type="date"
              value={filterEndDate}
              onChange={(e) => setFilterEndDate(e.target.value)}
              className="w-full px-3 py-2 sm:py-2.5 text-sm border border-gray-300 
                        rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                        transition-colors"
              aria-label="Filter treatments by end date"
            />
          </div>
        </div>

        {/* Clear Filters Button */}
        {hasFilters && (
          <button
            onClick={() => {
              setFilterType('')
              setFilterStartDate('')
              setFilterEndDate('')
            }}
            className="w-full md:w-auto px-3 py-2 text-xs sm:text-sm 
                      text-blue-600 hover:text-blue-800 font-medium 
                      bg-white border border-blue-300 rounded-lg
                      hover:bg-blue-50 transition-colors"
            aria-label="Clear all filters"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Results */}
      {filteredTreatments && filteredTreatments.length > 0 ? (
        <div className="space-y-2 sm:space-y-3">
          {filteredTreatments.map((treatment) => (
            <div
              key={treatment.id}
              className="border border-gray-200 rounded-lg p-3 sm:p-4 md:p-5 
                        bg-white hover:shadow-md transition-shadow 
                        hover:border-gray-300"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-4 mb-2">
                <strong className="text-base sm:text-lg text-gray-900 break-words">
                  {treatment.type}
                </strong>
                <span className="text-gray-600 text-xs sm:text-sm whitespace-nowrap">
                  {new Date(treatment.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>
              {treatment.notes && (
                <p className="text-gray-700 text-xs sm:text-sm leading-relaxed">
                  {treatment.notes}
                </p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 sm:py-16 text-gray-500">
          <p className="font-medium text-base sm:text-lg">
            {hasFilters ? 'No treatments match your filters' : 'No treatment history found'}
          </p>
          {hasFilters && (
            <p className="text-xs sm:text-sm mt-2">
              Try clearing or adjusting your filters.
            </p>
          )}
        </div>
      )}
    </div>
  )
}