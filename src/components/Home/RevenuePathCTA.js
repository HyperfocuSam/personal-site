import React from 'react';
import { Link } from 'react-router-dom';

const paths = [
  {
    title: 'For Organizations',
    description: 'Workshops, training, or keynotes that turn AI interest into real adoption.',
    cta: 'Get Started',
    link: '/contact',
  },
  {
    title: 'For Individuals',
    description: 'One-on-one coaching on your own projects, workflows, and career goals.',
    cta: 'View Tiers',
    link: '/services#one-on-one',
  },
  {
    title: 'For Trainers',
    description: 'Join the Adaptig network to teach practical, human-first AI workshops.',
    cta: 'Apply Now',
    link: '/services#train-the-trainer',
  },
];

const RevenuePathCTA = () => (
  <section className="revenue-path-cta">
    <header>
      <h3>Start Here</h3>
      <p>Choose the path that matches your role.</p>
    </header>
    <div className="revenue-path-cta__grid">
      {paths.map((path) => (
        <article key={path.title} className="revenue-path-cta__card">
          <h4>{path.title}</h4>
          <p>{path.description}</p>
          <Link to={path.link} className="button">
            {path.cta}
          </Link>
        </article>
      ))}
    </div>
  </section>
);

export default RevenuePathCTA;
