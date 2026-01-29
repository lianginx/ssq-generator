import { describe, it, expect } from "vitest";
import { generateFromDantuo } from "../src";

describe("generateFromDantuo", () => {
  it("should generate correct combinations", () => {
    const result = generateFromDantuo({
      redDan: [3, 8],
      redTuo: [1, 5, 7, 9, 12],
      blueDan: 6,
    });

    // C(5, 4) = 5
    expect(result).toHaveLength(5);
  });

  it("all tickets should include all dan reds", () => {
    const result = generateFromDantuo({
      redDan: [3, 8],
      redTuo: [1, 5, 7, 9, 12],
      blueDan: 6,
    });

    for (const t of result) {
      expect(t.reds).toContain(3);
      expect(t.reds).toContain(8);
    }
  });

  it("should throw if blue is missing", () => {
    expect(() =>
      generateFromDantuo({
        redDan: [1],
        redTuo: [2, 3, 4, 5, 6],
      }),
    ).toThrow();
  });
});
