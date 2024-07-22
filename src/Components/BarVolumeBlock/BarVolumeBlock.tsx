
import styles from "@components/BarVolumeBlock/BarVolumeBlock.module.css";
import classNames from "classnames";
import { useEffect, useState } from "react";

export default function BarVolumeBlock({ audioRef }: any) {
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);
  return (
    <div className={classNames(styles.barVolumeBlock, styles.volume)}>
      <div className={styles.volumeContent}>
        <div className={styles.volumeImage}>
          <svg className={styles.volumeSvg}>
            <use href="/img/icon/sprite.svg#icon-volume"></use>
          </svg>
        </div>
        <div className={classNames(styles.volumeProgress, styles._btn)}>
          <input
            value={volume}
            onChange={(e: any) => setVolume(e.target.value)}
            step={0.01}
            min={0}
            max={1}
            className={classNames(styles.volumeProgressLine, styles._btn)}
            type="range"
            name="range"
          />
        </div>
      </div>
    </div>
  );
}
