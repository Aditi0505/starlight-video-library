import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  videos: [],
  categories: [],
  currentVideo: null,
  currentCategory: null,
  searchQuery: "",
  isLoading: true,
};

export const getVideos = createAsyncThunk(
  "videos/getVideos",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/videos");
      return response.data;
    } catch (e) {
      return rejectWithValue("Cannot display videos right now!");
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
      return rejectWithValue(
        "Cannot display categories right now. Please try later!"
      );
    }
  }
);

export const getSingleVideo = createAsyncThunk(
  "videos/getSingleVideo",
  async (videoId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/video/${videoId}`);
      return response.data;
    } catch (e) {
      return rejectWithValue(
        "Cannot display the video right now. Please try later!"
      );
    }
  }
);
const videoSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    setCurrentCategory: (state, { payload }) => {
      state.currentCategory = payload;
    },
    setSearchQuery: (state, { payload }) => {
      state.searchQuery = payload;
    },
  },
  extraReducers: {
    [getVideos.pending]: (state) => {
      state.isLoading = true;
    },
    [getVideos.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.videos = payload.videos;
    },
    [getVideos.rejected]: (state) => {
      state.isLoading = false;
    },
    [getVideoCategories.pending]: (state) => {
      state.isLoading = true;
    },
    [getVideoCategories.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.categories = payload.categories;
    },
    [getVideoCategories.rejected]: (state) => {
      state.isLoading = false;
    },
    [getSingleVideo.pending]: (state) => {
      state.isLoading = true;
    },
    [getSingleVideo.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.currentVideo = payload.video;
    },
    [getSingleVideo.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});
export const { setCurrentCategory, setSearchQuery } = videoSlice.actions;
export default videoSlice.reducer;
