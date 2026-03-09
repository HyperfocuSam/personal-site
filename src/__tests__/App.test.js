/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import App from '../App';

describe('renders the app', () => {
  const jsonMock = jest.fn(() => Promise.resolve({}));
  const textMock = jest.fn(() => Promise.resolve(''));
  global.fetch = jest.fn(() => Promise.resolve({
    json: jsonMock,
    text: textMock,
  }));
  window.scrollTo = jest.fn();

  let container;

  beforeEach(async () => {
    container = document.createElement('div');
    document.body.appendChild(container);
    await act(async () => {
      await ReactDOM.createRoot(container).render(<App />);
    });
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
    jest.clearAllMocks();
  });

  it('should render the app', async () => {
    expect(document.body).toBeInTheDocument();
  });

  it('should render the title', async () => {
    expect(document.title).toBe('Sam Wong | AI Training Specialist');
  });

  it('can navigate to /about', async () => {
    expect.assertions(3);
    const aboutLink = document.querySelector(
      '#header nav.links ul li:nth-child(2) a',
    );
    expect(aboutLink).toBeInTheDocument();
    await act(async () => {
      await aboutLink.click();
    });
    expect(document.title).toContain('About |');
    expect(window.location.pathname).toBe('/about');
  });

  it('can navigate to /services', async () => {
    expect.assertions(3);
    const servicesLink = document.querySelector(
      '#header nav.links ul li:nth-child(1) a',
    );
    expect(servicesLink).toBeInTheDocument();
    await act(async () => {
      await servicesLink.click();
    });
    expect(document.title).toContain('Services |');
    expect(window.location.pathname).toBe('/services');
  });

  it('can navigate to /blog', async () => {
    expect.assertions(3);
    const blogLink = document.querySelector(
      '#header nav.links ul li:nth-child(3) a',
    );
    expect(blogLink).toBeInTheDocument();
    await act(async () => {
      await blogLink.click();
    });
    expect(document.title).toContain('Blog |');
    expect(window.location.pathname).toBe('/blog');
  });

  it('can navigate to /clients', async () => {
    expect.assertions(3);
    const clientsLink = document.querySelector(
      '#header nav.links ul li:nth-child(5) a',
    );
    expect(clientsLink).toBeInTheDocument();
    await act(async () => {
      await clientsLink.click();
    });
    expect(document.title).toContain('Clients |');
    expect(window.location.pathname).toBe('/clients');
  });

  it('can navigate to /contact', async () => {
    expect.assertions(3);
    const contactLink = document.querySelector(
      '#header nav.links ul li:nth-child(6) a',
    );
    expect(contactLink).toBeInTheDocument();
    await act(async () => {
      await contactLink.click();
    });
    expect(document.title).toContain('Contact |');
    expect(window.location.pathname).toBe('/contact');
  });
});
