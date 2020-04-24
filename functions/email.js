"use strict";
require("dotenv").config();

const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const bodyParser = express.json();
const nodemailer = require("nodemailer");
const app = express();

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
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

  const mailOptions = {
    from: process.env.REACT_APP_EMAIL_ACCOUNT,
    to: "lucasvocos@gmail.com",
    subject: "New inquiry from Fireflydroneshows.com",
    text: "test",
  };

  transporter.sendMail(mailOptions, (error, data) => {
    if (error) {
      console.log("error occurs", error);
    } else {
      console.log("data", data);
    }
  });

  console.log(`GMAIL`, process.env.REACT_APP_EMAIL_ACCOUNT);
  console.log(`GMAIL PASS`, process.env.REACT_APP_EMAIL_PASSWORD);
  console.log(`name:`, name);
  console.log(`email:`, email);
  console.log(`subject:`, subject);
  console.log(`message:`, message);

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
