import React from 'react';
import { Link } from 'react-router-dom';

import Main from '../layouts/Main';

const Index = () => (
  <Main
    description={
      "Sam Wong's personal website. Tech Enthusiast, AI Product Specialist, and a lifelong learner."
      + 'Former Executive Assistant to business owners and Master of Arts in Public History.'
    }
  >
    <article className="post" id="index">
      <header>
        <div className="title">
          <h2>
            <Link to="/">Glad to see you here!</Link>
          </h2>
          <p> I&apos;m SAM. I inspire people exploring in AI and celebrate their individualness.</p>
        </div>
      </header>
      <p>I help 150+ individuals to find their unique path in AI learning journey.</p>
      <p>I teach people how to leverage AI to level up their career and business.</p>
      <p>I share my insights on human-centered AI and how to archive internal development by AI.</p>
      <br />
      <p>Drop me a line if you want to have a chat about AI, or simply anything!</p>
    </article>
  </Main>
);

export default Index;
