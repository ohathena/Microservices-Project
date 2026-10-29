const nodemailer = require("nodemailer");
const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_SECURE,
  SMTP_USER,
  SMTP_PASSWORD,
  MAIL_FROM,
} = require("../config");

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_SECURE,
  auth:
    SMTP_USER && SMTP_PASSWORD
      ? {
          user: SMTP_USER,
          pass: SMTP_PASSWORD,
        }
      : undefined,
});

function welcomeEmailTemplate({ name }) {
  return {
    subject: "Welcome to Cradle Store!",
    html: `
        <html>
        <body style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Welcome, ${name}!</h2>
          <p>Thank you for joining Cradle.</p>
          <p>Your account is ready to use.</p>
        </body>
      </html>`,
  };
}

async function sendEmail({ to, subject, html }) {
    await transporter.sendMail({
        from: MAIL_FROM,
        to,
        subject,
        html,
    });
}

async function handleMailEvent(payload) {
    const { event, data } = payload;

    if(!data || !data.to){
        throw new Error("Missing recepient email");
    }

    switch (event) {
        case "USER_REGISTERED": {
            const template = welcomeEmailTemplate({ name: data.name || "Customer",});

            await sendEmail({
                to: data.to,
                subject: template.subject,
                html: template.html,
            });

            return;
        }

        default:
            console.log(`No email template for event: ${event}`);
            return;
    }
}

module.exports = { handleMailEvent };
