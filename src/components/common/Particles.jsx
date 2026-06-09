import React, { useEffect, useRef } from 'react';
import 'particles.js';
import './Particles.css';

// How far (px) the star layer drifts across a full-page scroll. Kept in sync with
// the container's overscan height in Particles.css so edges never reveal a gap.
const PARALLAX_SHIFT = 110;

// particles.js v2 ships an Object.deepExtend that recurses via `arguments.callee`,
// which is illegal in strict mode — and Vite bundles the dep as a strict ESM, so
// every particlesJS() call throws. The library looks it up by name at call time,
// so we swap in a strict-safe, name-recursive equivalent.
if (typeof Object.deepExtend === 'function') {
  Object.deepExtend = function deepExtend(destination, source) {
    for (const property in source) {
      if (
        source[property] &&
        source[property].constructor &&
        source[property].constructor === Object
      ) {
        destination[property] = destination[property] || {};
        deepExtend(destination[property], source[property]);
      } else {
        destination[property] = source[property];
      }
    }
    return destination;
  };
}

const CONTAINER_ID = 'particles-bg';

// Dark mode: a precise night sky — sparse white stars of varied brightness that
// drift slowly and twinkle (opacity animation), with no connecting lines, the way
// a real sky looks. The pull-cord lamp + cursor spotlight then "light" this room.
const NIGHT_SKY = {
  particles: {
    number: { value: 117, density: { enable: true, value_area: 900 } },
    color: { value: '#ffffff' },
    shape: { type: 'circle', stroke: { width: 0, color: '#000000' } },
    opacity: {
      value: 0.7,
      random: true,
      anim: { enable: true, speed: 0.8, opacity_min: 0.1, sync: false },
    },
    size: {
      value: 1.8,
      random: true,
      anim: { enable: true, speed: 2, size_min: 0.3, sync: false },
    },
    // disabled, but the engine still reads color at init — must be a valid hex
    line_linked: { enable: false, distance: 150, color: '#ffffff', opacity: 0, width: 1 },
    move: {
      enable: true,
      speed: 0.945,
      direction: 'none',
      random: true,
      straight: false,
      out_mode: 'out',
      bounce: false,
    },
  },
  // Listen on the whole window (not just the canvas, which is pointer-events:none),
  // so hovering weaves constellation lines to nearby stars and clicking spawns more.
  interactivity: {
    detect_on: 'window',
    events: {
      onhover: { enable: true, mode: 'grab' },
      onclick: { enable: true, mode: 'push' },
      resize: true,
    },
    modes: {
      grab: { distance: 180, line_linked: { opacity: 0.5 } },
      push: { particles_nb: 4 },
    },
  },
  retina_detect: true,
};

// Light mode: the same drifting field, dialed right down — soft muted specks with a
// faint connecting web, so it reads as gentle daytime texture and never fights text.
const DAYTIME = {
  particles: {
    number: { value: 103, density: { enable: true, value_area: 900 } },
    color: { value: '#64748b' },
    shape: { type: 'circle', stroke: { width: 0, color: '#000000' } },
    opacity: {
      value: 0.55,
      random: true,
      anim: { enable: true, speed: 0.6, opacity_min: 0.15, sync: false },
    },
    size: { value: 2.5, random: true, anim: { enable: false } },
    line_linked: { enable: true, distance: 150, color: '#94a3b8', opacity: 0.35, width: 1 },
    move: {
      enable: true,
      speed: 0.9,
      direction: 'none',
      random: false,
      straight: false,
      out_mode: 'out',
      bounce: false,
    },
  },
  // Same window-level interactivity: hover weaves connecting lines toward the
  // cursor (the field has lines in light mode), click spawns new specks.
  interactivity: {
    detect_on: 'window',
    events: {
      onhover: { enable: true, mode: 'grab' },
      onclick: { enable: true, mode: 'push' },
      resize: true,
    },
    modes: {
      grab: { distance: 160, line_linked: { opacity: 0.5 } },
      push: { particles_nb: 4 },
    },
  },
  retina_detect: true,
};

// A fixed, full-viewport particle field rendered behind all content. It re-themes
// itself whenever the user flips light/dark. Runs on every system.
const Particles = () => {
  const containerRef = useRef(null);

  // Parallax: drift the whole star layer a little as the page scrolls, so the sky
  // sits "behind" the content and reads with depth. Bounded by scroll progress so
  // it can never expose the canvas edges. rAF-throttled; no React re-renders.
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const el = containerRef.current;
    if (!el) return undefined;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
        el.style.transform = `translate3d(0, ${(-progress * PARALLAX_SHIFT).toFixed(1)}px, 0)`;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const root = document.documentElement;

    const destroy = () => {
      if (!window.pJSDom || !window.pJSDom.length) return;
      window.pJSDom.forEach((dom) => {
        try {
          dom.pJS.fn.vendors.destroypJS();
        } catch {
          /* canvas already gone */
        }
      });
      window.pJSDom = [];
    };

    const build = () => {
      destroy();
      const isDark = root.getAttribute('data-theme') === 'dark';
      window.particlesJS(CONTAINER_ID, isDark ? NIGHT_SKY : DAYTIME);
    };

    build();

    const observer = new MutationObserver((mutations) => {
      if (mutations.some((m) => m.attributeName === 'data-theme')) build();
    });
    observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] });

    return () => {
      observer.disconnect();
      destroy();
    };
  }, []);

  return (
    <>
      <div id={CONTAINER_ID} ref={containerRef} className="particles-bg" aria-hidden="true" />
      {/* dark-mode vignette: stars near the lamp stay bright, far corners fall to dark */}
      <div className="sky-falloff" aria-hidden="true" />
    </>
  );
};

export default Particles;
