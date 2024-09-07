import { createSlice } from '@reduxjs/toolkit';
import { candidates, userProfile } from './profileAuth';

const initialState = {
  profile: null, // Holds user profile data
  candidates: [], // Holds candidate data
  loading: false, // Tracks if the request is ongoing
  error: null, // Stores any error message
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(userProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch profile';
      })
      .addCase(candidates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(candidates.fulfilled, (state, action) => {
        state.loading = false;
        state.candidates = action.payload;
      })
      .addCase(candidates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch candidates';
      });
  },
});

export default profileSlice.reducer;
