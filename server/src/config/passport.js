import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

// Only configure Google OAuth if credentials are available
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/api/users/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // You can implement user creation/finding logic here
          return done(null, profile);
        } catch (error) {
          return done(error, null);
        }
      }
    )
  );
}

export default passport; 