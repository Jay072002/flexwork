const nodemailer = require("nodemailer");
require("dotenv").config();

const NODEMAILER_USER = process.env.NODEMAILER_USER;
const NODEMAILER_PASS = process.env.NODEMAILER_PASS;

const sendMail = ({ name, email, message }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: NODEMAILER_USER,
      pass: NODEMAILER_PASS,
    },
  });

  const mailOptions = {
    from: NODEMAILER_USER,
    to: email,
    subject: `Message from ${name}`,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = { sendMail };