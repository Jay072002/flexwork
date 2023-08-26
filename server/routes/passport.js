const router = require("express").Router();
const passport = require("passport");
const { loginFailed, loginSuccess, logout } = require("../controller/passport");

// Login Related Routes

router.get("/login/failed", loginFailed);

router.get("/login/success", loginSuccess);

router.get("/logout", logout);

// Google Routes

router.get(
  "/google",
  (req, res, next) => {
    req.session.isClient = req.query.isClient;
    req.session.isFirstTime = req.query.isFirstTime;
    next();
  },
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/login/failed",
    successRedirect: "http://localhost:3000?isSuccess=true&isClient=true",
  })
);

// GitHub Routes

router.get(
  "/github",
  (req, res, next) => {
    req.session.isClient = req.query.isClient;
    req.session.isFirstTime = req.query.isFirstTime;
    next();
  },
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: "http://localhost:3000?isSuccess=true&isClient=true",
    failureRedirect: "/auth/login/failed",
  })
);

module.exports = router;
