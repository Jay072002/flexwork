const { infoLog, errorLog, successLog } = require("../helper/logHelper");
const User = require("../models/User");

const { s3 } = require("../middleware/uploadFile");

const updateUser = async (req, res) => {
  try {
    infoLog("updateUser entry");
    const data = JSON.parse(req.body.data);
    const { userId } = req.params;

    const file = req.file;

    const params = {
      Bucket: "flexworkdata",
      Key: "profile/" + Date.now() + file.originalname,
      Body: file.buffer,
      ACL: "public-read",
    };

    if (!data) {
      infoLog("updateUser exit");
      res.status(400).json({ isUserUpdated: false, data: {} });
      return errorLog("Invalid Details");
    }

    if (file) {
      s3.upload(params, async (err, data) => {
        if (err) {
          console.log(err);
          return res.status(400).json({ isPortfolioAdded: false, data: {} });
        }

        console.log(data);
        const user = await User.findByIdAndUpdate(
          userId,
          { profileImg: data.Location },
          { new: true }
        );

        console.log("updated Successfully");
      });
    }

    const user = await User.findByIdAndUpdate(userId, data, { new: true });

    successLog("Successfully user updated!");
    infoLog("updateUser exit");
    return res.status(200).json({ isUserUpdated: true, data: user });
  } catch (error) {
    infoLog("updateUser exit");
    errorLog("Error While updating user profile!");
    return res.status(500).json({ isUserUpdated: false, data: {} });
  }
};

const getUser = async (req, res) => {
  infoLog("getUser entry");
  const { userId } = req.params;
  try {
    const user = await User.findById(
      userId,
      "_id firstName lastName email profileImg username city state isClient authMode createdAt"
    );
    successLog("Successfully user fetched!");
    infoLog("getUser exit");
    return res.status(200).json({ isUserFetched: true, data: user });
  } catch (error) {
    infoLog("getUser exit");
    errorLog("Error While fetching user!");
    return res.status(500).json({ isUserFetched: false, data: {} });
  }
};

const getUsers = async (req, res) => {
  infoLog("getUsers entry");
  try {
    const users = await User.find(
      {},
      "_id firstName lastName email profileImg username city state isClient createdAt authMode"
    );
    successLog("Successfully users fetched!");
    infoLog("getUsers exit");
    return res.status(200).json({ isUsersFetched: true, data: users });
  } catch (error) {
    infoLog("getUsers exit");
    errorLog("Error While fetching users!");
    return res.status(500).json({ isUsesrFetched: false, data: {} });
  }
};

const removeUser = async (req, res) => {
  infoLog("removeUser entry");
  const { userId } = req.params;
  try {
    const removedUser = await User.findByIdAndDelete(userId);
    successLog("Successfully user removed!");
    infoLog("removeUser exit");
    return res.status(200).json({ isUserRemoved: true, data: removedUser });
  } catch (error) {
    infoLog("removeUser exit");
    errorLog("Error While removing user!");
    return res.status(500).json({ isUserRemoved: false, data: {} });
  }
};

module.exports = {
  getUser,
  updateUser,
  getUsers,
  removeUser,
};
