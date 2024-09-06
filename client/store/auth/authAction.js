import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosConfig from '../../axiosConfig';

export const registerUser = createAsyncThunk(
  'user/signup',
  async (
    { name, age, email, mobile, address, adharCardNumber, password, role },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosConfig.post('/user/signup', {
        name,
        age,
        email,
        mobile,
        address,
        password,
        adharCardNumber,
        role,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue({
        error: error.response.data
          ? error.response.data.message
          : error.message,
      });
    }
  }
);
export const loginUser = createAsyncThunk(
  'user/login',
  async ({ adharCardNumber, password }, { rejectWithValue }) => {
    try {
      const response = await axiosConfig.post('/user/login', {
        password,
        adharCardNumber,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue({
        error: error.response.data
          ? error.response.data.message
          : error.message,
      });
    }
  }
);
