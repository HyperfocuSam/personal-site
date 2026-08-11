import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

import { SITE_URL } from '../../data/seo';

/**
 * A visible FAQ block and its FAQPage schema, from one array.
 *
 * Exists because /services and /about shipped FAQPage JSON-LD whose questions
 * appeared nowhere in the rendered HTML. Google requires FAQ content to be
 * visible on the page, and an AI engine cannot lift an answer it cannot read —
 * so the schema was both a manual-action risk and wasted copy.
 *
 * components/Home/HomeFAQ.js already does this correctly but hardcodes its own
 * content; rather than add a third implementation, new callers use this.
 */
const FaqSection = ({
  faqs, id, title, path,
}) => {
  if (!faqs || faqs.length === 0) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE_URL}${path}#${id}`,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <section className="home-faq full-bleed" id={id}>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
      <div className="content-narrow">
        <h2 className="home-faq__title">{title}</h2>
        <div className="home-faq__list">
          {faqs.map((f) => (
            <div key={f.q} className="home-faq__item">
              <h3 className="home-faq__q">{f.q}</h3>
              <p className="home-faq__a">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

FaqSection.propTypes = {
  faqs: PropTypes.arrayOf(PropTypes.shape({
    q: PropTypes.string.isRequired,
    a: PropTypes.string.isRequired,
  })).isRequired,
  // Anchor id, also used to scope the schema @id so multiple FAQPage blocks
  // never collide.
  id: PropTypes.string,
  title: PropTypes.string,
  path: PropTypes.string.isRequired,
};

FaqSection.defaultProps = {
  id: 'faq',
  title: 'Frequently asked questions',
};

export default FaqSection;
