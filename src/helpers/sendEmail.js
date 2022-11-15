const sgMail = require("@sendgrid/mail");

const { SENDGRID_API_KEY, VERIFICATION_SENDER } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const mail = { ...data, from: VERIFICATION_SENDER };
  await sgMail.send(mail);
  return true;
};

module.exports = { sendEmail };
