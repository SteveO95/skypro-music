"use client";

import Main from "@/components/Main/Main";
import useUserAuth from "@/hooks/useUserAuth";
import { getInitialPlaylist, setPlaylistType } from "@/store/features/trackSlice";
import { useAppDispatch } from "@/store/store";
import { useEffect } from "react";

export default function Page() {
  const dispatch = useAppDispatch();
  const { checkLogin } = useUserAuth();

  useEffect(() => {
    const initialApp = async () => {
      await dispatch(getInitialPlaylist());
      await dispatch(setPlaylistType("All"));
      await checkLogin();
    };

    initialApp();
  }, []);

  return <Main title={"Треки"} />;
}
