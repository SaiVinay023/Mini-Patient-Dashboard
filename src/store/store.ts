import { configureStore } from '@reduxjs/toolkit';
import { patientsApi } from '../features/patients/patientsApi';

export const store = configureStore({
    reducer: {
        [patientsApi.reducerPath]: patientsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(patientsApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;