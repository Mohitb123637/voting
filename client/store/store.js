import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import profileReducer from './profile/profileSlice';
import candidateReducer from './candidate/candidateSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    candidate: candidateReducer,
  },
});
