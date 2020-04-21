const MailerService = {
  sendMail(data) {
    const { name, email, subject, message } = data;

    return fetch("../../../functions/email.js", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
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
          return res.json().then((e) => Promise.reject(e));
        }
      })
      .catch((error) => console.error(error));
  },
};

export default MailerService;
