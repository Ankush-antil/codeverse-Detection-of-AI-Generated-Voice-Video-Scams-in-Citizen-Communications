import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { registerUserAPI } from '../services/api';

interface AuthState {
  isRegistered: boolean;
  mobile: string | null;
  name: string | null;
  mongoId: string | null;
}

const initialState: AuthState = {
  isRegistered: false,
  mobile: null,
  name: null,
  mongoId: null,
};

// Async thunk — calls MongoDB API, then updates local state
export const registerUserAsync = createAsyncThunk(
  'auth/registerUserAsync',
  async (payload: { name: string; mobile: string; language?: string }) => {
    const result = await registerUserAPI(payload);
    return { ...payload, mongoId: result.user?.id || null };
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerUser: (state, action: PayloadAction<{ name: string; mobile: string }>) => {
      state.isRegistered = true;
      state.name = action.payload.name;
      state.mobile = action.payload.mobile;
    },
    logout: (state) => {
      state.isRegistered = false;
      state.name = null;
      state.mobile = null;
      state.mongoId = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUserAsync.fulfilled, (state, action) => {
      state.isRegistered = true;
      state.name = action.payload.name;
      state.mobile = action.payload.mobile;
      state.mongoId = action.payload.mongoId;
    });
    // Even if API fails, still register locally so app isn't blocked
    builder.addCase(registerUserAsync.rejected, (state, action) => {
      state.isRegistered = true;
      state.name = action.meta.arg.name;
      state.mobile = action.meta.arg.mobile;
    });
  },
});

export const { registerUser, logout } = authSlice.actions;
export default authSlice.reducer;

