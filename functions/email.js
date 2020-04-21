"use strict";
const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const bodyParser = express.json();
const nodemailer = require("nodemailer");
const app = express();

const router = express.Router();

app.use(bodyParser);
app.use(cors());
app.use("/.netlify/functions/email", router);

router.route("/").post(bodyParser, (req, res) => {
  const { name, email, subject, message } = req.body;

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
