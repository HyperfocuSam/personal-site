import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Main from '../layouts/Main';
import OptimizedImage from '../components/Template/OptimizedImage';
import EmailCapture from '../components/EmailCapture/EmailCapture';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../data/seo';
import services from '../data/services';
import testimonials from '../data/testimonials';
import ServiceGroup from '../components/Services/ServiceGroup';
import ScrollReveal from '../components/ScrollReveal';
import FaqSection from '../components/FaqSection/FaqSection';
import { servicesFaqs } from '../data/faqs';

const groups = [
  {
    id: 'organizations',
    category: 'organizations',
    title: 'For Organizations',
    subtitle: 'Workshops, training, and events that move teams from interest to real adoption.',
    socialProof:
      'a major Hong Kong bank, Chow Tai Fook, the food manufacturer, an international toy company, HSBC, a major Hong Kong utility, YPO.',
    testimonial: testimonials[0],
    primaryCta: {
      id: 'organizations',
      cta: 'Discuss Training for Your Team',
      ctaLink: '/contact',
      external: false,
    },
  },
  {
    id: 'one-on-one',
    category: 'individuals',
    title: 'For Individuals',
    subtitle: 'Personalized coaching for professionals building practical AI habits.',
    socialProof: '300 one-on-one sessions across finance, marketing, education, healthcare, and technology.',
    testimonial: testimonials[1],
    primaryCta: {
      id: 'one-on-one',
      cta: 'Book a Free Discovery Call',
      ctaLink: '/book',
      external: false,
    },
  },
  {
    id: 'train-the-trainer',
    category: 'trainers',
    title: 'For Trainers',
    subtitle: 'Recruitment path for facilitators who want to teach practical AI.',
    socialProof:
      'Join a global network across North America, Latin America, Europe, and Asia-Pacific.',
    testimonial: testimonials[2],
    primaryCta: {
      id: 'train-the-trainer',
      cta: 'Apply to Join the Network',
      ctaLink: '/contact?interest=trainer',
      external: false,
    },
  },
];

