import React from "react";
import styles from "@/app/_common/SideBar/components/MenuPlayList/MenuPlayList.module.scss";
import { BsMusicNoteList, BsTrash } from "react-icons/bs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/rootReducers";
import {
  deletePlayList,
  FetchRemovePlayList,
  PlayListProp,
} from "@/redux/slices/playListSlice";
import Link from "next/link";
import { toast } from "react-toastify";

const FooterPlayLists = () => {
  const dispatch = useAppDispatch();

  const playList = useAppSelector(
    (state: RootState) => state.PlayListSlice.playLists,
  );
  const ChangeDelete = (item: PlayListProp) => {
    dispatch(FetchRemovePlayList(item._id));
    dispatch(deletePlayList(item));
    toast.success("Успешно удалено");
  };
  return (
    <div className={styles.scrollPlayList}>
      {playList &&
        playList.map((item, index: number) => (
          <div key={item._id} className={styles.item}>
            <div className={styles.wrapper}>
              <i>
                <BsMusicNoteList />
              </i>
              <Link href={`/playlist/${item._id}`}>
                <span>{item.name}</span>
              </Link>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <i>
                  <BsTrash />
                </i>
              </AlertDialogTrigger>
              <AlertDialogContent style={{ background: "#000" }}>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Вы уверены что хотите удалить плейлист ?
                  </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Отмена</AlertDialogCancel>
                  <AlertDialogAction onClick={() => ChangeDelete(item)}>
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

export default FooterPlayLists;
