"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/rootReducers";
import styles from "./style.module.scss";
import { ArtistType, FetchArtist, setArtist } from "@/redux/slices/artistSlice";
import { SetArtistTracks } from "@/redux/slices/musicSlice";
import { useRouter } from "next/navigation";
import api from "./../../../../constants/axiosBase";
const TopInfoArtists = () => {
  const artist = useAppSelector(
    (state: RootState) => state.ArtistSlice.artists,
  );
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(FetchArtist());
  }, []);

  const handleClick = (item: ArtistType) => {
    dispatch(SetArtistTracks(item.name));
    dispatch(setArtist(item));
    router.push(`/artist/${item._id}`);
  };

  return (
    <div>
      {artist !== null && (
        <div className={styles.items}>
          {artist.map((item, index) => (
            <div
              onClick={() => handleClick(item)}
              className={styles.item}
              key={index}
            >
              <h2>{item.name}</h2>
              <img
                src={`https://back-end-chupi-production.up.railway.app/${item.image}`}
                alt={`${api}/${item.image}`}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopInfoArtists;
