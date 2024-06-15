import CreateAlbums from "@/app/(mainSite)/album/components/CreateAlbum";
import React from "react";
import BreadCrumb from "@/app/_common/BreadCrumb/BreadCrumb";
import TopInfoAlbums from "@/app/(mainSite)/album/components/TopInfoAlbums";

export default async function Page() {
  return (
    <div>
      <BreadCrumb name={"Альбомы"} />
      <TopInfoAlbums />
      <CreateAlbums children={"Добавить Альбом"} />
    </div>
  );
}
