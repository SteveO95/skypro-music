export function serializeTrackTime(time: string | number): string {
  let seconds: number;
  let minutes: number;

  seconds = typeof time === "string" ? parseInt(time) : time;
  seconds = isNaN(seconds) || seconds < 0 || seconds > Number.MAX_SAFE_INTEGER ? 0 : seconds;

  minutes = Math.floor(seconds / 60);
  seconds = Math.floor(seconds % 60);

  return addLeadingZero(minutes) + ":" + addLeadingZero(seconds);
}

function addLeadingZero(time: number): string {
  return time <= 9 ? `0${time}` : String(time);
}
