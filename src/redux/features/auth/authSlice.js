import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  encodedToken: null,
  user: null,
  theme: localStorage.getItem("theme") || "light",
  isLoading: true,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (user, { rejectWithValue }) => {
    try {
      const { email, password } = user;
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      if (error.response.status === 401) {
        return rejectWithValue("Invalid Credentials!");
      } else if (error.response.status === 404) {
        return rejectWithValue("User Not Found! Please signup first!");
      } else {
        return rejectWithValue("Cannot login right now!");
      }
    }
  }
);

export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async (user, { rejectWithValue }) => {
    console.log("here");
    try {
      const response = await axios.post("/api/auth/signup", user);
      return response.data;
    } catch (error) {
      if (error.response.status === 422) {
        return rejectWithValue("User already Exist!");
      } else {
        return rejectWithValue("Cannot signup right now!");
      }
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.encodedToken = null;
      localStorage.removeItem("login-token");
      localStorage.removeItem("signup-token");
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", state.theme);
    },
  },
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.isLoading = true;
    },
    [loginUser.rejected]: (state) => {
      state.isLoading = false;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.user = payload.user;
      state.encodedToken = payload.encodedToken;
    },
    [signUpUser.pending]: (state) => {
      state.isLoading = true;
    },
    [signUpUser.rejected]: (state) => {
      state.isLoading = false;
    },
    [signUpUser.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.user = payload.user;
      state.encodedToken = payload.encodedToken;
    },
  },
});
export const { toggleTheme, logoutUser } = authSlice.actions;
export default authSlice.reducer;
