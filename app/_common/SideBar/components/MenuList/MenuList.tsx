"use client";

import React from "react";
import styles from "./MenuList.module.scss";
import Link from "next/link";
import { menuList } from "@/app/_common/SideBar/components/MenuList/constsnts";
import classNames from "classnames";
import { usePathname } from "next/navigation";
const MenuList = () => {
  const pathname = usePathname();

  return (
    <div className={styles.Menu}>
      <h3>Меню</h3>
      <div className={styles.items}>
        {menuList.map((item, index) => (
          <Link
            key={index}
            href={menuList[index].link}
            className={classNames(styles.item, {
              [styles.active]: pathname === item.link,
            })}
          >
            <i>{item.icon}</i>
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MenuList;
