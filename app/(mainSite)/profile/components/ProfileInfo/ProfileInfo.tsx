"use client";

import React from "react";
import styles from "./ProfileInfo.module.scss";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/rootReducers";
import api from "@/constants/axiosBase";
const ProfileInfo = () => {
  const user = useAppSelector(
    (state: RootState) => state.UserSlice.user?.userData,
  );
  return (
    <div className={styles.main}>
      <img
        className={styles.profileImage}
        src={
          user?.image
            ? `https://back-end-chupi-production.up.railway.app/${user.image}`
            : "https://news.store.rambler.ru/img/8216a3fa1bdcc02143a78295811e74ac?img-format=auto&img-1-resize=height:400,fit:max&img-2-filter=sharpen"
        }
        alt={"profile"}
        width={40}
        height={40}
      />
      <div className={styles.info}>
        <h2>{user?.username}</h2>
        <h3>{user?.email}</h3>
      </div>
    </div>
  );
};

export default ProfileInfo;