// Built from src/data/services.js rather than hand-written, so the catalog
// cannot drift from what the page actually renders. The ProfessionalService
// node carried six keys and no offers at all — "what does he sell, and how do
// I buy it" was the one question the commercial page could not answer to a
// machine, while llms.txt already published the engagement shapes in prose.
const offerCatalog = {
  '@type': 'OfferCatalog',
  name: 'AI training and coaching engagements',
  itemListElement: services.map((service) => ({
    '@type': 'Offer',
    name: service.title,
    // Trailing slash before the fragment: GitHub Pages 301s /services to
    // /services/, and AI fetchers often don't follow the redirect.
    url: `${SITE_URL}/services/#${service.anchor}`,
    availability: 'https://schema.org/InStock',
    itemOffered: {
      '@type': 'Service',
      name: service.title,
      description: service.subtitle,
      serviceType: service.title,
      provider: service.provider === 'Adaptig'
        ? { '@type': 'Organization', name: 'Adaptig', url: 'https://adaptig.ai' }
        : { '@type': 'Person', name: 'Sam Wong', url: SITE_URL },
      areaServed: ['Hong Kong', 'Asia-Pacific'],
      availableLanguage: ['English', 'Cantonese', 'Mandarin'],
    },
  })),
};

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
      title="AI Training Services - Hong Kong"
      // 157 chars. Was 236, and it opened with the IDENTICAL sentence as
      // /corporate-ai-training-hong-kong — two pages telling Google the same
      // thing about the same query. This one is the hub and names all three
      // audiences; the lander below leads on enterprise alone.
      description="Sam Wong's AI training in Hong Kong: corporate workshops for teams, 1-1 coaching for professionals, and Train-the-Trainer certification. English and Cantonese."
      canonicalUrl={`${SITE_URL}/services`}
      ogTitle="Corporate AI Training & Workshops - Hong Kong | Sam Wong"
      ogDescription="Enterprise AI workshops, prompt engineering training, coaching, and Train-the-Trainer programs in Hong Kong. Delivered through Adaptig."
      ogImage={DEFAULT_OG_IMAGE}
      ogUrl={`${SITE_URL}/services`}
      ogType="website"
      twitterTitle="Corporate AI Training & Workshops - Hong Kong | Sam Wong"
      twitterDescription="Enterprise AI workshops, prompt engineering training, and coaching in Hong Kong."
      twitterImage={DEFAULT_OG_IMAGE}
      hreflangTags={[
        { lang: 'en', href: `${SITE_URL}/services` },
        { lang: 'zh-Hant', href: `${SITE_URL}/zh/services` },
        { lang: 'x-default', href: `${SITE_URL}/services` },
      ]}
    >
      <article className="post field-notes-content" id="services">
        {/* Dark hero with anchor pills */}
        <header className="page-hero">
          <div className="content-standard">
            <div className="title">
              <h1>AI Training &amp; Workshop Services</h1>
              <p>Corporate AI training in Hong Kong and across Asia-Pacific</p>
            </div>
            <div className="services-anchor-pills">
              <Link to="/services#organizations" className="anchor-pill">
                Organizations
              </Link>
              <Link to="/services#one-on-one" className="anchor-pill">
                Individuals
              </Link>
              <Link to="/services#train-the-trainer" className="anchor-pill">
                Trainers
              </Link>
              <Link to="/speaking" className="anchor-pill">
                Speaking
              </Link>
            </div>
            <p className="services-hero-cta">
              <Link to="/book" className="button" data-cta="services_hero_book">
                Book a Discovery Call
              </Link>
            </p>
          </div>
        </header>

        {/* Photo: Corporate workshop in action */}
        <ScrollReveal variant="blur-in" className="services-photo-reveal">
          <div className="full-bleed photo-band">
            <OptimizedImage
              src="/images/services/corporate-training.jpeg"
              alt="AI workshop in progress at Arup University, Hong Kong"
              loading="lazy"
            />
          </div>
        </ScrollReveal>

        {/* Organizations */}
        <section className="section-base section-padding">
          <div className="content-standard">
            <ScrollReveal variant="fade-up-long">
              <ServiceGroup
                id={groups[0].id}
                title={groups[0].title}
                subtitle={groups[0].subtitle}
                services={services.filter((s) => s.category === groups[0].category)}
                socialProof={groups[0].socialProof}
                testimonial={groups[0].testimonial}
                primaryCta={groups[0].primaryCta}
              />
            </ScrollReveal>
          </div>
        </section>

        {/* Lead magnet — positioned after Organizations for maximum visibility */}
        <EmailCapture
          title="Free: AI Pioneer Program Playbook"
          blurb="The 6-session structure I use with enterprise clients — champion selection, habit framework, and measurement template."
          leadMagnet={{
            title: 'AI Pioneer Program Playbook (PDF)',
            url: '/downloads/ai-pioneer-program-playbook.pdf',
          }}
        />

        {/* Individuals + Trainers — single band for mobile density */}
        <section className="section-sunken section-padding">
          <div className="content-standard">
            {groups.slice(1).map((group) => (
              <ScrollReveal key={group.id} variant="fade-up-long">
                <ServiceGroup
                  id={group.id}
                  title={group.title}
                  subtitle={group.subtitle}
                  services={services.filter((s) => s.category === group.category)}
                  socialProof={group.socialProof}
                  testimonial={group.testimonial}
                  primaryCta={group.primaryCta}
                />
              </ScrollReveal>
            ))}
          </div>
        </section>

        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ProfessionalService',
              '@id': `${SITE_URL}/services/#service`,
              name: 'Sam Wong - AI Training Services',
              url: `${SITE_URL}/services/`,
              provider: {
                '@type': 'Person', name: 'Sam Wong', url: SITE_URL,
              },
              areaServed: ['Hong Kong', 'Asia-Pacific'],
              serviceType: ['AI Training', 'Corporate Workshops', 'Executive Coaching', 'Train-the-Trainer'],
              availableLanguage: ['English', 'Cantonese', 'Mandarin'],
              hasOfferCatalog: offerCatalog,
            })}
          </script>
          <script type="application/ld+json">
            {JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Course',
                  name: 'Corporate AI Workshop',
                  description: 'Half-day to multi-day AI workshops for leadership teams and departments. Human-first facilitation with hands-on exercises tied to real workflows.',
                  provider: { '@type': 'Organization', name: 'Adaptig', url: 'https://adaptig.ai' },
                  educationalLevel: 'Professional',
                  availableLanguage: ['English', 'Cantonese'],
                  hasCourseInstance: {
                    '@type': 'CourseInstance',
                    courseMode: 'onsite',
                    locationCreated: { '@type': 'Place', name: 'Hong Kong' },
                    instructor: { '@type': 'Person', name: 'Sam Wong', url: SITE_URL },
                  },
                },
                {
                  '@type': 'Course',
                  name: 'AI Pioneer Program',
                  description: '6-session cohort program that builds lasting AI habits. Select 10-20 influential people, train them deeply, and they become internal champions who drive adoption organization-wide.',
                  provider: { '@type': 'Person', name: 'Sam Wong', url: SITE_URL },
                  educationalLevel: 'Professional',
                  numberOfCredits: '6 sessions',
                  hasCourseInstance: {
                    '@type': 'CourseInstance',
                    courseMode: 'blended',
                    courseWorkload: 'PT12H',
                  },
                },
                {
                  '@type': 'Course',
                  name: 'Train-the-Trainer AI Certification',
                  description: 'Certification program for trainers, consultants, and educators who want to teach AI using the Adaptig methodology. Includes materials, community, and delivery opportunities across a global network.',
                  provider: { '@type': 'Organization', name: 'Adaptig', url: 'https://adaptig.ai' },
                  educationalLevel: 'Professional',
                  educationalCredentialAwarded: 'Adaptig Certified AI Trainer',
                },
              ],
            })}
          </script>

        </Helmet>

        <FaqSection
          faqs={servicesFaqs}
          id="services-faq"
          title="Frequently asked questions"
          path="/services/"
        />

        <p className="services-footer-link">
          <Link to="/corporate-ai-training-hong-kong">
            Corporate AI Training in Hong Kong — Full Guide →
          </Link>
        </p>

        <p className="services-footer-link">
          <Link to="/blog/ai-train-the-trainer-hong-kong/">
            AI Train-the-Trainer in Hong Kong — Certification for Trainers →
          </Link>
        </p>

        <p className="lang-toggle">
          <Link to="/zh/services">&#x4E2D;&#x6587;&#x7248;&#x672C;</Link>
        </p>
      </article>
    </Main>
  );
};

export default Services;
