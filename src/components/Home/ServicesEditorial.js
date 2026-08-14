import React from 'react';
import { Link } from 'react-router-dom';
import OptimizedImage from '../Template/OptimizedImage';

const services = [
  {
    label: 'Organizations',
    title: 'Workshops for Teams',
    description: 'Align your team, lower the fear, and build practical AI skills tied to daily workflows.',
    href: '/services#organizations',
    image: '/images/about/workshop-audience-wide.jpg',
    imageAlt: 'Workshop participants engaged in hands-on AI training',
  },
  {
    label: 'Individuals',
    title: 'One-on-One Coaching',
    description: 'Personalized sessions focused on your projects, your role, and your goals.',
    href: '/services#one-on-one',
    image: '/images/home/coaching-session.jpg',
    imageAlt: 'One-on-one coaching session reviewing AI applications',
  },
  {
    label: 'Trainers',
    title: 'Train-the-Trainer',
    description: 'Become a certified AI trainer with the Adaptig methodology. Teach with confidence.',
    href: '/services#train-the-trainer',
    image: '/images/home/train-the-trainer.jpg',
    imageAlt: 'Train-the-trainer certification session',
  },
];

const ServicesEditorial = () => (
  <section className="services-editorial full-bleed">
    <div className="content-narrow">
      {services.map((service, index) => (
        <Link
          key={service.label}
          to={service.href}
          className={`services-editorial__item fn-entry${index === 0 ? ' services-editorial__item--primary' : ''}`}
        >
          <div className="services-editorial__photo">
            <OptimizedImage
              src={service.image}
              alt={service.imageAlt}
              loading="lazy"
            />
          </div>
          <div className="services-editorial__text">
            <span className="services-editorial__label fn-stamp">{service.label}</span>
            <h3 className="services-editorial__heading">{service.title}</h3>
            <p className="services-editorial__desc">{service.description}</p>
            <span className="services-editorial__arrow">&rarr;</span>
          </div>
        </Link>
      ))}
    </div>
  </section>
);

export default ServicesEditorial;
