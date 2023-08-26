require("dotenv").config();
const AWS = require("aws-sdk");
const multer = require("multer");

AWS.config.update({
  accessKeyId: "AKIA4NMNP46ZKIFZZ7OQ",
  secretAccessKey: "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",
  region: "ap-south-1",
});

const s3 = new AWS.S3();

const upload = multer();

module.exports = { upload, s3 };
