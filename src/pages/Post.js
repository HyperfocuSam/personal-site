import React, { useMemo } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Markdown from 'markdown-to-jsx';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

import Main from '../layouts/Main';
import posts from '../data/posts';
import postContent from '../data/posts/content.generated';
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
import ScrollReveal from '../components/ScrollReveal';

// FAQ schema for buyer-guide posts. The questions a Hong Kong buyer actually
// types are funding questions, and every competing guide on page one answers
// them with schemes that have closed or ratios that changed — so this is the
// one place the site can be more useful than a better-resourced competitor.
// Answers must match the post body; if the body changes, change these.
const FAQ_SCHEMAS = {
  'how-to-choose-ai-training-hong-kong': [
    {
      q: 'Is the Technology Voucher Programme (TVP) still available for AI training in Hong Kong?',
      a: 'No. TVP stopped accepting new applications after 31 December 2024. Provider guides that still list it as a live 75% subsidy of up to HK$600,000 are out of date.',
    },
    {
      q: 'What government funding covers corporate AI training in Hong Kong in 2026?',
      a: 'The New Industrialisation and Technology Training Programme (NITTP, formerly RTTP). Since 1 August 2025 it matches on a 1:1 basis rather than 2:1, with a ceiling of HK$250,000 per enterprise per financial year and one course per trainee per financial year. The course must be registered with the VTC first.',
    },
    {
      q: 'Can the BUD Fund pay for AI training?',
      a: 'Not directly. The BUD Fund has a cumulative ceiling of HK$7 million per enterprise, but it funds branding, upgrading and domestic sales projects. Training can sit inside a funded project; you cannot apply to BUD for a standalone workshop.',
    },
    {
      q: 'How much does corporate AI training cost in Hong Kong?',
      a: 'University and institutional programmes run HK$5,000-30,000 per person. Global training firms charge HK$2,000-8,000 per person online or HK$15,000-40,000 for in-person workshops. Consulting engagements run HK$50,000-200,000 and up. Practitioner-led training runs HK$15,000-80,000 and up per engagement depending on format and duration.',
    },
    {
      q: 'What should I ask a corporate AI training provider before signing?',
      a: 'What the facilitator uses AI for in their own work, how they handle data sensitivity and PDPO compliance, what happens after the workshop, whether they can show a case study from your industry, and how they measure success beyond same-day satisfaction scores.',
    },
  ],
};

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
  '1500-banking-professionals-ai-adoption': {
    name: 'How to Use the IPA Framework for Safe AI Decision-Making',
    description: 'A three-step mental model — Input, Process, Action — that reframes AI from a standalone tool into a thinking partner for strategic work, with built-in data governance.',
    steps: [
      { name: 'Input: Define What Data Goes In', text: 'Classify data sensitivity using the traffic light protocol (Green: public information, Yellow: internal data with identifiers stripped, Red: confidential data that never enters AI tools). Prepare clean, structured input appropriate to the task.' },
      { name: 'Process: Let AI Analyze and Transform', text: 'Use AI to analyze, synthesize, or transform the input — whether drafting documents, summarizing meetings, or compiling research. Review outputs for accuracy against your domain expertise.' },
      { name: 'Action: Make Decisions Based on Results', text: 'Apply human judgment to the AI output. Make strategic decisions, archive results for reference, and integrate findings into your existing workflows. The 30% that stays human — context, relationships, strategic framing — is where your value lives.' },
    ],
  },
  'arup-ai-lunch-learn': {
    name: 'How to Apply C-How Thinking: Bridging Left-Brain Logic and Right-Brain Creativity with AI',
    description: 'A framework that integrates two AI workflows — structured text generation and visual execution — so professionals can move from idea to polished deliverable in minutes instead of hours.',
    steps: [
      { name: 'Left Brain: Strategic Thinking with AI Text Tools', text: 'Use AI (e.g., Microsoft Copilot) for structured prompt design. Generate first drafts aligned with your brand voice using the iteration loop: prompt, review, refine, repeat. Focus on logical structure and content quality.' },
      { name: 'Right Brain: Visual Execution with AI Design Tools', text: 'Take the AI-generated text and transform it into presentation-ready visuals using AI design capabilities. Use automated layout suggestions, background removal, and AI-generated imagery to produce professional deliverables without design expertise.' },
      { name: 'Integration: Combine Both for Complete Workflows', text: 'Chain the two AI workflows together — brief to draft to visual in a single sitting. AI handles both logical structuring and visual execution, freeing you to focus on judgment, domain expertise, and strategic decisions.' },
    ],
  },
};

// Custom blockquote component for pull quotes
const PullQuote = ({ children }) => (
  <blockquote className="pull-quote fn-card">{children}</blockquote>
);

PullQuote.propTypes = {
  children: PropTypes.node,
};

PullQuote.defaultProps = {
  children: null,
};

