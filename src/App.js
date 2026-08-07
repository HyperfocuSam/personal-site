import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './layouts/Main'; // fallback for lazy pages
import './static/css/main.scss'; // All of our styles

const { PUBLIC_URL } = process.env;

// lazyRoute: React.lazy plus a .preload() used before hydration (src/index.js).
// Without it, the first render of a not-yet-loaded chunk suspends, React swaps
// in the Suspense fallback, and hydration of the react-snap HTML fails on every
// route (React #418/#423 → full client re-render). Once preloaded, the page
// renders synchronously so the baked HTML hydrates cleanly. Client-side
// navigation still uses the normal lazy/Suspense path.
const lazyRoute = (importFn) => {
  let Loaded = null;
  const LazyInner = lazy(importFn);
  const Wrapper = (props) => (
    Loaded
      // eslint-disable-next-line react/jsx-props-no-spreading
      ? <Loaded {...props} />
      // eslint-disable-next-line react/jsx-props-no-spreading
      : <LazyInner {...props} />
  );
  Wrapper.displayName = 'LazyRoute';
  Wrapper.preload = () => importFn().then((m) => { Loaded = m.default; });
  return Wrapper;
};

// Every route - we lazy load so that each page can be chunked
const About = lazyRoute(() => import('./pages/About'));
const CorporateTraining = lazyRoute(() => import('./pages/CorporateTraining'));
const TrainTheTrainer = lazyRoute(() => import('./pages/TrainTheTrainer'));
const Blog = lazyRoute(() => import('./pages/Blog'));
const CaseNotes = lazyRoute(() => import('./pages/CaseNotes'));
const Clients = lazyRoute(() => import('./pages/Clients'));
const Contact = lazyRoute(() => import('./pages/Contact'));
const Index = lazyRoute(() => import('./pages/Index'));
const Media = lazyRoute(() => import('./pages/Media'));
const NotFound = lazyRoute(() => import('./pages/NotFound'));
const Post = lazyRoute(() => import('./pages/Post'));
const Projects = lazyRoute(() => import('./pages/Projects'));
const Resume = lazyRoute(() => import('./pages/Resume'));
const Services = lazyRoute(() => import('./pages/Services'));
const Speaking = lazyRoute(() => import('./pages/Speaking'));
const Testimonials = lazyRoute(() => import('./pages/Testimonials'));

// Chinese (Traditional) pages
const ZhIndex = lazyRoute(() => import('./pages/ZhIndex'));
const ZhAbout = lazyRoute(() => import('./pages/ZhAbout'));
const ZhBlog = lazyRoute(() => import('./pages/ZhBlog'));
const ZhMedia = lazyRoute(() => import('./pages/ZhMedia'));
const ZhServices = lazyRoute(() => import('./pages/ZhServices'));
const ZhCorporateTraining = lazyRoute(() => import('./pages/ZhCorporateTraining'));

// Media Kit (designed HTML version)
const MediaKit = lazyRoute(() => import('./pages/MediaKit'));

// Booking page (Ro.am lobby embed)
const Book = lazyRoute(() => import('./pages/Book'));

// Landing page for paid traffic (no nav)
const GetStarted = lazyRoute(() => import('./pages/GetStarted'));

// Path → route component, mirroring the <Routes> table below. Used only for
// pre-hydration chunk preloading; keep in sync when adding routes.
const exactRoutes = {
  '/': Index,
  '/about': About,
  '/blog': Blog,
  '/case-notes': CaseNotes,
  '/clients': Clients,
  '/book': Book,
  '/contact': Contact,
  '/corporate-ai-training-hong-kong': CorporateTraining,
  '/ai-train-the-trainer-hong-kong': TrainTheTrainer,
  '/get-started': GetStarted,
  '/media/kit': MediaKit,
  '/media': Media,
  '/zh': ZhIndex,
  '/zh/about': ZhAbout,
  '/zh/blog': ZhBlog,
  '/zh/media': ZhMedia,
  '/zh/services': ZhServices,
  '/zh/corporate-ai-training-hong-kong': ZhCorporateTraining,
  '/projects': Projects,
  '/resume': Resume,
  '/services': Services,
  '/speaking': Speaking,
  '/testimonials': Testimonials,
};

export const preloadRouteChunk = (rawPathname) => {
  let path = rawPathname || '/';
  if (PUBLIC_URL && path.startsWith(PUBLIC_URL)) path = path.slice(PUBLIC_URL.length) || '/';
  if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1);
  let component = exactRoutes[path];
  if (!component) component = path.startsWith('/blog/') ? Post : NotFound;
  return component.preload();
};

const App = () => (
  <BrowserRouter basename={PUBLIC_URL}>
    <Suspense fallback={<Main />}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<Post />} />
        <Route path="/case-notes" element={<CaseNotes />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/book" element={<Book />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/corporate-ai-training-hong-kong" element={<CorporateTraining />} />
        <Route path="/ai-train-the-trainer-hong-kong" element={<TrainTheTrainer />} />
        <Route path="/get-started" element={<GetStarted />} />
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
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default App;
