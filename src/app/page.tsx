// src/app/page.tsx
"use client";
import { useState } from 'react';

type Patient = {
  id: string;
  name: string;
  age: number;
};

// Temporary mock data until API is connected
const mockPatients: Patient[] = [
  { id: '1', name: 'John Doe', age: 30 },
  { id: '2', name: 'Jane Smith', age: 25 },
  { id: '3', name: 'Alice Johnson', age: 40 },
];

export default function HomePage() {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Mini Patient Dashboard</h1>

      {!selectedPatient ? (
        <>
          <h2>Patients</h2>
          <ul>
            {mockPatients.map((patient) => (
              <li
                key={patient.id}
                style={{ cursor: 'pointer', marginBottom: '0.5rem' }}
                onClick={() => setSelectedPatient(patient)}
              >
                {patient.name} - Age {patient.age}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <>
          <button onClick={() => setSelectedPatient(null)}>Back to Patients</button>
          <h2>{selectedPatient.name}'s Treatments</h2>
          <ul>
            <li>Cleaning - 2025-01-10</li>
            <li>Filling - 2025-01-15</li>
            <li>Checkup - 2025-01-20</li>
          </ul>
        </>
      )}
    </div>
  );
}
