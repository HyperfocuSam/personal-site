import React, { useEffect, useMemo, useState } from 'react';

import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';

import Main from '../layouts/Main';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../data/seo';
import posts from '../data/posts';
import { tagLabel, topicClusters } from '../data/tags';
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
  const [searchParams, setSearchParams] = useSearchParams();

  // The topic is read from the URL only AFTER mount. react-snap prerenders this
  // page with no query string, so resolving ?topic= during the first client
  // render would hand React a different tree than the HTML it is hydrating —
  // exactly the #418 failure this site has already shipped once.
  const [topic, setTopic] = useState(null);
  useEffect(() => {
    setTopic(searchParams.get('topic'));
  }, [searchParams]);

  // Filter posts by language
  const inLanguage = langFilter === 'all'
    ? posts
    : posts.filter((p) => (p.language || 'en') === langFilter);

  // Clusters are counted against the language-filtered set, so the number on a
  // chip always matches the number of entries clicking it produces.
  const clusters = useMemo(() => topicClusters(inLanguage), [inLanguage]);

  const activeTopic = clusters.some((c) => c.tag === topic) ? topic : null;
  const filteredPosts = activeTopic
    ? inLanguage.filter((p) => (p.tags || []).includes(activeTopic))
    : inLanguage;

  const selectTopic = (tag) => {
    const next = new URLSearchParams(searchParams);
    if (tag) next.set('topic', tag); else next.delete('topic');
    setSearchParams(next, { replace: true });
  };

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
              // The language-filtered set, not the topic-filtered one: the
              // schema should describe the page a crawler was served, and the
              // topic chips only ever narrow it after a click.
              itemListElement: inLanguage.slice(0, 10).map((post, i) => ({
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
              <h1>Blog</h1>
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

            {/* Topic clusters — 98 posts were one flat reverse-chronological
                list, and the 108 tags behind them were not clickable anywhere
                on the site. */}
            {clusters.length > 0 && (
              <div className="blog-topics">
                <span className="blog-topics__label fn-stamp">Browse by topic</span>
                <div className="blog-topics__chips">
                  <button
                    type="button"
                    onClick={() => selectTopic(null)}
                    className={`blog-topic-chip${activeTopic ? '' : ' blog-topic-chip--active'}`}
                  >
                    {`All (${inLanguage.length})`}
                  </button>
                  {clusters.map(({ tag, count }) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => selectTopic(activeTopic === tag ? null : tag)}
                      className={`blog-topic-chip${activeTopic === tag ? ' blog-topic-chip--active' : ''}`}
                    >
                      {`${tagLabel(tag, 'en')} (${count})`}
                    </button>
                  ))}
                </div>
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
