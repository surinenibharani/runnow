import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getClientIp } from "./rate-limit";

function requestWith(headers: Record<string, string>): Request {
  return new Request("https://www.letsrunnow.com/", { headers });
}

describe("getClientIp", () => {
  it("prefers the Vercel client IP over a spoofed X-Forwarded-For", () => {
    const ip = getClientIp(
      requestWith({
        "x-forwarded-for": "1.2.3.4, 10.0.0.1",
        "x-vercel-forwarded-for": "203.0.113.9",
      })
    );
    assert.equal(ip, "203.0.113.9");
  });

  it("uses the rightmost X-Forwarded-For hop when no platform header exists", () => {
    const ip = getClientIp(
      requestWith({
        "x-forwarded-for": "1.2.3.4, 10.0.0.1, 198.51.100.20",
      })
    );
    assert.equal(ip, "198.51.100.20");
  });

  it("falls back to x-real-ip", () => {
    const ip = getClientIp(requestWith({ "x-real-ip": "192.0.2.8" }));
    assert.equal(ip, "192.0.2.8");
  });
});
