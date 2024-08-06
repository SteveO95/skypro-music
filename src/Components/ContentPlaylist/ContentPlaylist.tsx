import classNames from "classnames";
import styles from "./ContentPlaylist.module.css";
import PlayListItem from "../PlaylistItem/PlayListItem";
import { useState, useEffect, Key } from "react";
import { getTracks } from "../../api/tracks/tracks";
import { getTrackResponse, trackType } from "../../types";

type contentPlaylistProps = {
  setCurrentTrack: (item: trackType) => void;
};

export default function ContentPlaylist({ setCurrentTrack }: contentPlaylistProps) {
  const [tracks, setTracks] = useState<getTrackResponse>({
    error: null,
    data: undefined,
  });

  useEffect(() => {
    async function fetchTracks() {
      try {
        const response = await getTracks();
        setTracks({ error: null, data: response.data });
      } catch (error) {
        setTracks({ error: error.message, data: undefined });
      }
    }
    fetchTracks();
  }, []);

  return (
    <div className={classNames(styles.contentPlaylist, styles.playlist)}>
      {tracks.error && <p>Error: {tracks.error}</p>}
      {tracks.data?.map(
        (
          item: {
            id: number;
            name: string;
            author: string;
            release_date: string;
            genre: string;
            duration_in_seconds: number;
            album: string;
            logo: string | null;
            track_file: string;
            stared_user: {
              id: number;
              username: string;
              first_name: string;
              last_name: string;
              email: string;
            }[];
          },
          index: Key | null | undefined
        ) => (
          <PlayListItem onClick={() => { setCurrentTrack(item) }} key={index} item={item} />
        )
      )}
    </div>
  );
}
