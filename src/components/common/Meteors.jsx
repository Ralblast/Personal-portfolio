import React, { useEffect, useRef } from 'react';
import './Meteors.css';

// Occasional shooting stars across the night sky — dark mode only. Each meteor is a
// short-lived DOM node that animates once (a bright head dragging a tapered tail,
// travelling down-right) then removes itself. Paused while the tab is hidden.
const Meteors = () => {
  const layerRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const root = document.documentElement;
    let timer = 0;
    let alive = true;

    const spawn = () => {
      if (!alive) return;
      const layer = layerRef.current;
      const isDark = root.getAttribute('data-theme') === 'dark';

      if (isDark && !document.hidden && layer) {
        const m = document.createElement('span');
        m.className = 'meteor';
        // start across the upper-left sky so the down-right streak crosses the view
        m.style.left = `${(Math.random() * 70).toFixed(1)}vw`;
        m.style.top = `${(-10 + Math.random() * 30).toFixed(1)}vh`;
        m.style.setProperty('--dur', `${(900 + Math.random() * 700).toFixed(0)}ms`);
        m.style.setProperty('--len', `${(120 + Math.random() * 120).toFixed(0)}px`);
        m.style.setProperty('--travel', `${(480 + Math.random() * 420).toFixed(0)}px`);
        m.addEventListener('animationend', () => m.remove(), { once: true });
        layer.appendChild(m);
      }
      // irregular cadence so it feels natural, not metronomic
      timer = window.setTimeout(spawn, 2600 + Math.random() * 5000);
    };

    timer = window.setTimeout(spawn, 1600);
    return () => {
      alive = false;
      window.clearTimeout(timer);
    };
  }, []);

  return <div ref={layerRef} className="meteor-layer" aria-hidden="true" />;
};

export default Meteors;
