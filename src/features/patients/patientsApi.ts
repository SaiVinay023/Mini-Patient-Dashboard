import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Patient } from '../../types/patient';
import { Treatment } from '../../types/treatment';

export const patientsApi = createApi({
    reducerPath: 'patientsApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    tagTypes: ['Patients', 'Treatments'],
    endpoints: (builder) => ({
        getPatients: builder.query<Patient[], void>({
            query: () => 'patients',
            providesTags: ['Patients'],
        }),
        getTreatments: builder.query<Treatment[], number>({
            query: (patientId) => `patients/${patientId}/treatments`,
            provideTags: (result)   =>
                result
                    ? result.map((t) => ({ type: 'Treatments' as const, id: t.id }))
                    : ['Treatments'],
        }),
    }),
});
export const { useGetPatientsQuery, useGetTreatmentsQuery } = patientsApi;