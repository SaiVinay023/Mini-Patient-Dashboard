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
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-1/3">
        <h2 className="text-xl font-bold mb-4">Patients</h2>
        <div className="space-y-2">
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
        <div className="md:w-2/3">
          {selectedPatientId ? (
            <TreatmentList patientId={selectedPatientId} />
          ) : (
            <p className="text-gray-500 text-center mt-8">
              Select a patient to view their treatment history
            </p>
          )}
        </div>
        </div>
       );
       }
