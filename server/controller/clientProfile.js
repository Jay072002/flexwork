const { infoLog, errorLog, successLog } = require("../helper/logHelper");
const ClientProfile = require("../models/ClientProfile");

const updateProfile = async (req, res) => {
  try {
    infoLog("updateProfile entry");
    const data = req.body;
    const { userId } = req.params;

    if (!data) {
      infoLog("createProfile exit");
      res.status(400).json({ isProfileUpdated: false, data: {} });
      return errorLog("Invalid Details");
    }

    const exist = await ClientProfile.findOne({ userId });
    if (!exist) {
      const { companyName, description } = data;
      if (!companyName && !description && !userId) {
        res.status(400).json({
          isProfileUpdated: false,
          message: "missing required fiels",
          data: {},
        });
      }
      const newProfile = new ClientProfile({
        companyName,
        description,
        userId,
      });
      await newProfile.save();

      successLog("Successfully Client Profile Created!");
      infoLog("updateProfile exit");
      return res.status(200).json({ isProfileCreated: true, data: newProfile });
    } else {
      const updatedProfile = await ClientProfile.findOneAndUpdate(
        { userId: userId },
        data,
        { new: true }
      );
      successLog("Successfully Client Profile updated!");
      infoLog("updateProfile exit");
      return res
        .status(200)
        .json({ isProfileUpdated: true, data: updatedProfile });
    }
  } catch (error) {
    console.log(error);
    infoLog("updateProfile exit");
    errorLog("Error While updating client profile!");
    return res.status(500).json({ isProfileUpdated: false, data: {} });
  }
};

const getProfile = async (req, res) => {
  infoLog("getProfile entry");
  const { userId } = req.params;
  try {
    const clientProfile = await ClientProfile.findOne({ userId });
    console.log(clientProfile);
    successLog("Successfully Client Profile fetched!");
    infoLog("getProfile exit");
    return res
      .status(200)
      .json({ isProfileFetched: true, data: clientProfile });
  } catch (error) {
    infoLog("getProfile exit");
    errorLog("Error While fetching client profile!");
    return res.status(500).json({ isProfileFetched: false, data: {} });
  }
};

module.exports = {
  updateProfile,
  getProfile,
};
