"use client";
import { getPlaylist } from "@/api/playlist";
import styles from "./Main.module.css";
import CenterBlock from "@/components/CenterBlock/CenterBlock";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/hooks";
import { setInitialTracks } from "@/store/features/playlistSlice";

const Main = () => {
  const [tracks, setTracks] = useState([]);
  const [error, setError] = useState("");

  const dispatch = useAppDispatch();

  useEffect(() => {
    getPlaylist()
      .then((data) => {
        setTracks(data);
        dispatch(setInitialTracks(data));
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [dispatch]);

  return (
    <main className={styles.main}>
      <CenterBlock tracks={tracks} error={error} />
    </main>
  );
};

export default Main;
