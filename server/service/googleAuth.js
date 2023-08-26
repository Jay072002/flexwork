const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();

const passport = require("passport");

const CLIENT_ID = process.env.GOOGLE_OAUTH_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_OAUTH_CLIENT_SECRET;

passport.use(
  new GoogleStrategy(
    {
      clientID: '917391406583-lig9dagoocatsu7hv0bqh4sbgb18e6vo.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: "http://localhost:5000/auth/google/callback",
      scope: ["profile", "email"],
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
