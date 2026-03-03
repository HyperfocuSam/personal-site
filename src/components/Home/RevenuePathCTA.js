import React from 'react';
import { Link } from 'react-router-dom';

const paths = [
  {
    title: 'Explore working together',
    description: 'For companies and teams ready to build practical AI capability.',
    cta: 'Corporate Services',
    link: '/contact',
  },
  {
    title: 'Personal AI coaching',
    description: 'One-on-one support for professionals navigating real AI workflows.',
    cta: 'See Coaching Paths',
    link: '/services#one-on-one',
  },
  {
    title: 'Become an Adaptig trainer',
    description: 'Join a global network bringing human-first AI facilitation to organizations.',
    cta: 'Apply as Trainer',
    link: '/services#train-the-trainer',
  },
];

const RevenuePathCTA = () => (
  <section className="revenue-path-cta">
    <header>
      <h3>Choose Your Starting Point</h3>
      <p>Three ways to work together based on your role and goals.</p>
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
