const jwt = require("jsonwebtoken");
const { errorLog } = require("./logHelper");

const generateToken = (payload) => {
  try {
    const token = jwt.sign(payload, process.env.SECRET_JWT, {
      expiresIn: "2d",
    });
    console.log(token );
    return token;
  } catch (error) {
    return errorLog("Error While Generating Token");
  }
};

module.exports = {
  generateToken,
};
