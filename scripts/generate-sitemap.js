/**
 * Auto-generate sitemap.xml from blog posts and static pages.
 * Runs as prebuild hook: node scripts/generate-sitemap.js
 */

const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://samwong.me';
const POSTS_FILE = path.join(__dirname, '..', 'src', 'data', 'posts', 'index.js');
const OUTPUT_FILE = path.join(__dirname, '..', 'public', 'sitemap.xml');

const STATIC_PAGES = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/services', priority: '0.9', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/blog', priority: '0.8', changefreq: 'weekly' },
  { path: '/clients', priority: '0.8', changefreq: 'monthly' },
  { path: '/contact', priority: '0.7', changefreq: 'monthly' },
];

function parsePosts() {
  const content = fs.readFileSync(POSTS_FILE, 'utf-8');
  const posts = [];

  // Match each post object block in the array
  const postRegex = /\{\s*slug:\s*'([^']+)'[\s\S]*?date:\s*'([^']+)'[\s\S]*?featured:\s*(true|false)/g;
  let match;
  while ((match = postRegex.exec(content)) !== null) {
    posts.push({
      slug: match[1],
      date: match[2],
      featured: match[3] === 'true',
    });
  }

  // Fallback: if featured field wasn't matched (older posts may omit it), try without it
  if (posts.length === 0) {
    const simpleRegex = /slug:\s*'([^']+)'[\s\S]*?date:\s*'([^']+)'/g;
    while ((match = simpleRegex.exec(content)) !== null) {
      posts.push({ slug: match[1], date: match[2], featured: false });
    }
  }

  return posts;
}

function generateSitemap() {
  const today = new Date().toISOString().split('T')[0];
  const posts = parsePosts();

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Static pages
  for (const page of STATIC_PAGES) {
    xml += '  <url>\n';
    xml += `    <loc>${SITE_URL}${page.path}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += '  </url>\n';
  }

  // Blog posts
  for (const post of posts) {
    const priority = post.featured ? '0.8' : '0.7';
    xml += '  <url>\n';
    xml += `    <loc>${SITE_URL}/blog/${post.slug}</loc>\n`;
    xml += `    <lastmod>${post.date}</lastmod>\n`;
    xml += '    <changefreq>monthly</changefreq>\n';
    xml += `    <priority>${priority}</priority>\n`;
    xml += '  </url>\n';
  }

  xml += '</urlset>\n';

  fs.writeFileSync(OUTPUT_FILE, xml);
  console.log(`Sitemap generated: ${posts.length} posts + ${STATIC_PAGES.length} static pages`);
}

generateSitemap();