const Post = () => {
  const { slug } = useParams();
  const markdown = postContent[slug] ?? '';

  const postIndex = posts.findIndex((p) => p.slug === slug);
  const post = posts[postIndex];

  // Previous/next walk the posts of the SAME language, not raw array positions.
  // The array interleaves English and Chinese by date, so index arithmetic sent
  // a Chinese reader to an English post roughly every other click — the same
  // defect the related-posts list carried.
  const siblings = useMemo(() => {
    if (!post) return [];
    return posts.filter((p) => (p.language || 'en') === (post.language || 'en'));
  }, [post]);
  const siblingIndex = siblings.findIndex((p) => p.slug === slug);
  const prevPost = siblingIndex >= 0 && siblingIndex < siblings.length - 1
    ? siblings[siblingIndex + 1]
    : null;
  const nextPost = siblingIndex > 0 ? siblings[siblingIndex - 1] : null;

  const readingTime = useMemo(() => calculateReadingTime(markdown), [markdown]);
  const shouldShowTrainerBanner = useMemo(() => {
    if (!post) {
      return false;
    }
    // `case-study` is a type, not a tag, since the vocabulary normalisation —
    // reading tags alone would have silently hidden this banner on all 23 case
    // studies, the posts most likely to attract a trainer.
    return post.type === 'case-study' || (post.tags || []).includes('workshop');
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
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    author: {
      '@type': 'Person',
      '@id': 'https://hyperfocusam.com/#person',
      name: 'Sam Wong',
      url: `${SITE_URL}/about`,
    },
    datePublished: post.date,
    dateModified: post.dateModified || post.date,
    image: imageUrl,
    url: postUrl,
    mainEntityOfPage: postUrl,
    inLanguage: postLang === 'zh-Hant' ? 'zh-Hant' : 'en',
    publisher: {
      '@type': 'Organization',
      name: 'Adaptig',
      url: 'https://adaptig.ai',
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
        {/* FAQ schema for buyer-guide posts */}
        {FAQ_SCHEMAS[slug] && (
          <script type="application/ld+json">
            {JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: FAQ_SCHEMAS[slug].map((item) => ({
                '@type': 'Question',
                name: item.q,
                acceptedAnswer: { '@type': 'Answer', text: item.a },
              })),
            })}
          </script>
        )}
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
        {/* x-default hreflang — the English version, or this page when it stands alone.
            Emitted unconditionally: a page that declares hrefLang="zh-Hant" with no
            x-default is an incomplete cluster and search engines discard the lot.
            That was leaving the two TC-only posts with a language and no default. */}
        <link
          rel="alternate"
          hrefLang="x-default"
          href={
            linkedPost && postLang !== 'en'
              ? `${SITE_URL}/blog/${linkedPost.slug}/`
              : postUrl
          }
        />
      </Helmet>
      <ScrollProgress />
      <article
        className={`post post--article field-notes-content${postLang === 'zh-Hant' ? ' zh' : ''}`}
        id="blog-post"
      >
        {/* Dark hero with post title */}
        <header className="page-hero page-hero--dark">
          <div className="content-narrow">
            <div className="title">
              {/* Was <Link to={`/blog/${slug}`}> — every post's H1 linked to the
                  post it was already on, across all 98. Same pattern removed
                  from /about and /book. */}
              <h1>{post.title}</h1>
              <div className="post-header__meta">
                <span className="post-header__date fn-stamp">
                  {dayjs(post.date).format('MMMM D, YYYY')}
                </span>
                <span className="post-header__separator">|</span>
                <span className="post-header__reading-time fn-stamp">
                  {`${readingTime} min read`}
                </span>
                {linkedPost && (
                  <Link
                    to={`/blog/${linkedPost.slug}`}
                    className="post-header__language fn-stamp"
                  >
                    {linkedPost.language === 'zh-Hant' ? '閱讀中文版本' : 'Read in English'}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <section className="section-base section-padding">
          <div className="content-narrow">
            <div className="post-content">
              <Markdown
                options={{
                  overrides: {
                    blockquote: {
                      component: PullQuote,
                    },
                    h1: {
                      component: 'h2',
                    },
                  },
                }}
              >
                {markdown}
              </Markdown>
            </div>

            {/* Share Buttons */}
            {/* Build the URL from SITE_URL, never window.location. react-snap
                prerenders on localhost:45678, so reading window baked
                "http://localhost:45678/blog/..." into the static HTML of all 98
                posts — hydration fixed it for humans, but crawlers and AI
                fetchers that read raw HTML saw localhost. */}
            <ShareButtons
              title={post.title}
              url={postUrl}
            />
          </div>
        </section>

        {/* Author + Trainer Banner */}
        <section className="section-sunken section-padding">
          <div className="content-narrow">
            <ScrollReveal variant="fade-up">
              <section className="post-author-section">
                <h3>About the Author</h3>
                <AuthorCard />
              </section>
            </ScrollReveal>

            <ScrollReveal variant="fade-up">
              <ServiceCta tags={post.tags} type={post.type} language={postLang} />
            </ScrollReveal>

            {shouldShowTrainerBanner && (
              <ScrollReveal variant="fade-up">
                <TrainerRecruitmentBanner ctaHref="/contact?interest=trainer" />
              </ScrollReveal>
            )}
          </div>
        </section>

        <ScrollReveal variant="fade-up">
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
              blurb="I write about AI adoption that actually works — frameworks, case studies, and lessons from training 10,000+ professionals across 70+ organizations."
            />
          )}
        </ScrollReveal>

        {/* Related Posts + Navigation */}
        <section className="section-base section-padding">
          <div className="content-standard">
            <ScrollReveal variant="fade-up-long" stagger={120}>
              <RelatedPosts currentSlug={slug} currentTags={post.tags} language={postLang} />
            </ScrollReveal>

            <nav className="post-navigation">
              <div className="post-navigation__prev">
                {prevPost && (
                  <>
                    <span className="post-navigation__label">Previous</span>
                    {/* Single expressions: adjacent text nodes break hydration (#418) */}
                    <Link to={`/blog/${prevPost.slug}`} className="post-navigation__link">
                      {`← ${prevPost.title}`}
                    </Link>
                  </>
                )}
              </div>
              <div className="post-navigation__next">
                {nextPost && (
                  <>
                    <span className="post-navigation__label">Next</span>
                    <Link to={`/blog/${nextPost.slug}`} className="post-navigation__link">
                      {`${nextPost.title} →`}
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
