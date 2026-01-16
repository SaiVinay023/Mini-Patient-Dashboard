'use client';

import { Patient } from '../types/patient';

interface PatientCardProps {
  patient: Patient;
  isSelected?: boolean;
  onClick: () => void;
}

export default function PatientCard({ patient, isSelected, onClick }: PatientCardProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md active:scale-95 min-h-[70px] sm:min-h-[80px] flex flex-col justify-center ${
        isSelected
          ? 'border-blue-500 bg-blue-50 shadow-md'
          : 'border-gray-300 bg-white hover:border-blue-300 hover:bg-blue-50'
      }`}
      aria-pressed={isSelected}
      aria-label={`Select patient ${patient.name}`}
    >
      <h3 className="font-bold text-lg text-gray-800 truncate">{patient.name}</h3>
      <p className="text-gray-600 text-sm mt-1">Age: {patient.age}</p>
      {patient.email && <p className="text-gray-500 text-xs truncate mt-1">{patient.email}</p>}
    </button>
  );
}
