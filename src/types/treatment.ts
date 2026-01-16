export interface Treatment {
  id: number;
  patientId: number;
  type: string;
  date: string;
  notes?: string;
}

// Additional interface for filtering treatments
export interface TreatmentFilter {
  type: string;
  startDate: string;
  endDate: string;
}