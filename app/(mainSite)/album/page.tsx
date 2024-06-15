import CreateAlbums from "@/app/(mainSite)/album/components/CreateAlbum";
import React from "react";
import BreadCrumb from "@/app/_common/BreadCrumb/BreadCrumb";

export default async function Page() {
  return (
    <div>
      <BreadCrumb name={"Альбомы"} />
      <CreateAlbums />
    </div>
  );
}
