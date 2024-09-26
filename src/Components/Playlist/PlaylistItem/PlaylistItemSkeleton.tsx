import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./PlaylistItem.module.css";

interface Props {
  items?: number;
}

const PlaylistItemSkeleton = ({ items = 1 }: Props) => {
  let tracks: Array<any> = [];
  for (let i = 1; i <= items; i++) {
    tracks = [
      ...tracks,
      <div data-testid="playlist-item" className={styles.playlistItem} key={i}>
        <div className={styles.track}>
          <div className={styles.trackTitle}>
            <div className={styles.trackTitleImage}>
              <svg className={styles.trackTitleSvg}>
                <use xlinkHref="/img/icon/sprite.svg#icon-note" />
              </svg>
            </div>
            <div className={styles.trackTitleText}>
              <span className={styles.trackTitleLink}>
                <Skeleton width={300} />
              </span>
            </div>
          </div>
          <div className={styles.trackAuthor}>
            <Skeleton className={styles.trackAuthorLink} width={200} />
          </div>
          <div className={styles.trackAlbum}>
            <Skeleton className={styles.trackAlbumLink} width={200} />
          </div>
          <div className={styles.trackTime}>
            <svg className={styles.trackTimeSvg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-like" />
            </svg>
            <Skeleton className={styles.trackTimeText} width={40} />
          </div>
        </div>
      </div>,
    ];
  }
  return <>{tracks}</>;
};

export default PlaylistItemSkeleton;
