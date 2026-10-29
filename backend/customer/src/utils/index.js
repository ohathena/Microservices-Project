const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const amqplib = require("amqplib");

const {
  APP_SECRET,
  EXCHANGE_NAME,
  CUSTOMER_SERVICE,
  MSG_QUEUE_URL,
} = require("../config");

// Password & Token utilities
module.exports.GenerateSalt = async () => {
  return await bcrypt.genSalt(10);
};

module.exports.GeneratePassword = async (password, salt) => {
  return await bcrypt.hash(password, salt);
};

module.exports.ValidatePassword = async (enteredPassword, savedPassword, salt) => {
  if (salt) {
    const hash = await bcrypt.hash(enteredPassword, salt);
    if (hash === savedPassword) return true;
    return await bcrypt.compare(enteredPassword, savedPassword);
  }
  return await bcrypt.compare(enteredPassword, savedPassword);
};

module.exports.GenerateSignature = async (payload) => {
  try {
    return await jwt.sign(payload, APP_SECRET, { expiresIn: "30d" });
  } catch (error) {
    console.error("JWT signing error:", error);
    return null;
  }
};

module.exports.ValidateSignature = async (req) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) return false;

    const token = authHeader.startsWith("Bearer ")
      ? authHeader.slice(7).trim()
      : authHeader.split(" ")[1] || authHeader;

    const payload = await jwt.verify(token, APP_SECRET);
    req.user = payload;
    return true;
  } catch (error) {
    console.error("JWT verification error:", error.message);
    return false;
  }
};

module.exports.FormateData = (data) => {
  return { data };
};

// Message Broker (RabbitMQ: Customer -> Mail connection)
let activeChannel = null;

module.exports.CreateChannel = async () => {
  const maxRetries = 10;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`[Customer] Connecting to RabbitMQ at ${MSG_QUEUE_URL} (attempt ${attempt}/${maxRetries})...`);
      const connection = await amqplib.connect(MSG_QUEUE_URL);
      const channel = await connection.createChannel();
      await channel.assertExchange(EXCHANGE_NAME, "direct", { durable: true });
      console.log("✅ [Customer] RabbitMQ channel established.");

      connection.on("error", (err) => {
        console.warn("⚠️ RabbitMQ connection error:", err.message);
        activeChannel = null;
      });
      connection.on("close", () => {
        console.warn("⚠️ RabbitMQ connection closed.");
        activeChannel = null;
      });

      activeChannel = channel;
      return channel;
    } catch (err) {
      console.warn(`[Customer] RabbitMQ attempt ${attempt}/${maxRetries} failed:`, err.message);
      if (attempt < maxRetries) {
        await new Promise((r) => setTimeout(r, 1500));
      }
    }
  }
  console.log("⚠️ RabbitMQ unavailable; customer service running without message broker.");
  return null;
};

// Asynchronous, non-blocking message publisher
module.exports.PublishMessage = (channel, service, msg) => {
  const ch = channel || activeChannel;
  if (!ch) {
    console.warn("⚠️ [Customer] RabbitMQ channel unavailable, skipping message publish to:", service);
    return;
  }

  // Fire-and-forget: execute asynchronously so caller HTTP response is never blocked
  setImmediate(() => {
    try {
      const payload = typeof msg === "string" ? msg : JSON.stringify(msg);
      ch.publish(EXCHANGE_NAME, service, Buffer.from(payload), {
        persistent: true,
      });
      console.log(`✉️ [Customer -> RabbitMQ] Asynchronously published event to ${service}:`, typeof msg === "object" ? msg.event : msg);
    } catch (err) {
      console.error("❌ Error publishing message to RabbitMQ:", err.message);
    }
  });
};

module.exports.SubscribeMessage = async (channel, service) => {
  // Customer currently only publishes to mail service
};
