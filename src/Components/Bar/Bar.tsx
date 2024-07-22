"use client";
import classNames from "classnames";
import styles from "./Bar.module.css";
import BarVolumeBlock from "@components/BarVolumeBlock/BarVolumeBlock";
import { trackType } from "../../types";
import { useState } from "react";
import { useRef } from "react";
import ProgressBar from "@components/ProgressBar/ProgressBar";
import { formatTime } from './../../lib/formatTime';
type barProps = {
  currentTrack: trackType | null;
};
export default function Bar({ currentTrack }: barProps) {
  if (!currentTrack) {
    return;
  }
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);
  const duration = audioRef.current?.duration || 0;
  const [isLoop, setIsLoop] = useState(false);
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  function changeProgressBar(e: React.ChangeEvent<HTMLInputElement>) {
    if (audioRef.current) {
      audioRef.current.currentTime = Number(e.target.value);
    }
  }
  const handleLoop = () => {
    if (audioRef.current) {
      audioRef.current.loop = !isLoop;
      setIsLoop(!isLoop);
    }
  };
  
  return (
    <div className={styles.bar}>
      <audio
        autoPlay
        src={currentTrack.track_file}
        ref={audioRef}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
      />
      <div className={styles.barContent}>
        <div>{formatTime(currentTime)}/{formatTime(duration)}</div>
        <ProgressBar
          max={duration}
          value={currentTime}
          step={0.01}
          onChange={changeProgressBar}
        />
        <div className={styles.barPlayerBlock}>
          <div className={classNames(styles.barPlayer, styles.player)}>
            <div className={styles.playerControls}>
              <div className={styles.playerBtnPrev}>
                <svg
                  onClick={() => alert("Еще не реализовано!")}
                  className={styles.playerBtnPrevSvg}
                >
                  <use href="/img/icon/sprite.svg#icon-prev"></use>
                </svg>
              </div>
              <div
                onClick={togglePlay}
                className={classNames(styles.playerBtnPlay, styles._btn)}
              >
                <svg className={styles.playerBtnPlaySvg}>
                  {!isPlaying ? (
                    <use href="/img/icon/sprite.svg#icon-play"></use>
                  ) : (
                    <use href="/img/icon/sprite.svg#icon-pause"></use>
                  )}
                </svg>
              </div>
              <div className={styles.playerBtnNext}>
                <svg className={styles.playerBtnNextSvg}>
                  <use
                    onClick={() => alert("Еще не реализовано!")}
                    href="/img/icon/sprite.svg#icon-next"
                  ></use>
                </svg>
              </div>
              <div
                onClick={handleLoop}
                className={classNames(styles.playerBtnRepeat, styles._btnIcon)}
              >
                {" "}
                {!isLoop ? (
                  <svg className={styles.playerBtnRepeatSvg}>
                    <use href="/img/icon/sprite.svg#icon-repeat"></use>
                  </svg>
                ) : (
                  <svg className={styles.playerBtnRepeatSvgActive}>
                    <use href="/img/icon/sprite.svg#icon-repeat"></use>
                  </svg>
                )}
              </div>
              <div
                onClick={() => alert("Еще не реализовано!")}
                className={classNames(styles.playerbtnshuffle, styles._btnicon)}
              >
                <svg className={styles.playerBtnShuffleSvg}>
                  <use href="/img/icon/sprite.svg#icon-shuffle"></use>
                </svg>
              </div>
            </div>

            <div
              className={classNames(styles.playerTrackPlay, styles.trackPlay)}
            >
              <div className={styles.trackPlayContain}>
                <div className={styles.trackPlayImage}>
                  <svg className={styles.trackPlaySvg}>
                    <use href="/img/icon/sprite.svg#icon-note"></use>
                  </svg>
                </div>
                <div className={styles.trackPlayAuthor}>
                  <a className={styles.trackPlayAuthorLink} href="http://">
                    {currentTrack.author}
                  </a>
                </div>
                <div className={styles.trackPlayAlbum}>
                  <a className={styles.trackPlayAlbumLink} href="http://">
                    {currentTrack.album}
                  </a>
                </div>
              </div>
            </div>

            <div className={styles.trackPlayLikeDis}>
              <div
                className={classNames(styles.trackPlayLike, styles._btnIcon)}
              >
                <svg className={styles.trackPlayLikeSvg}>
                  <use href="/img/icon/sprite.svg#icon-like"></use>
                </svg>
              </div>
              <div
                className={classNames(styles.trackPlayDislike, styles._btnIcon)}
              >
                <svg className={styles.trackPlayDislikeSvg}>
                  <use href="/img/icon/sprite.svg#icon-dislike"></use>
                </svg>
              </div>
            </div>
          </div>
          <BarVolumeBlock audioRef={audioRef} />
        </div>
      </div>
    </div>
  );
}
