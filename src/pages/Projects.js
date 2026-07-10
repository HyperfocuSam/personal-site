import React from 'react';
import { Link } from 'react-router-dom';

import { Helmet } from 'react-helmet-async';

import Main from '../layouts/Main';
import ScrollReveal from '../components/ScrollReveal';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../data/seo';

import Cell from '../components/Projects/Cell';
import data from '../data/projects';

const Projects = () => (
  <Main
    title="Projects"
    description="Shipped products with live URLs by Sam Wong — AI platforms, developer tools, and creative pipelines."
    canonicalUrl={`${SITE_URL}/projects`}
    ogTitle="Projects | Sam Wong"
    ogDescription="Shipped products with live URLs by Sam Wong — AI platforms, developer tools, and creative pipelines."
    ogImage={DEFAULT_OG_IMAGE}
    ogUrl={`${SITE_URL}/projects`}
    ogType="website"
    twitterTitle="Projects | Sam Wong"
    twitterDescription="Shipped products with live URLs — AI platforms, developer tools, and creative pipelines."
    twitterImage={DEFAULT_OG_IMAGE}
    hreflangTags={[
      { lang: 'en', href: `${SITE_URL}/projects` },
      { lang: 'x-default', href: `${SITE_URL}/projects` },
    ]}
  >
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Projects | Sam Wong',
          url: `${SITE_URL}/projects`,
          description: 'Shipped products with live URLs by Sam Wong — AI platforms, developer tools, and creative pipelines.',
          author: { '@type': 'Person', name: 'Sam Wong' },
        })}
      </script>
    </Helmet>
    <article className="post" id="projects">
      {/* Dark hero */}
      <header className="page-hero">
        <div className="content-standard">
          <div className="title">
            <h1>
              <Link to="/projects">Projects</Link>
            </h1>
            <p>Shipped products with live URLs.</p>
          </div>
        </div>
      </header>
      <section className="section-base section-padding">
        <div className="content-wide">
          <ScrollReveal variant="fade-up-long" stagger={120}>
            <div className="project-grid">
              {data.map((project) => (
                <Cell data={project} key={project.title} />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </article>
  </Main>
);

export default Projects;
