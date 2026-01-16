'use client';

import { Patient } from '../types/patient';

interface PatientCardProps {
  patient: Patient;
  isSelected?: boolean;
  onClick: () => void;
}

export default function PatientCard({ patient, isSelected, onClick }: PatientCardProps) {
  return (
    <div
      onClick={onClick}
      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
        isSelected
          ? 'bg-blue-50 border-blue-500'
          : 'hover:bg-gray-50 border-gray-300'
      }`}
    >
      <h3 className="font-semibold text-lg">{patient.name}</h3>
      <p className="text-gray-600 text-sm">Age: {patient.age}</p>
      {patient.email && <p className="text-gray-600 text-sm">{patient.email}</p>}
    </div>
  );
}