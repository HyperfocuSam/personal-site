import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import posts from '../../data/posts';

const RelatedCaseStudies = ({ slugs }) => {
  if (!slugs || slugs.length === 0) {
    return null;
  }

  const related = slugs
    .map((slug) => posts.find((post) => post.slug === slug))
    .filter(Boolean);

  if (related.length === 0) {
    return null;
  }

  return (
    <div className="related-case-studies">
      <h5>See it in action</h5>
      <ul>
        {related.map((post) => (
          <li key={post.slug}>
            <Link to={`/blog/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

RelatedCaseStudies.propTypes = {
  slugs: PropTypes.arrayOf(PropTypes.string),
};

RelatedCaseStudies.defaultProps = {
  slugs: [],
};

export default RelatedCaseStudies;
