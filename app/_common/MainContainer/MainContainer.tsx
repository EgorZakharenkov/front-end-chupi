"use client";

import React, { useState } from "react";
import styles from "./MainContainer.module.scss";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  Category,
  FetchMusic,
  SetPopularTracks,
} from "@/redux/slices/musicSlice";
import { RootState } from "@/redux/rootReducers";
import Banner from "@/app/_common/Banner/Banner";
import AudioList from "@/app/_common/AudioList/AudioList";
import { Skeleton } from "@/components/ui/skeleton";
const MainContainer = () => {
  const menuList = ["Музыка", "Популярные"];
  const [itemActive, setActive] = useState(0);
  const item = useAppSelector(
    (state: RootState) => state.MusicSlice.musics.item,
  );
  const dispatch = useAppDispatch();
  const ChangeCategory = (index: number) => {
    setActive(index);
    dispatch(Category(menuList[index]));
    if (menuList[index] === "Музыка") {
      dispatch(FetchMusic());
    }
    if (menuList[index] === "Популярные") {
      dispatch(SetPopularTracks());
    }
  };
  return (
    <div className={styles.mainContainer}>
      <Banner item={item} />

      <div className={styles.menuList}>
        {menuList.map((item, index) => (
          <a
            key={index}
            className={classNames({
              [styles.active]: itemActive === index,
            })}
            onClick={() => ChangeCategory(index)}
            href="#"
          >
            {item}
          </a>
        ))}
      </div>
      <AudioList />
      <Skeleton className="w-[100px] h-[20px] rounded-full" />
    </div>
  );
};

export default MainContainer;
