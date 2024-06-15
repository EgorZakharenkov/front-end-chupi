import React from "react";
import styles from "@/app/_common/SideBar/components/MenuPlayList/MenuPlayList.module.scss";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaPlus } from "react-icons/fa";
import { Form, Formik } from "formik";
import { validationSchema } from "@/app/_common/SideBar/components/MenuPlayList/constants";
import { Field } from "@/app/_common/Form/Field/Field";
import { Button } from "@/components/ui/button";
import api from "@/constants/axiosBase";
import { FetchPLayList } from "@/redux/slices/playListSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/rootReducers";

const HeaderPlayLists = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(
    (state: RootState) => state.UserSlice.user?.userData,
  );
  const handleSubmit = async (values: { name: string }) => {
    const CreateData = {
      name: values.name,
      creator: user?._id,
    };
    try {
      await api.post("/playlist/create", CreateData);
      if (user) {
        dispatch(FetchPLayList(user._id));
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className={styles.namePlayList}>
      <p>Плейлисты</p>
      <Dialog>
        <DialogTrigger asChild>
          <i>
            <FaPlus />
          </i>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Создать плейлист</DialogTitle>
            <DialogDescription>
              Введите название для вашего плейлиста
            </DialogDescription>
          </DialogHeader>
          <Formik
            initialValues={{
              name: "",
            }}
            validateOnBlur={false}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            <Form>
              <Field variant={"dark"} label={"Название"} name={"name"} />
              <DialogFooter>
                <Button type="submit">Сохранить</Button>
              </DialogFooter>
            </Form>
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HeaderPlayLists;
