const bcrypt = require("bcrypt");
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
    return hash === savedPassword;
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

// Message Broker (RabbitMQ) with graceful fallback
module.exports.CreateChannel = async () => {
  const maxAttempts = 15;

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      const connection = await amqplib.connect(MSG_QUEUE_URL);
      const channel = await connection.createChannel();
      await channel.assertExchange(EXCHANGE_NAME, "direct", { durable: true });
      console.log("✅ RabbitMQ channel established.");
      return channel;
    } catch (err) {
      console.error(
        `RabbitMQ connection attempt ${attempt}/${maxAttempts} failed:`,
        err.message
      );

      if (attempt < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
    }
  }

  console.log(
    "ℹ️ RabbitMQ connection skipped or unavailable (running in standalone mode)."
  );
  return null;
};

module.exports.PublishMessage = (channel, service, msg) => {
  if (!channel) return;
  channel.publish(EXCHANGE_NAME, service, Buffer.from(typeof msg === 'string' ? msg : JSON.stringify(msg)));
  console.log("Sent: ", msg);
};

module.exports.SubscribeMessage = async (channel, service) => {
  if (!channel) return;
  try {
    await channel.assertExchange(EXCHANGE_NAME, "direct", { durable: true });
    const q = await channel.assertQueue("", { exclusive: true });
    console.log(`Waiting for messages in queue: ${q.queue}`);

    channel.bindQueue(q.queue, EXCHANGE_NAME, CUSTOMER_SERVICE);

    channel.consume(
      q.queue,
      (msg) => {
        if (msg.content) {
          console.log("Message received:", msg.content.toString());
          service.SubscribeEvents(msg.content.toString());
        }
      },
      { noAck: true }
    );
  } catch (err) {
    console.error("SubscribeMessage error:", err.message);
  }
};
