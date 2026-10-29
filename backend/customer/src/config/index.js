const dotEnv = require("dotenv");
const fs = require("fs");
const path = require("path");
const isLocal = process.env.NODE_ENV === "dev" || process.env.NODE_ENV === "local";

// Load .env from backend/customer
const rootEnv = path.resolve(__dirname, "../../.env");
if (fs.existsSync(rootEnv)) {
  dotEnv.config({ path: rootEnv });
}

// Also check .env.dev if present
if (process.env.NODE_ENV) {
  const envFile = path.resolve(__dirname, `../../.env.${process.env.NODE_ENV}`);
  if (fs.existsSync(envFile)) {
    dotEnv.config({ path: envFile });
  }
}

// Fallback to default
dotEnv.config();

module.exports = {
  PORT: process.env.PORT || 8001,
  DB_URL: process.env.DATABASE_URL || process.env.DB_URL || process.env.MONGODB_URI,
  APP_SECRET: process.env.APP_SECRET || 'backend_project_team10',
  EXCHANGE_NAME: process.env.EXCHANGE_NAME || 'ONLINE_STORE',
  MSG_QUEUE_URL:
    process.env.MSG_QUEUE_URL ||
    (isLocal ? "amqp://localhost:5672" : "amqp://rabbitmq:5672"),
  CUSTOMER_SERVICE: "customer_service",
  SHOPPING_SERVICE: "shopping_service",
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
};
