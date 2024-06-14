import React from "react";
import styles from "./MenuPlayList.module.scss";
import HeaderPlayLists from "@/app/_common/SideBar/components/MenuPlayList/components/HeaderPlayLists/HeaderPlayLists";
import FooterPlayLists from "@/app/_common/SideBar/components/MenuPlayList/components/FooterPlayLists/FooterPlayLists";

const MenuPlayList = () => {
  return (
    <div className={styles.playList}>
      <HeaderPlayLists />
      <FooterPlayLists />
    </div>
  );
};

export default MenuPlayList;
