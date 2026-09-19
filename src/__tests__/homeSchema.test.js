/**
 * @jest-environment jsdom
 *
 * /zh shipped with no page-level JSON-LD until 2026-09-18 — the only structured
 * description of Sam a crawler found there was the English Person node in
 * public/index.html. This suite renders the Chinese homepage and reads what
 * actually lands in <head>, so the guard fails if the block is dropped, and
 * checks the English homepage still emits the set it always did.
 */

import '@testing-library/jest-dom';
import React from 'react';
import { cleanup, render, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Index from '../pages/Index';
import ZhIndex from '../pages/ZhIndex';

beforeEach(() => {
  window.scrollTo = jest.fn();
});

afterEach(() => {
  cleanup();
  document.head.innerHTML = '';
});

// react-helmet-async writes to <head> on the next frame, so every read waits
// for the block to land rather than sampling an empty head.
const renderedSchema = async (page) => {
  render(<MemoryRouter>{page}</MemoryRouter>);
  await waitFor(() => {
    expect(document.head.querySelectorAll('script[type="application/ld+json"]').length)
      .toBeGreaterThan(0);
  });
  return [...document.head.querySelectorAll('script[type="application/ld+json"]')]
    .flatMap((script) => {
      const parsed = JSON.parse(script.textContent);
      return Array.isArray(parsed) ? parsed : [parsed];
    });
};

const typeOf = (node) => node['@type'];

describe('the Chinese homepage carries its own JSON-LD', () => {
  it('emits a Person block in Chinese on /zh/', async () => {
    const blocks = await renderedSchema(<ZhIndex />);
    const person = blocks.find((block) => typeOf(block) === 'Person');

    expect(person).toBeDefined();
    expect(person.name).toBe('Sam Wong');
    expect(person.alternateName).toBe('黃力桐');
    // The phrasing ZhAbout.js already shows a reader, from memory_sam_profile.md.
    expect(person.jobTitle).toBe('Adaptig 聯合創辦人兼學院總監');
    expect(person.url).toBe('https://hyperfocusam.com/zh/');
    expect(person.image).toBe('https://hyperfocusam.com/images/sam-portrait-2026-09.webp');
    // Same node as public/index.html and ZhAbout.js's mainEntity, not a second
    // Sam Wong.
    expect(person['@id']).toBe('https://hyperfocusam.com/#person');
    expect(person.sameAs).toContain('https://www.linkedin.com/in/sam-ai-agent/');
    expect(person.sameAs).toHaveLength(5);
  });

  it('emits the same block set as the English homepage, declared zh-Hant', async () => {
    const zhBlocks = await renderedSchema(<ZhIndex />);
    cleanup();
    document.head.innerHTML = '';
    const enBlocks = await renderedSchema(<Index />);

    // FAQPage is excluded on purpose: HomeFAQ mounts only on the English
    // homepage, because /zh/services owns the Chinese FAQPage (ZhIndex.js).
    const pageLevel = (blocks) => blocks.map(typeOf).filter((t) => t !== 'FAQPage').sort();

    expect(pageLevel(zhBlocks)).toEqual(pageLevel(enBlocks));
    expect(pageLevel(zhBlocks)).toEqual(['Person', 'ProfessionalService', 'WebPage']);

    const webPage = zhBlocks.find((block) => typeOf(block) === 'WebPage');
    expect(webPage.inLanguage).toBe('zh-Hant');
    expect(webPage.url).toBe('https://hyperfocusam.com/zh/');
    expect(zhBlocks.find((block) => typeOf(block) === 'ProfessionalService').inLanguage).toBe('zh-Hant');
  });

  it('keeps DotAI off both homepages', async () => {
    // Sam's ruling 2026-08-02, reaffirmed 2026-09-03: DotAI is invisible in EN,
    // and the ZH about page does not name it either.
    const blocks = await renderedSchema(<ZhIndex />);
    expect(blocks.length).toBe(3);
    blocks.forEach((block) => {
      expect(JSON.stringify(block)).not.toMatch(/dotai/i);
    });
  });
});
