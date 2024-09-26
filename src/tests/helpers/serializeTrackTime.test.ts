import { serializeTrackTime } from "@/helpers/serializeTrackTime";

describe("serializeTrackTime", () => {
  it("Должен вернуть 00:00 при 0", () => {
    expect(serializeTrackTime(0)).toBe("00:00");
  });

  it("Должен вернуть 02:01 при 121", () => {
    expect(serializeTrackTime(121)).toBe("02:01");
  });

  it("Должен вернуть 00:00 при максимально допустимым Number", () => {
    expect(serializeTrackTime(Number.MAX_VALUE)).toBe("00:00");
  });

  it("Должен вернуть 00:00 при некорректных данных absd", () => {
    expect(serializeTrackTime("absd")).toBe("00:00");
  });

  it("Должен вернуть 00:00 при отрицательном значении -1", () => {
    expect(serializeTrackTime(-1)).toBe("00:00");
  });
});
