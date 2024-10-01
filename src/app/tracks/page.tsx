"use client";
import Main from "@/components/Main/Main";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { getFavoriteTrack } from "@/store/features/playlistSlice";
import { useEffect } from "react";

export default function Home() {
  const dispatch = useAppDispatch();
  const tokens = useAppSelector((state) => state.user.tokens);

  useEffect(() => {
    if (tokens) {
      dispatch(
        getFavoriteTrack({ access: tokens.access, refresh: tokens.refresh })
      );
    }
  }, [tokens, dispatch]);
  return <Main />;
}
