import axios from "axios";

const baseURL = "back-end-chupi-ay31.vercel.app"; // Замените на ваш базовый URL

const api = axios.create({
  baseURL,
});

export const setAuthToken = (token: string | null) => {
  if (token) {
    // Установка токена в заголовке Authorization
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    // Если токена нет, удаляем заголовок Authorization
    delete api.defaults.headers.common["Authorization"];
  }
};

export default api;
