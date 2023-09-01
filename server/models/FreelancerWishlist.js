const { Schema, default: mongoose } = require("mongoose");

const freelancerWishlistSchema = new Schema(
  {

    // relation with the client project table
    projectId: {
      type: String,
      required: [true, "must provide projectId"],
    },

    // relation withh the user table
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
