import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FamilyMember {
  id: string;
  name: string;
  mobile: string;
}

interface FamilyState {
  members: FamilyMember[];
}

const initialState: FamilyState = {
  members: [
    { id: '1', name: 'Mom (Demo)', mobile: '9876543210' },
  ],
};

const familySlice = createSlice({
  name: 'family',
  initialState,
  reducers: {
    addMember: (state, action: PayloadAction<{ name: string; mobile: string }>) => {
      const exists = state.members.find(m => m.mobile === action.payload.mobile);
      if (!exists) {
        state.members.push({
          id: Math.random().toString(36).substring(7),
          name: action.payload.name,
          mobile: action.payload.mobile,
        });
      }
    },
    removeMember: (state, action: PayloadAction<string>) => {
      state.members = state.members.filter(m => m.id !== action.payload);
    },
  },
});

export const { addMember, removeMember } = familySlice.actions;
export default familySlice.reducer;
