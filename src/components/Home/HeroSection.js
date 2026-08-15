import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import OptimizedImage from '../Template/OptimizedImage';

const { PUBLIC_URL } = process.env;

// Hero contract (Sam's rulings, 2026-08-14/15): the H1 is the claim — his own
// line, first person (one-voice ruling). One red per viewport: the Book CTA.
// The credential line replaces the old stamp. Receipts live in the
// ProofReceipt band below — the hero makes the claim, the band proves it.
// Copy per language in one object (bilingual rule); the zh H1 reuses the
// wording Sam approved on the 2026-08-15 voice sheet. Every text node is a
// single expression: adjacent text nodes break react-snap hydration (#418).
const COPY = {
  en: {
    h1: 'I train the people who train AI.',
    credential: 'Sam Wong · Co-Founder & Director of Academy, Adaptig · Hong Kong',
    subtitle: 'Workshops, coaching, and trainer certification for organizations '
      + 'that want AI in daily use — weeks after the session ends.',
    book: 'Book a Free Call',
    bookPath: '/book',
    services: 'See how I can help ',
    servicesPath: '/services',
  },
  'zh-Hant': {
    h1: '我教的是教 AI 的人。',
    credential: 'Sam Wong · Adaptig 聯合創辦人兼學院總監 · 香港',
    subtitle: '企業工作坊、一對一輔導、培訓師認證——目標是課程完結幾星期後，AI 仍然在日常工作裡。',
    book: '預約通話',
    bookPath: '/zh/book',
    services: '查看服務選項 ',
    servicesPath: '/zh/services',
  },
};

const HeroSection = ({ language }) => {
  const t = COPY[language] || COPY.en;
  return (
    <section className="dark-hero full-bleed">
      <div className="dark-hero__inner content-wide">
        <div className="dark-hero__copy">
          <h1 className="dark-hero__headline">{t.h1}</h1>
          <p className="dark-hero__credential">{t.credential}</p>
          <p className="dark-hero__subtitle">{t.subtitle}</p>
          <div className="dark-hero__actions">
            <Link to={t.bookPath} className="dark-hero__cta" data-cta="hero_book">
              {t.book}
            </Link>
            <Link
              to={t.servicesPath}
              className="dark-hero__cta dark-hero__cta--secondary"
              data-cta="hero_services"
            >
              {t.services}
              <span className="dark-hero__arrow">&rarr;</span>
            </Link>
          </div>
        </div>
        {/* Rendered unconditionally (hydration safety); CSS hides it below
            980px. The cutout portrait is already preloaded in index.html. */}
        <div className="dark-hero__photo">
          <OptimizedImage
            src={`${PUBLIC_URL}/images/Sam.png`}
            alt="Sam Wong"
            width={380}
            height={440}
            loading="eager"
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  );
};

HeroSection.propTypes = {
  language: PropTypes.oneOf(['en', 'zh-Hant']),
};

HeroSection.defaultProps = {
  language: 'en',
};

export default HeroSection;
