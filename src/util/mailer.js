const MailerService = {
  async sendMail(data) {
    const { name, email, subject, message } = data;

    return fetch(
      "https://firefly-drone-shows.netlify.app/.netlify/functions/email",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
        }),
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          debugger;
          return res.json().then((e) => {
            Promise.reject(e);
          });
        }
      })
      .catch((error) => console.error(error));
  },
};

export default MailerService;
