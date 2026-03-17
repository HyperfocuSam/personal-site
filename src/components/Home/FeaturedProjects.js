import React from 'react';
import { Link } from 'react-router-dom';

import projects from '../../data/projects';

const FeaturedProjects = () => {
  const featured = projects.filter((p) => p.featured);

  return (
    <section className="home-projects">
      <header className="home-projects__header">
        <h3>What I&rsquo;ve Built</h3>
        <p>Shipped products, not just slide decks.</p>
      </header>
      <div className="home-projects__grid">
        {featured.map((project) => (
          <a
            key={project.title}
            href={project.link}
            className="home-projects__card"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="home-projects__title-row">
              <h4>{project.title}</h4>
              {project.status === 'live' && (
                <span className="home-projects__status">
                  <span className="home-projects__status-dot" />
                  LIVE
                </span>
              )}
            </div>
            <span className="home-projects__url">{project.url}</span>
          </a>
        ))}
      </div>
      <p className="home-projects__all">
        <Link to="/projects">See all projects &rarr;</Link>
      </p>
    </section>
  );
};

export default FeaturedProjects;
