import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Main from '../layouts/Main';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../data/seo';
import posts from '../data/posts';
import { tagLabel, topicClusters } from '../data/tags';
import { AuthorCard } from '../components/Blog';
import FieldNotesList from '../components/Blog/FieldNotesList';
import EmailCapture from '../components/EmailCapture/EmailCapture';

const typeLabels = {
  'case-study': '案例分析',
  insight: '洞察',
  methodology: '方法論',
  framework: '框架',
  reflection: '反思',
  announcement: '公告',
};

// Only show Chinese posts, newest first
const byDateDesc = (a, b) => {
  if (a.date === b.date) return 0;
  return a.date < b.date ? 1 : -1;
};
const zhPosts = posts.filter((p) => p.language === 'zh-Hant').sort(byDateDesc);

// Counted over the Chinese posts alone, so a chip never promises entries that
// only exist in English. Labels come from src/data/tags.js — the tags themselves
// are now the same canonical English slugs the English posts carry, which is what
// lets a Chinese post match a service CTA at all.
const zhClusters = topicClusters(zhPosts);

const ZhBlog = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read after mount only — the prerendered HTML carries no query string.
  const [topic, setTopic] = useState(null);
  useEffect(() => {
    setTopic(searchParams.get('topic'));
  }, [searchParams]);

  const activeTopic = zhClusters.some((c) => c.tag === topic) ? topic : null;
  const visiblePosts = activeTopic
    ? zhPosts.filter((p) => (p.tags || []).includes(activeTopic))
    : zhPosts;

  const selectTopic = (tag) => {
    const next = new URLSearchParams(searchParams);
    if (tag) next.set('topic', tag); else next.delete('topic');
    setSearchParams(next, { replace: true });
  };

  return (
    <Main
      title="AI 應用網誌 — 香港企業培訓實戰筆記"
      description="Sam Wong 的 AI 應用筆記：企業培訓現場的觀察、工作坊設計方法、實際在用的 AI 工具，以及科技的人性面。寫給香港的在職專業人士與企業決策者。"
      canonicalUrl={`${SITE_URL}/zh/blog`}
      ogTitle="網誌 | Sam Wong"
      ogDescription="AI 應用洞察、工作坊經驗與科技人性面的分享。"
      ogImage={DEFAULT_OG_IMAGE}
      ogUrl={`${SITE_URL}/zh/blog`}
      ogType="website"
      twitterTitle="網誌 | Sam Wong"
      twitterDescription="AI 應用洞察、工作坊經驗與科技人性面的分享。"
      twitterImage={DEFAULT_OG_IMAGE}
      hreflangTags={[
        { lang: 'en', href: `${SITE_URL}/blog` },
        { lang: 'zh-Hant', href: `${SITE_URL}/zh/blog` },
        { lang: 'x-default', href: `${SITE_URL}/blog` },
      ]}
    >
      <Helmet>
        <html lang="zh-Hant" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'AI 應用網誌 | Sam Wong',
            url: `${SITE_URL}/zh/blog/`,
            inLanguage: 'zh-Hant',
            description: '企業 AI 培訓現場的觀察、工作坊設計方法，以及實際在用的 AI 工具。',
            isPartOf: { '@id': `${SITE_URL}/#website` },
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: zhPosts.slice(0, 10).map((post, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                url: `${SITE_URL}/blog/${post.slug}/`,
                name: post.title,
              })),
            },
          })}
        </script>
      </Helmet>
      <article className="post field-notes-content zh" id="zh-blog">
        {/* Dark hero */}
        <header className="page-hero">
          <div className="content-standard">
            <div className="title">
              <h1>網誌</h1>
              <p>關於 AI 應用趨勢、工具以及幫助人自信地使用 AI 的實用經驗。</p>
            </div>
          </div>
        </header>

        <section className="section-base section-padding">
          <div className="content-standard">
            {zhClusters.length > 0 && (
              <div className="blog-topics">
                <span className="blog-topics__label fn-stamp">按主題瀏覽</span>
                <div className="blog-topics__chips">
                  <button
                    type="button"
                    onClick={() => selectTopic(null)}
                    className={`blog-topic-chip${activeTopic ? '' : ' blog-topic-chip--active'}`}
                  >
                    {`全部（${zhPosts.length}）`}
                  </button>
                  {zhClusters.map(({ tag, count }) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => selectTopic(activeTopic === tag ? null : tag)}
                      className={`blog-topic-chip${activeTopic === tag ? ' blog-topic-chip--active' : ''}`}
                    >
                      {`${tagLabel(tag, 'zh-Hant')}（${count}）`}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {visiblePosts.length === 0 ? (
              <p><em>中文文章即將推出，敬請期待！</em></p>
            ) : (
              <FieldNotesList
                posts={visiblePosts}
                typeLabels={typeLabels}
                entryLabel="篇"
                singleEntryLabel="篇"
              />
            )}
          </div>
        </section>

        <section className="section-sunken section-padding">
          <div className="content-standard">
            <h3>關於作者</h3>
            <AuthorCard />
          </div>
        </section>

        <EmailCapture
          title="訂閱 AI 實用資訊"
          blurb="工作坊框架、採用案例，與我實際使用的工具 — 有新文章才會寄出，無垃圾郵件。"
        />

        <p className="lang-toggle">
          <Link to="/blog">View in English</Link>
        </p>
      </article>
    </Main>
  );
};

export default ZhBlog;
