import { getTrackResponse } from "../../types";

export function getTracks(): Promise<getTrackResponse> {
  return fetch("https://skypro-music-api.skyeng.tech/catalog/track/all/")
    .then((res) => {
      
      if (res.ok===!true) {
        throw new Error("Данные не получены");
      }

      return res.json();
    })
    .then((res) => {
      return {
        error: undefined,
        data: res,
      };
    })
    .catch((error: Error) => {
      return { error: error.message, data: undefined };
    });
}
