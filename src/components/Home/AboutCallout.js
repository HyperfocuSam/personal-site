import React from 'react';
import { Link } from 'react-router-dom';
import OptimizedImage from '../Template/OptimizedImage';

const { PUBLIC_URL } = process.env;

const AboutCallout = () => (
  <section className="about-callout full-bleed">
    <div className="about-callout__inner content-narrow">
      <OptimizedImage
        src={`${PUBLIC_URL}/images/Sam.png`}
        alt="Sam Wong"
        width={400}
        height={400}
        className="about-callout__photo"
        loading="lazy"
      />
      <h2 className="about-callout__name">Sam Wong</h2>
      <p className="about-callout__bio">
        Hong Kong-based AI training specialist. 10,000+ professionals trained
        across 70+ organizations in 13 countries. I turn AI curiosity into
        daily habits that stick.
      </p>
      <Link to="/about" className="about-callout__link">
        More about me &rarr;
      </Link>
    </div>
  </section>
);

export default AboutCallout;
