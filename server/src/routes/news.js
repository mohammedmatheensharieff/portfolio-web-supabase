import express from 'express';

const router = express.Router();

const DEFAULT_CACHE_MINUTES = Number.parseInt(process.env.NEWS_CACHE_MINUTES || '30', 10);
const CACHE_DURATION = Math.max(DEFAULT_CACHE_MINUTES, 5) * 60 * 1000;

let cachedArticles = [];
let cacheExpiresAt = 0;

const ensureArray = (value) => (Array.isArray(value) ? value : []);

const fetchJson = async (url, options = {}) => {
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'PortfolioNewsBot/1.0 (+https://github.com/)',
      Accept: 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }
  return response.json();
};

const transformDevtoArticle = (article) => ({
  id: `devto-${article.id}`,
  title: article.title,
  url: article.url,
  publishedAt: article.published_at,
  excerpt: article.description || article.excerpt || '',
  source: {
    name: 'DEV Community',
    url: 'https://dev.to',
  },
  author: article.user?.name || article.user?.username || null,
  tags: ensureArray(article.tag_list),
});

const transformHackerNewsArticle = (story) => ({
  id: `hn-${story.objectID}`,
  title: story.title,
  url: story.url || `https://news.ycombinator.com/item?id=${story.objectID}`,
  publishedAt: story.created_at,
  excerpt: story.story_text || '',
  source: {
    name: 'Hacker News',
    url: 'https://news.ycombinator.com',
  },
  author: story.author || null,
  tags: ['hacker-news'],
});

const fetchDevtoArticles = async () => {
  const tagGroups = ['devops', 'cloud', 'sre', 'kubernetes', 'aws', 'azure', 'gcp'];
  const responses = await Promise.allSettled(
    tagGroups.map((tag) => fetchJson(`https://dev.to/api/articles?per_page=6&tag=${encodeURIComponent(tag)}`))
  );

  const articles = [];
  responses.forEach((result) => {
    if (result.status === 'fulfilled') {
      result.value.forEach((article) => {
        articles.push(transformDevtoArticle(article));
      });
    } else {
      console.warn('[news] dev.to fetch failed', result.reason);
    }
  });

  return articles;
};

const fetchHackerNewsArticles = async () => {
  try {
    const data = await fetchJson(
      'https://hn.algolia.com/api/v1/search_by_date?query=devops%20cloud%20kubernetes%20aws%20azure&tags=story&hitsPerPage=18'
    );
    return ensureArray(data.hits).map(transformHackerNewsArticle);
  } catch (error) {
    console.warn('[news] Hacker News fetch failed', error);
    return [];
  }
};

const deduplicateArticles = (articles) => {
  const byUrl = new Map();
  articles.forEach((article) => {
    if (!article?.url) return;
    const key = article.url.toLowerCase();
    const existing = byUrl.get(key);
    if (!existing) {
      byUrl.set(key, article);
      return;
    }
    const existingDate = new Date(existing.publishedAt || 0).getTime();
    const incomingDate = new Date(article.publishedAt || 0).getTime();
    if (incomingDate > existingDate) {
      byUrl.set(key, article);
    }
  });
  return Array.from(byUrl.values());
};

const sortArticles = (articles) =>
  articles.sort(
    (a, b) => new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime()
  );

const curatedManualArticles = [
  {
    id: 'curated-finops-unit-economics',
    title: 'Designing Cloud Unit Economics That Engineers Understand',
    url: 'https://www.finops.org/insights/designing-cloud-unit-economics/',
    publishedAt: '2024-07-01T00:00:00.000Z',
    excerpt:
      'FinOps Foundation guidance on building shared language and dashboards that connect product velocity to cloud cost.',
    source: {
      name: 'FinOps Foundation',
      url: 'https://www.finops.org',
    },
    author: null,
    tags: ['finops', 'cloud-cost'],
  },
  {
    id: 'curated-aws-observability-2024',
    title: 'Raising the Observability Bar for Multi-account AWS Platforms',
    url: 'https://aws.amazon.com/blogs/mt/raising-the-observability-bar-for-multi-account-aws/',
    publishedAt: '2024-05-15T00:00:00.000Z',
    excerpt:
      'AWS guidance for implementing end-to-end tracing, metrics, and log strategy across centralized and workload accounts.',
    source: {
      name: 'AWS Architecture Blog',
      url: 'https://aws.amazon.com/blogs/architecture/',
    },
    author: 'AWS Partner Solutions Architects',
    tags: ['aws', 'observability', 'devops'],
  },
  {
    id: 'curated-cncf-platform-engineering',
    title: 'Platform Engineering Maturity: Lessons from the CNCF Landscape',
    url: 'https://www.cncf.io/blog/2024/03/28/platform-engineering-maturity-lessons-from-the-cncf-landscape/',
    publishedAt: '2024-03-28T00:00:00.000Z',
    excerpt:
      'CNCF community insights on building internal platforms, golden paths, and developer experience at scale.',
    source: {
      name: 'CNCF Blog',
      url: 'https://www.cncf.io/blog/',
    },
    author: 'CNCF Platforms Working Group',
    tags: ['platform-engineering', 'cloud-native'],
  },
];

const getAggregatedNews = async () => {
  const now = Date.now();
  if (cachedArticles.length && cacheExpiresAt > now) {
    return { articles: cachedArticles, cached: true, expiresAt: cacheExpiresAt };
  }

  const [devtoArticles, hackerNewsArticles] = await Promise.all([
    fetchDevtoArticles(),
    fetchHackerNewsArticles(),
  ]);

  const combined = deduplicateArticles([...curatedManualArticles, ...devtoArticles, ...hackerNewsArticles]);
  const sorted = sortArticles(combined).slice(0, 18);

  cachedArticles = sorted;
  cacheExpiresAt = now + CACHE_DURATION;

  return { articles: sorted, cached: false, expiresAt: cacheExpiresAt };
};

router.get('/daily', async (_req, res, next) => {
  try {
    const { articles, cached, expiresAt } = await getAggregatedNews();
    res.json({
      articles,
      cached,
      fetchedAt: new Date().toISOString(),
      expiresAt: new Date(expiresAt).toISOString(),
    });
  } catch (error) {
    next(error);
  }
});

export default router;
