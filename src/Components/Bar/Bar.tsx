"use client";
import Controls from "@/components/Controls/Controls";
import TrackPlay from "@/components/TrackPlay/TrackPlay";
import Volume from "@/components/Volume/Volume";
import styles from "./Bar.module.css";
import { useCallback, useEffect, useRef, useState } from "react";
import ProgressBar from "../ProgressBar/ProgressBar";
import { formatTime } from "@/utils/formatTime";
import { usePlayerState } from "@/contexts/PlayerStateContext";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { setNextTrack } from "@/store/features/playlistSlice";

const Bar = () => {
  const currentTrack = useAppSelector((state) => state.playlist.currentTrack);

  const [currentTime, setCurrentTime] = useState<number>(0);
  const { isPlaying, setIsPlaying } = usePlayerState();
  const [volume, setVolume] = useState<number>(0.5);
  const [isLoop, setIsLoop] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const duration = audioRef.current?.duration || 0;

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying((prev) => !prev);
    }
  };

  const toggleLoop = () => {
    if (audioRef.current) {
      if (!isLoop) {
        audioRef.current.loop = true;
      } else {
        audioRef.current.loop = false;
      }
    }
    setIsLoop((prev) => !prev);
  };

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Number(event.target.value);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const dispatch = useAppDispatch();

  const handleEnded = useCallback(() => {
    dispatch(setNextTrack());
  }, [dispatch]);

  useEffect(() => {
    if (audioRef.current && currentTrack) {
      const audio = audioRef.current;

      if (audio.src !== currentTrack.track_file) {
        audio.src = currentTrack.track_file || "";
      }
      audio.addEventListener("ended", handleEnded);

      if (isPlaying) {
        audio.play().catch((error) => {
          console.error("Playback error:", error);
        });
      } else {
        audio.pause();
      }

      return () => {
        audio.removeEventListener("ended", handleEnded);
      };
    }
  }, [currentTrack, handleEnded, isPlaying]);

  if (!currentTrack) {
    return null;
  }

  const { author, album, _id } = currentTrack;

  return (
    <div className={styles.bar}>
      <div className={styles.barContent}>
        <div className={styles.barTimer}>
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
        <audio
          src={currentTrack.track_file}
          ref={audioRef}
          onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        />
        <ProgressBar
          max={duration}
          value={currentTime}
          step={0.01}
          onChange={handleSeek}
        />
        <div className={styles.barPlayerBlock}>
          <div className={styles.barPlayer}>
            <Controls
              isPlaying={isPlaying}
              togglePlay={togglePlay}
              isLoop={isLoop}
              toggleLoop={toggleLoop}
            />
            <TrackPlay author={author} album={album} id={_id} />
          </div>
          <Volume
            step={0.01}
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
};

export default Bar;
