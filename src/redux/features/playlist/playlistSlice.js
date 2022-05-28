import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  playlists: [],
  watchLater: [],
  history: [],
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
export const getWatchLater = createAsyncThunk(
  "watchLater/getWatchLater",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/user/watchlater", {
        headers: {
          authorization: localStorage.getItem("login-token"),
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue("Cannot get watch later videos right now!");
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
    [getWatchLater.pending]: (state) => {
      state.isLoading = true;
    },
    [getWatchLater.rejected]: (state) => {
      state.isLoading = false;
    },
    [getWatchLater.fulfilled]: (state, { payload }) => {
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
  },
});

export default playlistSlice.reducer;
