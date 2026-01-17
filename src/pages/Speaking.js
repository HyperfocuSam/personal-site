import React from 'react';
import { Link } from 'react-router-dom';

import Main from '../layouts/Main';
import speaking from '../data/speaking';

const Speaking = () => (
  <Main
    title="Speaking & Events"
    description="Book Sam Wong for AI workshops, keynotes, and corporate training. Topics include AI adoption, prompt engineering, and building AI-ready organizations."
  >
    <article className="post" id="speaking">
      <header>
        <div className="title">
          <h2>
            <Link to="/speaking">Speaking & Events</Link>
          </h2>
          <p>Workshops, Keynotes & Training</p>
        </div>
      </header>

      <p>{speaking.intro}</p>

      <h3>Topics I Cover</h3>
      <ul>
        {speaking.topics.map((topic) => (
          <li key={topic.title}>
            <strong>{topic.title}</strong> - {topic.description}
          </li>
        ))}
      </ul>

      <h3>Recent & Ongoing Events</h3>
      {speaking.events.map((event) => (
        <div key={event.title} className="event-item" style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ marginBottom: '0.25rem' }}>{event.title}</h4>
          <p style={{ marginTop: 0 }}>
            <em>{event.organization}</em> | {event.date} | {event.type}
          </p>
          <p>{event.description}</p>
        </div>
      ))}

      <h3>Booking Information</h3>
      <p><strong>Available formats:</strong></p>
      <ul>
        {speaking.availability.formats.map((format) => (
          <li key={format}>{format}</li>
        ))}
      </ul>

      <p><strong>Languages:</strong> {speaking.availability.languages.join(', ')}</p>
      <p><strong>Locations:</strong> {speaking.availability.locations.join(', ')}</p>

      <br />
      <p>
        Interested in having me speak at your event or organization?
        Let us discuss how I can add value to your audience.
      </p>
      <Link to="/contact" className="button">
        Book a Speaking Engagement
      </Link>
    </article>
  </Main>
);

export default Speaking;
