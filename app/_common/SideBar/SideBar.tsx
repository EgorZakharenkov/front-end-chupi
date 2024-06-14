import React, { useState } from "react";
import styles from "./SideBar.module.scss";
import SearchBox from "@/app/_common/SideBar/components/SearchBox/SearchBox";
import MenuList from "@/app/_common/SideBar/components/MenuList/MenuList";
import { FaEllipsisH } from "react-icons/fa";
import MenuPlayList from "@/app/_common/SideBar/components/MenuPlayList/MenuPlayList";
import TrackList from "@/app/_common/SideBar/components/TrackList/TrackList";
import { SearchTrack } from "@/redux/slices/musicSlice";
import { useAppDispatch } from "@/redux/hooks";
const SideBar = () => {
  const [search, setSearch] = useState("");
  const dispatch = useAppDispatch();

  const changeSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(SearchTrack(search));
    setSearch("");
  };
  return (
    <div className={styles.leftMenu}>
      <div className={styles.logoContainer}>
        <h2>Chupi</h2>
        <i>
          <FaEllipsisH />
        </i>
      </div>
      <SearchBox
        search={search}
        setSearch={setSearch}
        changeSearch={changeSearch}
      />
      <MenuList />
      <MenuPlayList />
      <TrackList />
    </div>
  );
};

export default SideBar;
