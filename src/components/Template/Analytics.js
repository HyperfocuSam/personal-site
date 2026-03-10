import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Analytics = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_path: pathname,
      });
    }
  }, [pathname]);

  return null;
};

export default Analytics;
