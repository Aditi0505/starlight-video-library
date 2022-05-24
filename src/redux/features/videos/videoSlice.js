import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  videos: [],
  categories: [],
  isLoading: true,
};

export const getVideos = createAsyncThunk(
  "videos/getVideos",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/videos");
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

export const getVideoCategories = createAsyncThunk(
  "videos/getVideoCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/categories");
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data);
    }
  }
);

const videoSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {},
  extraReducers: {
    [getVideos.pending]: (state) => {
      state.isLoading = true;
    },
    [getVideos.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.videos = action.payload.videos;
    },
    [getVideos.rejected]: (state) => {
      state.isLoading = false;
    },
    [getVideoCategories.pending]: (state) => {
      state.isLoading = true;
    },
    [getVideoCategories.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.categories = action.payload.categories;
    },
    [getVideoCategories.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default videoSlice.reducer;
