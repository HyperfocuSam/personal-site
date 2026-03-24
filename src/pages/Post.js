import React, { useState, useEffect, useMemo } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Markdown from 'markdown-to-jsx';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

import Main from '../layouts/Main';
import posts from '../data/posts';
import {
  AuthorCard,
  ShareButtons,
  RelatedPosts,
  calculateReadingTime,
} from '../components/Blog';
import ScrollProgress from '../components/Blog/ScrollProgress';
import TrainerRecruitmentBanner from '../components/Blog/TrainerRecruitmentBanner';
import ServiceCta from '../components/Blog/ServiceCta';
import EmailCapture from '../components/EmailCapture/EmailCapture';

import { SITE_URL, DEFAULT_OG_IMAGE } from '../data/seo';

// HowTo schema for framework posts — improves AI search citability
const HOWTO_SCHEMAS = {
  'traffic-light-protocol-ai-safety': {
    name: 'How to Implement the Traffic Light Protocol for AI Safety',
    description: 'A three-color classification system that teaches employees to quickly assess whether workplace data is safe to use with external AI tools.',
    steps: [
      { name: 'Identify Red Data (Never Share)', text: 'Classify data that must never enter external AI tools: names, account numbers, PII, transaction records, customer histories, salary data, or internal system screenshots.' },
      { name: 'Identify Yellow Data (Anonymize First)', text: 'Mark internal non-public data that can be used with AI after anonymization: remove names, project codes, and identifying details before sharing.' },
      { name: 'Identify Green Data (Safe to Use)', text: 'Recognize publicly available information safe for unrestricted AI experimentation: published reports, market data, regulatory documents, and general knowledge.' },
      { name: 'Run the 3-Second Check', text: 'Before each AI interaction, ask: Does it contain PII (Red)? Is it internal but anonymizable (Yellow)? Is it public or fictional (Green)? Then proceed accordingly.' },
    ],
  },
  'how-to-design-ai-pioneer-program': {
    name: 'How to Design a 6-Session AI Pioneer Program for Behavior Change',
    description: 'A structured weekly program that trains internal champions over six weeks, using real work and measurable outcomes to embed AI adoption into daily workflows.',
    steps: [
      { name: 'Sessions 1-2: Establish Security Foundations', text: 'Teach AI literacy, security protocols, and data tiers. Establish what is safe to use before experimentation begins.' },
      { name: 'Sessions 3-4: Apply AI to Real Workflows', text: 'Have participants bring actual work tasks and rebuild them with AI assistance. Focus on specific time savings, not generic tool skills.' },
      { name: 'Session 5: Introduce the 3-3-3 Habit Framework', text: 'Pick 3 repetitive tasks, use AI for 3 weeks, measure 3 specific outcomes. Creates structured habits that persist after the program ends.' },
      { name: 'Session 6: Showcase Results and Map Next Stage', text: 'Each participant presents a before/after workflow with quantified time savings. Introduce the AI Maturity Model for the path forward.' },
    ],
  },
  'ai-maturity-trap-stuck-stage-one': {
    name: 'How to Move Your Organization Through the 4 AI Maturity Stages',
    description: 'A maturity assessment framework showing where companies stand in AI adoption and the concrete steps needed to progress from awareness to transformation.',
    steps: [
      { name: 'Stage 1: Awareness', text: 'Company knows AI exists but has no formal policy, training, or strategy. Employees experiment secretly. Leadership says "we need to do something" without concrete plans.' },
      { name: 'Stage 2: Experimentation', text: 'Launch a structured pilot with 10-20 trained pioneers. Define basic AI usage policies and security boundaries. Requires permission, structure, and one accountable owner.' },
      { name: 'Stage 3: Integration', text: 'AI becomes part of normal workflows. Teams measure time savings, document best practices, develop internal champions. Processes are redesigned around human-AI collaboration.' },
      { name: 'Stage 4: Transformation', text: 'AI changes your operating model. New roles emerge, decision-making improves through AI insights, and workflows are fundamentally redesigned for human-AI partnership at scale.' },
    ],
  },
};

// Custom blockquote component for pull quotes
const PullQuote = ({ children }) => (
  <blockquote className="pull-quote">{children}</blockquote>
);

PullQuote.propTypes = {
  children: PropTypes.node,
};

PullQuote.defaultProps = {
  children: null,
};

