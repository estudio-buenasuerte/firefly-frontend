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
    replyTo: email || REACT_APP_SENDGRID_FROM,
    templateId: "d-f9ef2cb4852a4b17b4f4b3ce5a02ac59",
    dynamic_template_data: {
      name,
      email,
      subject,
      message,
    },
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
