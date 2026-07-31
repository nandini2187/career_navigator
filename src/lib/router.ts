import { useEffect, useState, useCallback } from 'react';

export interface RouteState {
  path: string;
  query: URLSearchParams;
}

function parseHash(): RouteState {
  const hash = window.location.hash.replace(/^#/, '') || '/';
  const [path, queryString] = hash.split('?');
  return {
    path: path || '/',
    query: new URLSearchParams(queryString || ''),
  };
}

export function useRouter() {
  const [route, setRoute] = useState<RouteState>(parseHash);

  useEffect(() => {
    const onHashChange = () => {
      setRoute(parseHash());
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = useCallback((to: string) => {
    if (window.location.hash === `#${to}`) {
      setRoute(parseHash());
    } else {
      window.location.hash = to;
    }
  }, []);

  return { ...route, navigate };
}

export function navigate(to: string) {
  window.location.hash = to;
}
