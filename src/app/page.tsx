// src/app/page.tsx
"use client";
import { useState } from 'react';
import { useGetPatientsQuery } from '../features/patients/patientsApi';
import PatientCard from '../components/PatientCard';
import TreatmentList from '../components/TreatmentList';


export default function HomePage() {
  const { data: patients, isLoading, error } = useGetPatientsQuery();
  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(null);


  if (isLoading) {
    <div className="flex items-center justify-center min-h-screen">
    return <p className="text-center text-gray-600">Loading patients...</p>;
    </div>
  }

  if (error) {
    <div className="flex items-center justify-center min-h-screen">
    return <p className="text-center mt-8 text-red-500 text-lg font-semibold">Error loading patients</p>;
    </div>
  }

  if (!patients || patients.length === 0) {
    <div className="flex items-center justify-center min-h-screen">
    return <p className="text-center text-gray-600 text-lg">No patients found</p>;
    </div>
  }

  return (
  <div className="min-h-screen bg-gray-50 p-6">
    {/* Header */}
    <header className="bg-white shadow-sm sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 sm:py-5 md:px-8 md:py-6">
      <h1 className="text-3xl sm:text-3xl md:text-4xl font-bold text-gray-800">Patient Management System</h1>
      <p className="text-sm sm:text-base text-gray-600 mt-1">
            Dashboard for managing patient data and treatments
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-4 sm:px-6 sm:py-6 md:px-8 md:py-8">
        {/* Grid Layout - Responsive */}
      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:gap-8 lg:grid-cols-3 auto-rows-max md:auto-rows-auto">
        {/* Patients List - Left Column */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg shadow-md p-6 p-4 sm:p-5 md:p-6 h-fit sticky top-24">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Patients</h2>
          {/* Patient List Container - Scrollable */}
          <div className="space-y-2 sm:space-y-3 
                            max-h-[300px] sm:max-h-[400px] 
                            md:max-h-[500px] lg:max-h-[calc(100vh-250px)] 
                            overflow-y-auto pr-2">
            {patients?.map((patient) => (
              <PatientCard
                key={patient.id}
                patient={patient}
                isSelected={selectedPatientId === patient.id}
                onClick={() => setSelectedPatientId(patient.id)}
              />
            ))}
          </div>
        </div>
      </div>
        {/* Treatment List - Right Column */}
        <div className="lg:col-span-2">
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 md:p-6 
                          min-h-[300px] md:min-h-[400px]">
          {selectedPatientId ? (
            <TreatmentList patientId={selectedPatientId} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-12 sm:py-16 md:py-20">
              <p className="text-base sm:text-lg font-semibold text-gray-400 text-center px-4">Select a patient to view their treatment history</p>
            </div>
          )}
        </div>
      </div>
    </div>
      </main>
  </div>
)
}