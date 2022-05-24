import { configureStore } from "@reduxjs/toolkit";
import VideoReducer from "./features/videos/videoSlice";
export const store = configureStore({
  reducer: {
    video: VideoReducer,
  },
});
