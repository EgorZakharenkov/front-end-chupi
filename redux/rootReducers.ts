import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import musicReducer from "@/redux/slices/musicSlice";
import playListReducer from "@/redux/slices/playListSlice";
import artistReducer from "@/redux/slices/artistSlice";

const rootReducer = combineReducers({
  UserSlice: userReducer,
  MusicSlice: musicReducer,
  PlayListSlice: playListReducer,
  ArtistSlice: artistReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
