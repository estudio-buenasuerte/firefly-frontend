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

  console.table(req.body);

  let mailOptions = {
    from: process.env.REACT_APP_EMAIL_ACCOUNT,
    to: "lucasvocos@gmail.com",
    subject: "New inquiry from Fireflydroneshows.com",
    html: `<p>${message}</p>`,
  };

  console.log(
    transporter
      .sendMail(mailOptions)
      .then((response) => console.log("done!", response))
  );
  transporter
    .sendMail(mailOptions)
    .then((response) => {
      console.log("Email sent from node!", response);
    })
    .catch((error) => {
      console.error("Error!", error);
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
