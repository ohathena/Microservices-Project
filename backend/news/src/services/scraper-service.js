const Parser = require('rss-parser');
const cheerio = require('cheerio');
const crypto = require('crypto');
const { NewsModel } = require('../database');
const { isDbConnected } = require('../database/connection');

const parser = new Parser({
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 CradleBot/1.0',
    Accept: 'application/rss+xml, application/xml, text/xml; q=0.9, */*; q=0.8',
  },
  timeout: 10000,
});

/* =========================================================================
   PRIMARY PC HARDWARE SOURCES
   ========================================================================= */

const FEEDS = [
  {
    name: "Tom's Hardware",
    url: 'https://www.tomshardware.com/feeds/all',
    defaultCategory: 'Components',
  },
  {
    name: 'PC Gamer Hardware',
    url: 'https://www.pcgamer.com/rss/hardware/',
    defaultCategory: 'Gaming PCs',
  },
  {
    name: 'TechPowerUp',
    url: 'https://www.techpowerup.com/rss/news',
    defaultCategory: 'GPU',
  },
  {
    name: 'KitGuru',
    url: 'https://www.kitguru.net/feed/',
    defaultCategory: 'Components',
  },
  {
    name: 'Ars Technica',
    url: 'https://feeds.arstechnica.com/arstechnica/gadgets',
    defaultCategory: 'Industry',
  },
];


/* Fallback fallback imagery per category */
const CATEGORY_IMAGES = {
  GPU: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=800&q=80',
  CPU: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=800&q=80',
  Monitors: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
  'Gaming PCs': 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80',
  Components: 'https://images.unsplash.com/photo-1544652478-6653e09f18a2?auto=format&fit=crop&w=800&q=80',
  Industry: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
};

/* In-memory cache for ultra-fast response times */
let cachedArticles = [];
let lastScrapedAt = null;
let isScraping = false;

/* =========================================================================
   HELPER UTILITIES
   ========================================================================= */

function generateSlug(title, id) {
  const cleanTitle = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 80);
  const hash = crypto.createHash('md5').update(id || title).digest('hex').slice(0, 6);
  return `${cleanTitle}-${hash}`;
}

function detectCategory(title, content) {
  const text = `${title} ${content}`.toLowerCase();

  if (/\b(rtx|gtx|geforce|radeon|gpu|graphics card|blackwell|rdna|vram|rx 7\d{3}|rx 8\d{3}|nvidia|amd gpu)\b/i.test(text)) {
    return 'GPU';
  }
  if (/\b(ryzen|intel|core ultra|arrow lake|processor|cpu|socket|x86|zen 5|lga|threadripper)\b/i.test(text)) {
    return 'CPU';
  }
  if (/\b(monitor|oled|display|ips|refresh rate|144hz|240hz|360hz|curved|hdr|ultrawide|nits)\b/i.test(text)) {
    return 'Monitors';
  }
  if (/\b(prebuilt|gaming pc|rig|laptop|handheld|steam deck|alienware|cradle)\b/i.test(text)) {
    return 'Gaming PCs';
  }
  if (/\b(ddr5|ram|nvme|ssd|motherboard|psu|power supply|cooler|aio|liquid cooling|chassis|case)\b/i.test(text)) {
    return 'Components';
  }
  return 'Industry';
}

function extractImage(item) {
  // 1. Check enclosure tag
  if (item.enclosure && item.enclosure.url && /\.(jpg|jpeg|png|webp|gif)/i.test(item.enclosure.url)) {
    return item.enclosure.url;
  }

  // 2. Check media:content or media:thumbnail
  if (item['media:content'] && item['media:content'].$ && item['media:content'].$.url) {
    return item['media:content'].$.url;
  }
  if (item['media:thumbnail'] && item['media:thumbnail'].$ && item['media:thumbnail'].$.url) {
    return item['media:thumbnail'].$.url;
  }

  // 3. Extract <img> from HTML content
  const html = item['content:encoded'] || item.content || item.description || '';
  if (html) {
    const $ = cheerio.load(html);
    const imgSrc = $('img').first().attr('src');
    if (imgSrc && imgSrc.startsWith('http') && !imgSrc.includes('gravatar') && !imgSrc.includes('tracking')) {
      return imgSrc;
    }
  }

  return null;
}

