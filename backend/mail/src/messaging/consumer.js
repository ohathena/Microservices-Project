const amqplib = require("amqplib");
const { MSG_QUEUE_URL, EXCHANGE_NAME, MAILING_SERVICE } = require("../config");
const { handleMailEvent } = require("../services/email-handler");

async function startConsumer() {
  try {
    const connection = await amqplib.connect(MSG_QUEUE_URL);
    const channel = await connection.createChannel();

    await channel.assertExchange(EXCHANGE_NAME, "direct", { durable: true });

    const queue = await channel.assertQueue("mail_service_queue", {
      durable: true,
    });

    channel.bindQueue(queue.queue, EXCHANGE_NAME, MAILING_SERVICE);

    channel.consume(
      queue.queue,
      async (msg) => {
        if (msg == null) return;

        try {
          const payload = JSON.parse(msg.content.toString());
          await handleMailEvent(payload);

          channel.ack(msg);
          console.log("Mail event processed successfully:", payload.event);
        } catch (error) {
          console.error("Error processing mail event:", error.message);
          channel.nack(msg, false, false);
        }
      },
      { noAck: false },
    );

    console.log("Mail Service is listening for RabbitMQ events...");
  } catch (error) {
    console.error("Error starting Mail Service consumer:", error.message);
    throw error;
  }
}

module.exports = { startConsumer };
