"use strict";
const express = require("express");
const serverless = require("serverless-http");
const app = express();
const bodyParser = express.json();
const nodemailer = require("nodemailer");

const router = express.Router();

router.route("/").post(bodyParser, (req, res) => {
  const { name, email, subject, message } = req.body;

  console.log(req.body);

  res.status(200).json({
    name,
    email,
    subject,
    message,
  });
});

function sendEmail(data) {}

app.use(bodyParser);
app.use("/.netlify/functions/email", router); // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);
