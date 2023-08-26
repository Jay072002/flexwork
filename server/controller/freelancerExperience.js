const { infoLog, errorLog, successLog } = require("../helper/logHelper");

const FreelancerExperience = require("../models/FreelancerExperience");

const addExperience = async (req, res) => {
  infoLog("addExperience entry");

  const { profileId } = req.params;
  const { companyName, description, role, location, startDate, endDate } =
    req.body;

  try {
    if (
      !companyName ||
      !description ||
      !profileId ||
      !role ||
      !location ||
      !startDate ||
      !endDate
    ) {
      infoLog("addExperience exit");
      res.status(400).json({ isExperienceAdded: false, data: {} });
      return errorLog("Invalid Details");
    }

    const newExperience = new FreelancerExperience({
      companyName,
      role,
      startDate,
      endDate,
      description,
      location,
      profileId,
    });

    const data = await newExperience.save();

    successLog("Successfully experience added to Freelancer Profile!");
    infoLog("addEducation exit");
    return res.status(201).json({ isExperienceAdded: true, data });
  } catch (error) {
    infoLog("addEducation exit");
    errorLog("Error While adding a experience to freelancer profile!");
    return res.status(500).json({ isExperienceAdded: false, data: {} });
  }
};

const updateExperience = async (req, res) => {
  infoLog("updateExperience entry");
  const experienceId = req.params.experienceId;

  const data = req.body;

  if (!data) {
    infoLog("updateExperience exit");
    res.status(400).json({ isExperienceUpdated: false, data: {} });
    return errorLog("Invalid Details");
  }

  try {
    const updatedExperience = await FreelancerExperience.findByIdAndUpdate(
      experienceId,
      data,
      {
        new: true,
      }
    );

    successLog("Successfully updated experience  to Freelancer Profile!");
    infoLog("updateExperience exit");
    return res
      .status(200)
      .json({ isExperienceUpdated: true, data: updatedExperience });
  } catch (error) {
    infoLog("updateExperience exit");
    errorLog("Error While updating a experience to freelancer profile!");
    return res.status(500).json({ isExperienceUpdated: false, data: {} });
  }
};

const removeExperience = async (req, res) => {
  infoLog("removeExperience entry");

  const experienceId = req.params.experienceId;

  try {
    const removedExperience = await FreelancerExperience.findByIdAndDelete(
      experienceId
    );

    successLog("Successfully deleted experience  to Freelancer Profile!");
    infoLog("removeExperience exit");
    return res
      .status(200)
      .json({ isExperienceRemoved: true, data: removedExperience });
  } catch (error) {
    infoLog("removeExperience exit");
    errorLog("Error While deleting a experience to freelancer profile!");
    return res.status(500).json({ isExperienceRemoved: false, data: {} });
  }
};

const getExperiences = async (req, res) => {
  infoLog("getExperiences entry");

  const { profileId } = req.params;

  try {
    const data = await FreelancerExperience.find({ profileId });

    successLog("Successfully fetched experiences of Freelancer Profile!");
    infoLog("getExperiences exit");
    return res.status(200).json({ isExperiencesFetched: true, data });
  } catch (error) {
    infoLog("getExperiences exit");
    errorLog("Error While fetching a experiences of freelancer profile!");
    return res.status(500).json({ isExperiencesFetched: false, data: {} });
  }
};

module.exports = {
  addExperience,
  updateExperience,
  removeExperience,
  getExperiences,
};
