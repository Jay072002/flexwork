const { infoLog, errorLog, successLog } = require("../helper/logHelper");
const FreelancerProposalRequest = require("../models/FreelancerProposalRequest");

const createProposal = async (req, res) => {
  const {
    expectedBidRate,
    duration,
    coverLetter,
    clientId,
    projectId,
    freelancerId,
  } = req.body;

  if (
    !expectedBidRate ||
    !duration ||
    !coverLetter ||
    !projectId ||
    !clientId ||
    !freelancerId
  ) {
    infoLog("createProposal exit");
    res.status(400).json({ isProposalCreated: false, data: {} });
    return errorLog("Invalid Details");
  }

  try {
    const existFreelancerProposal = await FreelancerProposalRequest.findOne({
      $and: [{ freelancerId }, { projectId }],
    });

    if (existFreelancerProposal) {
      infoLog("createProposal exit");
      errorLog("already exist freelancer profile proposal!");
      return res
        .status(400)
        .json({ isProposalCreated: false, isProposalExist: true, data: {} });
    }

    const newFreelancerProposalRequest = new FreelancerProposalRequest({
      projectId,
      clientId,
      freelancerId,
      expectedBidRate,
      duration,
      coverLetter,
      portfolio: req.body?.portfolio,
    });

    const data = await newFreelancerProposalRequest.save();

    successLog("Successfully proposal added to freelancer Profile!");
    infoLog("createProposal exit");
    return res.status(201).json({ isProposalCreated: true, data });
  } catch (error) {
    console.error(error);
    infoLog("createProposal exit");
    errorLog("Error While creating a proposal to freelancer side!");
    return res.status(500).json({ isProposalCreated: false, data: {} });
  }
};

const getAllProposals = async (req, res) => {
  infoLog("getAllProposals entry");

  const { id: freelancerId } = req.user;
  try {
    const allProposals = await FreelancerProposalRequest.find({ freelancerId });

    successLog("Successfully fetched proposals from freelancer Profile!");
    infoLog("getAllProposals exit");
    return res
      .status(200)
      .json({ isProposalsFetched: true, data: allProposals });
  } catch (error) {
    infoLog("getAllProposals exit");
    errorLog("Error While fetching a proposals from freelancer side!");
    return res.status(500).json({ isProposalsFetched: false, data: {} });
  }
};

const getSingleProposal = async (req, res) => {
  infoLog("getSingleProposal entry");
  const { proposalId } = req.params;
  try {
    const proposal = await FreelancerProposalRequest.findById(proposalId);

    successLog("Successfully fetched proposal from freelancer Profile!");
    infoLog("getSingleProposal exit");
    return res.status(200).json({ isProposalFetched: true, data: proposal });
  } catch (error) {
    infoLog("getSingleProposal exit");
    errorLog("Error While fetching a proposal from freelancer side!");
    return res.status(500).json({ isProposalFetched: false, data: {} });
  }
};

module.exports = {
  createProposal,
  getAllProposals,
  getSingleProposal,
};
