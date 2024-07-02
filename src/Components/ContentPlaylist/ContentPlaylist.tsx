"use client";
import styles from "../ContentPlaylist/ContentPlaylist.module.css";
import PlayListItem from "../PlaylistItem/PlayListItem";
import classNames from "classnames";
import { useState, useEffect } from "react";
import { getTracks } from "../../api/tracks/tracks";
import { getTrackResponse } from "../../types";

export default function ContentPlaylist() {
  const [tracks, setTracks] = useState<getTrackResponse>({
    error: undefined,
    data: undefined,
  });
  useEffect(() => {
    getTracks().then((res) => {
      setTracks(res);
    });
  }, []);
  // console.log(tracks);
  return (
    <div className={classNames(styles.contentPlaylist, styles.playlist)}>
      {tracks?.data?.map((item, index) => (
        <PlayListItem key={index} item={item} />
      ))}
    </div>
  );
}
