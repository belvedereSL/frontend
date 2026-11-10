import { useState } from 'react';
import { imageSources } from '../lib/optimizedMedia';

export default function OptimizedImage({ src, alt = '', width, height, sizes = '(max-width: 700px) 100vw, 50vw', style, onLoad, onError, ...props }) {
  const [loadedSrc, setLoadedSrc] = useState(null);
  const [failedSrc, setFailedSrc] = useState(null);
  const image = imageSources(src);
  return (
    <picture style={{ display: 'contents' }}>
      {failedSrc !== src && <source type="image/webp" srcSet={image.srcSet} sizes={sizes} />}
      <img {...props} src={failedSrc === src ? src : image.fallback} alt={alt}
        width={width || image.width} height={height || image.height}
        loading="lazy" decoding="async"
        style={{ backgroundImage: loadedSrc === src ? undefined : `url("${image.placeholder}")`, backgroundSize: 'cover', backgroundPosition: 'center', ...style }}
        onLoad={event => { setLoadedSrc(src); onLoad?.(event); }}
        onError={event => { setFailedSrc(src); onError?.(event); }} />
    </picture>
  );
}
