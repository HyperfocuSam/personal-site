import React from 'react';
import { Link } from 'react-router-dom';

import { Helmet } from 'react-helmet-async';

import Main from '../layouts/Main';
import ScrollReveal from '../components/ScrollReveal';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../data/seo';

import Education from '../components/Resume/Education';
import Experience from '../components/Resume/Experience';
import Skills from '../components/Resume/Skills';
import Courses from '../components/Resume/Courses';
import References from '../components/Resume/References';

import courses from '../data/resume/courses';
import degrees from '../data/resume/degrees';
import work from '../data/resume/work';
import { skills, categories } from '../data/resume/skills';

// NOTE: sections are displayed in order defined.
const sections = {
  Education: () => <Education data={degrees} />,
  Experience: () => <Experience data={work} />,
  Skills: () => <Skills skills={skills} categories={categories} />,
  Courses: () => <Courses data={courses} />,
  References: () => <References />,
};

const Resume = () => (
  <Main
    title="Resume"
    description="Resume and background of Sam Wong, focused on AI training, transformation, and human-centered adoption."
    canonicalUrl={`${SITE_URL}/resume`}
    ogTitle="Resume | Sam Wong"
    ogDescription="Resume and background of Sam Wong, focused on AI training, transformation, and human-centered adoption."
    ogImage={DEFAULT_OG_IMAGE}
    ogUrl={`${SITE_URL}/resume`}
    ogType="website"
    twitterTitle="Resume | Sam Wong"
    twitterDescription="Resume and background of Sam Wong, focused on AI training and human-centered adoption."
    twitterImage={DEFAULT_OG_IMAGE}
    hreflangTags={[
      { lang: 'en', href: `${SITE_URL}/resume` },
      { lang: 'x-default', href: `${SITE_URL}/resume` },
    ]}
  >
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ProfilePage',
          name: 'Resume | Sam Wong',
          url: `${SITE_URL}/resume`,
          mainEntity: {
            '@type': 'Person',
            name: 'Sam Wong',
            jobTitle: 'AI Training Specialist',
            worksFor: [
              { '@type': 'Organization', name: 'Adaptig', url: 'https://adaptig.ai' },
            ],
            alumniOf: { '@type': 'CollegeOrUniversity', name: 'Chinese University of Hong Kong' },
            knowsAbout: ['AI Training', 'Corporate Workshops', 'Prompt Engineering', 'AI Adoption'],
          },
        })}
      </script>
    </Helmet>
    <article className="post" id="resume">
      {/* Dark hero */}
      <header className="page-hero">
        <div className="content-standard">
          <div className="title">
            <h1>
              <Link to="/resume">Resume</Link>
            </h1>
          </div>
          <div className="services-anchor-pills">
            {Object.keys(sections).map((sec) => (
              <a key={sec} href={`#${sec.toLowerCase()}`} className="anchor-pill">
                {sec}
              </a>
            ))}
          </div>
        </div>
      </header>
      <section className="section-base section-padding">
        <div className="content-standard">
          {Object.entries(sections).map(([name, Section]) => (
            <ScrollReveal key={name} variant="fade-up" stagger={100}>
              <Section />
            </ScrollReveal>
          ))}
        </div>
      </section>
    </article>
  </Main>
);

export default Resume;
