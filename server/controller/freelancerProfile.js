const { infoLog, errorLog, successLog } = require("../helper/logHelper");
const FreelancerProfile = require("../models/FreelancerProfile");

const updateProfile = async (req, res) => {
  try {
    infoLog("updateProfile entry");

    const data = req.body;
    const { userId } = req.params;

    if (!data) {
      infoLog("updateProfile exit");
      res.status(400).json({ isProfileUpdated: false, data: {} });
      return errorLog("Invalid Details");
    }

    const exist = await FreelancerProfile.findOne({ userId });

    if (exist) {
      const { title, description, skills } = data;

      const updatedData = await FreelancerProfile.findOneAndUpdate(
        { userId: userId },
        { title, description, skills },
        {
          new: true,
        }
      );

      successLog("Successfully Freelancer Profile updated!");
      infoLog("updateProfile exit");
      return res
        .status(200)
        .json({ isProfileUpdated: true, data: updatedData });
    } else {
      const newCreatedProfile = new FreelancerProfile({
        title: data.title,
        description: data.description,
        userId,
      });

      const newCreated = await newCreatedProfile.save();

      successLog("Successfully Freelancer Profile created!");
      infoLog("updateProfile exit");
      return res.status(201).json({ isProfileCreated: true, data: newCreated });
    }
  } catch (error) {
    console.log(error);
    infoLog("updateProfile exit");
    errorLog("Error While updating freelancer profile!");
    return res.status(500).json({ isProfileUpdated: false, data: {} });
  }
};

const getProfile = async (req, res) => {
  infoLog("getProfile entry");
  const userId = req.params.userId;
  try {
    console.log(userId);
    const freelancerProfile = await FreelancerProfile.findOne({ userId });
    successLog("Successfully Freelancer Profile fetched!");
    infoLog("getProfile exit");
    return res
      .status(200)
      .json({ isProfileFetched: true, data: freelancerProfile });
  } catch (error) {
    infoLog("getProfile exit");
    errorLog("Error While fetching freelancer profile!");
    return res.status(500).json({ isProfileFetched: false, data: {} });
  }
};

module.exports = {
  updateProfile,
  getProfile,
};
