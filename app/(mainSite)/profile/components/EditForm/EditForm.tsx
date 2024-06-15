import React, { useState } from "react";
import { Form, Formik } from "formik";
import styles from "./EditForm.module.scss";
import InputFile from "@/app/_common/InputFile/InputFile";
import { Field } from "@/app/_common/Form/Field/Field";
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
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/rootReducers";
import { validationSchema } from "@/app/(mainSite)/profile/components/EditForm/constants";
import api from "@/constants/axiosBase";
import { setProfile } from "@/redux/slices/userSlice";
import { toast } from "react-toastify";

const EditForm = () => {
  const user = useAppSelector(
    (state: RootState) => state.UserSlice.user?.userData,
  );
  const [open, setOpen] = useState(false);
  const file = useAppSelector((state: RootState) => state.UserSlice.user?.file);
  const [imageSrc, setImageSrc] = useState<string | null>(
    user?.image && user.image !== ""
      ? `https://back-end-chupi-production.up.railway.app/${user?.image}`
      : "https://news.store.rambler.ru/img/8216a3fa1bdcc02143a78295811e74ac?img-format=auto&img-1-resize=height:400,fit:max&img-2-filter=sharpen",
  );
  const [selected, setSelectedFile] = useState<File | null>(file ? file : null);
  const dispatch = useAppDispatch();
  const InitialValues = {
    username: user ? user.username : "",
    email: user ? user.email : "",
  };
  const handleSubmit = async (values: { username: string; email: string }) => {
    const formData = new FormData();
    formData.append("username", values.username);
    formData.append("email", values.email);
    if (selected) {
      formData.append("file", selected);
    }
    if (user) {
      try {
        const response = await api.put(`user/update/${user._id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        dispatch(setProfile(response.data));
        localStorage.setItem("token", response.data.token);
        toast.success("Успешно сохранено");
        setOpen(false);
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setOpen(true)}
          variant={"outline"}
          children={"Изменить"}
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Редактировать профиль</DialogTitle>
          <DialogDescription>
            Внесите изменения и нажмите сохранить
          </DialogDescription>
        </DialogHeader>
        <Formik
          initialValues={InitialValues}
          validateOnBlur={false}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <Form className={styles.form}>
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
              label={"Добавить фото"}
            />
            <Field
              variant={"dark"}
              label={"Имя пользователя"}
              name={"username"}
            />
            <Field variant={"dark"} label={"email"} name={"email"} />
            <DialogFooter>
              <Button type={"submit"} children={"Сохранить"} />
            </DialogFooter>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default EditForm;
