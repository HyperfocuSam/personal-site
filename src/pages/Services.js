import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import Main from '../layouts/Main';
import services from '../data/services';
import testimonials from '../data/testimonials';
import ServiceGroup from '../components/Services/ServiceGroup';

const groups = [
  {
    id: 'organizations',
    category: 'organizations',
    title: 'For Organizations',
    subtitle: 'Workshops, training, and events that move teams from interest to adoption.',
    socialProof:
      'BOCHK (1,530 participants, 9.2/10), Chow Tai Fook (third repeat), HSBC, Mattel, Toyota, YPO.',
    testimonial: testimonials[0],
    primaryCta: {
      cta: 'Get in Touch',
      ctaLink: '/contact',
      external: false,
    },
  },
  {
    id: 'one-on-one',
    category: 'individuals',
    title: 'For Individuals',
    subtitle: 'Personalized coaching support for professionals building practical AI habits.',
    socialProof: '150+ professionals coached across industries and roles.',
    testimonial: testimonials[1],
    primaryCta: {
      cta: 'Book a Discovery Call',
      ctaLink: 'https://ro.am/samwong/',
      external: true,
    },
  },
  {
    id: 'train-the-trainer',
    category: 'trainers',
    title: 'For Trainers',
    subtitle: 'Dedicated recruitment path for facilitators who want to teach practical AI.',
    socialProof:
      'Join a global network across North America, Latin America, Europe, and Asia-Pacific.',
    testimonial: testimonials[2],
    primaryCta: {
      cta: 'Apply to Join the Network',
      ctaLink: '/contact?interest=trainer',
      external: false,
    },
  },
];

const Services = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      return;
    }

    const id = hash.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [hash]);

  return (
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
            <p>Three paths to practical AI adoption</p>
          </div>
        </header>

        <p>
          Most AI training focuses on tools. Mine focuses on the humans using them.
          Whether you are guiding an organization, building personal capability, or
          teaching others, we can start from your real context.
        </p>

        {groups.map((group) => (
          <ServiceGroup
            key={group.id}
            id={group.id}
            title={group.title}
            subtitle={group.subtitle}
            services={services.filter((service) => service.category === group.category)}
            socialProof={group.socialProof}
            testimonial={group.testimonial}
            primaryCta={group.primaryCta}
          />
        ))}
      </article>
    </Main>
  );
};

export default Services;
