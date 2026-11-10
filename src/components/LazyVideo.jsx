import { useEffect, useRef, useState } from 'react';
import { useRouteActive } from '../lib/routeActivity';

export default function LazyVideo({ src, poster, ...props }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const active = useRouteActive();
  useEffect(() => {
    const video = ref.current;
    if (!active) { video.pause(); return; }
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
      if (entry.isIntersecting) setEnabled(true);
    });
    observer.observe(video);
    return () => observer.disconnect();
  }, [active]);
  useEffect(() => {
    if (visible && active) ref.current.play().catch(() => {});
    else ref.current.pause();
  }, [visible, active]);
  return <video {...props} ref={ref} poster={poster} preload="metadata" muted loop playsInline src={enabled ? src : undefined} />;
}