const Post = () => {
  const { slug } = useParams();
  const [markdown, setMarkdown] = useState('');
  const [loading, setLoading] = useState(true);

  const postIndex = posts.findIndex((p) => p.slug === slug);
  const post = posts[postIndex];

  // Get previous and next posts for navigation
  const prevPost = postIndex < posts.length - 1 ? posts[postIndex + 1] : null;
  const nextPost = postIndex > 0 ? posts[postIndex - 1] : null;

  useEffect(() => {
    if (post) {
      import(`../data/posts/${slug}.md`)
        .then((res) => fetch(res.default))
        .then((res) => res.text())
        .then((text) => {
          setMarkdown(text);
          setLoading(false);
        })
        .catch(() => {
          setMarkdown('Error loading post content.');
          setLoading(false);
        });
    }
  }, [slug, post]);

  const readingTime = useMemo(() => calculateReadingTime(markdown), [markdown]);
  const shouldShowTrainerBanner = useMemo(() => {
    if (!post || !post.tags) {
      return false;
    }
    return post.tags.some((tag) => ['workshop', 'case-study'].includes(tag));
  }, [post]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const postUrl = `${SITE_URL}/blog/${slug}/`;
  const imageUrl = post.image ? `${SITE_URL}${post.image}` : DEFAULT_OG_IMAGE;

  // Find linked post for hreflang (bilingual SEO)
  const linkedPost = post.linkedPost
    ? posts.find((p) => p.slug === post.linkedPost)
    : null;
  const postLang = post.language || 'en';

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    author: { '@type': 'Person', name: 'Sam Wong', url: SITE_URL },
    datePublished: post.date,
    image: imageUrl,
    url: postUrl,
    inLanguage: postLang === 'zh-Hant' ? 'zh-Hant' : 'en',
    publisher: {
      '@type': 'Organization',
      name: 'Adaptig',
      url: 'https://adaptig.com',
    },
  };

  return (
    <Main
      title={post.title}
      description={post.excerpt}
      canonicalUrl={postUrl}
      ogTitle={post.title}
      ogDescription={post.excerpt}
      ogImage={imageUrl}
      ogUrl={postUrl}
      ogType="article"
      twitterTitle={post.title}
      twitterDescription={post.excerpt}
      twitterImage={imageUrl}
      articlePublishedTime={post.date}
      articleTags={post.tags}
    >
      <Helmet>
        <html lang={postLang === 'zh-Hant' ? 'zh-Hant' : 'en'} />
        <script type="application/ld+json">
          {JSON.stringify(articleJsonLd)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/`,
              },
              {
                '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog`,
              },
              {
                '@type': 'ListItem', position: 3, name: post.title,
              },
            ],
          })}
        </script>
        {/* HowTo schema for framework posts */}
        {HOWTO_SCHEMAS[slug] && (
          <script type="application/ld+json">
            {JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'HowTo',
              name: HOWTO_SCHEMAS[slug].name,
              description: HOWTO_SCHEMAS[slug].description,
              step: HOWTO_SCHEMAS[slug].steps.map((s, i) => ({
                '@type': 'HowToStep',
                position: i + 1,
                name: s.name,
                text: s.text,
              })),
              author: { '@type': 'Person', name: 'Sam Wong', url: SITE_URL },
            })}
          </script>
        )}
        {/* hreflang tags for bilingual posts */}
        <link rel="alternate" hrefLang={postLang === 'zh-Hant' ? 'zh-Hant' : 'en'} href={postUrl} />
        {linkedPost && (
          <link
            rel="alternate"
            hrefLang={linkedPost.language === 'zh-Hant' ? 'zh-Hant' : 'en'}
            href={`${SITE_URL}/blog/${linkedPost.slug}/`}
          />
        )}
        {/* x-default hreflang — points to English version or self if English */}
        {linkedPost && (
          <link
            rel="alternate"
            hrefLang="x-default"
            href={postLang === 'en' ? postUrl : `${SITE_URL}/blog/${linkedPost.slug}/`}
          />
        )}
      </Helmet>
      <ScrollProgress />
      <article className="post post--article" id="blog-post">
        {/* Dark hero with post title */}
        <header className="page-hero">
          <div className="content-narrow">
            <div className="title">
              <h2>
                <Link to={`/blog/${slug}`}>{post.title}</Link>
              </h2>
              <div className="post-header__meta">
                <span className="post-header__date">
                  {dayjs(post.date).format('MMMM D, YYYY')}
                </span>
                <span className="post-header__separator">|</span>
                <span className="post-header__reading-time">
                  {readingTime} min read
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <section className="section-base section-padding">
          <div className="content-narrow">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="post-content">
                <Markdown
                  options={{
                    overrides: {
                      blockquote: {
                        component: PullQuote,
                      },
                    },
                  }}
                >
                  {markdown}
                </Markdown>
              </div>
            )}

            {/* Share Buttons */}
            <ShareButtons
              title={post.title}
              url={typeof window !== 'undefined' ? window.location.href : ''}
            />
          </div>
        </section>

        {/* Author + Trainer Banner */}
        <section className="section-sunken section-padding">
          <div className="content-narrow">
            <section className="post-author-section">
              <h3>About the Author</h3>
              <AuthorCard />
            </section>

            <ServiceCta tags={post.tags} />

            {shouldShowTrainerBanner && (
              <TrainerRecruitmentBanner ctaHref="/contact?interest=trainer" />
            )}
          </div>
        </section>

        {slug === 'how-to-design-ai-pioneer-program' ? (
          <EmailCapture
            title="Get the full Pioneer Program Playbook"
            blurb="The 6-session structure, champion selection checklist, 3-3-3 Habit Framework, and measurement template — in a ready-to-use PDF."
            leadMagnet={{
              title: 'AI Pioneer Program Playbook (PDF)',
              url: '/downloads/ai-pioneer-program-playbook.pdf',
            }}
          />
        ) : (
          <EmailCapture
            title="Liked this? Get the next one."
            blurb="I write about AI adoption that actually works — frameworks, case studies, and lessons from 180+ workshops."
          />
        )}

        {/* Related Posts + Navigation */}
        <section className="section-base section-padding">
          <div className="content-standard">
            <RelatedPosts currentSlug={slug} currentTags={post.tags} />

            <nav className="post-navigation">
              <div className="post-navigation__prev">
                {prevPost && (
                  <>
                    <span className="post-navigation__label">Previous</span>
                    <Link to={`/blog/${prevPost.slug}`} className="post-navigation__link">
                      &larr; {prevPost.title}
                    </Link>
                  </>
                )}
              </div>
              <div className="post-navigation__next">
                {nextPost && (
                  <>
                    <span className="post-navigation__label">Next</span>
                    <Link to={`/blog/${nextPost.slug}`} className="post-navigation__link">
                      {nextPost.title} &rarr;
                    </Link>
                  </>
                )}
              </div>
            </nav>

            <Link to="/blog" className="button">
              &larr; Back to all posts
            </Link>
          </div>
        </section>
      </article>
    </Main>
  );
};

export default Post;
