import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// Copy per language in one object (bilingual rule). The zh items are the
// 我做的三件事 copy that already ran on the old /zh homepage — live, Sam-read,
// one-voice consistent.
const COPY = {
  en: {
    title: 'How I Can ',
    titleEm: 'Help',
    services: [
      {
        label: 'Organizations',
        title: 'Workshops for Teams',
        description: 'Align your team, lower the fear, and build practical AI skills tied to daily workflows.',
        href: '/services#organizations',
      },
      {
        label: 'Individuals',
        title: 'One-on-One Coaching',
        description: 'Personalized sessions focused on your projects, your role, and your goals.',
        href: '/services#one-on-one',
      },
      {
        label: 'Trainers',
        title: 'Train-the-Trainer',
        description: 'Become a certified AI trainer with the Adaptig methodology. Teach with confidence.',
        href: '/services#train-the-trainer',
      },
    ],
  },
  'zh-Hant': {
    title: '我做的',
    titleEm: '三件事',
    services: [
      {
        label: '企業',
        title: '企業工作坊',
        description: '統一團隊認知、降低恐懼、建立與日常工作流程掛鉤的實用技能。',
        href: '/zh/services#organizations',
      },
      {
        label: '個人',
        title: '一對一輔導',
        description: '圍繞你的項目、角色與目標的個人化課程。',
        href: '/zh/services#one-on-one',
      },
      {
        label: '培訓師',
        title: '培訓師培訓計劃',
        description: '協助培訓師掌握 Adaptig 方法論，自信教授 AI。',
        href: '/zh/services#train-the-trainer',
      },
    ],
  },
};

const ServicesEditorial = ({ language }) => {
  const t = COPY[language] || COPY.en;
  return (
    <section className="services-editorial full-bleed">
      <div className="content-narrow">
        {/* Single-expression text: adjacent text nodes break react-snap hydration (#418) */}
        <h2 className="services-editorial__title">
          {t.title}
          <em>{t.titleEm}</em>
        </h2>
        {t.services.map((service) => (
          <Link
            key={service.label}
            to={service.href}
            className="services-editorial__item fn-entry"
          >
            <span className="services-editorial__label fn-stamp">{service.label}</span>
            <h3 className="services-editorial__heading">{service.title}</h3>
            <p className="services-editorial__desc">{service.description}</p>
            <span className="services-editorial__arrow">&rarr;</span>
          </Link>
        ))}
      </div>
    </section>
  );
};

ServicesEditorial.propTypes = {
  language: PropTypes.oneOf(['en', 'zh-Hant']),
};

ServicesEditorial.defaultProps = {
  language: 'en',
};

export default ServicesEditorial;
