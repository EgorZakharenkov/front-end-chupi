"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api, { setAuthToken } from "@/constants/axiosBase";

interface Values {
  username?: string;
  email: string;
  password: string;
}
interface UpdateValues {
  username: string;
  email: string;
  image: string;
}

export const fetchUserData = createAsyncThunk(
  "auth/fetchUserData",
  async (params: Values) => {
    const { data } = await api.post("/auth/login", params);
    return data;
  },
);

export const fetchRegister = createAsyncThunk(
  "auth/fetchRegister",
  async (params: Values) => {
    const { data } = await api.post("/auth/register", params);
    return data;
  },
);
export const fetchMe = createAsyncThunk("auth/fetchMe", async () => {
  const token = localStorage.getItem("token");
  setAuthToken(token);
  const { data } = await api.get("/auth/me");
  return data;
});

type UserProps = {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  username: string;
  email: string;
  favoriteTracks: string[];
  image: string;
  role: string;
};
export interface PropsState {
  user: {
    access_token: string;
    refresh_token: string;
    userData: UserProps;
    file: File;
  } | null;
}
const initialState: PropsState = {
  user: null,
};

export const counterSlice = createSlice({
  name: "UserSlice",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
    setProfile: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserData.pending, (state) => {
      state.user = null;
    });
    builder.addCase(fetchUserData.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(fetchUserData.rejected, (state) => {
      state.user = null;
    });
    builder.addCase(fetchRegister.pending, (state) => {
      state.user = null;
    });
    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(fetchRegister.rejected, (state) => {
      state.user = null;
    });
    builder.addCase(fetchMe.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export const { logout, setProfile } = counterSlice.actions;

export default counterSlice.reducer;
