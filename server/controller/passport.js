const { infoLog, successLog } = require("../helper/logHelper");
const User = require("../models/User");
const { generateToken } = require("../helper/JWT");

const loginFailed = (req, res) => {
  // console.log(req.user);
  infoLog("loginFailed entry");
  infoLog("loginFailed exit");
  return res.status(401).json({
    success: false,
    message: "failure",
  });
};

const loginSuccess = async (req, res) => {
  infoLog("loginSuccess entry");

  const provider = req.user?.provider;

  if (req.isAuthenticated()) {
    if (provider === "google") {
      const user = {
        firstName: req.user.name.givenName,
        lastName: req.user.name.familyName,
        email: req.user.emails[0].value,
        username: req.user.emails[0].value,
        profileImg: req.user.photos[0].value,
        authMode: "google",
        isClient: req.session.isClient === "true",
      };

      const isUserExist = await User.findOne({
        $or: [{ email: user.email }, { username: user.email }],
      });

      if (!isUserExist) {
        const newUser = await User.create(user);
        user._id = newUser._id;

        const token = generateToken({
          id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          isClient: newUser.isClient,
          isAdmin: newUser.isAdmin,
        });

        res.cookie("token", token, { maxAge: 60 * 60 * 24 * 1000 });

        return res.status(200).json({
          success: true,
          message: "successfully authenticated",
          userId: newUser?._id,
          isRegistered: true,
          isLogin: true,
        });
      } else {
        const token = generateToken({
          id: isUserExist._id,
          username: isUserExist.username,
          email: isUserExist.email,
          isClient: isUserExist.isClient,
          isAdmin: isUserExist.isAdmin,
        });

        res.cookie("token", token, { maxAge: 60 * 60 * 24 * 1000 });

        return res.status(200).json({
          success: true,
          message: "successfully authenticated",
          userId: isUserExist?._id,
          isLogin: true,
        });
      }
    }

    if (provider === "github") {
      console.log(req.session.isClient);
      if (req.user) {
        const user = {
          firstName: null,
          lastName: null,
          username: req.user.username,
          email: req.user.emails[0].value,
          isClient: req.session.isClient === "true",
          profileImg: req.user.photos[0].value,
          authMode: "github",
        };

        const isUserExist = await User.findOne({
          $or: [{ username: user.username }, { email: user.email }],
        });

        if (!isUserExist) {
          const newUser = await User.create(user);

          const token = generateToken({
            id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            isClient: newUser.isClient,
            isAdmin: newUser.isAdmin,
          });

          res.cookie("token", token, { maxAge: 60 * 60 * 24 * 1000 });

          return res.status(200).json({
            success: true,
            message: "successfully authenticated",
            userId: newUser?._id,
            isRegistered: true,
            isClient: newUser?.isClient,
            isLogin: true,
          });
        } else {
          const token = generateToken({
            id: isUserExist._id,
            username: isUserExist.username,
            email: isUserExist.email,
            isClient: isUserExist.isClient,
            isAdmin: isUserExist.isAdmin,
          });

          res.cookie("token", token, { maxAge: 60 * 60 * 24 * 1000 });

          return res.status(200).json({
            success: true,
            isLogin: true,
            isClient: isUserExist?.isClient,
            message: "successfully authenticated",
            userId: isUserExist?._id,
          });
        }
      }
    }

    infoLog("loginSuccess exit");
  } else {
    infoLog("loginSuccess exit");
    return res.status(401).json({ message: "user not authenticated" });
  }
};

const logout = (req, res) => {
  infoLog("logout entry");

  console.log("user ==> ", req.user);

  req.logOut((err) => {
    if (err) {
      console.error(err);
      infoLog("logout exit");
      return res.status(500).json({ message: "error whle logging out" });
    }

    successLog("successfully logged out");
    infoLog("logout exit");

    console.log("before cookies ==> ", req.cookies);

    res.status(200).clearCookie("connect.sid", {
      path: "/",
    });

    console.log("after cookies ==> ", req.cookies);

    console.log("before session ==> ", req.session);
    req.session = null;
    console.log("after session ==> ", req.session);
    res
      .status(200)
      .json({ isLogout: true, redirectUrl: "http://localhost:3000/" });
  });
};

module.exports = {
  loginFailed,
  loginSuccess,
  logout,
};
