const nodemailer = require("nodemailer");
require("dotenv").config();

const NODEMAILER_USER = process.env.NODEMAILER_USER;
const NODEMAILER_PASS = process.env.NODEMAILER_PASS;

const sendMail = ({ name, email, message }) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: 'jay.panchal0704@gmail.com',
      pass: 'rogqlbydjknbldir',
    },
  });

  const mailOptions = {
    from: 'jay.panchal0704@gmail.com',
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