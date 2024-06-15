"use client";

import BreadCrumb from "@/app/_common/BreadCrumb/BreadCrumb";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import styles from "../../playlist/[id]/style.module.scss";
import { RootState } from "@/redux/rootReducers";
import Song from "@/app/_common/Song/Song";
import React, { useEffect, useState } from "react";
import api from "@/constants/axiosBase";
import CreateAlbums from "@/app/(mainSite)/album/components/CreateAlbum";
import { MusicItems, SetTracksFromPlayList } from "@/redux/slices/musicSlice";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import SearchBox from "@/app/_common/SideBar/components/SearchBox/SearchBox";
import DeleteIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import { toast, ToastContainer } from "react-toastify";
import TopInfoAlbum from "@/app/(mainSite)/album/[id]/components/TopInfoAlbum";
import { useRouter } from "next/navigation";

export default function Page({ params }: { params: { id: string } }) {
  const [albums, setAlbums] = useState<{
    name: string;
    image: string;
    songs: MusicItems[];
  }>({
    name: "",
    image: "",
    songs: [],
  });
  const router = useRouter();
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
    try {
      console.log(`Fetching album with id: ${id}`);
      await api.get(`/album/${id}`).then(({ data }) => {
        setAlbums(data.album);
      });
    } catch (error) {
      console.error("Ошибка при загрузке альбома:", error);
      toast.error("Не удалось загрузить информацию об альбоме");
    }
  };

  useEffect(() => {
    getAlbumInfo(params.id).then();
    if (albums.songs.length !== 0) {
      setSearchItems(songs);
      dispatch(SetTracksFromPlayList(albums.songs));
    }
  }, [albums.songs.length, dispatch, songs]);

  const addTrackToAlbum = async (item: MusicItems) => {
    try {
      console.log(`Adding track ${item._id} to album ${params.id}`);
      await api.put(`/album/${params.id}/add-music`, { musicId: item._id });
      await getAlbumInfo(params.id); // После добавления трека обновляем информацию об альбоме
      toast.success("Успешно добавлен трек в альбом");
    } catch (error) {
      console.error("Ошибка при добавлении трека в альбом:", error);
      toast.error("Не удалось добавить трек в альбом");
    }
  };

  const deleteTrackFromAlbum = async (musicId: string) => {
    try {
      console.log(`Removing track ${musicId} from album ${params.id}`);
      await api.delete(`/album/${params.id}/remove-music`, {
        data: { musicId },
      });
      await getAlbumInfo(params.id); // После удаления трека обновляем информацию об альбоме
      toast.success("Успешно удален трек из альбома");
    } catch (error) {
      console.error("Ошибка при удалении трека из альбома:", error);
      toast.error("Не удалось удалить трек из альбома");
    }
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
  const handleDelete = () => {
    api.delete(`/album/${params.id}`);
    router.push("/album");
  };

  return (
    <div
      style={{
        padding: "25px",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
      }}
    >
      {albums ? (
        <div>
          <BreadCrumb name={`Альбом ${albums.name}`} />
          {role === "admin" && (
            <div style={{ marginBottom: "20px", display: "flex", gap: "15px" }}>
              <CreateAlbums children={"Изменить"} />
              <Button onClick={handleDelete}>Удалить</Button>
            </div>
          )}
          {albums.songs && (
            <TopInfoAlbum
              getAlbumInfo={getAlbumInfo}
              id={params.id}
              songs={albums.songs}
            />
          )}
          <Dialog>
            <DialogTrigger asChild>
              <Button children={"Добавить треки"} />
            </DialogTrigger>
            <DialogContent className={""}>
              <DialogHeader>
                <SearchBox
                  setSearch={setSearch}
                  search={search}
                  changeSearch={changeSearch}
                />
                <div className={styles.addItems}>
                  {searchItems.map((item, index) => (
                    <div key={index} className={styles.addSong}>
                      <Song index={index} item={item} />
                      {albums.songs.find(
                        (it: MusicItems) => it._id === item._id,
                      ) ? (
                        <div onClick={() => deleteTrackFromAlbum(item._id)}>
                          <DeleteIcon />
                        </div>
                      ) : (
                        <div onClick={() => addTrackToAlbum(item)}>
                          <AddIcon />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </DialogHeader>
            </DialogContent>
            <ToastContainer />
          </Dialog>
        </div>
      ) : (
        "Загрузка"
      )}
    </div>
  );
}
