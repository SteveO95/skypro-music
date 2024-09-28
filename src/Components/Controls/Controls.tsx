import { useAppDispatch, useAppSelector } from "@/hooks";
import styles from "./Controls.module.css";
import {
  setIsShuffle,
  setNextTrack,
  setPrevTrack,
} from "@/store/features/playlistSlice";

type ControlProps = {
  isPlaying: boolean;
  togglePlay: () => void;
  isLoop: boolean;
  toggleLoop: () => void;
};

const Controls = ({
  isPlaying,
  togglePlay,
  isLoop,
  toggleLoop,
}: ControlProps) => {
  const isShuffle = useAppSelector((state) => state.playlist.isShuffle);

  const dispatch = useAppDispatch();

  return (
    <div className={styles.playerControls}>
      <div
        onClick={() => dispatch(setPrevTrack())}
        className={styles.playerBtnPrev}
      >
        <svg className={styles.playerBtnPrevSvg}>
          <use xlinkHref="/img/icon/sprite.svg#icon-prev" />
        </svg>
      </div>
      <div onClick={togglePlay} className={styles.playerBtnPlay}>
        {isPlaying ? (
          <svg className={styles.playerBtnPlaySvg}>
            <use xlinkHref="/img/icon/sprite.svg#icon-pause" />
          </svg>
        ) : (
          <svg className={styles.playerBtnPlaySvg}>
            <use xlinkHref="/img/icon/sprite.svg#icon-play" />
          </svg>
        )}
      </div>
      <div
        onClick={() => dispatch(setNextTrack())}
        className={styles.playerBtnNext}
      >
        <svg className={styles.playerBtnNextSvg}>
          <use xlinkHref="/img/icon/sprite.svg#icon-next" />
        </svg>
      </div>
      <div onClick={toggleLoop} className={styles.playerBtnRepeat}>
        {!isLoop ? (
          <svg className={styles.playerBtnRepeatSvg}>
            <use xlinkHref="/img/icon/sprite.svg#icon-repeat" />
          </svg>
        ) : (
          <svg className={styles.playerBtnRepeatSvg}>
            <use xlinkHref="/img/icon/sprite.svg#icon-repeat-active" />
          </svg>
        )}
      </div>

      <div
        onClick={() => dispatch(setIsShuffle(!isShuffle))}
        className={styles.playerBtnShuffle}
      >
        {!isShuffle ? (
          <svg className={styles.playerBtnShuffleSvg}>
            <use xlinkHref="/img/icon/sprite.svg#icon-shuffle" />
          </svg>
        ) : (
          <svg className={styles.playerBtnShuffleSvg}>
            <use xlinkHref="/img/icon/sprite.svg#icon-shuffle-active" />
          </svg>
        )}
      </div>
    </div>
  );
};

export default Controls;
