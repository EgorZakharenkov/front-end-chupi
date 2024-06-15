import TopInfoArtists from "@/app/(mainSite)/artist/components/TopInfoArtists";
import CreateArtist from "@/app/(mainSite)/artist/components/CreateArtist";
import BreadCrumb from "@/app/_common/BreadCrumb/BreadCrumb";
import { ToastContainer } from "react-toastify";

export default function Page() {
  return (
    <div
      style={{
        padding: "25px",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
      }}
    >
      <BreadCrumb name={"Артисты"} />
      <TopInfoArtists />
      <CreateArtist children={"Добавить артиста"} />
      <ToastContainer />
    </div>
  );
}
