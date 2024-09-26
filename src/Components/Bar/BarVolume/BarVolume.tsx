import classNames from "classnames";
import styles from "./BarVolume.module.css";

type VolumeProps = {
  value: number;
  step: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const BarVolume = ({ value, step, onChange }: VolumeProps) => {
  return (
    <div className={styles.volume}>
      <div className={styles.volumeContent}>
        <div className={styles.volumeImage}>
          <svg className={styles.volumeSvg}>
            <use xlinkHref="/img/icon/sprite.svg#icon-volume" />
          </svg>
        </div>
        <div className={classNames(styles.volumeProgress, "_btn")}>
          <input
            className={classNames(styles.volumeProgressLine, "_btn")}
            type="range"
            min={0}
            max={1}
            value={value}
            step={step}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
};

export default BarVolume;
