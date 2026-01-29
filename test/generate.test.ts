import { describe, it, expect } from "vitest";
import { generateSSQ, generateSSQBatch, validateSSQ } from "../src";

describe("generateSSQ", () => {
  it("should generate a valid ticket", () => {
    const ticket = generateSSQ();

    expect(ticket.reds).toHaveLength(6);
    expect(ticket.blue).toBeGreaterThanOrEqual(1);
    expect(ticket.blue).toBeLessThanOrEqual(16);
    expect(validateSSQ(ticket)).toBe(true);
  });

  it("reds should be sorted and unique", () => {
    const ticket = generateSSQ();
    const sorted = [...ticket.reds].sort((a, b) => a - b);

    expect(ticket.reds).toEqual(sorted);
    expect(new Set(ticket.reds).size).toBe(6);
  });
});

describe("generateSSQBatch", () => {
  it("should generate specified count", () => {
    const batch = generateSSQBatch(5);
    expect(batch).toHaveLength(5);
  });

  it("should throw on invalid count", () => {
    expect(() => generateSSQBatch(0)).toThrow();
    expect(() => generateSSQBatch(-1)).toThrow();
  });
});