function cleanHtmlSnippet(raw) {
  if (!raw) return '';
  const $ = cheerio.load(raw);
  return $('body').text().replace(/\s+/g, ' ').trim().slice(0, 320);
}

/* =========================================================================
   CORE SCRAPER SERVICE
   ========================================================================= */

class ScraperService {
  async scrapeFeed(feedConfig) {
    try {
      console.log(`📡 Fetching feed: ${feedConfig.name}...`);
      const feed = await parser.parseURL(feedConfig.url);

      if (!feed || !feed.items || feed.items.length === 0) {
        return [];
      }

      const results = feed.items.slice(0, 15).map((item) => {
        const title = item.title ? item.title.trim() : 'Hardware News Update';
        const link = item.link || item.guid || feedConfig.url;
        const rawContent = item['content:encoded'] || item.content || item.contentSnippet || item.summary || '';
        const summary = cleanHtmlSnippet(rawContent) || title;
        const category = detectCategory(title, summary);
        const image = extractImage(item) || CATEGORY_IMAGES[category] || CATEGORY_IMAGES.Industry;
        const publishedAt = item.isoDate || item.pubDate ? new Date(item.isoDate || item.pubDate) : new Date();
        const slug = generateSlug(title, link);
        const author = item.creator || item.author || `${feedConfig.name} Staff`;

        return {
          title,
          slug,
          summary,
          content: summary,
          source: feedConfig.name,
          sourceUrl: link,
          image,
          category,
          author,
          publishedAt,
          featured: false,
        };
      });

      console.log(`✅ ${feedConfig.name}: Parsed ${results.length} articles`);
      return results;
    } catch (err) {
      console.warn(`⚠️ Failed to parse ${feedConfig.name}: ${err.message}`);
      return [];
    }
  }

  async scrapeAll() {
    if (isScraping) {
      console.log('⏳ Scraper already running, skipping overlapping invocation.');
      return cachedArticles;
    }

    isScraping = true;
    console.log('🚀 Starting PC Hardware News Ingestion...');

    const allNewArticles = [];

    for (const feed of FEEDS) {
      const articles = await this.scrapeFeed(feed);
      allNewArticles.push(...articles);
    }

    // Fallback seed articles if all feeds fail (ensures 100% uptime)
    if (allNewArticles.length === 0 && cachedArticles.length === 0) {
      allNewArticles.push(...this.getFallbackNews());
    }

    // De-duplicate by slug and sort by date descending
    const seen = new Set();
    const uniqueArticles = [];

    for (const art of allNewArticles) {
      if (!seen.has(art.slug)) {
        seen.add(art.slug);
        uniqueArticles.push(art);
      }
    }

    uniqueArticles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

    // Mark the top 3 latest as featured
    if (uniqueArticles.length > 0) {
      uniqueArticles.forEach((art, i) => {
        art.featured = i < 3;
      });
    }

    // Update in-memory cache
    cachedArticles = uniqueArticles;
    lastScrapedAt = new Date();
    isScraping = false;

    console.log(`🎉 Ingestion complete. Total articles cached: ${cachedArticles.length}`);

    // If MongoDB is connected, persist asynchronously
    if (isDbConnected()) {
      this.persistToDatabase(uniqueArticles).catch((err) =>
        console.warn('Database save warning:', err.message)
      );
    }

    return cachedArticles;
  }

  async persistToDatabase(articles) {
    try {
      const ops = articles.map((art) => ({
        updateOne: {
          filter: { slug: art.slug },
          update: { $set: art },
          upsert: true,
        },
      }));
      await NewsModel.bulkWrite(ops);
      console.log(`💾 Persisted ${articles.length} news articles to MongoDB`);
    } catch (err) {
      console.warn('MongoDB bulkWrite error:', err.message);
    }
  }

