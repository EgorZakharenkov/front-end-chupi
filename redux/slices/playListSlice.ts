import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/constants/axiosBase";

export type PlayListProp = {
  _id: string;
  name: string;
  creator: string;
  tracks: [];
};
interface PlayList {
  playLists: PlayListProp[];
  currentPlayList: PlayListProp | null;
  status: string;
}

const initialState: PlayList = {
  playLists: [],
  currentPlayList: null,
  status: "",
};

export const FetchPLayList = createAsyncThunk(
  "music/fetchPlayLists",
  async (userId: string) => {
    const data = await api.post(`/playlist/user/${userId}`);
    return data;
  },
);
export const FetchRemovePlayList = createAsyncThunk(
  "posts/FetchRemovePost",
  async (_id: string) => {
    await api.delete(`/playlist/${_id}`);
  },
);
export const PlayListSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    deletePlayList: (state, action) => {
      state.playLists = state.playLists.filter(
        (item) => item._id !== action.payload._id,
      );
    },
    setCurrentPlayList: (state, action) => {
      state.currentPlayList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(FetchPLayList.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(FetchPLayList.fulfilled, (state, action) => {
      state.playLists = action.payload.data.playList;
      state.status = "loaded";
    });
    builder.addCase(FetchPLayList.rejected, (state) => {
      state.status = "error";
      state.playLists = [];
    });
  },
});

export const { deletePlayList } = PlayListSlice.actions;
export default PlayListSlice.reducer;
