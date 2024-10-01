import { useRef } from "react";
import styles from "./Volume.module.css";
import { useAppSelector } from "@/hooks";
// import { useCurrentTrack } from "@/contexts/CurrentTrackProvider";

type VolumeProps = {
  step: number;
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Volume = ({ step, value, onChange }: VolumeProps) => {
  // const { currentTrack } = useCurrentTrack();
  const currentTrack = useAppSelector((state) => state.playlist.currentTrack);

  const audioRef = useRef<HTMLAudioElement>(null);

  if (!currentTrack) {
    return null;
  }

  return (
    <div className={styles.barVolumeBlock}>
      <div className={styles.volumeContent}>
        <div className={styles.volumeImage}>
          <svg className={styles.volumeSvg}>
            <use xlinkHref="/img/icon/sprite.svg#icon-volume" />
          </svg>
        </div>
        <div className={styles.volumeProgress}>
          <audio ref={audioRef} src={currentTrack.track_file}></audio>
          <input
            className={styles.volumeProgress}
            name="range"
            type="range"
            min={0}
            max={1}
            step={step}
            value={value}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Volume;
