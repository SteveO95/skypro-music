import styles from "./BarPlayerProgress.module.css";

type PlayerProgressProps = {
  max: number;
  value: number;
  step: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const BarPlayerProgress = ({ max, value, step, onChange }: PlayerProgressProps) => {
  return (
    <input
      className={styles.barPlayerProgress}
      type="range"
      min={0}
      max={max}
      value={value}
      step={step}
      onChange={onChange}
    />
  );
};

export default BarPlayerProgress;
