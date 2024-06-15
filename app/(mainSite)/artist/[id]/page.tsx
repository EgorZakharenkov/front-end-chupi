"use client";

import BreadCrumb from "@/app/_common/BreadCrumb/BreadCrumb";
import styles from "./style.module.scss";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/rootReducers";
import Song from "@/app/_common/Song/Song";
import React from "react";
import CreateArtist from "@/app/(mainSite)/artist/components/CreateArtist";
import { Button } from "@/components/ui/button";
import { FetchRemoveArtist } from "@/redux/slices/artistSlice";
import api from "@/constants/axiosBase";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
export default function Page({ params }: { params: { id: string } }) {
  const songs = useAppSelector(
    (state: RootState) => state.MusicSlice.musics.items,
  );
  const role = useAppSelector(
    (state: RootState) => state.UserSlice.user?.userData.role,
  );
  const currentArtist = useAppSelector(
    (state: RootState) => state.ArtistSlice.artist,
  );
  const router = useRouter();
  const handleDelete = () => {
    toast.success("Успешно удалили");
    api.delete(`/artist/${currentArtist._id}`).then();
    router.push("/artist");
  };
  return (
    <div style={{ padding: "25px" }}>
      <BreadCrumb name={`Артист ${currentArtist.name}`} />
      {role === "admin" && currentArtist && (
        <div style={{ display: "flex", gap: "15px" }}>
          <CreateArtist children={"Изменить"} />
          <Button onClick={handleDelete}>Удалить</Button>
        </div>
      )}
      {songs && (
        <div className={styles.items}>
          {songs.map((song, index) => (
            <Song key={song._id} index={index} item={song} />
          ))}
        </div>
      )}
    </div>
  );
}
