import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from './settingsSlice';
import authReducer from './authSlice';
import logsReducer from './logsSlice';
import familyReducer from './familySlice';

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    auth: authReducer,
    logs: logsReducer,
    family: familyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

