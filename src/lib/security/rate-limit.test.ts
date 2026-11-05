import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getClientIp, isFailClosedRateLimitKey } from "./rate-limit";

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

describe("fail-closed rate-limit keys", () => {
  it("does not refuse user-facing writes when Redis is missing", () => {
    assert.equal(isFailClosedRateLimitKey("login:1.2.3.4"), false);
    assert.equal(isFailClosedRateLimitKey("auth:1.2.3.4"), false);
    assert.equal(isFailClosedRateLimitKey("register:1.2.3.4"), false);
    assert.equal(isFailClosedRateLimitKey("newsletter:1.2.3.4"), false);
    assert.equal(isFailClosedRateLimitKey("testimonial:1.2.3.4"), false);
    assert.equal(isFailClosedRateLimitKey("comment:1.2.3.4:a-post"), false);
    assert.equal(isFailClosedRateLimitKey("like:ip:1.2.3.4"), false);
    assert.equal(isFailClosedRateLimitKey("stripe-checkout:user-1"), false);
  });
});
