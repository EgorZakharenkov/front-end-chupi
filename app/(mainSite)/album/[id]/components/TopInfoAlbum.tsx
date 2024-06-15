import React from "react";
import styles from "@/app/(mainSite)/playlist/[id]/style.module.scss";
import { MusicItems } from "@/redux/slices/musicSlice";
import Song from "@/app/_common/Song/Song";

const TopInfoAlbum: React.FC<{ songs: MusicItems[] }> = ({ songs }) => {
  return (
    <div className={styles.items}>
      {songs.map((song: MusicItems, index) => (
        <Song key={song._id} index={index} item={song} />
      ))}
    </div>
  );
};

export default TopInfoAlbum;
