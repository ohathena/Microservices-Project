const dotEnv = require("dotenv");
const fs = require("fs");
const path = require("path");

const envFile = process.env.NODE_ENV
  ? path.resolve(__dirname, `../../.env.${process.env.NODE_ENV}`)
  : path.resolve(__dirname, "../../.env");

if (fs.existsSync(envFile)) {
  dotEnv.config({ path: envFile });
} else {
  dotEnv.config();
}

module.exports = {
  PORT: process.env.PORT || 8002,
  DB_URL: process.env.MONGODB_URI,
  APP_SECRET: process.env.APP_SECRET || "backend_project_team10",
  BASE_URL: process.env.BASE_URL,
  EXCHANGE_NAME: process.env.EXCHANGE_NAME || "ONLINE_STORE",
  MSG_QUEUE_URL: process.env.MSG_QUEUE_URL || "amqp://rabbitmq:5672",
  CUSTOMER_SERVICE: "customer_service",
  SHOPPING_SERVICE: "shopping_service",
};
