"use client";
import React, { useEffect, useState } from "react";
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
import styles from "@/app/(mainSite)/profile/components/EditForm/EditForm.module.scss";
import InputFile from "@/app/_common/InputFile/InputFile";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ArtistType, FetchArtist } from "@/redux/slices/artistSlice";
import api from "@/constants/axiosBase";
import { RootState } from "@/redux/rootReducers";
import { useParams, useRouter } from "next/navigation";
import { FetchAlbums } from "@/redux/slices/albumsSlice";

const CreateAlbums = ({ children }: { children?: string }) => {
  const [name, setName] = useState<string>();
  const { id } = useParams();
  const userRole = useAppSelector(
    (state: RootState) => state.UserSlice.user?.userData?.role,
  );
  const router = useRouter();
  const [selected, setSelectedFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>("");
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (id) {
      api.get(`/albums/${id}`).then(
        ({
          data,
        }: {
          data: {
            artist: {
              name: string;
              image: string;
            };
          };
        }) => {
          if (data?.artist) {
            setName(data.artist.name);
            setImageSrc(
              `https://back-end-chupi-production.up.railway.app/${data.artist.image}`,
            );
          }
          console.log(data);
        },
      );
    }
  }, [id]);

  const handleSubmit = async (values: { name: string }) => {
    const formData = new FormData();
    formData.append("name", values.name);
    if (selected) {
      formData.append("file", selected);
    }
    try {
      id
        ? await api.put(`/album/${id}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
        : await api.post("/album", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
      dispatch(FetchAlbums());
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      {userRole === "admin" && (
        <Dialog>
          <DialogTrigger>
            <Button children={children} />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Добавить Альбом</DialogTitle>
              <DialogDescription>
                Внесите данные и нажмите сохранить
              </DialogDescription>
            </DialogHeader>
            <Formik
              initialValues={{
                name: name ? name : "",
                image: imageSrc ? imageSrc : "",
              }}
              validateOnBlur={false}
              onSubmit={handleSubmit}
            >
              <Form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <Field
                  variant={"dark"}
                  label={"Название альбома"}
                  name={"name"}
                />
                {imageSrc !== "" && (
                  <img
                    className={styles.profileImage}
                    src={imageSrc || ""}
                    alt={"album"}
                    width={120}
                    height={120}
                  />
                )}
                <InputFile
                  setSelectedFile={setSelectedFile}
                  setImageSrc={setImageSrc}
                  label={"Выбрать фото"}
                />
                <DialogFooter>
                  <Button type="submit">Сохранить</Button>
                </DialogFooter>
              </Form>
            </Formik>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default CreateAlbums;
