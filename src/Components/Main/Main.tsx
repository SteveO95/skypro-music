"use client";

import Bar from "../Bar/Bar";
import CenterBlock from "../CenterBlock/CenterBlock";
import MainSlideBar from "../MainSlideBar/MainSlideBar";
import Nav from "../Nav/Nav";
import styles from "../Main/Main.module.css";
import { useState, useEffect } from "react";
import { trackType } from "../../types";

export default function Main() {
  const [currentTrack, setCurrentTrack] = useState<trackType | null>();
  return (
    <>
      <main className={styles.main}>
        <Nav />
        <CenterBlock setCurrentTrack={setCurrentTrack} />
        <MainSlideBar />
      </main>
      {currentTrack? <Bar currentTrack={currentTrack} /> : ""}
      <footer> </footer>
    </>
  );
}