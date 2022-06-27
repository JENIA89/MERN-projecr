import { ITour } from '../../models';
import * as api  from '../../api/tour';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';


interface TourState {
  tour: ITour | any;
  tours: Array<any>;
  userTours: Array<ITour>;
  tagTours: Array<any>;
  currentPage: number;
  numberOfPages: number;
  error: string;
  isLoading: boolean;
}

const initialState: TourState = {
  tour: {},
  tours: [],
  userTours: [],
  tagTours: [],
  currentPage: 1,
  numberOfPages: 0,
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

export const getTour = createAsyncThunk(
  'tour/getTour',
  // @ts-ignore
  async(id: string, {rejectWithValue}) => {
    try {
      const response = await api.getTour(id);
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const getTours = createAsyncThunk(
  'tour/getTours',
  // @ts-ignore
  async(page: string, {rejectWithValue}) => {
    try {
      const response = await api.getTours(page);
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const getToursByUser = createAsyncThunk(
  'tour/getToursByUser',
  // @ts-ignore
  async(userId: string, {rejectWithValue}) => {
    try {
      const response = await api.getToursByUser(userId);
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const deleteTour = createAsyncThunk(
  'tour/deleteTour',
  // @ts-ignore
  async(userId: string, {rejectWithValue}) => {
    try {
      const response = await api.deleteTour(userId);
      toast.success('Tour Deleted Successfuly');
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const updateTour = createAsyncThunk(
  "tour/updateTour",
  // @ts-ignore
  async ({id, updateTourData, navigate}, { rejectWithValue }) => {
    try {
      const response = await api.updateTour(id, updateTourData);
      toast.success("Tour Updated Successfully");
      navigate("/");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const searchTours = createAsyncThunk(
  "tour/searchTours",
  // @ts-ignore
  async (querySearch: string, { rejectWithValue }) => {
    try {
      const response = await api.getToursBySearch(querySearch);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getToursByTag = createAsyncThunk(
  "tour/getToursByTag",
  // @ts-ignore
  async (tag: string, { rejectWithValue }) => {
    try {
      const response = await api.getToursByTag(tag);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const likeTour = createAsyncThunk(
  'tour/likeTour',
  // @ts-ignore
  async({ _id }, {rejectWithValue}) => {
    try {
      const response = await api.likeTour(_id);
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
)

const tourSlice = createSlice({
  name: 'tour',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    }
  },
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
      state.tours = action.payload.data;
      state.numberOfPages = action.payload.numberOfPages;
      state.currentPage = action.payload.currentPage;
    },
    [getTours.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
    },
    [getTour.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getTour.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.tour = action.payload;
    },
    [getTour.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
    },
    [getToursByUser.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getToursByUser.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.userTours = action.payload;
    },
    [getToursByUser.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
    },
    [deleteTour.pending.type]: (state) => {
      state.isLoading = true;
    },
    [deleteTour.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      const { arg } = action.meta
      state.userTours = state.userTours.filter(item => item._id !== arg);
      state.tours = state.tours.filter(item => item._id !== arg);
    },
    [deleteTour.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
    },
    [updateTour.pending.type]: (state) => {
      state.isLoading = true;
    },
    [updateTour.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      const { id } = action.meta.arg;
      
      if (id) {
        state.userTours = state.userTours.map((item) =>
          item._id === id ? action.payload : item
        );
        state.tours = state.tours.map((item) =>
          item._id === id ? action.payload : item
        );
      }
    },
    [updateTour.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
    },
    [searchTours.pending.type]: (state) => {
      state.isLoading = true;
    },
    [searchTours.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.tours = action.payload;
    },
    [searchTours.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
    },
    [getToursByTag.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getToursByTag.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.tagTours = action.payload;
    },
    [getToursByTag.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
    },
    [likeTour.pending.type]: (state) => {},
    [likeTour.fulfilled.type]: (state, action) => {
      const { _id } = action.meta.arg;
      if (_id) {
        state.tours = state.tours.map((item) =>
          item._id === _id ? action.payload : item
        );
      }
    },
    [likeTour.rejected.type]: (state, action) => {
      state.error = action.payload.message;
    },
  }
})

export const { setCurrentPage } = tourSlice.actions;

export default tourSlice.reducer;