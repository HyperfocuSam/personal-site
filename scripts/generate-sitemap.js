/**
 * Auto-generate sitemap.xml from blog posts and static pages.
 * Runs as prebuild hook: node scripts/generate-sitemap.js
 */

const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://hyperfocusam.com';
const POSTS_FILE = path.join(__dirname, '..', 'src', 'data', 'posts', 'index.js');
const OUTPUT_FILE = path.join(__dirname, '..', 'public', 'sitemap.xml');
const RSS_FILE = path.join(__dirname, '..', 'public', 'feed.xml');

// Bilingual page pairs: English path -> Chinese path
const BILINGUAL_PAIRS = {
  '/': '/zh',
  '/about': '/zh/about',
  '/services': '/zh/services',
  '/blog': '/zh/blog',
  '/media': '/zh/media',
  '/corporate-ai-training-hong-kong': '/zh/corporate-ai-training-hong-kong',
};

// AI discoverability assets — plain .txt files at root, no trailing slash.
// llms.txt is the emerging standard; llms-full.txt is the extended context file
// referenced by Perplexity, Claude, ChatGPT web crawlers.
const AI_ASSETS = [
  { path: '/llms.txt', priority: '0.9', changefreq: 'weekly' },
  { path: '/llms-full.txt', priority: '0.8', changefreq: 'weekly' },
];

const STATIC_PAGES = [
  // English pages
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/services', priority: '0.9', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/blog', priority: '0.8', changefreq: 'weekly' },
  { path: '/media', priority: '0.8', changefreq: 'monthly' },
  { path: '/media/kit', priority: '0.8', changefreq: 'monthly' },
  { path: '/clients', priority: '0.8', changefreq: 'monthly' },
  { path: '/case-notes', priority: '0.8', changefreq: 'monthly' },
  { path: '/contact', priority: '0.7', changefreq: 'monthly' },
  { path: '/corporate-ai-training-hong-kong', priority: '0.9', changefreq: 'weekly' },
  { path: '/resume', priority: '0.6', changefreq: 'monthly' },
  { path: '/projects', priority: '0.6', changefreq: 'monthly' },
  { path: '/speaking', priority: '0.8', changefreq: 'monthly' },
  { path: '/testimonials', priority: '0.8', changefreq: 'monthly' },
  { path: '/book', priority: '0.8', changefreq: 'monthly' },
  // Chinese pages
  { path: '/zh', priority: '1.0', changefreq: 'weekly', lang: 'zh-Hant', alternate: '/' },
  { path: '/zh/about', priority: '0.8', changefreq: 'monthly', lang: 'zh-Hant', alternate: '/about' },
  { path: '/zh/blog', priority: '0.8', changefreq: 'weekly', lang: 'zh-Hant', alternate: '/blog' },
  { path: '/zh/services', priority: '0.9', changefreq: 'weekly', lang: 'zh-Hant', alternate: '/services' },
  { path: '/zh/media', priority: '0.8', changefreq: 'monthly', lang: 'zh-Hant', alternate: '/media' },
  { path: '/zh/corporate-ai-training-hong-kong', priority: '0.9', changefreq: 'weekly', lang: 'zh-Hant', alternate: '/corporate-ai-training-hong-kong' },
];

function parsePosts() {
  const content = fs.readFileSync(POSTS_FILE, 'utf-8');
  const posts = [];

  // Match each post object block in the array (including optional language and linkedPost)
  const postRegex = /\{\s*slug:\s*'([^']+)'[\s\S]*?date:\s*'([^']+)'[\s\S]*?featured:\s*(true|false)/g;
  let match;
  while ((match = postRegex.exec(content)) !== null) {
    // Extract the full block to find language and linkedPost
    const blockStart = match.index;
    const blockEnd = content.indexOf('},', blockStart);
    const block = content.substring(blockStart, blockEnd > -1 ? blockEnd : undefined);

    const langMatch = block.match(/language:\s*'([^']+)'/);
    const linkedMatch = block.match(/linkedPost:\s*'([^']+)'/);

    // Titles/excerpts containing an apostrophe must be written with double quotes
    // in index.js, so match both quote styles — single-quote-only matching silently
    // fell back to the slug and shipped "my-post-slug" as the RSS <title>.
    const titleMatch = block.match(/title:\s*'((?:[^'\\]|\\.)+)'/)
      || block.match(/title:\s*"((?:[^"\\]|\\.)+)"/);
    const excerptMatch = block.match(/excerpt:\s*'((?:[^'\\]|\\.)+)'/)
      || block.match(/excerpt:\s*"((?:[^"\\]|\\.)+)"/);

    // Unescape JS string escapes (e.g. \' -> ', \" -> ", \\ -> \)
    const unescape = (s) =>
      s.replace(/\\'/g, "'").replace(/\\"/g, '"').replace(/\\\\/g, '\\');

    posts.push({
      slug: match[1],
      date: match[2],
      featured: match[3] === 'true',
      language: langMatch ? langMatch[1] : 'en',
      linkedPost: linkedMatch ? linkedMatch[1] : null,
      title: titleMatch ? unescape(titleMatch[1]) : match[1],
      excerpt: excerptMatch ? unescape(excerptMatch[1]) : '',
    });
  }

  // Fallback: if featured field wasn't matched (older posts may omit it), try without it
  if (posts.length === 0) {
    const simpleRegex = /slug:\s*'([^']+)'[\s\S]*?date:\s*'([^']+)'/g;
    while ((match = simpleRegex.exec(content)) !== null) {
      posts.push({ slug: match[1], date: match[2], featured: false, language: 'en', linkedPost: null, title: match[1], excerpt: '' });
    }
  }

  return posts;
}

