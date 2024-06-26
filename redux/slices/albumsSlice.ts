import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/constants/axiosBase";

export const FetchAlbums = createAsyncThunk("album/fetchAlbum", async () => {
  const { data } = await api.get("/album");
  return data;
});

export const FetchRemoveAlbums = createAsyncThunk(
  "album/fetchAlbum",
  async (_id: string) => {
    await api.delete(`/album/${_id}`);
  },
);
export type AlbumType = {
  _id: string;
  name: string;
  image: string;
};

export type InitialStateType = {
  albums: AlbumType[];
  album: AlbumType;
};
const initialState: InitialStateType = {
  albums: [],
  album: { name: "", image: "", _id: "" },
};
export const AlbumSlice = createSlice({
  name: "AlbumSlice",
  initialState,
  reducers: {
    setAlbum: (state, action) => {
      state.album = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(FetchAlbums.fulfilled, (state, action) => {
      state.albums = action.payload.albums;
    });
  },
});

export const { setAlbum } = AlbumSlice.actions;
export default AlbumSlice.reducer;
