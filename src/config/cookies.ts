import { env } from "./env";

const isProduction = env.NODE_ENV === "production";

const cookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  path: "/",
  maxAge: 1000 * 60 * 60 * 24,
  ...(isProduction && {
    domain: env.COOKIE_DOMAIN,
  }),
} as const

export default cookieOptions;
