"use client";
import React, { FormEvent, useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import styles from "./SearchBox.module.scss";
import { BiSearchAlt } from "react-icons/bi";
import { SearchTrack } from "@/redux/slices/musicSlice";

const SearchBox: React.FC<{
  search: string;
  setSearch: (value: string) => void;
  changeSearch: (e: React.FormEvent<HTMLFormElement>) => void;
}> = ({ search, setSearch, changeSearch }) => {
  return (
    <div className={styles.searchBox}>
      <form onSubmit={(e) => changeSearch(e)}>
        <i>
          <BiSearchAlt />
        </i>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Найти..."
        />
      </form>
    </div>
  );
};

export default SearchBox;
