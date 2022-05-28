import { configureStore } from "@reduxjs/toolkit";
import VideoReducer from "./features/videos/videoSlice";
import AuthReducer from "./features/auth/authSlice";
export const store = configureStore({
  reducer: {
    video: VideoReducer,
    auth: AuthReducer,
  },
});
