const { infoLog, errorLog, successLog } = require("../helper/logHelper");
const { s3 } = require("../middleware/uploadFile");
const FreelancerPortfolio = require("../models/FreelancerPortfolio");

const addPortfolio = async (req, res) => {
  infoLog("addPortfolio entry");

  const { profileId } = req.params;

  const file = req.file;

  const params = {
    Bucket: "flexworkdata",
    Key: "portfolio/" + file?.originalname,
    Body: file?.buffer,
    ACL: "public-read",
  };

  const { title, completionDate, role, projectChallange, projectSolution } =
    JSON.parse(req.body.portfolio);

  try {
    if (
      !title ||
      !req.file ||
      !completionDate ||
      !role ||
      !profileId ||
      !projectChallange ||
      !projectSolution
    ) {
      infoLog("addPortfolio exit");
      res.status(400).json({ isPortfolioAdded: false, data: {} });
      return errorLog("Invalid Details");
    }

    s3.upload(params, async (err, data) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ isPortfolioAdded: false, data: {} });
      }

      try {
        const newPortfolio = new FreelancerPortfolio({
          title,
          role,
          file: data.Location,
          completionDate,
          projectChallange,
          projectSolution,
          profileId,
        });

        const newPortfolioData = await newPortfolio.save();

        successLog("Successfully portfolio added to Freelancer Profile!");
        infoLog("addEducation exit");
        return res
          .status(201)
          .json({ isPortfolioAdded: true, data: newPortfolioData });
      } catch (error) {
        console.log(error);
        infoLog("addEducation exit");
        errorLog("Error While adding a portfolio to freelancer profile!");
        return res.status(500).json({ isPortfolioAdded: false, data: {} });
      }
    });
  } catch (error) {
    console.log(error);
    infoLog("addEducation exit");
    errorLog("Error While adding a portfolio to freelancer profile!");
    return res.status(500).json({ isPortfolioAdded: false, data: {} });
  }
};

const updatePortfolio = async (req, res) => {
  infoLog("updatePortfolio entry");
  const portfolioId = req.params.portfolioId;

  const data = JSON.parse(req.body.portfolio);

  const file = req.file;

  const params = {
    Bucket: "flexworkdata",
    Key: "portfolio/" + file?.originalname,
    Body: file?.buffer,
    ACL: "public-read",
  };

  if (!data) {
    infoLog("updatePortfolio exit");
    res.status(400).json({ isPortfolioUpdated: false, data: {} });
    return errorLog("Invalid Details");
  }

  try {
    const updatedPortfolio = await FreelancerPortfolio.findByIdAndUpdate(
      portfolioId,
      { ...data, file: "" },
      {
        new: true,
      }
    );

    if (file) {
      s3.upload(params, async (err, data) => {
        if (err) {
          console.log(err);
          return res.status(400).json({ isPortfolioAdded: false, data: {} });
        }

        const updatedPortfolio = await FreelancerPortfolio.findByIdAndUpdate(
          portfolioId,
          { file: data.Location },
          {
            new: true,
          }
        );
      });
    }

    successLog("Successfully updated portfolio to Freelancer Profile!");
    infoLog("updatePortfolio exit");
    return res
      .status(200)
      .json({ isPortfolioUpdated: true, data: updatedPortfolio });
  } catch (error) {
    console.log(error);
    infoLog("updatePortfolio exit");
    errorLog("Error While updating a portfolio to freelancer profile!");
    return res.status(500).json({ isPortfolioUpdated: false, data: {} });
  }
};

const removePortfolio = async (req, res) => {
  infoLog("removePortfolio entry");

  const portfolioId = req.params.portfolioId;

  try {
    const removedPortfolio = await FreelancerPortfolio.findByIdAndDelete(
      portfolioId
    );

    successLog("Successfully deleted portfolio to Freelancer Profile!");
    infoLog("removePortfolio exit");
    return res
      .status(200)
      .json({ isPortfolioRemoved: true, data: removedPortfolio });
  } catch (error) {
    infoLog("removePortfolio exit");
    errorLog("Error While deleting a portfolio to freelancer profile!");
    return res.status(500).json({ isPortfolioRemoved: false, data: {} });
  }
};

const getPortfolios = async (req, res) => {
  infoLog("getPortfolios entry");

  const { profileId } = req.params;

  try {
    const data = await FreelancerPortfolio.find({ profileId });

    successLog("Successfully fetched portfolio of Freelancer Profile!");
    infoLog("getPortfolios exit");
    return res.status(200).json({ isPortfoliosFetched: true, data });
  } catch (error) {
    infoLog("getPortfolios exit");
    errorLog("Error While fetching a portfolio of freelancer profile!");
    return res.status(500).json({ isPortfoliosFetched: false, data: {} });
  }
};

module.exports = {
  addPortfolio,
  updatePortfolio,
  removePortfolio,
  getPortfolios,
};
