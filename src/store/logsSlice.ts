import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LogEntry {
  id: string;
  type: 'Call' | 'WhatsApp Audio' | 'Video';
  result: 'AI' | 'HUMAN';
  confidence: number;
  timestamp: number;
}

interface LogsState {
  history: LogEntry[];
}

const initialState: LogsState = {
  history: [],
};

const logsSlice = createSlice({
  name: 'logs',
  initialState,
  reducers: {
    addLog: (state, action: PayloadAction<Omit<LogEntry, 'id' | 'timestamp'>>) => {
      state.history.unshift({
        ...action.payload,
        id: Math.random().toString(36).substring(7),
        timestamp: Date.now(),
      });
    },
    clearLogs: (state) => {
      state.history = [];
    },
  },
});

export const { addLog, clearLogs } = logsSlice.actions;
export default logsSlice.reducer;
