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

const groups = [
  {
    id: 'organizations',
    category: 'organizations',
    title: 'For Organizations',
    subtitle: 'Workshops, training, and events that move teams from interest to real adoption.',
    socialProof:
      'BOCHK, Chow Tai Fook, Garden, Playmates Toys, HSBC, CLP, YPO.',
    testimonial: testimonials[0],
  },
  {
    id: 'one-on-one',
    category: 'individuals',
    title: 'For Individuals',
    subtitle: 'Personalized coaching for professionals building practical AI habits.',
    socialProof: '160+ professionals coached across finance, marketing, education, healthcare, and technology.',
    testimonial: testimonials[1],
  },
  {
    id: 'train-the-trainer',
    category: 'trainers',
    title: 'For Trainers',
    subtitle: 'Recruitment path for facilitators who want to teach practical AI.',
    socialProof:
      'Join a global network across North America, Latin America, Europe, and Asia-Pacific.',
    testimonial: testimonials[2],
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
      description="Corporate AI training and workshops in Hong Kong. Sam Wong delivers enterprise AI workshops, prompt engineering training, 1-1 coaching, and Train-the-Trainer certification through Adaptig. Available in English and Cantonese."
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
              <h1>
                <Link to="/services">AI Training &amp; Workshop Services</Link>
              </h1>
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
              <Link to="/book" className="button">
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
                    text: 'Sam Wong offers corporate AI workshops through Adaptig, multi-session AI Pioneer Programs for cohort-based learning, 1-1 AI coaching for professionals, Train-the-Trainer certification programs, and keynotes and event sessions. Services are available for organizations, individuals, and aspiring AI trainers.',
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

        <p className="services-footer-link">
          <Link to="/corporate-ai-training-hong-kong">
            Corporate AI Training in Hong Kong — Full Guide →
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
