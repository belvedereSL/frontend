import { prefetchImage } from './optimizedMedia';

const loaders = {
  '/about': () => import('../pages/About'),
  '/services': () => import('../pages/Services'),
  '/news': () => import('../pages/News'),
  '/portfolio': () => import('../pages/Portfolio'),
  '/contact': () => import('../pages/Contact'),
};
const serviceImages = import.meta.glob('../assets/Services/*.{jpg,jpeg,png,avif}', { query: '?url', import: 'default' });
const pending = new Set();
export function prefetchRoute(path) {
  if (navigator.connection?.saveData || pending.has(path)) return;
  pending.add(path);
  loaders[path]?.().catch(() => pending.delete(path));
  if (path === '/about') prefetchImage('/videos/about-poster.webp');
  if (path === '/services') {
    Object.values(serviceImages).slice(0, 3).forEach(load => {
      load().then(prefetchImage).catch(() => {});
    });
  }
  if (path === '/news' || path === '/portfolio') {
    import('./contentCache').then(({ loadEntries }) => loadEntries(path === '/news' ? 'newsPost' : 'portfolioProject'))
      .then(res => res.items.slice(0, 3).forEach(entry => {
        const url = entry.fields.coverImage?.fields?.file?.url;
        if (url) prefetchImage(url.startsWith('//') ? `https:${url}` : url);
      })).catch(() => pending.delete(path));
  }
}
