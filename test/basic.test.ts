import { describe, it, expect } from "vitest";
import { sleep, retry, sleepUntil, timeout } from "../src";

describe("async-minikit", () => {
  it("sleep works", async () => {
    const t = Date.now();
    await sleep(50);
    expect(Date.now() - t).toBeGreaterThanOrEqual(45);
  });

  it("sleepUntil resolves when condition true", async () => {
    let x = 0;
    setTimeout(() => (x = 1), 50);

    await sleepUntil(() => x === 1, 10);

    expect(x).toBe(1);
  });

  it("retry succeeds", async () => {
    let n = 0;

    const res = await retry(async () => {
      if (n++ < 2) throw new Error("fail");
      return "ok";
    });

    expect(res).toBe("ok");
  });

  it("timeout rejects", async () => {
    await expect(timeout(sleep(200), 50)).rejects.toBeInstanceOf(Error);
  });
});
