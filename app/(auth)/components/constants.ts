import * as Yup from "yup";

export const initialValues = {
  username: "",
  email: "",
  password: "",
};
export const validationSchema = Yup.object({
  email: Yup.string()
    .email("Некорректный адрес электронной почты")
    .required("Обязательное поле"),
  password: Yup.string()
    .min(1, "Пароль должен содержать минимум 1 символов")
    .required("Обязательное поле"),
});
