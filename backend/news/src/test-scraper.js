const ScraperService = require('./services/scraper-service');
const { databaseConnection, NewsModel } = require('./database');

async function runTest() {
  console.log('🧪 Starting test for PC News Scraper with MongoDB Atlas...');
  const start = Date.now();

  try {
    // 1. Connect to MongoDB
    await databaseConnection();

    // 2. Run Scraper
    const articles = await ScraperService.scrapeAll();
    const duration = ((Date.now() - start) / 1000).toFixed(2);

    console.log(`\n========================================`);
    console.log(`✅ SCRAPING & INGESTION COMPLETE in ${duration}s`);
    console.log(`Total Articles Ingested: ${articles.length}`);
    console.log(`========================================\n`);

    // 3. Verify in MongoDB Atlas
    try {
      const dbCount = await NewsModel.countDocuments();
      console.log(`📦 Verification: Found ${dbCount} news articles currently in MongoDB database!`);
    } catch (countErr) {
      console.warn('Count check note:', countErr.message);
    }

    const categories = ScraperService.getCategories();
    console.log('\n📊 Category Breakdown:');
    console.log(categories.counts);

    console.log('\n🔥 Sample Top 3 Latest Articles Saved:');
    articles.slice(0, 3).forEach((a, idx) => {
      console.log(`\n[${idx + 1}] ${a.title}`);
      console.log(`    Category: [${a.category}] | Source: ${a.source}`);
      console.log(`    Published: ${a.publishedAt}`);
      console.log(`    URL: ${a.sourceUrl}`);
      console.log(`    Image: ${a.image}`);
      console.log(`    Snippet: ${a.summary.slice(0, 100)}...`);
    });

    console.log('\n✨ Test finished successfully! Check your MongoDB Atlas cluster.\n');
    process.exit(0);
  } catch (err) {
    console.error('❌ Standalone test error:', err);
    process.exit(1);
  }
}

runTest();

