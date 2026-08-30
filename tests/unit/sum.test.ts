import { describe, expect, it } from "vitest";
import { sum } from "../../src/utils/sum";

describe("sum", () => {
  it("suma dos números correctamente", () => {
    expect(sum(2, 3)).toBe(5);
  });

  it("funciona con números negativos", () => {
    expect(sum(-1, 1)).toBe(0);
  });
});
