import { getTrackResponse } from "../../types";

export function getTracks(): Promise<getTrackResponse> {
  return fetch("https://skypro-music-api.skyeng.tech/catalog/track/all/")
    .then((res) => {
      // Проверяем, что запрос выполнен успешно
      if (!res.ok) {
        throw new Error("Данные не получены");
      }
      return res.json();
    })
    .then((res) => {
      // Возвращаем объект с данными и без ошибки
      return {
        error: null,
        data: res,
      };
    })
    .catch((error: Error) => {
      // Возвращаем объект с ошибкой и без данных
      return { error: error.message, data: null };
    });
}