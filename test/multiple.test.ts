import { describe, it, expect } from "vitest";
import { generateFromMultiple } from "../src";

describe("generateFromMultiple", () => {
  it("should generate correct number of tickets", () => {
    const result = generateFromMultiple({
      reds: [1, 3, 5, 7, 9, 11, 13],
      blues: [2, 6],
    });

    // C(7,6) * 2 = 14
    expect(result).toHaveLength(14);
  });

  it("each ticket should have 6 reds and 1 blue", () => {
    const result = generateFromMultiple({
      reds: [1, 2, 3, 4, 5, 6, 7],
      blues: [1],
    });

    for (const t of result) {
      expect(t.reds).toHaveLength(6);
      expect(t.blue).toBe(1);
    }
  });

  it("should throw on invalid reds count", () => {
    expect(() =>
      generateFromMultiple({
        reds: [1, 2, 3, 4, 5, 6],
        blues: [1],
      }),
    ).toThrow();
  });
});
