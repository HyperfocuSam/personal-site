import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const PageNotFound = () => (
  <HelmetProvider>
    <div className="not-found field-notes-content">
      <Helmet title="404 Not Found">
        <meta name="robots" content="noindex" />
        <meta
          name="description"
          content="The content you are looking for cannot be found."
        />
      </Helmet>
      <h1 className="fn-stamp">Page Not Found</h1>
      <p>
        Return <Link to="/">home</Link>.
      </p>
    </div>
  </HelmetProvider>
);

export default PageNotFound;
