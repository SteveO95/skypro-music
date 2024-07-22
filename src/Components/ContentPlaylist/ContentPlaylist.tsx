
import classNames from "classnames";
import styles from "./ContentPlaylist.module.css";
import PlayListItem from "../PlaylistItem/PlayListItem";
import { getTracks } from "../../api/tracks/tracks";
import { trackType } from '../../types';

export default async function ContentPlaylist() {
  let tracks: trackType[] = [];
  try {
    const response = await getTracks();
    tracks = response.data;
  } catch (error) {}

  return (
    <div className={classNames(styles.contentPlaylist, styles.playlist)}>
      {tracks &&
        tracks.map((item) => (
          <PlayListItem key={item.id} item={item} /> 
        ))}
    </div>
  );
}