  getNews({ category, search, page = 1, limit = 20 }) {
    let result = [...cachedArticles];

    // Filter by category
    if (category && category !== 'All') {
      result = result.filter(
        (a) => a.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Filter by search query
    if (search && search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.summary.toLowerCase().includes(q) ||
          a.source.toLowerCase().includes(q)
      );
    }

    const total = result.length;
    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.max(1, parseInt(limit, 10));
    const offset = (pageNum - 1) * limitNum;
    const paginated = result.slice(offset, offset + limitNum);

    return {
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum) || 1,
      lastScrapedAt,
      articles: paginated,
    };
  }

  getNewsByIdOrSlug(idOrSlug) {
    return cachedArticles.find(
      (a) => a.slug === idOrSlug || a._id === idOrSlug
    );
  }

  getFeatured(limit = 3) {
    return cachedArticles.slice(0, limit);
  }

  getCategories() {
    const categories = ['All', 'GPU', 'CPU', 'Monitors', 'Gaming PCs', 'Components', 'Industry'];
    const counts = { All: cachedArticles.length };

    categories.forEach((cat) => {
      if (cat !== 'All') {
        counts[cat] = cachedArticles.filter(
          (a) => a.category.toLowerCase() === cat.toLowerCase()
        ).length;
      }
    });

    return { categories, counts };
  }

  getFallbackNews() {
    return [
      {
        title: 'NVIDIA Announces Next-Gen GeForce RTX 50 Series Architecture',
        slug: 'nvidia-announces-geforce-rtx-50-series-architecture',
        summary: 'NVIDIA has revealed architectural details for its next-generation Blackwell-based consumer graphics cards, promising 2x ray tracing performance and DLSS 4 frame synthesis.',
        content: 'NVIDIA has officially unveiled architectural details for its next-generation consumer graphics platform, featuring ultra-dense Blackwell streaming multiprocessors, GDDR7 high-speed memory interfaces, and 5th-generation Tensor cores.',
        source: 'VideoCardz',
        sourceUrl: 'https://videocardz.com',
        image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=800&q=80',
        category: 'GPU',
        author: 'VideoCardz Staff',
        publishedAt: new Date(Date.now() - 3600000 * 2),
        featured: true,
      },
      {
        title: 'AMD Ryzen 9000X3D Desktop Processors Confirmed with Second-Gen 3D V-Cache',
        slug: 'amd-ryzen-9000x3d-desktop-processors-confirmed',
        summary: 'AMD confirms upcoming Ryzen 9000X3D gaming processors will feature an inverted 3D V-Cache topology, delivering higher clock frequencies and superior thermal dissipation.',
        content: 'AMD has officially confirmed that its next-generation Zen 5 desktop CPUs with 3D V-Cache will feature thermal improvements allowing full overclocking support.',
        source: "Tom's Hardware",
        sourceUrl: 'https://www.tomshardware.com',
        image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=800&q=80',
        category: 'CPU',
        author: "Tom's Hardware Team",
        publishedAt: new Date(Date.now() - 3600000 * 5),
        featured: true,
      },
      {
        title: 'OLED Gaming Monitors Reach 480Hz Refresh Rates Across 1440p Panels',
        slug: 'oled-gaming-monitors-reach-480hz-refresh-rates',
        summary: 'Display manufacturers unveil 3rd-generation QD-OLED and WOLED panels achieving 480Hz native refresh rates with 0.03ms pixel response times.',
        content: 'The competitive esports display landscape continues to evolve as manufacturers demonstrate 480Hz OLED panels designed for zero-ghosting frame clarity.',
        source: 'PC Gamer',
        sourceUrl: 'https://www.pcgamer.com',
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
        category: 'Monitors',
        author: 'PC Gamer Hardware Team',
        publishedAt: new Date(Date.now() - 3600000 * 9),
        featured: true,
      },
    ];
  }
}

module.exports = new ScraperService();
