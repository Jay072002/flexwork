const { Schema, default: mongoose } = require("mongoose");

const freelancerEducationSchema = new Schema(
  {
    // relation with the freelancer profile table
    profileId: {
      type: Schema.Types.ObjectId, // Change to ObjectId type
      ref: "FreelancerProfile", // Reference the FreelancerProfile model
      unique: true,
      required: [true, "must provide freelancer profileId"],
    },
    universityName: {
      type: String,
      required: [true, "must provide university name"],
    },
    degree: {
      type: String,
      required: [true, "must provide course name"],
    },
    course: {
      type: String,
      required: [true, "must provide course name"],
    },
    description: {
      type: String,
    },
    completionDate: {
      type: String,
      required: [true, "must provide completion date"],
    },
  },
  { timestamps: true }
);

const FreelancerEducation = mongoose.model(
  "FreelancerEducation",
  freelancerEducationSchema
);

module.exports = FreelancerEducation;
