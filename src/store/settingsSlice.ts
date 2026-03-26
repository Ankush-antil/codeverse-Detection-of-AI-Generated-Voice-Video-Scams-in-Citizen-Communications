import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  language: string;
  isDarkMode: boolean;
  offlineMode: boolean;
  protectionActive: boolean;
}

const initialState: SettingsState = {
  language: 'en',
  isDarkMode: true,
  offlineMode: false,
  protectionActive: true,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    setOfflineMode: (state, action: PayloadAction<boolean>) => {
      state.offlineMode = action.payload;
    },
    toggleProtection: (state) => {
      state.protectionActive = !state.protectionActive;
    },
  },
});

export const { setLanguage, toggleTheme, setOfflineMode, toggleProtection } = settingsSlice.actions;
export default settingsSlice.reducer;
