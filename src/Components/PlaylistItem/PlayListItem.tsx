import styles from "../PlaylistItem/PlayListItem.module.css";
import classNames from "classnames";
import { trackType } from "../../types";
import { formatTime } from './../../lib/formatTime';

type trackTypeProps = {
  item: trackType;
  onClick:()=>void;
};
export default function PlayListItem({ item,onClick }: trackTypeProps) {
  return (
    <div onClick={onClick} className={styles.playlistItem}>
      <div className={classNames(styles.playlistTrack, styles.track)}>
        <div className={styles.trackTitle}>
          <div className={styles.trackTitleImage}>
            <svg className={styles.trackTitleSvg}>
              <use href="/img/icon/sprite.svg#icon-note"></use>
            </svg>
          </div>
          <div className={styles.trackTitleText}>
            <span className={styles.trackTitleLink}>
              {item.name} <span className={styles.trackTitleSpan}></span>
            </span>
          </div>
        </div>
        <div className={styles.trackAuthor}>
          <span className={styles.trackAuthorLink}>
            {item.author}
          </span>
        </div>
        <div className={styles.trackAlbum}>
          <span className={styles.trackAlbumLink}>
            {item.album}
          </span>
        </div>
        <div className={styles.trackTime}>
          <svg className={styles.trackTimeSvg}>
            <use href="/img/icon/sprite.svg#icon-like"></use>
          </svg>
          <span className={styles.trackTimeText}>
            {formatTime(item.duration_in_seconds)}
          </span>
        </div>
      </div>
    </div>
  );
}
