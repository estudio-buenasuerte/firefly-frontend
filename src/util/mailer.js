const MailerService = {
	async sendMail(data) {
		const { form, name, email, subject, message } = data;

		fetch('/.netlify/functions/email', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				'form-name': form,
				name,
				email,
				subject,
				message,
			}),
		})
			.then((res) => {
				if (res.ok) {
					return res.json();
				} else {
					return res.json().then((e) => {
						Promise.reject(e);
					});
				}
			})
			.catch((error) => console.error(error));
	},
};

export default MailerService;
