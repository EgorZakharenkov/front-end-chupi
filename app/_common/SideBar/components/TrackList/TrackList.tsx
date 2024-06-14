"use client";

import React, { useState } from "react";
import styles from "./TrackList.module.scss";
import { BsFillVolumeUpFill, BsMusicNoteList } from "react-icons/bs";
import { RootState } from "@/redux/rootReducers";
import { useAppSelector } from "@/redux/hooks";
import { FaDesktop } from "react-icons/fa";
const TrackList = () => {
  const item = useAppSelector(
    (state: RootState) => state.MusicSlice.musics.item,
  );
  const currentTrackVolume = useAppSelector(
    (state: RootState) => state.MusicSlice.musics.currentTrackVolume,
  );
  const [value, setValue] = useState<string>("1");
  const ChangeVolumeTrack = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    currentTrackVolume.volume = Number(value);
  };
  const ChangeClickVolume = (
    event: React.MouseEvent<HTMLInputElement, MouseEvent>,
  ) => {
    const target = event.target as HTMLInputElement;
    setValue(target.value);
    currentTrackVolume.volume = Number(value);
  };
  return (
    <>
      {item && (
        <div className={styles.trackList}>
          <div className={styles.top}>
            <img
              src={
                item.imgSong.includes("http")
                  ? item.imgSong
                  : `http://localhost:4444/${item.imgSong}`
              }
              alt=""
            />
            <p>
              {item.songName} <span>{item.artist}</span>
            </p>
          </div>
          <div className={styles.bottom}>
            <i>
              <BsFillVolumeUpFill />
            </i>
            <input
              value={value}
              onChange={(event) => ChangeVolumeTrack(event)}
              onClick={(event) => ChangeClickVolume(event)}
              type="range"
              min="0"
              max="1"
              step="0.1"
            />
            <i>
              <BsMusicNoteList />
            </i>
            <i>
              <FaDesktop />
            </i>
          </div>
        </div>
      )}
    </>
  );
};

export default TrackList;
