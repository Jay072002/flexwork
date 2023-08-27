const { infoLog, errorLog, successLog } = require("../helper/logHelper");
const ClientProject = require("../models/ClientProject");
const FreelancerProfile = require("../models/FreelancerProfile");
const FreelancerProposalRequest = require("../models/FreelancerProposalRequest");

const createProject = async (req, res) => {
  infoLog("createProject entry");

  console.log(req.body);
  const {
    title,
    description,
    company,
    category,
    skills,
    scope,
    duration,
    experienceType,
    projectRate,
    file,
  } = req.body;

  const { id: userId } = req.user;

  if (
    !title ||
    !description ||
    !category ||
    !company ||
    !skills ||
    !scope ||
    !experienceType ||
    !file ||
    !userId ||
    !duration ||
    !projectRate
  ) {
    infoLog("createProject exit");
    res.status(400).json({ isProjectCreated: false, data: {} });
    return errorLog("Invalid Details");
  }

  try {
    const newClientProject = new ClientProject({
      title,
      description,
      company,
      category,
      skills,
      scope,
      experienceType,
      duration,
      projectRate: Number(projectRate),
      file,
      userId,
    });

    const data = await newClientProject.save();

    successLog("Successfully project added to client Profile!");
    infoLog("createProject exit");
    return res.status(201).json({ isProjectCreated: true, data });
  } catch (error) {
    console.log(error);
    infoLog("createProject exit");
    errorLog("Error While adding a project to client profile!");
    return res.status(500).json({ isProjectCreated: false, data: {} });
  }
};

const updateProject = async (req, res) => {
  infoLog("updateProject entry");
  const data = req.body;
  const { projectId } = req.params;

  console.log("data", data);
  console.log("projectId", projectId);

  if (!data) {
    infoLog("updateProject exit");
    res.status(400).json({ isProjectUpdated: false, data: {} });
    return errorLog("Invalid Details");
  }

  try {
    const updatedProject = await ClientProject.findByIdAndUpdate(
      projectId,
      data,
      { new: true }
    );

    successLog("Successfully project updated to client Profile!");
    infoLog("updateProject exit");
    return res
      .status(200)
      .json({ isProjectUpdated: true, data: updatedProject });
  } catch (error) {
    infoLog("updateProject exit");
    errorLog("Error While updating a project to client profile!");
    return res.status(500).json({ isProjectUpdated: false, data: {} });
  }
};

// show only latest 5 project to freelancer but client can view all the project which he created

const getProjects = async (req, res) => {
  infoLog("getProjects entry");

  const { isClient } = req.user;
  const {
    draft,
    published,
    isProfile,
    userId,
    bestmatch,
    recent,
    saved,
    applied,
  } = req.query;

  const { id } = req.user;

  let projects = [];
  try {
    if (isClient && draft == "true") {
      projects = await ClientProject.find({
        $and: [{ userId: userId }, { isPublished: false }],
      });
    } else if (isClient && published == "true") {
      projects = await ClientProject.find({
        $and: [{ userId: userId }, { isPublished: true }],
      });
    } else if (isProfile == "true") {
      projects = await ClientProject.find({
        $and: [{ userId: userId }, { isPublished: true }],
      })
        .sort({ createdAt: -1 })
        .limit(5);
    } else if (isClient) {
      projects = await ClientProject.find({ userId });
    } else if (bestmatch == "true") {
      const profile = await FreelancerProfile.findOne({ userId: id });
      let freelancerProposals = await FreelancerProposalRequest.find({
        freelancerId: id,
      }).exec();
      let freelancerProposalsIds = freelancerProposals
        .map((e) => e.projectId)
        .filter(Boolean);
      projects = await ClientProject.find({
        $and: [
          { skills: { $in: profile?.skills } },
          { isPublished: true },
          { _id: { $nin: freelancerProposalsIds } },
        ],
      })
        .sort({ createdAt: -1 })
        .exec();
    } else if (recent == "true") {
      let freelancerProposals = await FreelancerProposalRequest.find({
        freelancerId: id,
      }).exec();
      let freelancerProposalsIds = freelancerProposals
        .map((e) => e.projectId)
        .filter(Boolean);
      projects = await ClientProject.find({
        isPublished: true,
        _id: { $nin: freelancerProposalsIds },
      }).sort({ createdAt: -1 });
    } else if (saved == "true") {
      // do it later
    } else if (applied == "true") {
      const proposals = await FreelancerProposalRequest.find({
        freelancerId: req.user.id,
      });
      const projectIds = proposals.map((proposal) => proposal.projectId);

      projects = await ClientProject.find({
        _id: { $in: projectIds },
      }).lean();
      projects = projects.map((project) => {
        let proposal = proposals
          .filter((proposal) => proposal.projectId == project._id)
          .find((a) => a);
        project["status"] = proposal?.status;
        project["proposalID"] = proposal?._id;
        return project;
      });
    }
    successLog("Successfully fetched all projects!");
    infoLog("getProjects exit");
    return res.status(200).json({ isProjectsFetched: true, data: projects });
  } catch (error) {
    console.log(error);
    infoLog("getProjects exit");
    errorLog("Error While fetching all projects");
    return res.status(500).json({ isProjectsFetched: false, data: {} });
  }
};

const getSingleProject = async (req, res) => {
  infoLog("getSingleProject entry");
  const { projectId } = req.params;
  try {
    const userProject = await ClientProject.findById(projectId);

    const existFreelancerProposal = await FreelancerProposalRequest.findOne({
      $and: [{ freelancerId: req.user.id }, { projectId }],
    });

    let isApplied = false;

    if (existFreelancerProposal) {
      isApplied = true;
    } else {
      isApplied = false;
    }

    successLog("Successfully fetched single project!");
    infoLog("getSingleProject exit");
    return res.status(200).json({
      isProjectsFetched: true,
      data: userProject,
      isApplied,
    });
  } catch (error) {
    console.log(error);
    infoLog("getSingleProject exit");
    errorLog("Error While fetching single project");
    return res.status(500).json({ isProjectFetched: false, data: {} });
  }
};

const deleteProject = async (req, res) => {
  infoLog("deleteProject entry");
  const { projectId } = req.params;
  try {
    const deletedProject = await ClientProject.findByIdAndDelete(projectId);

    successLog("Successfully project deleted to client Profile!");
    infoLog("deleteProject exit");
    return res
      .status(200)
      .json({ isProjectDeleted: true, data: deletedProject });
  } catch (error) {
    infoLog("deleteProject exit");
    errorLog("Error While deleting project");
    return res.status(500).json({ isProjectDeleted: false, data: {} });
  }
};

module.exports = {
  createProject,
  updateProject,
  getProjects,
  getSingleProject,
  deleteProject,
};
