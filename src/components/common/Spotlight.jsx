import React, { useEffect, useRef } from 'react';
import './Spotlight.css';

// A soft pool of warm light that follows the cursor in dark mode, like exploring
// a dark room by lamplight. Updates via a ref (no React re-renders) for smoothness.
const Spotlight = () => {
  const ref = useRef(null);
  const target = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    let raf;
    const onMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
    };
    const render = () => {
      raf = requestAnimationFrame(render);
      const el = ref.current;
      if (!el) return;
      if (document.documentElement.getAttribute('data-theme') !== 'dark') return;
      el.style.background = `radial-gradient(circle 240px at ${target.current.x}px ${target.current.y}px, rgba(255,214,150,0.14), rgba(255,200,120,0.05) 45%, transparent 70%)`;
    };
    window.addEventListener('pointermove', onMove);
    raf = requestAnimationFrame(render);
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className="cursor-spotlight" aria-hidden="true" />;
};

export default Spotlight;
