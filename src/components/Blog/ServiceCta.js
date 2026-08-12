import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// One entry per matched signal, in both languages. The Chinese half is new: 27
// Chinese posts had always rendered an English CTA and an English service link,
// on the best-behaving section of the site (/zh: 32% entry bounce, 3.28 pages
// per session, against the English homepage's 73% and 2.28). It reads as a
// translation that ran out of budget at exactly the point where the reader was
// meant to act.
const SERVICE_CTA = {
  workshop: {
    en: {
      href: '/services#organizations',
      label: 'Explore Corporate AI Workshops',
      text: 'Want this for your team? Sam delivers AI workshops for enterprises across Hong Kong and Asia-Pacific.',
    },
    zh: {
      href: '/zh/services#organizations',
      label: '了解企業 AI 工作坊',
      text: '想為團隊安排同樣的工作坊？Sam 為香港及亞太區企業提供 AI 工作坊。',
    },
  },
  'case-study': {
    en: {
      href: '/services#organizations',
      label: 'See All Training Services',
      text: 'See how Sam helps organizations adopt AI through workshops, coaching, and trainer development.',
    },
    zh: {
      href: '/zh/services#organizations',
      label: '查看所有培訓服務',
      text: 'Sam 以工作坊、一對一教練與導師培訓，幫助機構真正把 AI 用起來。',
    },
  },
  'train-the-trainer': {
    en: {
      href: '/services#train-the-trainer',
      label: 'Become a Certified AI Trainer',
      text: 'Teach this yourself? Sam certifies trainers, consultants and educators to deliver practical AI training.',
    },
    zh: {
      href: '/zh/services#train-the-trainer',
      label: '成為認證 AI 導師',
      text: '想自己教？Sam 為培訓師、顧問與教育工作者提供 AI 導師認證。',
    },
  },
  'corporate-training': {
    en: {
      href: '/services#organizations',
      label: 'Explore Corporate AI Training',
      text: 'Sam runs corporate AI training in Hong Kong and across Asia-Pacific, in English and Cantonese.',
    },
    zh: {
      href: '/zh/services#organizations',
      label: '了解企業 AI 培訓',
      text: 'Sam 在香港及亞太區提供企業 AI 培訓，粵語、英語都可以。',
    },
  },
  coaching: {
    en: {
      href: '/services#one-on-one',
      label: 'Book a 1-1 Session',
      text: 'Sam has run 300 one-on-one sessions across finance, marketing, education, healthcare and technology.',
    },
    zh: {
      href: '/zh/services#one-on-one',
      label: '預約一對一',
      text: 'Sam 已完成 300 節一對一，客戶來自金融、市場、教育、醫療與科技。',
    },
  },
  enterprise: {
    en: {
      href: '/services#organizations',
      label: 'Explore Enterprise Training',
      text: 'Sam works with enterprises across banking, retail, engineering, and education in Hong Kong.',
    },
    zh: {
      href: '/zh/services#organizations',
      label: '了解企業培訓',
      text: 'Sam 的客戶遍及香港的銀行、零售、工程與教育界。',
    },
  },
  'ai-adoption': {
    en: {
      href: '/services',
      label: 'How Sam Helps Teams Adopt AI',
      text: 'From awareness workshops to multi-session Pioneer Programs — practical AI training that drives real behavior change.',
    },
    zh: {
      href: '/zh/services',
      label: 'Sam 如何幫團隊用起 AI',
      text: '由入門工作坊到六節的 Pioneer Program——務實的 AI 培訓，目標是行為真的改變。',
    },
  },
  'ai-tools': {
    en: {
      href: '/services#one-on-one',
      label: 'Book a Coaching Session',
      text: 'Want personalized guidance on AI tools and workflows? Sam offers 1-1 coaching for professionals.',
    },
    zh: {
      href: '/zh/services#one-on-one',
      label: '預約一對一教練',
      text: '想有人針對你的工具同工作流程給意見？Sam 為專業人士提供一對一教練。',
    },
  },
  productivity: {
    en: {
      href: '/services#one-on-one',
      label: 'Book a Coaching Session',
      text: 'Want personalized guidance on AI productivity? Sam offers 1-1 coaching for professionals.',
    },
    zh: {
      href: '/zh/services#one-on-one',
      label: '預約一對一教練',
      text: '想用 AI 提升自己的生產力？Sam 為專業人士提供一對一教練。',
    },
  },
};

const DEFAULT_CTA = {
  en: {
    href: '/services',
    label: 'View Training Services',
    text: 'Sam Wong helps teams adopt AI through workshops, coaching, and trainer development across Hong Kong and Asia-Pacific.',
  },
  zh: {
    href: '/zh/services',
    label: '查看培訓服務',
    text: 'Sam Wong 以工作坊、一對一教練與導師培訓，幫助香港及亞太區的團隊用起 AI。',
  },
};

// The blog is the best funnel on the site — 33% bounce against the homepage's
// 73%, and 28% of blog readers reach /services — but until recently NONE of the
// 98 posts linked to /book. A reader could only reach the calendar via the
// global nav. The service link stays primary because that path demonstrably
// works; booking is added beside it as the direct route for anyone already
// convinced. /book has no Chinese twin, so both languages point at the same
// page — the booking flow itself is English.
const BookLink = ({ isChinese }) => (
  <Link to="/book" className="service-cta__book" data-cta="blog_cta_book">
    {isChinese ? '或預約 30 分鐘免費通話 →' : 'or book a free 30-minute call →'}
  </Link>
);

BookLink.propTypes = { isChinese: PropTypes.bool.isRequired };

// `case-study` used to be a tag AND a type on the same posts. The tag vocabulary
// dropped the duplicate (src/data/tags.js), so the type is now the only carrier
// — read both or every case study silently falls to the generic CTA. `tools` and
// `productivity` moved to `ai-tools` and `productivity` in the same pass, which
// is also what finally lets a Chinese post match at all: they used to carry
// translated tags (`ai-工具`, `企業培訓`) that no key here could ever match, and
// 15 of 27 got the generic block. After the pass, 5 of 27.
const ServiceCta = ({ tags, type, language }) => {
  const signals = [...(tags || []), ...(type ? [type] : [])];
  if (signals.length === 0) return null;

  const isChinese = language === 'zh-Hant';
  const locale = isChinese ? 'zh' : 'en';

  // Most specific audience first, broadest last — `ai-adoption` sits on 65 of 98
  // posts, so anything above it in this list is a genuinely narrower read of who
  // the reader is. Adding train-the-trainer, corporate-training and coaching cut
  // the generic fallback from 12 posts to 5; `corporate-training` alone covers
  // 23 posts and had no CTA of its own at all.
  const match = ['workshop', 'train-the-trainer', 'case-study', 'corporate-training',
    'enterprise', 'coaching', 'ai-adoption', 'ai-tools', 'productivity']
    .find((tag) => signals.includes(tag));

  const cta = match ? SERVICE_CTA[match][locale] : DEFAULT_CTA[locale];
  const ctaId = match ? `blog_service_cta_${match}` : 'blog_service_cta_default';

  return (
    <div className="service-cta">
      <p className="service-cta__text">{cta.text}</p>
      <Link to={cta.href} className="button" data-cta={ctaId}>
        {cta.label}
      </Link>
      <BookLink isChinese={isChinese} />
    </div>
  );
};

ServiceCta.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string),
  type: PropTypes.string,
  language: PropTypes.string,
};

ServiceCta.defaultProps = {
  tags: null,
  type: null,
  language: 'en',
};

export default ServiceCta;
