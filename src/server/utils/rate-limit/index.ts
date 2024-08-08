import kv from "@vercel/kv";
import { Ratelimit } from "@upstash/ratelimit";

const ratelimit = new Ratelimit({
  redis: kv,
  limiter: Ratelimit.fixedWindow(20, "30s"),
});

/**
 * Rate limits incoming requests based on the client's IP address.
 * @param {Request} req - The incoming request object.
 * @returns {Promise<boolean>} A promise that resolves to true if the request should be blocked, false otherwise.
 */
export default async function checkIsRateLimited(
  req: Request
): Promise<boolean> {
  const enableRateLimiting = process.env.ENABLE_RATE_LIMITING === "true";

  if (!enableRateLimiting) {
    return Promise.resolve(false);
  }

  // @ts-ignore
  const ip = req.ip ?? "ip";
  const { success } = await ratelimit.limit(ip);

  // block the request if unsuccessfull
  return !success;
}
