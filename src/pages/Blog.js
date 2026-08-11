import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { Helmet } from 'react-helmet-async';

import Main from '../layouts/Main';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../data/seo';
import posts from '../data/posts';
import { AuthorCard } from '../components/Blog';
import FieldNotesList from '../components/Blog/FieldNotesList';
import EmailCapture from '../components/EmailCapture/EmailCapture';

// Type display config
const typeLabels = {
  'case-study': 'Case Study',
  insight: 'Insight',
  methodology: 'Methodology',
  framework: 'Framework',
  reflection: 'Reflection',
  announcement: 'Announcement',
  // 2 posts carry type: 'commentary'. Without an entry here they rendered the
  // raw lowercase slug as their badge.
  commentary: 'Commentary',
};

// Language filter options
const languageLabels = {
  all: 'All',
  en: 'English',
  'zh-Hant': '中文',
};

// Check if any Chinese posts exist to show the language filter
const hasChinesePosts = posts.some((p) => p.language === 'zh-Hant');

const Blog = () => {
  const [langFilter, setLangFilter] = useState('all');

  // Filter posts by language
  const filteredPosts = langFilter === 'all'
    ? posts
    : posts.filter((p) => (p.language || 'en') === langFilter);

  // Always sort newest-first so the listing reflects recency, not array order
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (a.date === b.date) return 0;
    return a.date < b.date ? 1 : -1;
  });

  return (
    <Main
      title="Blog"
      description="Insights on AI adoption, workshop learnings, and the human side of technology by Sam Wong."
      canonicalUrl={`${SITE_URL}/blog`}
      ogTitle="Blog | Sam Wong"
      ogDescription="Insights on AI adoption, workshop learnings, and the human side of technology."
      ogImage={DEFAULT_OG_IMAGE}
      ogUrl={`${SITE_URL}/blog`}
      ogType="website"
      twitterTitle="Blog | Sam Wong"
      twitterDescription="Insights on AI adoption, workshop learnings, and the human side of technology."
      twitterImage={DEFAULT_OG_IMAGE}
      hreflangTags={[
        { lang: 'en', href: `${SITE_URL}/blog` },
        { lang: 'zh-Hant', href: `${SITE_URL}/zh/blog` },
        { lang: 'x-default', href: `${SITE_URL}/blog` },
      ]}
    >
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Blog | Sam Wong',
            url: `${SITE_URL}/blog`,
            description: 'AI adoption insights, workshop learnings, and the human side of technology.',
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: filteredPosts.slice(0, 10).map((post, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                url: `${SITE_URL}/blog/${post.slug}`,
                name: post.title,
              })),
            },
          })}
        </script>
      </Helmet>
      <article className="post field-notes-content" id="blog">
        {/* Dark hero */}
        <header className="page-hero">
          <div className="content-standard">
            <div className="title">
              <h1>
                <Link to="/blog">Blog</Link>
              </h1>
              <p>
                Practical lessons on AI adoption trends, tools, and what helps
                people work with AI confidently.
              </p>
            </div>
          </div>
        </header>

        {/* Blog listing content */}
        <section className="section-base section-padding">
          <div className="content-standard">
            {/* Language Filter */}
            {hasChinesePosts && (
              <div className="blog-lang-filter">
                {Object.entries(languageLabels).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setLangFilter(key)}
                    className={`blog-lang-btn${langFilter === key ? ' blog-lang-btn--active' : ''}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}

            {filteredPosts.length === 0 ? (
              <p><em>Posts coming soon. Stay tuned!</em></p>
            ) : (
              <FieldNotesList
                posts={sortedPosts}
                typeLabels={typeLabels}
                entryLabel="entries"
                singleEntryLabel="entry"
              />
            )}
          </div>
        </section>

        {/* Author + Newsletter */}
        <section className="section-sunken section-padding">
          <div className="content-standard">
            <h3>About the Author</h3>
            <AuthorCard />
          </div>
        </section>

        <EmailCapture
          title="Get the next post in your inbox"
          blurb="Workshop frameworks, client case studies, and AI tools I actually use — delivered when I publish."
        />
      </article>
    </Main>
  );
};

export default Blog;
