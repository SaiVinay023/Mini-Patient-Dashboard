import { configureStore } from '@reduxjs/toolkit';
import { PatientsApi } from '../features/patients/patientsApi';

export const store = configureStore({
    reducer: {
        [PatientsApi.reducerPath]: PatientsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(PatientsApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;