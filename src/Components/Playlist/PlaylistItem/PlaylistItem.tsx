"use client";

import classNames from "classnames";
import styles from "./PlaylistItem.module.css";
import { TrackType } from "@/types/tracks";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { setTrack } from "@/store/features/trackSlice";
import { serializeTrackTime } from "@/helpers/serializeTrackTime";
import useLikeTrack from "@/hooks/useLikeTrack";

type Props = {
  track: TrackType;
};

const PlaylistItem = ({ track }: Props) => {
  const currentTrack = useAppSelector((state) => state.track.currentTrackState);
  const isPlaying = useAppSelector((state) => state.track.isPlayingState);
  const dispatch = useAppDispatch();
  const { isLiked, handleLike } = useLikeTrack(track.id);

  const { name, author, album, duration_in_seconds } = track;

  const trackTitleImageClass = classNames({
    [styles.trackTitleImage]: true,
    [styles.selected]: track.id === currentTrack?.id,
    [styles.playing]: isPlaying,
  });

  return (
    <div onClick={() => dispatch(setTrack(track))} className={styles.playlistItem}>
      <div className={styles.track}>
        <div className={styles.trackTitle}>
          <div className={trackTitleImageClass}>
            <svg className={styles.trackTitleSvg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-note" />
            </svg>
          </div>
          <div className={styles.trackTitleText}>
            <span className={styles.trackTitleLink}>{name}</span>
          </div>
        </div>
        <div className={styles.trackAuthor}>
          <span className={styles.trackAuthorLink}>{author}</span>
        </div>
        <div className={styles.trackAlbum}>
          <span className={styles.trackAlbumLink}>{album}</span>
        </div>
        <div className={styles.trackTime} onClick={handleLike}>
          <svg className={styles.trackTimeSvg}>
            {isLiked ? (
              <use xlinkHref="/img/icon/sprite.svg#icon-like-submited" />
            ) : (
              <use xlinkHref="/img/icon/sprite.svg#icon-like" />
            )}
          </svg>
          <span className={styles.trackTimeText}>{serializeTrackTime(duration_in_seconds)}</span>
        </div>
      </div>
    </div>
  );
};

export default PlaylistItem;
