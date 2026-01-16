// src/app/page.tsx
"use client";
import { useState } from 'react';
import { useGetPatientsQuery } from '../features/patients/patientsApi';
import PatientCard from '../components/PatientCard';
import TreatmentList from '../components/TreatmentList';


export default function HomePage() {
  const { data: patients, isLoading, error } = useGetPatientsQuery();
  const [selectedPatientId, setSelectedPatientId] = useState<number | null>(null);

  console.log('Patients data:', patients);
  console.log('Loading:', isLoading);
  console.log('Error:', error);

  if (isLoading) {
    return <p className="text-center mt-8">Loading patients...</p>;
  }

  if (error) {
    return <p className="text-center mt-8 text-red-500">Error loading patients</p>;
  }

  if (!patients || patients.length === 0) {
    return <p className="text-center mt-8">No patients found</p>;
  }

  return (
  <div className="min-h-screen bg-gray-50 p-6">
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Patient Management System</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left side - Patients (1/3 width) */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6 h-fit">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Patients</h2>
          <div className="space-y-3 max-h-[calc(100vh-250px)] overflow-y-auto pr-2">
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

        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6 min-h-[calc(100vh-250px)]">
          {selectedPatientId ? (
            <TreatmentList patientId={selectedPatientId} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <svg
                className="w-16 h-16 mb-4 opacity-40"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <p className="text-lg font-semibold">Select a patient to view their treatment history</p>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);