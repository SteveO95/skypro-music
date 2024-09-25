"use client";

import Main from "@/components/Main/Main";
import { getInitialPlaylist, setInitialPlaylist } from "@/store/features/trackSlice";

import { useAppDispatch, useAppSelector } from "@/store/store";
import { CustomCatalogType } from "@/types/customCatalog";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const customCatalogs = useAppSelector((store) => store.customCatalog.customCatalogs);
  const playlist = useAppSelector((store) => store.track.initialPlaylistState);

  const currentCatalog: CustomCatalogType | undefined = customCatalogs?.find((catalog) => {
    return catalog._id === parseInt(id);
  });

  useEffect(() => {
    const initialApp = async () => {
      let tracks = await dispatch(getInitialPlaylist()).unwrap();
      tracks = tracks.filter((track) => currentCatalog?.items.includes(track.id));
      dispatch(setInitialPlaylist(tracks));
    };

    initialApp();
  }, [currentCatalog, dispatch]);

  return <Main title={currentCatalog?.name || "Подборка"} />;
}
