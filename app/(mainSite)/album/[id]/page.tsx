"use client";

import BreadCrumb from "@/app/_common/BreadCrumb/BreadCrumb";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import styles from "../../artist/[id]/style.module.scss";
import { RootState } from "@/redux/rootReducers";
import Song from "@/app/_common/Song/Song";
import React, { useEffect, useState } from "react";
import CreateArtist from "@/app/(mainSite)/artist/components/CreateArtist";
import api from "@/constants/axiosBase";
import CreateAlbums from "@/app/(mainSite)/album/components/CreateAlbum";
import { MusicItems, SetTracksFromPlayList } from "@/redux/slices/musicSlice";
export default function Page({ params }: { params: { id: string } }) {
  const [albums, setAlbums] = useState<{
    name: string;
    image: string;
    songs: [];
  }>({
    name: "",
    image: "",
    songs: [],
  });
  const songs = useAppSelector(
    (state: RootState) => state.MusicSlice.musics.itemsDefault,
  );
  const role = useAppSelector(
    (state: RootState) => state.UserSlice.user?.userData.role,
  );
  const [searchItems, setSearchItems] = useState(songs);
  const [search, setSearch] = useState("");

  const dispatch = useAppDispatch();
  const getAlbumInfo = async (id: string) => {
    await api.get(`/album/${params.id}`).then(({ data }) => {
      setAlbums(data.album);
    });
  };
  useEffect(() => {
    if (albums?.songs.length !== 0) {
      setSearchItems(songs);
      dispatch(SetTracksFromPlayList(albums.songs));
    }
  }, [params.id, albums?.songs.length]);
  const addTrackToAlbum = async (item: MusicItems) => {
    try {
      await api.put(`/album/${params.id}/add-music`, item);
      await getAlbumInfo(params.id);
    } catch (e) {
      alert("Не удалось добавить трек ");
    }
  };
  const deleteTrackFromAlbum = async (id: string) => {
    await api.delete(`/album/${params.id}/remove-music`);
  };
  const changeSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchItems(
      songs.filter((item: MusicItems) =>
        item.songName.toLowerCase().includes(search.toLowerCase()),
      ),
    );
    setSearch("");
  };
  return (
    <div style={{ padding: "25px" }}>
      <BreadCrumb name={`Альбом ${albums.name}`} />
      {role === "admin" && <CreateAlbums children={"Изменить"} />}
      {albums?.songs && (
        <div className={styles.items}>
          {albums.songs.map((song: MusicItems, index) => (
            <Song key={song._id} index={index} item={song} />
          ))}
        </div>
      )}
    </div>
  );
}
