const { Schema, default: mongoose } = require("mongoose");

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    username: {
      type: String,
      unique: true,
    },
    profileImg: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    email: {
      type: String,

      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
    },
    isClient: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    authMode: {
      type: String,
      required: true,
      default: "manual",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
