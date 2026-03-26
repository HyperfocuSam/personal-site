import React from 'react';
import { Link } from 'react-router-dom';

const services = [
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
];

const ServicesEditorial = () => (
  <section className="services-editorial full-bleed">
    <div className="content-narrow">
      <h2 className="services-editorial__title">
        How I Can
        {' '}
        <em>Help</em>
      </h2>
      {services.map((service) => (
        <Link
          key={service.label}
          to={service.href}
          className="services-editorial__item"
        >
          <span className="services-editorial__label">{service.label}</span>
          <h3 className="services-editorial__heading">{service.title}</h3>
          <p className="services-editorial__desc">{service.description}</p>
          <span className="services-editorial__arrow">&rarr;</span>
        </Link>
      ))}
    </div>
  </section>
);

export default ServicesEditorial;
