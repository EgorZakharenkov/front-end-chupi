"use client";

import React, { useEffect, useState } from "react";
import api from "@/constants/axiosBase";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/rootReducers";
import styles from "./style.module.scss";
import { Button } from "@/components/ui/button";
import DeleteIcon from "@mui/icons-material/Clear";
import AddIcon from "@mui/icons-material/Add";
import Song from "@/app/_common/Song/Song";
import { MusicItems, SetTracksFromPlayList } from "@/redux/slices/musicSlice";
import TopPlayList from "@/app/(mainSite)/playlist/[id]/components/TopPlayList/TopPlayList";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import SearchBox from "@/app/_common/SideBar/components/SearchBox/SearchBox";

export default function Page({ params }: { params: { id: string } }) {
  const [playList, setPlayList] = useState<{
    name: string;
    creator: string;
    tracks: [];
  }>({
    name: "",
    creator: "",
    tracks: [],
  });
  const items = useAppSelector(
    (state: RootState) => state.MusicSlice.musics.itemsDefault,
  );
  const [searchItems, setSearchItems] = useState(items);

  const dispatch = useAppDispatch();
  const [search, setSearch] = useState("");
  const getPlayListInfo = async (id: string) => {
    await api.get(`/playlist/${params.id}`).then(({ data }) => {
      setPlayList(data.playList);
    });
  };
  useEffect(() => {
    getPlayListInfo(params.id).then();
    if (playList?.tracks.length !== 0) {
      setSearchItems(items);
      dispatch(SetTracksFromPlayList(playList.tracks));
      console.log(1);
    }
  }, [params.id, playList?.tracks.length]);

  const addTrackToPlayList = async (item: MusicItems) => {
    try {
      await api.put(`/playlist/add/${params.id}`, item);
      await getPlayListInfo(params.id);
    } catch (e) {
      alert("Не удалось добавить трек ");
    }
  };
  const deleteTrackFromPlayList = async (id: string) => {
    await api.delete(`playlist/${params.id}/tracks/${id}`);
  };
  const changeSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchItems(
      items.filter((item) =>
        item.songName.toLowerCase().includes(search.toLowerCase()),
      ),
    );
    setSearch("");
  };

  return (
    <div className={styles.playList}>
      <TopPlayList params={params} playList={playList} />
      <Dialog>
        <DialogTrigger asChild>
          <Button children={"Добавить"} />
        </DialogTrigger>
        <DialogContent className={""}>
          <DialogHeader>
            <SearchBox
              setSearch={setSearch}
              search={search}
              changeSearch={changeSearch}
            />
            <div className={styles.addItems}>
              {items.map((item, index) => (
                <div key={index} className={styles.addSong}>
                  <Song index={index} item={item} />
                  {playList.tracks.find(
                    (it: MusicItems) => it._id === item._id,
                  ) ? (
                    <div onClick={() => deleteTrackFromPlayList(item._id)}>
                      <DeleteIcon />
                    </div>
                  ) : (
                    <div onClick={() => addTrackToPlayList(item)}>
                      <AddIcon />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
