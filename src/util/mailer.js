const MailerService = {
  sendMail(data) {
    const { name, email, subject, message } = data;

    return fetch(
      "https://firefly-drone-shows.netlify.app/.netlify/functions/email",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
        }),
      }
    )
      .then((res) => {
        debugger;
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((e) => Promise.reject(e));
        }
      })
      .catch((error) => console.error(error));
  },
};

export default MailerService;
