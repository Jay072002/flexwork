const { Schema, default: mongoose } = require("mongoose");

const clientProfileSchema = new Schema(
  {
    companyName: {
      type: String,
      required: [true, "must provide companyName"],
    },
    description: {
      type: String,
      required: [true, "must provide description"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },

    // relation with the user table
    userId: {
      type: String,
      unique: true,
      required: [true, "must provide userId"],
    },
  },
  { timestamps: true }
);

const ClientProfile = mongoose.model("ClientProfile", clientProfileSchema);

module.exports = ClientProfile;
