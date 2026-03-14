import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Main from '../layouts/Main';
import OptimizedImage from '../components/Template/OptimizedImage';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../data/seo';
import services from '../data/services';
import testimonials from '../data/testimonials';
import ServiceGroup from '../components/Services/ServiceGroup';

const groups = [
  {
    id: 'organizations',
    category: 'organizations',
    title: 'For Organizations',
    subtitle: 'Workshops, training, and events that move teams from interest to real adoption.',
    socialProof:
      'BOCHK, Chow Tai Fook, Garden, Playmates Toys, HSBC, CLP, YPO.',
    testimonial: testimonials[0],
    primaryCta: {
      cta: 'Get in Touch',
      ctaLink: '/contact',
      external: false,
    },
    band: 'section-base',
  },
  {
    id: 'one-on-one',
    category: 'individuals',
    title: 'For Individuals',
    subtitle: 'Personalized coaching for professionals building practical AI habits.',
    socialProof: '160+ professionals coached across finance, marketing, education, healthcare, and technology.',
    testimonial: testimonials[1],
    primaryCta: {
      cta: 'Book a Discovery Call',
      ctaLink: 'https://ro.am/samwong/',
      external: true,
    },
    band: 'section-sunken',
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
      cta: 'Apply to Join the Network',
      ctaLink: '/contact?interest=trainer',
      external: false,
    },
    band: 'section-base',
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
      title="AI Training Services - Hong Kong"
      description="Corporate AI training and workshops in Hong Kong. Sam Wong delivers enterprise AI workshops, prompt engineering training, 1-1 coaching, and Train-the-Trainer certification through DotAI and Adaptig. Available in English and Cantonese."
      canonicalUrl={`${SITE_URL}/services`}
      ogTitle="Corporate AI Training & Workshops - Hong Kong | Sam Wong"
      ogDescription="Enterprise AI workshops, prompt engineering training, coaching, and Train-the-Trainer programs in Hong Kong. Delivered through DotAI and Adaptig."
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
      <article className="post" id="services">
        {/* Dark hero with anchor pills */}
        <header className="page-hero">
          <div className="content-standard">
            <div className="title">
              <h2>
                <Link to="/services">AI Training &amp; Workshop Services</Link>
              </h2>
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
          </div>
        </header>

        {/* Photo: Corporate workshop in action */}
        <div className="full-bleed photo-band">
          <OptimizedImage
            src="/images/services/corporate-training.jpeg"
            alt="AI workshop in progress at Arup University, Hong Kong"
            loading="lazy"
          />
        </div>

        {/* Service groups in alternating section bands */}
        {groups.map((group) => (
          <section key={group.id} className={`${group.band} section-padding`}>
            <div className="content-standard">
              <ServiceGroup
                id={group.id}
                title={group.title}
                subtitle={group.subtitle}
                services={services.filter((s) => s.category === group.category)}
                socialProof={group.socialProof}
                testimonial={group.testimonial}
                primaryCta={group.primaryCta}
              />
            </div>
          </section>
        ))}

        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ProfessionalService',
              name: 'Sam Wong - AI Training Services',
              url: `${SITE_URL}/services`,
              provider: {
                '@type': 'Person', name: 'Sam Wong', url: SITE_URL,
              },
              areaServed: ['Hong Kong', 'Asia-Pacific'],
              serviceType: ['AI Training', 'Corporate Workshops', 'Executive Coaching', 'Train-the-Trainer'],
            })}
          </script>
          <script type="application/ld+json">
            {JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'What types of AI training does Sam Wong offer?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Sam Wong offers corporate AI workshops through Adaptig and DotAI, multi-session AI Pioneer Programs for cohort-based learning, 1-1 AI coaching for professionals, Train-the-Trainer certification programs, and keynotes and event sessions. Services are available for organizations, individuals, and aspiring AI trainers.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Who are Sam Wong\'s typical clients for AI training?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Sam Wong works with enterprises across banking, retail, education, engineering, tourism, and technology sectors. Notable clients include Bank of China (Hong Kong) with 1,530 participants across 13 countries, Chow Tai Fook (three repeat engagements), Hong Kong Jockey Club, HSBC, Arup, PolyU, Mattel, Toyota, and YPO.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'What results can teams expect from corporate AI workshops?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Workshops achieve a 9.2/10 average satisfaction rating. The focus is on behavior change rather than tool awareness — teams learn to integrate AI into their actual daily workflows. Multi-session Pioneer Programs have shown participants saving 5-8 hours per week through AI-assisted workflow redesign.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'What is the Adaptig Train-the-Trainer program?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'The Adaptig Train-the-Trainer program is a certification path for trainers, consultants, HR leaders, and educators who want to teach AI with confidence. Participants receive the Adaptig facilitation methodology, complete workshop materials and delivery structure, trainer community support, certification, and ongoing delivery opportunities through a global network spanning North America, Latin America, Europe, and Asia-Pacific.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'How does Sam Wong\'s AI coaching work?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'AI coaching is personalized 1-1 sessions starting from the individual\'s current role, tools, and constraints — no generic curriculum. There are three tiers: a free 30-minute discovery call, standard 60-90 minute sessions focused on active projects, and premium executive AI advisory for leaders navigating AI transformation decisions. Over 160 individuals coached across industries.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'What is the AI Pioneer Program model?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'The AI Pioneer Program is a multi-session cohort approach (typically 6 sessions over 6 weeks) based on change management principles. Instead of training everyone at once, 10-20 curious and influential people are selected and trained deeply. They work on real tasks from their actual jobs each week. These Pioneers then become internal champions who drive adoption across the wider organization.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Where is Sam Wong based and what languages does he work in?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Sam Wong is based in Hong Kong and available globally, with particular focus across the Asia-Pacific region. He delivers training in English and Cantonese. Workshops have been delivered to teams across 13 countries.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'How much does corporate AI training cost in Hong Kong?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Corporate AI training pricing varies based on format, duration, and team size. Sam Wong offers half-day and full-day workshops, multi-session Pioneer Programs (typically 6 sessions over 6 weeks), and executive advisory packages. Contact for a custom quote based on your team\'s needs. Some programs may be eligible for Hong Kong government funding schemes.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Are AI training workshops available in Cantonese?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes. Sam Wong delivers AI training in both English and Cantonese, making workshops accessible to Hong Kong teams regardless of language preference. Materials can be provided in English, Traditional Chinese, or bilingual formats.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'What industries does Sam Wong provide AI training for in Hong Kong?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Sam Wong has delivered AI training across banking and finance (Bank of China Hong Kong, HSBC), retail and luxury (Chow Tai Fook, Playmates Toys), engineering (Arup, CLP), education (PolyU, HKCT), tourism (Hong Kong Jockey Club), and professional services. Workshop content is customized to each industry\'s workflows, compliance requirements, and use cases.',
                  },
                },
              ],
            })}
          </script>
        </Helmet>

        <div style={{ textAlign: 'center', margin: '2rem 0' }}>
          <Link
            to="/corporate-ai-training-hong-kong"
            className="button button--outline"
          >
            Corporate AI Training in Hong Kong — Full Guide
          </Link>
        </div>

        <p className="lang-toggle">
          <Link to="/zh/services">&#x4E2D;&#x6587;&#x7248;&#x672C;</Link>
        </p>
      </article>
    </Main>
  );
};

export default Services;
