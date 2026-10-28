const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

const envFile = process.env.NODE_ENV
  ? path.resolve(__dirname, `../../.env.${process.env.NODE_ENV}`)
  : path.resolve(__dirname, "../../.env");

if (fs.existsSync(envFile)) {
  dotenv.config({ path: envFile });
} else {
  dotenv.config();
}

module.exports = {
  PORT: Number(process.env.PORT || 8004),
  MSG_QUEUE_URL: process.env.MSG_QUEUE_URL || "amqp://rabbitmq:5672",
  EXCHANGE_NAME: process.env.EXCHANGE_NAME || "ONLINE_STORE",
  MAILING_SERVICE: process.env.MAILING_SERVICE || "mailing_service",
  SMTP_HOST: process.env.SMTP_HOST || "mailpit",
  SMTP_PORT: Number(process.env.SMTP_PORT || 1025),
  SMTP_SECURE: process.env.SMTP_SECURE === "true",
  SMTP_USER: process.env.SMTP_USER,
  SMTP_PASSWORD: process.env.SMTP_PASSWORD,
  MAIL_FROM: process.env.MAIL_FROM || "Cradle Store <no-reply@cradle.local>",
};
