"use client";

import CreateAlbums from "@/app/(mainSite)/album/components/CreateAlbum";
import React, { useEffect } from "react";
import BreadCrumb from "@/app/_common/BreadCrumb/BreadCrumb";
import TopInfoAlbums from "@/app/(mainSite)/album/components/TopInfoAlbums";
import { useAppDispatch } from "@/redux/hooks";
import { FetchAlbums } from "@/redux/slices/albumsSlice";
import { ToastContainer } from "react-toastify";

export default async function Page() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(FetchAlbums());
  }, []);
  return (
    <div
      style={{
        padding: "25px",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
      }}
    >
      <BreadCrumb name={"Альбомы"} />
      <TopInfoAlbums />
      <CreateAlbums children={"Добавить Альбом"} />
      <ToastContainer />
    </div>
  );
}
