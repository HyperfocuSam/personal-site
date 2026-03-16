import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './layouts/Main'; // fallback for lazy pages
import './static/css/main.scss'; // All of our styles

const { PUBLIC_URL } = process.env;

// Every route - we lazy load so that each page can be chunked
const About = lazy(() => import('./pages/About'));
const CorporateTraining = lazy(() => import('./pages/CorporateTraining'));
const Blog = lazy(() => import('./pages/Blog'));
const Clients = lazy(() => import('./pages/Clients'));
const Contact = lazy(() => import('./pages/Contact'));
const Index = lazy(() => import('./pages/Index'));
const Media = lazy(() => import('./pages/Media'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Post = lazy(() => import('./pages/Post'));
const Projects = lazy(() => import('./pages/Projects'));
const Resume = lazy(() => import('./pages/Resume'));
const Services = lazy(() => import('./pages/Services'));
const Stats = lazy(() => import('./pages/Stats'));
const Speaking = lazy(() => import('./pages/Speaking'));
const Testimonials = lazy(() => import('./pages/Testimonials'));

// Chinese (Traditional) pages
const ZhIndex = lazy(() => import('./pages/ZhIndex'));
const ZhAbout = lazy(() => import('./pages/ZhAbout'));
const ZhBlog = lazy(() => import('./pages/ZhBlog'));
const ZhMedia = lazy(() => import('./pages/ZhMedia'));
const ZhServices = lazy(() => import('./pages/ZhServices'));
const ZhCorporateTraining = lazy(() => import('./pages/ZhCorporateTraining'));

// Media Kit (designed HTML version)
const MediaKit = lazy(() => import('./pages/MediaKit'));

const App = () => (
  <BrowserRouter basename={PUBLIC_URL}>
    <Suspense fallback={<Main />}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<Post />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/corporate-ai-training-hong-kong" element={<CorporateTraining />} />
        <Route path="/media/kit" element={<MediaKit />} />
        <Route path="/media" element={<Media />} />
        <Route path="/zh" element={<ZhIndex />} />
        <Route path="/zh/about" element={<ZhAbout />} />
        <Route path="/zh/blog" element={<ZhBlog />} />
        <Route path="/zh/media" element={<ZhMedia />} />
        <Route path="/zh/services" element={<ZhServices />} />
        <Route path="/zh/corporate-ai-training-hong-kong" element={<ZhCorporateTraining />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/services" element={<Services />} />
        <Route path="/speaking" element={<Speaking />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default App;
