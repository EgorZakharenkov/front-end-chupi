import React from "react";
import Song from "@/app/_common/Song/Song";
import { MusicItems } from "@/redux/slices/musicSlice";
import styles from "./style.module.scss";
import BreadCrumb from "@/app/_common/BreadCrumb/BreadCrumb";
import { BsTrash } from "react-icons/bs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import api from "@/constants/axiosBase";
const TopPlayList: React.FC<{
  playList: {
    name: string;
    tracks: MusicItems[];
    _id: string;
  };
  params: {
    id: string;
  };
  getPlayListInfo: any;
}> = ({ playList, params, getPlayListInfo }) => {
  const deleteTrackFromPlayList = async (id: string) => {
    await api.delete(`playlist/${params.id}/tracks/${id}`);
    await getPlayListInfo(playList._id);
  };
  return (
    <div className={styles.topPlayList}>
      <BreadCrumb name={"Плейлист"} />
      <h2 className={styles.name}>{playList.name}</h2>
      <div>
        <h2 className={styles.tracksText}>Треки</h2>
        {playList?.tracks.map((item, index) => (
          <div key={index} className={styles.item}>
            <Song index={index} item={item} />
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <i>
                  <BsTrash />
                </i>
              </AlertDialogTrigger>
              <AlertDialogContent style={{ background: "#000" }}>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Вы уверены что хотите удалить трек ?
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Отмена</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => deleteTrackFromPlayList(item._id)}
                  >
                    Да
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopPlayList;
