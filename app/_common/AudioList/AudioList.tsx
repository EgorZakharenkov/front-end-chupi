import React from "react";
import styles from "./AudioList.module.scss";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/rootReducers";
import Song from "@/app/_common/Song/Song";
const AudioList = () => {
  const items = useAppSelector(
    (state: RootState) => state.MusicSlice.musics.items,
  );
  const role = useAppSelector(
    (state: RootState) => state.UserSlice.user?.userData?.role,
  );
  const category = useAppSelector(
    (state: RootState) => state.MusicSlice.musics.category,
  );

  return (
    <>
      {items && (
        <div className={styles.audioList}>
          <h2 className={styles.title}>{category}</h2>
          <div className={styles.songsContainer}>
            {Array.isArray(items) &&
              items.map((item, index) => (
                <Song key={item._id} index={index} item={item} role={role} />
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AudioList;
