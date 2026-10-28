const express = require('express');
const cors = require('cors');
const { newsApi } = require('./api');

module.exports = async (app) => {
  app.use(express.json());
  app.use(cors());

  // Register news API routes
  newsApi(app);

  // Global Error Handler
  app.use((err, req, res, next) => {
    console.error('News service error:', err);
    res.status(500).json({ error: err.message || 'Internal Server Error' });
  });
};
