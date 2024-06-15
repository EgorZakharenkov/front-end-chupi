import React from "react";
import styles from "./style.module.scss";
import classNames from "classnames";
import { FaHeadphones, FaRegClock } from "react-icons/fa";
import CreateTrack from "@/app/_common/CreateTrack/CreateTrack";
import EditIcon from "@mui/icons-material/Edit";
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
import DeleteIcon from "@mui/icons-material/Clear";
import {
  CurrentIndex,
  CurrentItem,
  DeleteItem,
  FetchRemoveMusic,
  MusicItems,
} from "@/redux/slices/musicSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/rootReducers";
import api from "@/constants/axiosBase";
import { toast } from "react-toastify";

const Song: React.FC<{ index: number; item: MusicItems; role?: string }> = ({
  index,
  item,
  role = "user",
}) => {
  const dispatch = useAppDispatch();

  const currentItem = useAppSelector(
    (state: RootState) => state.MusicSlice.musics.item,
  );
  const changeCurrentItem = (item: MusicItems, index: number) => {
    api.get(`/music/${item._id}`).then((r) => r);
    dispatch(CurrentItem(item));
    dispatch(CurrentIndex(index));
  };

  const handleDelete = (id: string) => {
    dispatch(FetchRemoveMusic(id));
    dispatch(DeleteItem(id));
    toast.success("Успешно удален");
  };
  return (
    <div key={index} className={styles.songs}>
      <div
        className={classNames(styles.song, {
          [styles.songActive]: item === currentItem,
        })}
      >
        <div className={styles.imgBox}>
          <img
            src={
              item.imgSong.includes("http")
                ? item.imgSong
                : `https://back-end-chupi-production.up.railway.app/${item.imgSong}`
            }
            alt=""
          />
        </div>
        <div
          className={styles.section}
          onClick={() => changeCurrentItem(item, index)}
        >
          <p className={styles.songName}>
            {item.songName} <span>{item.artist}</span>
          </p>
          <div className={styles.hits}>
            <p className="hit">
              <i>
                <FaHeadphones />
              </i>
              {item.viewSong}
            </p>
            <p className="duration">
              <i>
                <FaRegClock />
              </i>
              {item.duration}
            </p>
          </div>
        </div>
        {role === "admin" && (
          <CreateTrack
            item={item}
            children={<EditIcon fontSize={"medium"} color={"success"} />}
          />
        )}
        {role === "admin" && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <DeleteIcon fontSize={"medium"} color={"error"} />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Вы уверены ?</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Отмена</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleDelete(item._id)}>
                  Да
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </div>
  );
};

export default Song;
