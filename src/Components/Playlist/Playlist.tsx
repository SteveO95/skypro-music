import styles from "./Playlist.module.css";
import PlaylistItem from "./PlaylistItem/PlaylistItem";
import classNames from "classnames";
import PlaylistItemSkeleton from "./PlaylistItem/PlaylistItemSkeleton";
import { useAppSelector } from "@/store/store";

const Playlist = () => {
  const tracks = useAppSelector((state) => state.track.currentPlaylistState);

  return (
    <div className={styles.playlistContent}>
      <div className={styles.playlistTitle}>
        <div className={classNames(styles.playlistTitleCol, styles.col01)}>Трек</div>
        <div className={classNames(styles.playlistTitleCol, styles.col02)}>Исполнитель</div>
        <div className={classNames(styles.playlistTitleCol, styles.col03)}>Альбом</div>
        <div className={classNames(styles.playlistTitleCol, styles.col04)}>
          <svg className={styles.playlistTitleSvg}>
            <use xlinkHref="/img/icon/sprite.svg#icon-watch" />
          </svg>
        </div>
      </div>
      <div className={styles.playlist}>
        {tracks === undefined && <PlaylistItemSkeleton items={20} />}
        {Array.isArray(tracks) &&
          tracks.map((track) => <PlaylistItem key={track.id} track={track} />)}
        {Array.isArray(tracks) && tracks.length === 0 && "Треки не найдены"}
      </div>
    </div>
  );
};

export default Playlist;
