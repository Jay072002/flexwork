const GitHubStrategy = require("passport-github2").Strategy;
const passport = require("passport");

const CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;


passport.use(
  new GitHubStrategy(
    {
      clientID: 'aac6c3bb1420bd78f171',
      clientSecret: '06a7e4dbd89fbe6d6bb27bf1d565dde6d248e862',
      callbackURL: "http://localhost:5000/auth/github/callback",
      scope: ["user:email"],
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
