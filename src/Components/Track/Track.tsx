"use client";

import { PlaylistType } from "@/types/playlist";
import styles from "./Track.module.css";
import { formatTime } from "@/utils/formatTime";
import { usePlayerState } from "@/contexts/PlayerStateContext";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setCurrentTrack } from "@/store/features/playlistSlice";
import useLikeTrack from "@/hooks/useLikeTrack";

type TrackProps = {
  track: PlaylistType;
  tracks: PlaylistType[];
};

const Track = ({ track, tracks }: TrackProps) => {
  const { name, author, album, duration_in_seconds } = track;

  const dispatch = useAppDispatch();
  const { isLiked, handleLike } = useLikeTrack(track._id);
  const { isPlaying, setIsPlaying } = usePlayerState();
  const currentTrack = useAppSelector((state) => state.playlist.currentTrack);

  const handleTrackClick = () => {
    dispatch(setCurrentTrack({ track, tracks }));
    setIsPlaying(true);
  };

  const isCurrentTrack = currentTrack?._id === track._id;

  return (
    <div className={styles.playlistItem}>
      <div className={styles.playlistTrack}>
        <div onClick={handleTrackClick} className={styles.trackTitle}>
          <div className={styles.trackTitleImage}>
            {isCurrentTrack ? (
              <div
                className={isPlaying ? styles.playingDot : styles.activeDot}
              />
            ) : (
              <svg className={styles.trackTitleSvg}>
                <use xlinkHref="/img/icon/sprite.svg#icon-note" />
              </svg>
            )}
          </div>
          <div className="track__title-text">
            <span className={styles.trackTitleLink}>
              {name}
              <span className={styles.trackTitleSpan} />
            </span>
          </div>
        </div>
        <div className={styles.trackAuthor}>
          <span className={styles.trackAuthorLink}>{author}</span>
        </div>
        <div className={styles.trackAlbum}>
          <span className={styles.trackAlbumLink}>{album}</span>
        </div>
        <div onClick={handleLike}>
          {isLiked ? (
            <svg className={styles.trackTimeSvg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-like" />
            </svg>
          ) : (
            <svg className={styles.trackTimeSvg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-dislike" />
            </svg>
          )}
          <span className={styles.trackTimeText}>
            {formatTime(duration_in_seconds)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Track;
