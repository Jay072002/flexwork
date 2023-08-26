const nodemailer = require("nodemailer");
require("dotenv").config();

const NODEMAILER_USER = process.env.NODEMAILER_USER;
const NODEMAILER_PASS = process.env.NODEMAILER_PASS;

const sendMail = ({ name, email, message }) => {
  console.log(email);
  // console.log(NODEMAILER_USER);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: 'securesally@gmail.com',
      pass: 'xlmdcchzhblsiapu',
    },
  });

  const mailOptions = {
    from: 'securesally@gmail.com',
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
