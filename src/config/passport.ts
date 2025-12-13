import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { env } from "./env";

passport.use(
  new GoogleStrategy(
    {
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      callbackURL: env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;

        if (!email) {
          return done(new Error("Google account has no email"), undefined);
        }

        return done(null, {
          provider: "google",
          providerAccountId: profile.id,
          email,
          name: profile.displayName,
          avatar: profile.photos?.[0]?.value,
          access_token: accessToken,
          refresh_token: refreshToken,
        });
      } catch (err) {
        done(err, undefined);
      }
    },
  ),
);
