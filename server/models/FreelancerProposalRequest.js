const { Schema, default: mongoose } = require("mongoose");

const freelancerProposalRequestSchema = new Schema(
  {
    projectId: {
      type: String,
      required: [true, "must provide project id"],
    },
    clientId: {
      type: String,
      required: [true, "must provide client id"],
    },
    freelancerId: {
      type: String,
      required: [true, "must provide freelancerId"],
    },
    expectedBidRate: {
      type: Number,
      required: [true, "must provide project expected bid rate"],
    },

    duration: {
      type: String,
      required: [true, "must provide project duration"],
    },

    portfolio: {
      type: String,
    },
    coverLetter: {
      type: String,
      required: [true, "must provide cover letter"],
    },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const FreelancerProposalRequest = mongoose.model(
  "FreelancerProposalRequest",
  freelancerProposalRequestSchema
);

module.exports = FreelancerProposalRequest;
