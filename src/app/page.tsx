// src/app/page.tsx
"use client";
import { useState } from 'react';
import { useGetPatientsQuery } from '../features/patients/patientsApi';
import PatientCard from '../components/PatientCard';


export default function HomePage() {
  const { data: patients, isLoading } = useGetPatientsQuery();
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);

   if (isLoading) {
    return <p className="text-center mt-8">Loading patients...</p>;
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
              onClick={() => setSelectedPatientId(patient.id)}
            />
            ))}
        </div>
        </div>
        </div>
       );
       }
