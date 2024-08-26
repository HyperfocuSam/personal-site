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
            <Link to="/">HELLO THERE! THIS IS SAM</Link>
          </h2>
          <p>Welcome to my website. Please feel free to read more about me.</p>
        </div>
      </header>
      <p>I am currently running a solo project, Project FORDII.</p>
      <p>Advised 150+ individuals to find their unique path in AI learning journey.</p>
      <p>Email me if you want to have a chat about AI, or just want to say hi!</p>
    </article>
  </Main>
);

export default Index;
