const nodemailer = require("nodemailer");
const emailConfig = require("../config/email.config");
const config = require("../config/config");

const transport = nodemailer.createTransport({
    host: emailConfig.SMTP_HOST,
    port: emailConfig.SMPT_PORT,
    auth: {
        user: emailConfig.SMTP_USERNAME,
        pass: emailConfig.SMTP_PASSWORD,
    },
});

const sendEmail = async (to, subject, text) => {
    const msg = { from: emailConfig.EMAIL_FROM, to, subject, text };
    await transport.sendMail(msg);
};

const sendVerificationEmail = async (to, token) => {
    const subject = "Email Verification";
    const verificationEmailUrl = `http://localhost:${config.port}/auth/v1/verify-email/${token}`;
    const text = `Dear user,
        To verify your email, click on this link: ${verificationEmailUrl}
        If you did not create an account, then ignore this email.`;
    await sendEmail(to, subject, text);
};
module.exports = {
    transport,
    sendEmail,
    sendVerificationEmail,
};
