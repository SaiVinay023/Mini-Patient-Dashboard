' use client';
import React from 'react';
import { Patient } from '../types/patient';

interface PatientCardProps {
  patient: Patient;
  onClick?: () => void;
}

export default function PatientCard({ patient, onClick }: PatientCardProps) {
    return (
    <div
      onClick={onClick}
      className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
    >
      <h3 className="font-semibold text-lg">{patient.name}</h3>
      <p className="text-gray-600 text-sm">Age: {patient.age}</p>
      {patient.email && <p className="text-gray-600 text-sm">{patient.email}</p>}
    </div>
  );
}
