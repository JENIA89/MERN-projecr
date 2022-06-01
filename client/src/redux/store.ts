import { configureStore } from "@reduxjs/toolkit";
import AuthReDucer from './features/authSlice'

export default configureStore({
  reducer: {
    auth: AuthReDucer
  }
})