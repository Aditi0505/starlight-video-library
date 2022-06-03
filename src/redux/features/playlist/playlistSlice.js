import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  playlists: [],
  watchLater: [],
  likedVideos: [],
  isLoading: false,
  isModalOpen: false,
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
export const getAllPlaylist = createAsyncThunk(
  "playlist/getAllPlaylist",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/user/playlists", {
        headers: {
          authorization: localStorage.getItem("login-token"),
        },
      });
      return response.data;
    } catch (e) {
      return rejectWithValue("Cannot get all playlists right now!");
    }
  }
);
export const postPlaylist = createAsyncThunk(
  "playlist/postPlaylist",
  async (playlist, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/user/playlists",
        { playlist },
        {
          headers: {
            authorization: localStorage.getItem("login-token"),
          },
        }
      );
      return response.data;
    } catch (e) {
      return rejectWithValue("Cannot create playlist right now!");
    }
  }
);
export const deletePlaylist = createAsyncThunk(
  "playlist/deletePlaylist",
  async (playlistId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/user/playlists/${playlistId}`, {
        headers: {
          authorization: localStorage.getItem("login-token"),
        },
      });
      return response.data;
    } catch (e) {
      return rejectWithValue("Cannot delete playlist right now!");
    }
  }
);
export const addVideoToPlaylist = createAsyncThunk(
  "playlist/addVideoToPlaylist",
  async ({ id, currentVideo }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `/api/user/playlists/${id}`,
        { video: currentVideo },
        {
          headers: {
            authorization: localStorage.getItem("login-token"),
          },
        }
      );
      return response.data;
    } catch (e) {
      return rejectWithValue("Cannot delete playlist right now!");
    }
  }
);
export const getVideoFromPlaylist = createAsyncThunk(
  "playlist/getVideoFromPlaylist",

  async (playlistId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/user/playlists/${playlistId}`);
      return response.data;
    } catch (e) {
      return rejectWithValue("Cannot get video from the playlist right now!");
    }
  }
);
export const deleteVideoFromPlaylist = createAsyncThunk(
  "playlist/deleteVideoFromPlaylist",
  async ({ id, currentVideo }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `/api/user/playlists/${id}/${currentVideo._id}`,
        {
          headers: {
            authorization: localStorage.getItem("login-token"),
          },
        }
      );
      return response.data;
    } catch (e) {
      return rejectWithValue(
        "Cannot delete video from the playlist right now!"
      );
    }
  }
);
const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    setIsModalOpen: (state, { payload }) => {
      state.isModalOpen = payload;
    },
  },
  extraReducers: {
    [addtoWatchLater.pending]: (state) => {
      state.isLoading = true;
    },
    [addtoWatchLater.rejected]: (state) => {
      state.isLoading = false;
    },
    [addtoWatchLater.fulfilled]: (state, { payload }) => {
      state.watchLater = payload.watchlater.reverse();
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
      state.likedVideos = payload.likes.reverse();
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
    [getAllPlaylist.rejected]: (state) => {
      state.isLoading = false;
    },
    [getAllPlaylist.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllPlaylist.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.playlists = payload.playlists;
    },
    [postPlaylist.rejected]: (state) => {
      state.isLoading = false;
    },
    [postPlaylist.pending]: (state) => {
      state.isLoading = true;
    },
    [postPlaylist.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.playlists = payload.playlists;
    },
    [deletePlaylist.pending]: (state) => {
      state.isLoading = true;
    },
    [deletePlaylist.rejected]: (state) => {
      state.isLoading = false;
    },
    [deletePlaylist.fulfilled]: (state, { payload }) => {
      state.playlists = payload.playlists;
      state.isLoading = false;
    },
    [addVideoToPlaylist.rejected]: (state) => {
      state.isLoading = false;
    },
    [addVideoToPlaylist.pending]: (state) => {
      state.isLoading = true;
    },
    [addVideoToPlaylist.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.playlists = state.playlists
        .map((playlist) =>
          playlist._id === payload.playlist._id
            ? { ...playlist, ...payload.playlist }
            : playlist
        )
    },
    [getVideoFromPlaylist.rejected]: (state) => {
      state.isLoading = false;
    },
    [getVideoFromPlaylist.pending]: (state) => {
      state.isLoading = true;
    },
    [getVideoFromPlaylist.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.playlists = payload.playlist;
    },
    [deleteVideoFromPlaylist.rejected]: (state) => {
      state.isLoading = false;
    },
    [deleteVideoFromPlaylist.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteVideoFromPlaylist.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.playlists = state.playlists.map((playlist) =>
        playlist._id === payload.playlist._id
          ? { ...playlist, ...payload.playlist }
          : playlist
      );
    },
  },
});
export const { setIsModalOpen } = playlistSlice.actions;
export default playlistSlice.reducer;
