import React, { useEffect, useState } from "react";
import styles from "@/app/_common/Banner/Banner.module.scss";
import BreadCrumb from "@/app/_common/BreadCrumb/BreadCrumb";
import { FaCheck, FaHeadphones, FaPlus } from "react-icons/fa";
import { MusicItems } from "@/redux/slices/musicSlice";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/rootReducers";

import CreateTrack from "@/app/_common/CreateTrack/CreateTrack";
import { Button } from "@/components/ui/button";

const ContentBanner = ({ item }: { item?: MusicItems | null }) => {
  const userRole = useAppSelector(
    (state: RootState) => state.UserSlice.user?.userData?.role,
  );
  return (
    <div className={styles.content}>
      <BreadCrumb name={"Главная"} />
      <div className={styles.artist}>
        <div className={styles.left}>
          <div className={styles.name}>
            <h2>{item?.songName}</h2>
          </div>
          {item && (
            <p>
              <i>
                <FaHeadphones />
              </i>{" "}
              {item?.viewSong}
              <span>{item?.artist}</span>
            </p>
          )}
        </div>
        {userRole === "admin" && (
          <CreateTrack children={<Button children={"Добавить трек"} />} />
        )}
      </div>
    </div>
  );
};

export default ContentBanner;
