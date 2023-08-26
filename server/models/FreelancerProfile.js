const { Schema, default: mongoose } = require("mongoose");

const freelancerProfileSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "must provide title"],
    },
    description: {
      type: String,
      required: [true, "must provide description"],
    },

    // relation with the user table
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      unique: true,
      required: [true, "must provide userId"],
    },
    skills: {
      type: [String],
      default: []
    },
  },
  { timestamps: true }
);

const FreelancerProfile = mongoose.model(
  "FreelancerProfile",
  freelancerProfileSchema
);

module.exports = FreelancerProfile;
