const express = require('express');
const { PORT } = require('./config');
const { databaseConnection } = require('./database');
const expressApp = require('./express-app');
const { CreateChannel } = require('./utils');

const StartServer = async () => {
  const app = express();

  // Initialize Neon PostgreSQL Database
  await databaseConnection();

  // Initialize Message Broker (RabbitMQ) for Customer -> Mail
  let channel = null;
  try {
    channel = await CreateChannel();
  } catch (err) {
    console.warn("RabbitMQ initialization error, proceeding standalone:", err.message);
  }

  // Initialize Express App
  await expressApp(app, channel);

  app
    .listen(PORT, () => {
      console.log(`🚀 Customer service listening on port ${PORT}`);
    })
    .on('error', (err) => {
      console.error('Server error:', err);
      process.exit(1);
    });
};

StartServer();
