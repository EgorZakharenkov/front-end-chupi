"use client";
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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CircularProgress } from "@mui/material";

const CreateTrack = ({
  item,
  children,
}: {
  children: React.ReactNode;
  item?: MusicItems;
}) => {
  const [isOpen, setIsOpen] = useState(false); // Состояние для управления диалогом
  const [isLoading, setIsLoading] = useState(false); // Состояние для управления загрузкой
  const [musicData, setMusicData] = useState({
    songName: item?.songName,
    artist: item?.artist,
    song: item?.song,
    textSong: item?.textSong,
    duration: item?.duration,
    imgSong: item?.imgSong,
  });
  const [imageSrc, setImageSrc] = useState<string | null>(
    item?.imgSong && item.imgSong.includes("http")
      ? item.imgSong
      : item?.imgSong
        ? `https://back-end-chupi-production.up.railway.app/${item?.imgSong}`
        : null,
  );

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedSong, setSelectedSong] = useState<File | null>(null);
  const dispatch = useAppDispatch();

  const handleSubmit = async (values: {
    songName: string;
    artist: string;
    duration: string;
    textSong: string;
  }) => {
    setIsLoading(true); // Начало загрузки
    const formData = new FormData();
    formData.append("songName", values.songName);
    formData.append("artist", values.artist);
    formData.append("duration", values.duration);
    formData.append("textSong", values.textSong);

    if (selectedImage) {
      formData.append("files", selectedImage);
    }

    if (selectedSong) {
      formData.append("files", selectedSong);
    }

    try {
      if (item) {
        await api
          .put(`/music/${item._id}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then(() => {
            toast.success("Трек успешно обновлен!");
          });
      } else {
        await api
          .post("/music", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then(() => {
            toast.success("Трек успешно добавлен!");
          });
      }
      setIsOpen(false); // Закрываем диалог после успешного создания/обновления
    } catch (e) {
      console.log(e);
      toast.error("Произошла ошибка при добавлении трека!");
    } finally {
      setIsLoading(false); // Конец загрузки
      dispatch(FetchMusic());
    }
  };

  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedSong(file);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <div onClick={() => setIsOpen(true)}>{children}</div>
        </DialogTrigger>
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
              artist: musicData.artist ? musicData.artist : "",
              duration: musicData.duration ? musicData.duration : "",
              textSong: musicData.textSong ? musicData.textSong : "",
            }}
            validateOnBlur={false}
            onSubmit={handleSubmit}
          >
            {({ handleSubmit }) => (
              <Form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  position: "relative",
                }}
                onSubmit={handleSubmit}
              >
                {isLoading && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      zIndex: 10,
                    }}
                  >
                    <CircularProgress />
                  </div>
                )}
                <Field
                  variant={"dark"}
                  label={"Название трека"}
                  name={"songName"}
                />
                <Field variant={"dark"} label={"Артист"} name={"artist"} />
                <Field
                  variant={"dark"}
                  label={"Текст трека"}
                  name={"textSong"}
                />
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
                  label="Загрузить изображение"
                  setSelectedFile={setSelectedImage}
                  setImageSrc={setImageSrc}
                />
                <InputFile
                  label="Загрузить песню"
                  setSelectedFile={setSelectedSong}
                  setImageSrc={() => {}} // Не требуется для песен, но нужно передать пустую функцию, чтобы типизация совпадала
                />
                <Field
                  variant={"dark"}
                  label={"Длительность"}
                  name={"duration"}
                />
                <DialogFooter>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Сохранение..." : "Сохранить"}
                  </Button>
                </DialogFooter>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateTrack;
