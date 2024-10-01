"use client";

import CenterBlock from "@/components/CenterBlock/CenterBlock";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { getFavoriteTrack } from "@/store/features/playlistSlice";
import { useEffect, useState } from "react";

export default function Favorite() {
  const dispatch = useAppDispatch();
  const favorite = useAppSelector((state) => state.playlist.likedPlaylist);
  const tokens = useAppSelector((state) => state.user.tokens);

  useEffect(() => {
    if (tokens && tokens.access && tokens.refresh) {
      dispatch(
        getFavoriteTrack({ access: tokens.access, refresh: tokens.refresh })
      )
        .unwrap()
        .catch((error) => {
          console.error("Ошибка:", error.message);
        });
    } else {
      console.error("Ошибка избранного");
    }
  }, [dispatch, tokens]);

  const title = "Мои треки"
  return <CenterBlock tracks={favorite} title = {title}/>;
}
