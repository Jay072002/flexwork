const { Schema, default: mongoose } = require("mongoose");

const freelancerExperienceSchema = new Schema(
  {
    companyName: {
      type: String,
      required: [true, "must provide company name"],
    },
    role: {
      type: String,
      required: [true, "must provide role in company"],
    },
    description: {
      type: String,
      required: [true, "must provide description of the role"],
    },
    startDate: {
      type: String,
    },
    endDate: {
      type: String,
    },
    location: {
      type: String,
      default: null,
    },
    profileId: {
      type: String,
      required: [true, "must provide profileId of freelancer"],
    },
  },
  { timestamps: true }
);

const FreelancerExperience = mongoose.model(
  "FreelancerExperience",
  freelancerExperienceSchema
);

module.exports = FreelancerExperience;
