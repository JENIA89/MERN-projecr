import * as api  from '../../api/auth';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser } from 'models';
import { toast } from 'react-toastify';


interface AuthState {
  user: IUser | null;
  error: string;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: '',
}

export const login = createAsyncThunk(
  'auth/login',
  // @ts-ignore
  async({formValue, navigate}, {rejectWithValue}) => {
    try {
      const response = await api.signIn(formValue);
      toast.success('Login Successfuly');
      navigate('/');
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
      navigate('/');
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const googleSignIn = createAsyncThunk(
  'auth/googleSignIn',
  // @ts-ignore
  async({result, navigate}, {rejectWithValue}) => {
    try {
      const response = await api.googleSignIn(result);
      toast.success('Google Sign-In Successfuly');
      navigate('/');
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLogout: (state) => {
      localStorage.clear();
      state.user = null;
    },
  },
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
    [googleSignIn.pending.type]: (state) => {
      state.isLoading = true;
    },
    [googleSignIn.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      localStorage.setItem('profile', JSON.stringify({...action.payload}))
      state.user = action.payload;
    },
    [googleSignIn.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
    },
  }
});

export const { setUser, setLogout } = authSlice.actions;

export default authSlice.reducer;