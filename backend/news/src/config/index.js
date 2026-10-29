const dotEnv = require('dotenv');
const fs = require('fs');
const path = require('path');

// Prioritize .env in the news root directory, then fall back to .env.<NODE_ENV>
const dotEnvPath = path.resolve(__dirname, '../../.env');
const envDevPath = path.resolve(__dirname, `../../.env.${process.env.NODE_ENV || 'dev'}`);

if (fs.existsSync(dotEnvPath)) {
  dotEnv.config({ path: dotEnvPath });
} else if (fs.existsSync(envDevPath)) {
  dotEnv.config({ path: envDevPath });
} else {
  dotEnv.config();
}

let dbUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/cradle_news';

// If Atlas URI doesn't specify a DB name, default to 'cradle_news'
if (dbUrl && dbUrl.endsWith('.mongodb.net/')) {
  dbUrl = `${dbUrl}cradle_news?retryWrites=true&w=majority`;
} else if (dbUrl && dbUrl.endsWith('.mongodb.net')) {
  dbUrl = `${dbUrl}/cradle_news?retryWrites=true&w=majority`;
}

module.exports = {
  PORT: process.env.PORT || 8004,
  DB_URL: dbUrl,
  SCRAPE_INTERVAL_MINUTES: parseInt(process.env.SCRAPE_INTERVAL_MINUTES || '30', 10),
  NODE_ENV: process.env.NODE_ENV || 'dev',
};

