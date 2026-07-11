import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Main from '../layouts/Main';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../data/seo';
import posts from '../data/posts';
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

// Only show Chinese posts
const zhPosts = posts.filter((p) => p.language === 'zh-Hant');

const ZhBlog = () => (
  <Main
    title="網誌"
    description="Sam Wong 的 AI 應用洞察、工作坊經驗與科技人性面的分享，涵蓋香港 AI 培訓、企業 AI 顧問與人工智能工具推薦。"
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
    <Helmet><html lang="zh-Hant" /></Helmet>
    <article className="post field-notes-content zh" id="zh-blog">
      {/* Dark hero */}
      <header className="page-hero">
        <div className="content-standard">
          <div className="title">
            <h1>
              <Link to="/zh/blog">網誌</Link>
            </h1>
            <p>關於 AI 應用趨勢、工具以及幫助人自信地使用 AI 的實用經驗。</p>
          </div>
        </div>
      </header>

      <section className="section-base section-padding">
        <div className="content-standard">
          {zhPosts.length === 0 ? (
            <p><em>中文文章即將推出，敬請期待！</em></p>
          ) : (
            <FieldNotesList
              posts={zhPosts}
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

export default ZhBlog;
