import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/constants/axiosBase";

export const FetchArtist = createAsyncThunk("artist/fetchArtist", async () => {
  const { data } = await api.get("/artist");
  return data;
});

export const FetchRemoveArtist = createAsyncThunk(
  "artist/FetchRemoveArtist",
  async (_id: string) => {
    await api.delete(`/artist/${_id}`);
  },
);
export type ArtistType = {
  _id: string;
  name: string;
  image: string;
};

export type InitialStateType = {
  artists: ArtistType[];
  artist: ArtistType;
};
const initialState: InitialStateType = {
  artists: [],
  artist: { name: "", image: "", _id: "" },
};
export const ArtistSlice = createSlice({
  name: "ArtistSlice",
  initialState,
  reducers: {
    setArtist: (state, action) => {
      state.artist = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(FetchArtist.fulfilled, (state, action) => {
      state.artists = action.payload.artists;
    });
  },
});

export const { setArtist } = ArtistSlice.actions;
export default ArtistSlice.reducer;
