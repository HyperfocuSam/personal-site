import React from 'react';
import { Link } from 'react-router-dom';

import Main from '../layouts/Main';
import { SITE_URL, DEFAULT_OG_IMAGE } from '../data/seo';

import Cell from '../components/Projects/Cell';
import data from '../data/projects';

const Projects = () => (
  <Main
    title="Projects"
    description="Projects and ventures by Sam Wong across AI adoption, coaching, and product development."
    canonicalUrl={`${SITE_URL}/projects`}
    ogTitle="Projects | Sam Wong"
    ogDescription="Projects and ventures by Sam Wong across AI adoption, coaching, and product development."
    ogImage={DEFAULT_OG_IMAGE}
    ogUrl={`${SITE_URL}/projects`}
    ogType="website"
    twitterTitle="Projects | Sam Wong"
    twitterDescription="Projects and ventures across AI adoption, coaching, and product development."
    twitterImage={DEFAULT_OG_IMAGE}
  >
    <article className="post" id="projects">
      <header>
        <div className="title">
          <h2>
            <Link to="/projects">Projects</Link>
          </h2>
          <p>Projects are all about making an impact.</p>
        </div>
      </header>
      {data.map((project) => (
        <Cell data={project} key={project.title} />
      ))}
    </article>
  </Main>
);

export default Projects;
