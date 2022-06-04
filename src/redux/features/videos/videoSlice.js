import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  videos: [],
  categories: [],
  history: [],
  currentCategory: null,
  searchQuery: "",
  isLoading: false,
  videoNotes: { notes: null, isDisabled: false },
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

export const postHistory = createAsyncThunk(
  "history/postHistory",
  async (video, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/user/history",
        { video },
        {
          headers: {
            authorization: localStorage.getItem("login-token"),
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue("Cannot add video to the history right now!");
    }
  }
);

export const removeFromHistory = createAsyncThunk(
  "history/removeFromHistory",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/user/history/${id}`, {
        headers: {
          authorization: localStorage.getItem("login-token"),
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue("Cannot delete video from the history right now!");
    }
  }
);

export const removeHistory = createAsyncThunk(
  "history/removeHistory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.delete("/api/user/history/all", {
        headers: {
          authorization: localStorage.getItem("login-token"),
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue("Cannot clear the history right now!");
    }
  }
);

export const getHistory = createAsyncThunk(
  "history/getHistory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/user/history", {
        headers: {
          authorization: localStorage.getItem("login-token"),
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue("Cannot get history right now");
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
    setNotes: (state, { payload }) => {
      state.videoNotes = payload;
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
    [postHistory.pending]: (state) => {
      state.isLoading = true;
    },
    [postHistory.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.history = payload.history.reverse();
    },
    [postHistory.rejected]: (state) => {
      state.isLoading = false;
    },
    [removeFromHistory.pending]: (state) => {
      state.isLoading = true;
    },
    [removeFromHistory.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.history = payload.history;
    },
    [removeFromHistory.rejected]: (state) => {
      state.isLoading = false;
    },
    [removeHistory.pending]: (state) => {
      state.isLoading = true;
    },
    [removeHistory.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.history = payload.history;
    },
    [removeHistory.rejected]: (state) => {
      state.isLoading = false;
    },
    [getHistory.pending]: (state) => {
      state.isLoading = true;
    },
    [getHistory.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.history = payload.history;
    },
    [getHistory.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export const { setCurrentCategory, setSearchQuery, setNotes } =
  videoSlice.actions;
export default videoSlice.reducer;
