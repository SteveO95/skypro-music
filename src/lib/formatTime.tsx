export const formatTime = (seconds:number) => {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = Math.floor(seconds % 60);
    return `${minutes}:${secondsLeft.toString().padStart(2, "0")}`;
  };