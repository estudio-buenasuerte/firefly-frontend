"use strict";
require("dotenv").config();

const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const bodyParser = express.json();
const nodemailer = require("nodemailer");
const app = express();

const router = express.Router();

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // hostname
  secureConnection: true, // use SSL
  port: 465, // port for secure SMTP
  auth: {
    user: process.env.REACT_APP_EMAIL_ACCOUNT,
    pass: process.env.REACT_APP_EMAIL_PASSWORD,
  },
});

app.use(cors());
app.use(bodyParser);
app.use("/.netlify/functions/email", router);

router.route("/").post(bodyParser, (req, res) => {
  const { name, email, subject, message } = req.body;

  console.table(req.body);
  console.log(name.value);

  let mailOptions = {
    from: process.env.REACT_APP_EMAIL_ACCOUNT,
    to: "lucasvocos@gmail.com",
    subject: "New inquiry from Fireflydroneshows.com",
    html: `<h1>New Message Received.</h1><ul><li>Name: ${name.value}</li><li>Email: ${email.value}</li> <li>Subject: ${subject.value}</li><li>Message:<p>${message.value}</p></li></ul>`,
  };

  console.log(transporter.sendMail(mailOptions));
  transporter
    .sendMail(mailOptions)
    .then((response) => {
      console.log("Email sent from node!", response);
      transporter.close();
    })
    .catch((error) => {
      console.error("Error!", error);
      transporter.close();
    });

  res.status(200).json({
    name,
    email,
    subject,
    message,
  });
});

function sendEmail(data) {}

module.exports = app;
module.exports.handler = serverless(app);
