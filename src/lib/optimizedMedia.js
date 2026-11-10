import manifest from './imageManifest';

export function imageUrl(src, width, format = 'webp') {
  if (!src || src.startsWith('data:') || src.startsWith('/videos/')) return src;
  const local = manifest[src];
  if (local) {
    if (format === 'jpg') return local.fallback;
    return (local.variants.find(variant => variant.width >= width) || local.variants.at(-1)).src;
  }
  const url = new URL(src, window.location.origin);
  if (url.hostname.endsWith('.ctfassets.net')) {
    url.searchParams.set('w', width);
    url.searchParams.set('q', '70');
    url.searchParams.set('fm', format);
    return url.href;
  }
  if (url.origin === window.location.origin || url.hostname === 'images.unsplash.com') {
    return `/.netlify/images?${new URLSearchParams({ url: src, w: String(width), q: '70', fm: format })}`;
  }
  return src;
}

export function imageSources(src) {
  const local = manifest[src];
  return {
    width: local?.width || 1200,
    height: local?.height || 800,
    placeholder: local?.placeholder || imageUrl(src, 10),
    fallback: local?.fallback || imageUrl(src, 1200, 'jpg'),
    srcSet: local ? local.variants.map(v => `${v.src} ${v.width}w`).join(', ') :
      [320, 640, 960, 1200].map(width => `${imageUrl(src, width)} ${width}w`).join(', '),
  };
}

const prefetched = new Set();
export function prefetchImage(src) {
  if (!src || prefetched.has(src)) return;
  prefetched.add(src);
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.as = 'image';
  link.href = imageUrl(src, 960);
  document.head.append(link);
}
