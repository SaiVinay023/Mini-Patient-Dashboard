import { Treatment } from '@/types/treatment';

export function filterTreatments(
  treatments: Treatment[] | undefined,
  typeFilter: string,
  startDateFilter: string,
  endDateFilter: string
): Treatment[] {
  if (!treatments) return [];

  return treatments.filter((treatment) => {
    const matchesType =
      !typeFilter ||
      treatment.type.toLowerCase().includes(typeFilter.toLowerCase());

    const treatmentDate = new Date(treatment.date).toISOString().split('T')[0];
    const matchesStartDate = !startDateFilter || treatmentDate >= startDateFilter;

    const matchesEndDate = !endDateFilter || treatmentDate <= endDateFilter;

    return matchesType && matchesStartDate && matchesEndDate;
  });
}
