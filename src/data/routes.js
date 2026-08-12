// /book is deliberately NOT here. The header already carries a "Book a Call"
// button (Navigation.js); listing it in the nav as well asked for the same
// action twice within the first 400px, competing with itself.
const routes = [
  {
    index: true,
    label: 'SAM WONG',
    path: '/',
  },
  {
    label: 'Services',
    path: '/services',
  },
  {
    label: 'About',
    path: '/about',
  },
  {
    label: 'Case Notes',
    path: '/case-notes',
  },
  {
    label: 'Blog',
    path: '/blog',
  },
  {
    label: 'Contact',
    path: '/contact',
  },
];

export default routes;
