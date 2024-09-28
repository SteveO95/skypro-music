export function formatTime(seconds: number) {
    const formattedMinutes = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const formattedSeconds = Math.floor(seconds % 60)
      .toString()
      .padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  }