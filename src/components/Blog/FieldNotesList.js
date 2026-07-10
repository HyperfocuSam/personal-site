import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const groupPostsByYear = (sourcePosts) => sourcePosts.reduce((groups, post) => {
  const year = post.date.slice(0, 4);
  const currentGroup = groups[groups.length - 1];

  if (!currentGroup || currentGroup.year !== year) {
    groups.push({ year, posts: [post] });
  } else {
    currentGroup.posts.push(post);
  }

  return groups;
}, []);

const FieldNotesList = ({
  posts, typeLabels, entryLabel, singleEntryLabel,
}) => {
  const yearGroups = groupPostsByYear(posts);

  return (
    <div className="blog-log">
      {yearGroups.map(({ year, posts: yearPosts }) => (
        <section className="blog-year" key={year}>
          <header className="blog-year__header">
            <h2 className="blog-year__title">{year}</h2>
            <span className="blog-year__separator" aria-hidden="true">·</span>
            <span className="blog-year__count fn-stamp">
              {`${yearPosts.length} ${yearPosts.length === 1 ? singleEntryLabel : entryLabel}`}
            </span>
          </header>
          <div className="blog-year__entries">
            {yearPosts.map((post) => (
              <article className="blog-entry" key={post.slug}>
                <div className="blog-entry__meta">
                  <time className="blog-entry__date fn-stamp" dateTime={post.date}>
                    {post.date}
                  </time>
                  <span className="blog-entry__type fn-stamp">
                    {typeLabels[post.type] || post.type}
                  </span>
                </div>
                <Link to={`/blog/${post.slug}`} className="blog-entry__link">
                  <h3 className="blog-entry__title">{post.title}</h3>
                  <p className="blog-entry__excerpt">{post.excerpt}</p>
                </Link>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

FieldNotesList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      excerpt: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }),
  ).isRequired,
  typeLabels: PropTypes.objectOf(PropTypes.string).isRequired,
  entryLabel: PropTypes.string.isRequired,
  singleEntryLabel: PropTypes.string.isRequired,
};

export default FieldNotesList;
