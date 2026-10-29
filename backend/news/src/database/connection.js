const mongoose = require('mongoose');
const { DB_URL } = require('../config');

let isConnected = false;

module.exports = async () => {
  try {
    if (!DB_URL) {
      console.warn('⚠️ MONGODB_URI is not configured, running in-memory mode.');
      return false;
    }

    await mongoose.connect(DB_URL, {
      serverSelectionTimeoutMS: 3000,
    });
    isConnected = true;
    console.log('✅ News database connected successfully to MongoDB');
    return true;
  } catch (error) {
    console.warn(`⚠️ News database connection failed (${error.message}). Continuing with in-memory cache.`);
    isConnected = false;
    return false;
  }
};

module.exports.isDbConnected = () => isConnected;