function generateSitemap() {
  const today = new Date().toISOString().split('T')[0];
  const posts = parsePosts();

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"';
  xml += ' xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

  // Static pages (add trailing slash to match GitHub Pages serving)
  for (const page of STATIC_PAGES) {
    const loc = page.path === '/' ? SITE_URL + '/' : `${SITE_URL}${page.path}/`;
    xml += '  <url>\n';
    xml += `    <loc>${loc}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    // Bidirectional hreflang for bilingual page pairs (with trailing slashes)
    if (page.lang && page.alternate) {
      const altLoc = page.alternate === '/' ? SITE_URL + '/' : `${SITE_URL}${page.alternate}/`;
      xml += `    <xhtml:link rel="alternate" hreflang="${page.lang}" href="${loc}" />\n`;
      xml += `    <xhtml:link rel="alternate" hreflang="en" href="${altLoc}" />\n`;
      xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${altLoc}" />\n`;
    } else if (BILINGUAL_PAIRS[page.path]) {
      const zhLoc = `${SITE_URL}${BILINGUAL_PAIRS[page.path]}/`;
      xml += `    <xhtml:link rel="alternate" hreflang="en" href="${loc}" />\n`;
      xml += `    <xhtml:link rel="alternate" hreflang="zh-Hant" href="${zhLoc}" />\n`;
      xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${loc}" />\n`;
    }
    xml += '  </url>\n';
  }

  // Blog posts with hreflang for bilingual pairs
  for (const post of posts) {
    const priority = post.featured ? '0.8' : '0.7';
    const lang = post.language === 'zh-Hant' ? 'zh-Hant' : 'en';
    xml += '  <url>\n';
    xml += `    <loc>${SITE_URL}/blog/${post.slug}/</loc>\n`;
    xml += `    <lastmod>${post.date}</lastmod>\n`;
    xml += '    <changefreq>monthly</changefreq>\n';
    xml += `    <priority>${priority}</priority>\n`;

    // Add hreflang for bilingual post pairs (bidirectional + x-default)
    if (post.linkedPost) {
      const linked = posts.find((p) => p.slug === post.linkedPost);
      if (linked) {
        const linkedLang = linked.language === 'zh-Hant' ? 'zh-Hant' : 'en';
        xml += `    <xhtml:link rel="alternate" hreflang="${lang}" href="${SITE_URL}/blog/${post.slug}/" />\n`;
        xml += `    <xhtml:link rel="alternate" hreflang="${linkedLang}" href="${SITE_URL}/blog/${linked.slug}/" />\n`;
        // x-default points to the English version
        const enSlug = lang === 'en' ? post.slug : linked.slug;
        xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/blog/${enSlug}/" />\n`;
      }
    }

    xml += '  </url>\n';
  }

  // AI discoverability assets (llms.txt, llms-full.txt) — emitted without
  // trailing slash since they are flat files, not routable pages.
  for (const asset of AI_ASSETS) {
    xml += '  <url>\n';
    xml += `    <loc>${SITE_URL}${asset.path}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${asset.changefreq}</changefreq>\n`;
    xml += `    <priority>${asset.priority}</priority>\n`;
    xml += '  </url>\n';
  }

  xml += '</urlset>\n';

  fs.writeFileSync(OUTPUT_FILE, xml);
  const zhCount = posts.filter((p) => p.language === 'zh-Hant').length;
  const enCount = posts.length - zhCount;
  console.log(`Sitemap generated: ${enCount} EN + ${zhCount} TC posts + ${STATIC_PAGES.length} static pages`);
}

function escapeXml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function generateRssFeed() {
  const posts = parsePosts();
  let rss = '<?xml version="1.0" encoding="UTF-8"?>\n';
  rss += '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n';
  rss += '  <channel>\n';
  rss += '    <title>Sam Wong | AI Training Specialist</title>\n';
  rss += `    <link>${SITE_URL}/blog</link>\n`;
  rss += '    <description>AI adoption insights, workshop reflections, and practical AI training tips from Sam Wong.</description>\n';
  rss += '    <language>en</language>\n';
  rss += `    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />\n`;
  rss += `    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>\n`;

  for (const post of posts) {
    rss += '    <item>\n';
    rss += `      <title>${escapeXml(post.title)}</title>\n`;
    rss += `      <link>${SITE_URL}/blog/${post.slug}/</link>\n`;
    rss += `      <guid isPermaLink="true">${SITE_URL}/blog/${post.slug}/</guid>\n`;
    if (post.excerpt) {
      rss += `      <description>${escapeXml(post.excerpt)}</description>\n`;
    }
    rss += `      <pubDate>${new Date(post.date).toUTCString()}</pubDate>\n`;
    rss += '    </item>\n';
  }

  rss += '  </channel>\n';
  rss += '</rss>\n';

  fs.writeFileSync(RSS_FILE, rss);
  console.log(`RSS feed generated: ${posts.length} posts`);
}

generateSitemap();
generateRssFeed();
