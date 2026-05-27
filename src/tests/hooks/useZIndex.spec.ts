import { describe, expect, it } from "vitest";
import { nextZIndex } from "../../hooks/useZIndex";

describe("nextZIndex", () => {
  it("uses a shared counter so later values are higher", () => {
    const first = nextZIndex();
    const second = nextZIndex();
    const third = nextZIndex(3000);

    expect(first).toBe(2001);
    expect(second).toBe(2002);
    expect(third).toBe(3003);
    expect(third).toBeGreaterThan(second);
  });
});
