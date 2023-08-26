const { Schema, default: mongoose } = require("mongoose");

const freelancerWishlistSchema = new Schema(
  {
    projectId: {
      type: String,
      required: [true, "must provide projectId"],
    },

    freelancerId: {
      type: String,
      required: [true, "must provide freelancerId"],
    },
  },
  { timestamps: true }
);

const FreelancerWishlist = mongoose.model(
  "FreelancerWishlist",
  freelancerWishlistSchema
);

module.exports = FreelancerWishlist;
