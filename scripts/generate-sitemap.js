/**
 * Auto-generate sitemap.xml from blog posts and static pages.
 * Runs as prebuild hook: node scripts/generate-sitemap.js
 */

const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://hyperfocusam.com';
const POSTS_FILE = path.join(__dirname, '..', 'src', 'data', 'posts', 'index.js');
const OUTPUT_FILE = path.join(__dirname, '..', 'public', 'sitemap.xml');

// Bilingual page pairs: English path -> Chinese path
const BILINGUAL_PAIRS = {
  '/': '/zh',
  '/about': '/zh/about',
  '/services': '/zh/services',
  '/blog': '/zh/blog',
  '/media': '/zh/media',
};

const STATIC_PAGES = [
  // English pages
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/services', priority: '0.9', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/blog', priority: '0.8', changefreq: 'weekly' },
  { path: '/media', priority: '0.8', changefreq: 'monthly' },
  { path: '/media/kit', priority: '0.8', changefreq: 'monthly' },
  { path: '/clients', priority: '0.8', changefreq: 'monthly' },
  { path: '/contact', priority: '0.7', changefreq: 'monthly' },
  { path: '/resume', priority: '0.6', changefreq: 'monthly' },
  { path: '/projects', priority: '0.6', changefreq: 'monthly' },
  { path: '/testimonials', priority: '0.8', changefreq: 'monthly' },
  // Chinese pages
  { path: '/zh', priority: '1.0', changefreq: 'weekly', lang: 'zh-Hant', alternate: '/' },
  { path: '/zh/about', priority: '0.8', changefreq: 'monthly', lang: 'zh-Hant', alternate: '/about' },
  { path: '/zh/blog', priority: '0.8', changefreq: 'weekly', lang: 'zh-Hant', alternate: '/blog' },
  { path: '/zh/services', priority: '0.9', changefreq: 'weekly', lang: 'zh-Hant', alternate: '/services' },
  { path: '/zh/media', priority: '0.8', changefreq: 'monthly', lang: 'zh-Hant', alternate: '/media' },
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

    posts.push({
      slug: match[1],
      date: match[2],
      featured: match[3] === 'true',
      language: langMatch ? langMatch[1] : 'en',
      linkedPost: linkedMatch ? linkedMatch[1] : null,
    });
  }

  // Fallback: if featured field wasn't matched (older posts may omit it), try without it
  if (posts.length === 0) {
    const simpleRegex = /slug:\s*'([^']+)'[\s\S]*?date:\s*'([^']+)'/g;
    while ((match = simpleRegex.exec(content)) !== null) {
      posts.push({ slug: match[1], date: match[2], featured: false, language: 'en', linkedPost: null });
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

  // Static pages
  for (const page of STATIC_PAGES) {
    xml += '  <url>\n';
    xml += `    <loc>${SITE_URL}${page.path}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    // Bidirectional hreflang for bilingual page pairs
    if (page.lang && page.alternate) {
      // Chinese page: point to self (zh-Hant), English alternate, and x-default
      xml += `    <xhtml:link rel="alternate" hreflang="${page.lang}" href="${SITE_URL}${page.path}" />\n`;
      xml += `    <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}${page.alternate}" />\n`;
      xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}${page.alternate}" />\n`;
    } else if (BILINGUAL_PAIRS[page.path]) {
      // English page with a Chinese counterpart: point to self (en), Chinese alternate, and x-default
      xml += `    <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}${page.path}" />\n`;
      xml += `    <xhtml:link rel="alternate" hreflang="zh-Hant" href="${SITE_URL}${BILINGUAL_PAIRS[page.path]}" />\n`;
      xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}${page.path}" />\n`;
    }
    xml += '  </url>\n';
  }

  // Blog posts with hreflang for bilingual pairs
  for (const post of posts) {
    const priority = post.featured ? '0.8' : '0.7';
    const lang = post.language === 'zh-Hant' ? 'zh-Hant' : 'en';
    xml += '  <url>\n';
    xml += `    <loc>${SITE_URL}/blog/${post.slug}</loc>\n`;
    xml += `    <lastmod>${post.date}</lastmod>\n`;
    xml += '    <changefreq>monthly</changefreq>\n';
    xml += `    <priority>${priority}</priority>\n`;

    // Add hreflang for bilingual post pairs (bidirectional + x-default)
    if (post.linkedPost) {
      const linked = posts.find((p) => p.slug === post.linkedPost);
      if (linked) {
        const linkedLang = linked.language === 'zh-Hant' ? 'zh-Hant' : 'en';
        xml += `    <xhtml:link rel="alternate" hreflang="${lang}" href="${SITE_URL}/blog/${post.slug}" />\n`;
        xml += `    <xhtml:link rel="alternate" hreflang="${linkedLang}" href="${SITE_URL}/blog/${linked.slug}" />\n`;
        // x-default points to the English version
        const enSlug = lang === 'en' ? post.slug : linked.slug;
        xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/blog/${enSlug}" />\n`;
      }
    }

    xml += '  </url>\n';
  }

  xml += '</urlset>\n';

  fs.writeFileSync(OUTPUT_FILE, xml);
  const zhCount = posts.filter((p) => p.language === 'zh-Hant').length;
  const enCount = posts.length - zhCount;
  console.log(`Sitemap generated: ${enCount} EN + ${zhCount} TC posts + ${STATIC_PAGES.length} static pages`);
}

generateSitemap();
