import React from 'react';
import { Link } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';

import Main from '../layouts/Main';
import services from '../data/services';

const Services = () => (
  <Main
    title="Services"
    description="AI Training Services by Sam Wong - Corporate workshops, Train-the-Trainer programs, and 1-1 coaching through DotAI and Adaptig."
  >
    <article className="post" id="services">
      <header>
        <div className="title">
          <h2>
            <Link to="/services">Services</Link>
          </h2>
          <p>AI Training & Consulting</p>
        </div>
      </header>

      <p>
        Most AI training focuses on the tools. Mine focuses on the people using them.
        Whether you&apos;re an individual trying to figure out where AI fits in your work,
        or an organization wondering how to actually get your teams to adopt it&mdash;the
        answer isn&apos;t more features. It&apos;s finding the right starting point.
      </p>

      {services.map((service) => (
        <section key={service.id} className="service-item">
          <h3>{service.title}</h3>
          <p className="service-subtitle">
            <em>{service.subtitle}</em>
            {service.provider && (
              <span className="service-provider"> | via {service.provider}</span>
            )}
          </p>
          <Markdown>{service.description}</Markdown>
          {service.ctaLink.startsWith('/') ? (
            <Link to={service.ctaLink} className="button">
              {service.cta}
            </Link>
          ) : (
            <a
              href={service.ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="button"
            >
              {service.cta}
            </a>
          )}
          <hr />
        </section>
      ))}

      <section className="contact-cta">
        <h3>Not sure which option is right for you?</h3>
        <p>
          Let us chat about your goals and find the best approach.
          No pressure, just a conversation about how AI can help.
        </p>
        <Link to="/contact" className="button">
          Get in Touch
        </Link>
      </section>
    </article>
  </Main>
);

export default Services;
