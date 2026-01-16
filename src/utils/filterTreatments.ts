import { Treatment } from '@/types/treatment';

export function filterTreatments(
  treatments: Treatment[] | undefined,
  typeFilter: string,
  dateFilter: string
): Treatment[] {
  if (!treatments) return [];

  return treatments.filter((treatment) => {
    const matchesType =
      !typeFilter ||
      treatment.type.toLowerCase().includes(typeFilter.toLowerCase());

    const matchesDate =
      !dateFilter ||
      new Date(treatment.date).toISOString().startsWith(dateFilter);

    return matchesType && matchesDate;
  });
}
