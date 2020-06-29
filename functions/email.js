const sgMail = require('@sendgrid/mail');
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
		subject: `New contact submission from ${email}`,
		html: `<main style="background-color: #D5DEE2; height: 100vh; font-family: 'Helvetica'; color: black;"><div style="position: sticky; left: 20px; top: 20px; margin-bottom: 100px;"><img src="http://cdn.mcauto-images-production.sendgrid.net/6f931ad6136eca3c/c1da312b-92bb-4661-ad0d-18b665902207/499x200.png" style="height: 40px;" /></div><section class='message' style="background-color: white; padding: 20px; max-width: 800px; width: 80%; margin: 0 auto; min-height: 50vh; border-radius: 10px;"><h2 style="font-weight: normal">New Form Submission:</h2><section class='submission'><ul><li>Name: ${name}</li><li>Email: ${email}</li><li>Subject: ${subject}</li><li>Message: ${message}</li></ul><h3 style="font-weight: normal; margin-top: 40px">Reply to this email directly to message <span style="text-decoration: underline">${email}</span></h3></section></section></main>`,
	};

	try {
		await sgMail.send(msg);
		console.log('successfully sent message from ' + email + 'at' + new Date());
		return {
			statusCode: 200,
			body: 'Message sent',
		};
	} catch (e) {
		console.error('failed message from ' + email + 'at ' + new Date());
		return {
			statusCode: e.code,
			body: e.response.body,
		};
	}
};
