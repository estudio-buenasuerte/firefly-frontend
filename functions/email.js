// "use strict";
// require("dotenv").config();

// const express = require("express");
// const serverless = require("serverless-http");
// const cors = require("cors");
// const bodyParser = express.json();
// const sgMail = require("@sendgrid/mail");
// const app = express();

// const router = express.Router();

// sgMail.setApiKey(process.env.REACT_APP_SENDGRID_KEY);

// app.use(cors());
// app.use(bodyParser);
// app.use("/.netlify/functions/email", router);

// router.route("/").post(bodyParser, (req, res) => {
//   const { name, email, subject, message } = req.body;

//   const msg = {
//     to: "lucasvocos@gmail.com",
//     from: "web@fireflydroneshows.com",
//     subject: "Message from SendGrid",
//     text: `Name: ${name}. Email: ${email}. Subject: ${subject}. Message: ${message}.`,
//     html: `<h1>New inquiry:</h1><ul><li>Name: ${name}.</li><li>Email: ${email}.</li><li> Subject: ${subject}. </li><li>Message: ${message}.</li></ul>`,
//   };

//   sgMail
//     .send(msg)
//     .then((response) => {
//       console.log(`Message from ${email} sent!`, response);
//     })
//     .catch((error) => {
//       console.log(error.response.body);
//     });

//   res.status(200).json({
//     name,
//     email,
//     subject,
//     message,
//   });
// });

// module.exports = app;
// module.exports.handler = serverless(app);

const sgMail = require("@sendgrid/mail");
const { REACT_APP_SENDGRID_KEY } = process.env;

exports.handler = async (event, context, callback) => {
  const payload = JSON.parse(event.body);
  const { name, email, subject, message } = payload;

  sgMail.setApiKey(REACT_APP_SENDGRID_KEY);

  const msg = {
    to: "lucasvocos@gmail.com",
    from: "web@fireflydroneshows.com",
    subject: `Contact Form Submission from ${email}`,
    html: `<h1>New inquiry:</h1><ul><li>Name: ${name}.</li><li>Email: ${email}.</li><li> Subject: ${subject}. </li><li>Message: ${message}.</li></ul>`,
  };

  try {
    await sgMail.send(msg);

    return {
      statusCode: 200,
      body: "Message sent",
    };
  } catch (e) {
    return {
      statusCode: e.code,
      body: e.response.body,
    };
  }
};
