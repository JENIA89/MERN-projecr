import * as api  from '../../api/tour';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import { ITour } from 'models';

interface TourState {
  tour: ITour | {},
  tours: Array<any>,
  userTour: Array<any>,
  error: string,
  isLoading: boolean,
}

const initialState: TourState = {
  tour: {},
  tours: [],
  userTour: [],
  error: '',
  isLoading: false,
}

export const createTour = createAsyncThunk(
  'tour/createTour',
  // @ts-ignore
  async({updateTourData, navigate}, {rejectWithValue}) => {
    try {
      const response = await api.createTour(updateTourData);
      toast.success('Tour Added Successfuly');
      navigate('/');
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const getTours = createAsyncThunk(
  'tour/getTours',
  // @ts-ignore
  async(_, {rejectWithValue}) => {
    try {
      const response = await api.getTours();
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
)

const tourSlice = createSlice({
  name: 'tour',
  initialState,
  reducers: {},
  extraReducers: {
    [createTour.pending.type]: (state) => {
      state.isLoading = true;
    },
    [createTour.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.tours = [action.payload];
    },
    [createTour.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
    },
    [getTours.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getTours.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.tours = action.payload;
    },
    [getTours.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
    },
  }
})

export default tourSlice.reducer;