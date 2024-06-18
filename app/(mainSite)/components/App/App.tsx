"use client";

import React, { useEffect, useState } from "react";
import SideBar from "@/app/_common/SideBar/SideBar";
import MusicPlayer from "@/app/_common/MusicPlayer/MusicPlayer";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/rootReducers";
import { FetchMusic } from "@/redux/slices/musicSlice";
import { FetchPLayList } from "@/redux/slices/playListSlice";
import { fetchMe } from "@/redux/slices/userSlice";
import { FetchArtist } from "@/redux/slices/artistSlice";
import { FetchAlbums } from "@/redux/slices/albumsSlice";

const App = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(
    (state: RootState) => state.UserSlice.user?.userData,
  );

  useEffect(() => {
    dispatch(fetchMe());
  }, []);

  useEffect(() => {
    if (isAuth) {
      dispatch(FetchPLayList(isAuth._id));
    }
  }, [isAuth?.username]);
  return (
    <div className="App">
      <SideBar />
      <div className="main">
        {children}
        <MusicPlayer />
      </div>
      <div className="background"></div>
    </div>
  );
};

export default App;
