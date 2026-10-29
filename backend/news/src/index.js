const express = require('express');
const { PORT, SCRAPE_INTERVAL_MINUTES } = require('./config');
const { databaseConnection } = require('./database');
const expressApp = require('./express-app');
const ScraperService = require('./services/scraper-service');

const StartServer = async () => {
  const app = express();

  // 1. Connect to Database (graceful fallback if offline)
  await databaseConnection();

  // 2. Configure Express middleware & API routes
  await expressApp(app);

  // 3. Start HTTP Server
  const server = app
    .listen(PORT, () => {
      console.log(`========================================`);
      console.log(`📰 Cradle News Service running on port ${PORT}`);
      console.log(`========================================`);

      // 4. Perform initial scrape on startup
      ScraperService.scrapeAll().catch((err) =>
        console.error('Initial news scrape failed:', err.message)
      );

      // 5. Periodic background scheduler
      const intervalMs = Math.max(5, SCRAPE_INTERVAL_MINUTES) * 60 * 1000;
      setInterval(() => {
        console.log('⏰ Running scheduled background news ingestion...');
        ScraperService.scrapeAll().catch((err) =>
          console.error('Scheduled scrape failed:', err.message)
        );
      }, intervalMs);
    })
    .on('error', (err) => {
      console.error('Server startup error:', err);
      process.exit(1);
    });
};

StartServer();
