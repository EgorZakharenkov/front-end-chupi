import axios from "axios";

const baseURL = "http://localhost:4444"; // Замените на ваш базовый URL

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
