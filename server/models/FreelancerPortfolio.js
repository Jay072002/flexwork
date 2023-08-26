const { Schema, default: mongoose } = require("mongoose");

const freelancerPortfolioSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "must provide title"],
    },
    role: {
      type: String,
      required: [true, "must provide role"],
    },
    projectChallange: {
      type: String,
    },
    projectSolution: {
      type: String,
    },
    file: {
      type: String,
      required: [true, "must provide portfolio file"],
    },
    completionDate: {
      type: Date,
      required: [true, "must provide completion date"],
    },
    profileId: {
      type: String,
      required: [true, "must provide freelancer profileId"],
    },
  },
  { timestamps: true }
);

const FreelancerPortfolio = mongoose.model(
  "FreelancerPortfolio",
  freelancerPortfolioSchema
);

module.exports = FreelancerPortfolio;
