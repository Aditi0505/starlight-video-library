import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  playlists: [],
  watchLater: [],
  likedVideos: [],
  isLoading: false,
};
export const addtoWatchLater = createAsyncThunk(
  "watchLater/addtoWatchLater",
  async (video, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/user/watchlater",
        { video },
        {
          headers: {
            authorization: localStorage.getItem("login-token"),
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue("Cannot add to watch later right now!");
    }
  }
);
export const removeFromWatchLater = createAsyncThunk(
  "watchLater/removeFromWatchLater",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/user/watchlater/${id}`, {
        headers: {
          authorization: localStorage.getItem("login-token"),
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue("Cannot delete from watch later right now!");
    }
  }
);
export const addToLikedVideo = createAsyncThunk(
  "likedVideo/addToLikedVideo",
  async (video, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/user/likes",
        { video },
        {
          headers: {
            authorization: localStorage.getItem("login-token"),
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue("Cannot add to liked videos right now!");
    }
  }
);
export const removeFromLikedVideo = createAsyncThunk(
  "likedVideo/removeFromLikedVideo",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/user/likes/${id}`, {
        headers: {
          authorization: localStorage.getItem("login-token"),
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue("Cannot delete from liked video right now!");
    }
  }
);
const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {},
  extraReducers: {
    [addtoWatchLater.pending]: (state) => {
      state.isLoading = true;
    },
    [addtoWatchLater.rejected]: (state) => {
      state.isLoading = false;
    },
    [addtoWatchLater.fulfilled]: (state, { payload }) => {
      state.watchLater = payload.watchlater;
      state.isLoading = false;
    },
    [removeFromWatchLater.pending]: (state) => {
      state.isLoading = true;
    },
    [removeFromWatchLater.rejected]: (state) => {
      state.isLoading = false;
    },
    [removeFromWatchLater.fulfilled]: (state, { payload }) => {
      state.watchLater = payload.watchlater;
      state.isLoading = false;
    },
    [addToLikedVideo.rejected]: (state) => {
      state.isLoading = false;
    },
    [addToLikedVideo.pending]: (state) => {
      state.isLoading = true;
    },
    [addToLikedVideo.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.likedVideos = payload.likes;
    },
    [removeFromLikedVideo.rejected]: (state) => {
      state.isLoading = false;
    },
    [removeFromLikedVideo.pending]: (state) => {
      state.isLoading = true;
    },
    [removeFromLikedVideo.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.likedVideos = payload.likes;
    },
  },
});

export default playlistSlice.reducer;
