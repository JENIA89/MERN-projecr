import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AuthReducer from './reducers/authSlice';
import TourReducer from './reducers/tourSlice';

const rootReducer = combineReducers({
  auth: AuthReducer,
  tour: TourReducer
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer
  })
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];