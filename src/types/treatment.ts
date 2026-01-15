export interface Treatment {
  id: number;
  patientId: number;
  type: string;
  date: string;
  notes?: string;
}
