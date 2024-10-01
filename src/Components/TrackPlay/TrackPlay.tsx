import useLikeTrack from "@/hooks/useLikeTrack";
import styles from "./TrackPlay.module.css";

type TrackPlayProps = {
  author: string;
  album: string;
  id: number;
};

const TrackPlay = ({ author, album, id }: TrackPlayProps) => {
  const { isLiked, handleLike } = useLikeTrack(id);

  return (
    <div className={styles.playerTrackPlay}>
      <div className={styles.trackPlayContain}>
        <div className={styles.trackPlayImage}>
          <svg className={styles.trackPlaySvg}>
            <use xlinkHref="/img/icon/sprite.svg#icon-note" />
          </svg>
        </div>
        <div className={styles.trackPlayAuthor}>
          <a className={styles.trackPlayAuthorLink} href="http://">
            {author}
          </a>
        </div>
        <div className={styles.trackPlayAlbum}>
          <a className={styles.trackPlayAlbumLink} href="http://">
            {album}
          </a>
        </div>
      </div>
      <div className={styles.trackPlayLikeDis}>
        <div className={styles.trackPlayLike} onClick={handleLike}>
          {isLiked ? (
            <svg className={styles.trackPlayLikeSvg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-like" />
            </svg>
          ) : (
            <svg className={styles.trackPlayLikeSvg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-dislike" />
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackPlay;
