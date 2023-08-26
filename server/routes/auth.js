const router = require("express").Router();
const { registerUser, loginUser } = require("../controller/auth");

// /register

router.post("/register", registerUser);

// login

router.post("/login", loginUser);

module.exports = router;
