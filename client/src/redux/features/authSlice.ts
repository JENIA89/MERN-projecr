import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface AuthState {
  user: null;
  error: string;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: ''
}

export const login = createAsyncThunk(
  'auth/login',
  async() => {
    try {
      
    } catch (error) {
      console.log(error);
      
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {}
})

export default authSlice.reducer;