import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

import Main from '../layouts/Main';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../data/seo';
import posts from '../data/posts';
import { AuthorCard } from '../components/Blog';

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

const BlogCard = ({ post }) => (
  <article className={`blog-card blog-card--${post.type}`}>
    <Link to={`/blog/${post.slug}`} className="blog-card__link">
      {post.image && (
        <div className="blog-card__image-wrapper">
          <img
            src={post.image}
            alt={post.title}
            className="blog-card__image"
            loading="lazy"
          />
        </div>
      )}
      <div className="blog-card__content">
        <span className={`blog-type-pill blog-type-pill--${post.type}`}>
          {typeLabels[post.type] || post.type}
        </span>
        <h3 className="blog-card__title">{post.title}</h3>
        <p className="blog-card__meta">
          {dayjs(post.date).format('YYYY年M月D日')}
        </p>
        <p className="blog-card__excerpt">{post.excerpt}</p>
      </div>
    </Link>
  </article>
);

BlogCard.propTypes = {
  post: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    excerpt: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    image: PropTypes.string,
  }).isRequired,
};

const ZhBlog = () => (
  <Main
    title="網誌"
    description="Sam Wong 嘅 AI 應用洞察、工作坊經驗同科技人性面嘅分享。AI培訓 香港、企業AI顧問、人工智能工具推薦。"
    canonicalUrl={`${SITE_URL}/zh/blog`}
    ogTitle="網誌 | Sam Wong"
    ogDescription="AI 應用洞察、工作坊經驗同科技人性面嘅分享。"
    ogImage={DEFAULT_OG_IMAGE}
    ogUrl={`${SITE_URL}/zh/blog`}
    ogType="website"
    twitterTitle="網誌 | Sam Wong"
    twitterDescription="AI 應用洞察、工作坊經驗同科技人性面嘅分享。"
    twitterImage={DEFAULT_OG_IMAGE}
    hreflangTags={[
      { lang: 'en', href: `${SITE_URL}/blog` },
      { lang: 'zh-Hant', href: `${SITE_URL}/zh/blog` },
      { lang: 'x-default', href: `${SITE_URL}/blog` },
    ]}
  >
    <Helmet><html lang="zh-Hant" /></Helmet>
    <article className="post" id="zh-blog">
      {/* Dark hero */}
      <header className="page-hero">
        <div className="content-standard">
          <div className="title">
            <h2>
              <Link to="/zh/blog">網誌</Link>
            </h2>
            <p>關於 AI 應用趨勢、工具同幫助人自信地使用 AI 嘅實用經驗。</p>
          </div>
        </div>
      </header>

      <section className="section-base section-padding">
        <div className="content-standard">
          {zhPosts.length === 0 ? (
            <p><em>中文文章即將推出，敬請期待！</em></p>
          ) : (
            <div className="blog-grid">
              {zhPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section-sunken section-padding">
        <div className="content-standard">
          <h3>關於作者</h3>
          <AuthorCard />
        </div>
      </section>

      <p style={{ fontSize: '0.85em', color: '#6b6d7a', marginTop: '2em' }}>
        <Link to="/blog">View in English</Link>
      </p>
    </article>
  </Main>
);

export default ZhBlog;
