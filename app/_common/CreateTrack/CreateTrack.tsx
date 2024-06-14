import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, Formik } from "formik";
import { Field } from "@/app/_common/Form/Field/Field";
import api from "@/constants/axiosBase";
import { FetchMusic, MusicItems } from "@/redux/slices/musicSlice";
import InputFile from "@/app/_common/InputFile/InputFile";
import styles from "@/app/(mainSite)/profile/components/EditForm/EditForm.module.scss";
import { useAppDispatch } from "@/redux/hooks";

const CreateTrack = ({
  item,
  children,
}: {
  children: React.ReactNode;
  item?: MusicItems;
}) => {
  const [musicData, setMusicData] = useState({
    songName: item?.songName,
    artist: item?.artist,
    song: item?.song,
    textSong: item?.textSong,
    duration: item?.duration,
    imgSong: item?.imgSong,
  });
  const [imageSrc, setImageSrc] = useState<string | null>(
    item?.imgSong.includes("http")
      ? item.imgSong
      : `https://localhost:4444/${item?.imgSong}`,
  );
  const [selected, setSelectedFile] = useState<File | null>(null);
  const dispatch = useAppDispatch();
  const handleSubmit = async (values: {
    songName: string;
    song: string;
    artist: string;
    duration: string;
    textSong: string;
  }) => {
    const formData = new FormData();
    formData.append("songName", values.songName);
    formData.append("song", values.song);
    formData.append("artist", values.artist);
    formData.append("duration", values.duration);
    formData.append("textSong", values.textSong);
    if (selected) {
      formData.append("file", selected);
    }
    try {
      item
        ? await api.put(`/music/${item._id}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
        : await api.post("/music", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
    } catch (e) {
      console.log(e);
    }
    dispatch(FetchMusic());
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Добавить трек</DialogTitle>
          <DialogDescription>
            Внесите данные и нажмите сохранить
          </DialogDescription>
        </DialogHeader>
        <Formik
          initialValues={{
            songName: musicData.songName ? musicData.songName : "",
            song: musicData.song ? musicData.song : "",
            artist: musicData.artist ? musicData.artist : "",
            duration: musicData.duration ? musicData.duration : "",
            imgSong: musicData.imgSong ? musicData.imgSong : "",
            textSong: musicData.textSong ? musicData.textSong : "",
          }}
          validateOnBlur={false}
          onSubmit={handleSubmit}
        >
          <Form
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <Field
              variant={"dark"}
              label={"Название трека"}
              name={"songName"}
            />
            <Field variant={"dark"} label={"Артист"} name={"artist"} />
            <Field variant={"dark"} label={"Текст трека"} name={"textSong"} />
            <Field variant={"dark"} label={"Ссылка на трек"} name={"song"} />
            <img
              className={styles.profileImage}
              src={
                imageSrc
                  ? imageSrc
                  : "https://news.store.rambler.ru/img/8216a3fa1bdcc02143a78295811e74ac?img-format=auto&img-1-resize=height:400,fit:max&img-2-filter=sharpen"
              }
              alt={"profile"}
              width={120}
              height={120}
            />
            <InputFile
              setSelectedFile={setSelectedFile}
              setImageSrc={setImageSrc}
            />
            <Field variant={"dark"} label={"Длительность"} name={"duration"} />
            <DialogFooter>
              <Button type="submit">Сохранить</Button>
            </DialogFooter>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTrack;
