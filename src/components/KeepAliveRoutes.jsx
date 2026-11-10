import { useState, Suspense } from 'react';
import { Routes, useLocation } from 'react-router-dom';
import { RouteActivity } from '../lib/routeActivity';

export default function KeepAliveRoutes({ children }) {
  const location = useLocation();
  const [visited, setVisited] = useState(() => [location]);
  if (!visited.some(route => route.pathname === location.pathname)) {
    setVisited([...visited, location]);
  }
  return visited.map(route => {
    const active = route.pathname === location.pathname;
    return (
      <div key={route.pathname} data-route-active={active} style={{ display: active ? 'contents' : 'none' }}>
        <RouteActivity.Provider value={active}>
          <Suspense fallback={<div role="status" style={{ minHeight: '70vh', padding: '8rem 5%' }}>Loading…</div>}>
            <Routes location={active ? location : route}>{children}</Routes>
          </Suspense>
        </RouteActivity.Provider>
      </div>
    );
  });
}
