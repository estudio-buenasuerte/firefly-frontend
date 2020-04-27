const sgMail = require("@sendgrid/mail");
const {
  REACT_APP_SENDGRID_KEY,
  REACT_APP_SENDGRID_TO,
  REACT_APP_SENDGRID_FROM,
} = process.env;

exports.handler = async (event, context, callback) => {
  const payload = JSON.parse(event.body);
  const { name, email, subject, message } = payload;

  sgMail.setApiKey(REACT_APP_SENDGRID_KEY);

  const msg = {
    to: REACT_APP_SENDGRID_TO,
    from: REACT_APP_SENDGRID_FROM,
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
