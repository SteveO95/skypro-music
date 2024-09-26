import { getUniqueValues } from "@/helpers/getUniqueValues";

describe("serializeTrackTime", () => {
  it("Должен вернуть 2 уникальных значения из строковых значений", () => {
    const items = [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
      { id: 3, name: "Alice" },
    ];

    const result = getUniqueValues(items, "name");
    expect(result).toEqual(["Alice", "Bob"]);
  });

  it("Должен вернуть пустой массив", () => {
    const items: { id: number; name: string }[] = [];
    const result = getUniqueValues(items, "name");
    expect(result).toEqual([]);
  });

  it("Должен вернуть 2 уникальных значения из целочисленных значений", () => {
    const items = [
      { id: 1, value: 10 },
      { id: 2, value: 20 },
      { id: 3, value: 10 },
    ];

    const result = getUniqueValues(items, "value");
    expect(result).toEqual(["10", "20"]);
  });
});
