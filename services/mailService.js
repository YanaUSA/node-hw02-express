const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (data) => {
  try {
    const email = { ...data, from: "everesty@meta.ua" };

    await sgMail.send(email);
    return true;
  } catch (error) {
    console.error(error);
  }

  // const msg = {
  //   to: "teserat480@djpich.com", // Change to your recipient
  //   from: "everesty@emeta.ua", // Change to your verified sender
  //   subject: "Test email",
  //   text: "please verify your email",
  //   html: "<strong>Test email from localhost:3000</strong>",
  // };

  // await sgMail.send(msg)
  // .then(() => {
  //   console.log("Email sent");
  // })
  // .catch((error) => {
  //   console.error(error);
  // });
};

module.exports = sendEmail;
