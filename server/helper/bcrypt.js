const bcrypt = require("bcrypt");
const { infoLog, errorLog } = require("./logHelper");

const hashPassword = async (password) => {
  infoLog("hashPassword entry");
  try {
    let saltRounds = process.env.SALT_ROUND;
    const hashPass = await bcrypt.hash(password, Number(saltRounds));
    infoLog("hashPassword exit");
    return hashPass;
  } catch (error) {
    errorLog("error while generating hash!");
    return;
  }
};

const comparePassword = async (password, hashPass) => {
  infoLog("comparePassword entry");
  try {
    const isMatch = await bcrypt.compare(password, hashPass);

    infoLog("comparePassword exit");

    return isMatch;
  } catch (error) {
    console.log(error);
    infoLog("comparePassword exit");
    return errorLog("Error while comparing password!");
  }
};

module.exports = {
  hashPassword,
  comparePassword,
};
