const User = require("../models/User");
const { errorLog, successLog, infoLog } = require("../helper/logHelper");
const { hashPassword, comparePassword } = require("../helper/bcrypt");
const { generateToken } = require("../helper/JWT.js");
const passport = require("passport");

const registerUser = async (req, res) => {
  infoLog("registerUser entry");
  try {
    const {
      firstName,
      lastName,
      username,
      city,
      state,
      email,
      password,
      confirmpassword,
      isClient,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !username ||
      !email ||
      !city ||
      !state ||
      !password ||
      !confirmpassword
    ) {
      infoLog("registerUser exit");
      res
        .status(400)
        .json({ isRegister: false, message: "missing required fields" });
      return errorLog("Invalid Details");
    }

    if (password !== confirmpassword) {
      infoLog("registerUser exit");

      res
        .status(400)
        .json({ isRegister: false, message: "Password Not Matched" });
      return errorLog("Password Not Matched");
    }

    // check for the existance if already exist then dont allow to register

    const isRegistered = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (isRegistered) {
      infoLog("registerUser exit");

      res.json({ isRegister: false });
      errorLog("User Already Exist!");
      return;
    }

    const hashPass = await hashPassword(password);

    const newUser = new User({
      firstName,
      lastName,
      username,
      city,
      state,
      email,
      password: hashPass,
      isClient,
    });

    await newUser.save();

    successLog("Successfully Registered!");
    infoLog("registerUser exit");
    return res.status(201).json({ isRegister: true });
  } catch (error) {
    console.log(error);
    infoLog("registerUser exit");
    errorLog("Error While Registration!");
    return res
      .status(500)
      .json({ isRegister: false, message: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  infoLog("loginUser entry");

  const { username, password } = req.body;

  if (!username || !password) {
    infoLog("loginUser exit");
    res
      .status(400)
      .json({ isLogin: false, message: "Missing Required Fileds!" });
    return errorLog("Invalid Details");
  }

  try {
    // check if the user logged in or not

    const isRegistered = await User.findOne({
      $or: [{ username: username }, { email: username }],
    });

    if (!isRegistered) {
      infoLog("loginUser exit");
      res
        .status(401)
        .json({ isLogin: false, message: "User is not registerd!" });
      return errorLog("Unauthorized User Trying To Login");
    }

    const isMatch = await comparePassword(password, isRegistered?.password);

    if (!isMatch) {
      infoLog("loginUser exit");
      res.status(401).json({ isLogin: false, message: "Incorrect Password!" });
      return errorLog("Authentication Failed");
    }

    const token = generateToken({
      id: isRegistered._id,
      username: isRegistered.username,
      email: isRegistered.email,
      isClient: isRegistered.isClient,
      isAdmin: isRegistered.isAdmin,
    });

    res.cookie("token", token, { maxAge: 60 * 60 * 24 * 1000 });

    successLog("Successfully LoggedIn!");
    infoLog("loginUser exit");
    return res.status(200).json({
      isLogin: true,
      user: {
        _id: isRegistered._id,
        firstName: isRegistered.firstName,
        lastName: isRegistered.lastName,
        email: isRegistered.email,
        username: isRegistered.username,
        city: isRegistered.city,
        state: isRegistered.state,
        createdAt: isRegistered.createdAt,
        isClient: isRegistered.isClient,
        authMode: isRegistered.authMode,
      },
    });
  } catch (error) {
    console.log(error);
    errorLog("error while login the user");
    return res.status(500).json({ isLogin: false });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
