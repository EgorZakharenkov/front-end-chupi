"use client";

import BreadCrumb from "@/app/_common/BreadCrumb/BreadCrumb";
import { useAppSelector } from "@/redux/hooks";
import styles from "../../artist/[id]/style.module.scss";
import { RootState } from "@/redux/rootReducers";
import Song from "@/app/_common/Song/Song";
import React from "react";
import CreateArtist from "@/app/(mainSite)/artist/components/CreateArtist";
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
  return (
    <div style={{ padding: "25px" }}>
      <BreadCrumb name={`Альбом ${currentArtist.name}`} />
      {role === "admin" && currentArtist && (
        <CreateArtist children={"Изменить"} />
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
