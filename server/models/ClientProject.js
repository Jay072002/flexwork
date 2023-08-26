const { Schema, default: mongoose } = require("mongoose");

const clientProjectSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "must provide title name"],
    },
    description: {
      type: String,
      required: [true, "must provide description"],
    },
    skills: {
      type: [String],
      required: [true, "must provide skills"],
    },
    category: {
      type: String,
      required: [true, "must provide category date"],
    },
    scope: {
      type: String,
      enum: ["small", "medium", "large"],
      required: [true, "must provide scope"],
    },
    duration: {
      type: String,
      enum: ["1 month", "3 month", "6 month", "12 month"],
      required: [true, "must provide duration"],
    },
    experienceType: {
      type: String,
      enum: ["fresher", "intermediate", "experienced"],
    },
    projectRate: {
      type: Number,
      required: [true, "must provide project rate"],
    },
    file: {
      type: String,
    },
    totalProposals: {
      type: Number,
      default: 0,
    },
    userId: {
      type: String,
      required: [true, "must provide userId"],
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const ClientProject = mongoose.model("ClientProject", clientProjectSchema);

module.exports = ClientProject;
