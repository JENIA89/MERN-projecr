import * as api  from '../../api/auth';
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILoginModel } from 'models';
import { toast } from 'react-toastify';


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
  // @ts-ignore
  async({formValue, navigate}, {rejectWithValue}) => {
    try {
      const response = await api.signIn(formValue);
      toast.success('Login Successfuly');
      navigate('/')
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const register = createAsyncThunk(
  'auth/register',
  // @ts-ignore
  async({formValue, navigate}, {rejectWithValue}) => {
    try {
      const response = await api.signUp(formValue);
      toast.success('Register Successfuly');
      navigate('/')
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [login.pending.type]: (state) => {
      state.isLoading = true;
    },
    [login.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      localStorage.setItem('profile', JSON.stringify({...action.payload}))
      state.user = action.payload;
    },
    [login.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
    },
    [register.pending.type]: (state) => {
      state.isLoading = true;
    },
    [register.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      localStorage.setItem('profile', JSON.stringify({...action.payload}))
      state.user = action.payload;
    },
    [register.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
    },
  }
})

export default authSlice.reducer;