"use client";

import React from "react";
import styles from "@/app/(mainSite)/artist/components/style.module.scss";
import api from "@/constants/axiosBase";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/rootReducers";
import { useRouter } from "next/navigation";

const TopInfoAlbums = () => {
  const albums = useAppSelector((state: RootState) => state.AlbumSlice.albums);
  const router = useRouter();
  const handleClick = (id: string) => {
    router.push(`/albums/${id}`);
  };
  return (
    <div>
      {albums !== null && (
        <div className={styles.items}>
          {albums.map(
            (
              item: { name: string; image: string; _id: string },
              index: number,
            ) => (
              <div
                onClick={() => handleClick(item._id)}
                className={styles.item}
                key={index}
              >
                <h2>{item.name}</h2>
                <img
                  src={`https://back-end-chupi-production.up.railway.app/${item.image}`}
                  alt={`${api}/${item.image}`}
                />
              </div>
            ),
          )}
        </div>
      )}
    </div>
  );
};

export default TopInfoAlbums;
