import React from "react";
import styles from "./Banner.module.scss";
import Image from "next/image";
import { MusicItems } from "@/redux/slices/musicSlice";
import ContentBanner from "@/app/_common/Banner/components/ContentBanner/ContentBanner";
const Banner = ({ item }: { item?: MusicItems | null }) => {
  return (
    <div className={styles.baner}>
      <Image
        width={1980}
        height={1080}
        className={styles.imgBaner}
        src={"/bg.jpg"}
        alt=""
      />
      <ContentBanner item={item} />
      <div className={styles.bottomLayer}></div>
    </div>
  );
};

export default Banner;
