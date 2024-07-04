"use client";
import styles from "../ContentPlaylist/ContentPlaylist.module.css";
import PlayListItem from "../PlaylistItem/PlayListItem";
import classNames from "classnames";
import { useState, useEffect } from "react";
import { getTracks } from "../../api/tracks/tracks";
// import { getTrackResponse } from "../../types";

// eslint-disable-next-line @next/next/no-async-client-component
export default async function ContentPlaylist() {
  const tracks = await getTracks();

  return (
    <div className={classNames(styles.contentPlaylist, styles.playlist)}>
      {tracks?.data?.map((item, index) => (
        <PlayListItem key={index} item={item} />
      ))}
    </div>
  );
}