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
  async(formValue: ILoginModel) => {
    try {
      const response = await api.signIn(formValue);
      toast.success('Successfuly');
      return response.data
    } catch (error) {
      console.log(error);
      
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
      state.isLoading = true;
      localStorage.setItem('profile', JSON.stringify({...action.payload}))
      state.user = action.payload;
    },
    [login.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
    },
  }
})

export default authSlice.reducer;