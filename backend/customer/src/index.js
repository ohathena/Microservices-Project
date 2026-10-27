const express = require('express');
const { PORT } = require('./config');
const { databaseConnection } = require('./database');
const expressApp = require('./express-app');
const { CreateChannel } = require('./utils');

const StartServer = async () => {
  const app = express();

  // Initialize Neon PostgreSQL Database
  await databaseConnection();

  // Initialize Message Broker (RabbitMQ) if available
  const channel = await CreateChannel();

  // Initialize Express App
  await expressApp(app, channel);

  app
    .listen(PORT, () => {
      console.log(`🚀 Customer service listening on port ${PORT}`);
    })
    .on('error', (err) => {
      console.error('Server error:', err);
      process.exit(1);
    })
    .on('close', () => {
      if (channel) channel.close();
    });
};

StartServer();
