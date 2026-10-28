const ScraperService = require('../services/scraper-service');

module.exports = (app) => {
  // 1. Health check
  app.get('/health', (req, res) => {
    return res.status(200).json({
      status: 'healthy',
      service: 'cradle-news-service',
      timestamp: new Date().toISOString(),
    });
  });

  // 2. Get list of news categories with counts
  app.get('/categories', (req, res) => {
    try {
      const data = ScraperService.getCategories();
      return res.status(200).json(data);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  });

  // 3. Get featured / trending articles
  app.get('/featured', (req, res) => {
    try {
      const limit = parseInt(req.query.limit || '3', 10);
      const featured = ScraperService.getFeatured(limit);
      return res.status(200).json({ featured });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  });

  // 4. Manual trigger to refresh / scrape latest feeds
  app.post('/refresh', async (req, res) => {
    try {
      console.log('🔄 Manual news refresh requested via API...');
      const articles = await ScraperService.scrapeAll();
      return res.status(200).json({
        message: 'News refreshed successfully',
        count: articles.length,
        lastScrapedAt: new Date().toISOString(),
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  });

  // 5. Get single article by ID or slug
  app.get('/:id', (req, res) => {
    try {
      const article = ScraperService.getNewsByIdOrSlug(req.params.id);
      if (!article) {
        return res.status(404).json({ error: 'News article not found' });
      }
      return res.status(200).json(article);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  });

  // 6. Get all news articles with category, search & pagination filters
  app.get('/', (req, res) => {
    try {
      const { category, search, page, limit } = req.query;
      const data = ScraperService.getNews({ category, search, page, limit });
      return res.status(200).json(data);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  });
};
