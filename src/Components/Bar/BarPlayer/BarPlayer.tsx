import classNames from "classnames";
import styles from "./BarPlayer.module.css";
import BarPlayerControls from "./BarPlayerControls/BarPlayerControls";
import BarPlayerTrackPlay from "./BarPlayerTrackPlay/BarPlayerTrackPlay";
import { TrackType } from "@/types/tracks";

type BarPlayerProps = {
  track: TrackType | undefined;
  isPlaying: boolean;
  togglePlay: () => void;
  isRepeat: boolean;
  toggleRepeat: () => void;
  currentTime: number;
  duration: number;
};

const BarPlayer = ({
  track,
  isPlaying,
  togglePlay,
  isRepeat,
  toggleRepeat,
  currentTime,
  duration,
}: BarPlayerProps) => {
  return (
    <div className={classNames(styles.barPlayer, "player")}>
      <BarPlayerControls
        isPlaying={isPlaying}
        togglePlay={togglePlay}
        isRepeat={isRepeat}
        toggleRepeat={toggleRepeat}
      />
      <BarPlayerTrackPlay
        id={track?.id || 0}
        name={track?.name || ""}
        author={track?.author || ""}
        currentTime={currentTime || 0}
        duration={duration || 0}
      />
    </div>
  );
};

export default BarPlayer;
