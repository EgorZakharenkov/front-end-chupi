"use client";
import React from "react";
import { Form, Formik, FormikHelpers } from "formik";
import { Field } from "@/app/_common/Form/Field/Field";
import styles from "./CustomForm.module.scss";
import Link from "next/link";
import { fetchRegister, fetchUserData } from "@/redux/slices/userSlice";
import { useAppDispatch } from "@/redux/hooks";
import {
  initialValues,
  validationSchema,
} from "@/app/(auth)/components/constants";
import { useRouter } from "next/navigation";

interface Values {
  username?: string;
  email: string;
  password: string;
}
interface ValuesLogin {
  email: string;
  password: string;
}
export const CustomForm: React.FC<{ register?: boolean }> = ({
  register = false,
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleSubmitRegister = async (
    values: Values,
    { setSubmitting }: FormikHelpers<Values>,
  ) => {
    const data = await dispatch(fetchRegister(values));
    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
    if (!data.payload) {
      alert("Не удалось зарегистрироваться");
      return;
    }
    router.push("/");
  };
  const handleSubmitLogin = async (values: ValuesLogin) => {
    const data = await dispatch(fetchUserData(values));
    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
    if (!data.payload) {
      alert("Не удалось войти");
    } else {
      router.push("/");
    }
  };
  return (
    <div className={styles.form}>
      <div className={styles.wrapperForm}>
        <h2>Добро пожаловать!</h2>
        <Formik
          initialValues={register ? initialValues : { email: "", password: "" }}
          onSubmit={register ? handleSubmitRegister : handleSubmitLogin}
          validationSchema={validationSchema}
        >
          <Form className={styles.wrapperFields}>
            {register && (
              <Field label={"Имя"} name={"username"} type={"text"} />
            )}
            <Field label={"Email"} name={"email"} type={"email"} />
            <Field label={"Пароль"} name={"password"} type={"password"} />
            <button type={"submit"}>
              {register ? "Зарегистрироваться" : "Войти"}
            </button>
            <span>
              {register ? "Уже есть аккаунт ?" : "Нет аккаунта ?"}{" "}
              <Link href={register ? "/login" : "/register"}>
                {register ? "Войти" : "Зарегистрироваться"}
              </Link>
            </span>
          </Form>
        </Formik>
      </div>
    </div>
  );
};
