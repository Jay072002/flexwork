const { infoLog, errorLog, successLog } = require("../helper/logHelper");
const FreelancerProposalRequest = require("../models/FreelancerProposalRequest");
const User = require("../models/User");
const ClientProject = require("../models/ClientProject");
const { sendMail } = require("../service/nodemailer");

const getAllProposals = async (req, res) => {
  infoLog("getAllProposals entry");
  const { id: projectId, limit } = req.query;
  const { id: clientId } = req.user;
  try {
    let clientAllProposals = [];
    let freelancers = [];
    let userIds = [];

    if (limit == "true") {
      clientAllProposals = await FreelancerProposalRequest.find({
        $and: [{ projectId: projectId }, { clientId: clientId }],
        $or: [{ status: "Pending" }, { status: "Accepted" }],
      })
        .limit(5)
        .sort({ freelancerId: 1, createdAt: -1 });
      userIds = clientAllProposals.map((proposal) => proposal.freelancerId);

      freelancers = await User.find({ _id: { $in: userIds } }).sort({
        _id: 1,
      });
    } else {
      clientAllProposals = await FreelancerProposalRequest.find({
        $and: [{ projectId: projectId }, { clientId: clientId }],
        $or: [{ status: "Pending" }, { status: "Accepted" }],
      });

      userIds = clientAllProposals.map((proposal) => proposal.freelancerId);

      freelancers = await User.find({ _id: { $in: userIds } }).sort({
        _id: 1,
      });
    }

    successLog("Successfully fetched all proposals!");
    infoLog("getAllProposals exit");
    return res.status(200).json({
      isProposalsFetched: true,
      data: { clientAllProposals, freelancers },
    });
  } catch (error) {
    console.log(error.message);
    infoLog("getProjects exit");
    errorLog("Error While fetching all proposals");
    return res.status(500).json({ isProposalsFetched: false, data: {} });
  }
};

const getSingleProposal = async (req, res) => {
  infoLog("getSingleProposal entry");
  const { proposalId } = req.params;
  try {
    const clientProposal = await FreelancerProposalRequest.findById(proposalId);

    successLog("Successfully fetched single proposal!");
    infoLog("getSingleProposal exit");
    return res
      .status(200)
      .json({ isProposalsFetched: true, data: clientProposal });
  } catch (error) {
    infoLog("getSingleProposal exit");
    errorLog("Error While fetching single proposals");
    return res.status(500).json({ isProposalFetched: false, data: {} });
  }
};

const approveProposal = async (req, res) => {
  infoLog("approveProposal entry");
  const { proposalId } = req.params;
  const { id: projectId } = req.query;

  const acceptMessage = `I hope this email finds you well. I am writing to confirm that we have reviewed your proposal, and after careful consideration, we have decided to accept it.

We are impressed with the quality of your work and the thoroughness of your proposal. We believe that your proposed solution is the best fit for our needs, and we look forward to working with you to bring this project to fruition.
    
We are excited to begin this project with you and are confident that we will have a successful outcome. Please let us know if you have any questions or concerns.
  
Thank you for your hard work and dedication to this project.
  
Best regards,
  
flexWork`;

  const rejectMessage = `Thank you for submitting your proposal. We appreciate the time and effort you have put into the proposal, and we have carefully reviewed it.

After careful consideration, we regret to inform you that your proposal has not been selected for further consideration at this time. While we found your proposal to be interesting and well-written, we have decided to move forward with another proposal that better fits our current needs.
  
We understand that receiving a rejection can be disappointing, but we encourage you to keep pursuing your goals and to submit future proposals as they become available. Your skills and expertise are valuable, and we appreciate the opportunity to consider your proposal.
  
Thank you again for your interest in working with us, and we wish you all the best in your future endeavors.
  
Sincerely,
  
fleXwork`;

  try {
    console.log("proposalId", proposalId);

    const approvedProposal = await FreelancerProposalRequest.findByIdAndUpdate(
      proposalId,
      {
        status: "Accepted",
      },
      { new: true }
    );

    // after approving a proposal find all the freelancer who bid in this project
    const restFreelancerProposals = await FreelancerProposalRequest.find({
      $and: [{ projectId: projectId }, { _id: { $ne: proposalId } }],
    });

    console.log("RestFreelancerProposals", restFreelancerProposals);

    let restFreelacersId = restFreelancerProposals.map((a) => a.freelancerId);

    console.log("RestFreelacersId", restFreelacersId);

    await FreelancerProposalRequest.updateMany(
      {
        $and: [{ projectId: projectId }, { _id: { $ne: proposalId } }],
      },
      { status: "Rejected" }
    );

    const acceptFreelancerEmail = await User.findOne(
      {
        _id: approvedProposal?.freelancerId,
      },
      "email"
    );

    console.log("acceptFreelancerEmail", acceptFreelancerEmail);

    // unpublish the project
    await ClientProject.findByIdAndUpdate(projectId, { isPublished: false });

    // send acceptance mail to freelancer
    sendMail({
      name: "flexWork",
      email: acceptFreelancerEmail?.email,
      message: acceptMessage,
    });

    const restFreelancerEmails = await User.find(
      {
        _id: { $in: restFreelacersId },
      },
      "email"
    );

    console.log("restFreelancerEmails", restFreelancerEmails);

    restFreelancerEmails.forEach((freelancer) => {
      sendMail({
        name: "flexWork",
        email: freelancer?.email,
        message: rejectMessage,
      });
    });

    successLog("Successfully approved single proposal!");
    infoLog("approveProposal exit");

    return res.status(200).json({
      isProposalsApproved: true,
      data: approvedProposal,
      restFreelancerEmails: restFreelancerEmails,
    });
  } catch (error) {
    console.log(error);
    infoLog("approveProposal exit");
    errorLog("Error While approving single proposal");
    return res.status(500).json({ isProposalApproved: false, data: {} });
  }
};

const rejectProposal = async (req, res) => {
  infoLog("rejectProposal entry");
  const { proposalId } = req.params;
  try {
    const rejectProposal = await FreelancerProposalRequest.findByIdAndUpdate(
      proposalId,
      {
        status: "Rejected",
      }
    );
    successLog("Successfully rejected single proposal!");
    infoLog("rejectProposal exit");
    return res
      .status(200)
      .json({ isProposalRejected: true, data: rejectProposal });
  } catch (error) {
    infoLog("rejectProposal exit");
    errorLog("Error While rejecting single proposal");
    return res.status(500).json({ isProposalRejected: false, data: {} });
  }
};

const deleteProposal = async (req, res) => {
  infoLog("deleteProposal entry");
  const { proposalId } = req.params;
  try {
    const deleteProposal = await FreelancerProposalRequest.findByIdAndDelete(
      proposalId
    );
    successLog("Successfully deleted single proposal!");
    infoLog("deleteProposal exit");
    return res
      .status(200)
      .json({ isProposalDeleted: true, data: deleteProposal });
  } catch (error) {
    infoLog("deleteProposal exit");
    errorLog("Error While deleting single proposal");
    return res.status(500).json({ isProposalDeleted: false, data: {} });
  }
};

module.exports = {
  getAllProposals,
  getSingleProposal,
  approveProposal,
  rejectProposal,
  deleteProposal,
};
