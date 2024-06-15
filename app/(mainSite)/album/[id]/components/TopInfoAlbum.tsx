import React from "react";
import styles from "@/app/(mainSite)/playlist/[id]/style.module.scss";
import { MusicItems } from "@/redux/slices/musicSlice";
import Song from "@/app/_common/Song/Song";
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
import { BsTrash } from "react-icons/bs";
import api from "@/constants/axiosBase";
import { toast } from "react-toastify";

const TopInfoAlbum: React.FC<{
  songs: MusicItems[];
  id: string;
  getAlbumInfo: any;
}> = ({ songs, id, getAlbumInfo }) => {
  const deleteTrackFromAlbum = async (musicId: string) => {
    try {
      await api.delete(`/album/${id}/remove-music`, {
        data: { musicId },
      });
      getAlbumInfo(id);
      toast.success("Успешно удален трек из альбома");
    } catch (error) {
      console.error("Ошибка при удалении трека из альбома:", error);
      toast.error("Не удалось удалить трек из альбома");
    }
  };
  return (
    <div className={styles.items}>
      {songs.map((song: MusicItems, index) => (
        <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
          <Song key={song._id} index={index} item={song} />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <i style={{ cursor: "pointer" }}>
                <BsTrash />
              </i>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Вы уверены что хотите удалить трек ?
                </AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Отмена</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => deleteTrackFromAlbum(song._id)}
                >
                  Да
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ))}
    </div>
  );
};

export default TopInfoAlbum;
