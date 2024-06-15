import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import musicReducer from "@/redux/slices/musicSlice";
import playListReducer from "@/redux/slices/playListSlice";
import artistReducer from "@/redux/slices/artistSlice";
import albumReducer from "@/redux/slices/albumsSlice";

import { store } from "@/redux/store";

const rootReducer = combineReducers({
  UserSlice: userReducer,
  MusicSlice: musicReducer,
  PlayListSlice: playListReducer,
  ArtistSlice: artistReducer,
  AlbumSlice: albumReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export default rootReducer;
