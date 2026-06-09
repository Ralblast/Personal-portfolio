import React, { useEffect, useState } from 'react';
import './Intro.css';

// "Lights on" intro: dark room -> a cord drops and the bulb clicks on -> the page
// fades up. Shows once per browser session; click/key/scroll skips it.
const Intro = () => {
  const [done, setDone] = useState(() => {
    if (typeof window === 'undefined') return true;
    if (sessionStorage.getItem('introSeen')) return true;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;
    return false;
  });

  useEffect(() => {
    if (done) return;
    sessionStorage.setItem('introSeen', '1');
    const finish = () => setDone(true);
    const timer = window.setTimeout(finish, 2300);
    window.addEventListener('keydown', finish, { once: true });
    window.addEventListener('wheel', finish, { once: true, passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', finish);
      window.removeEventListener('wheel', finish);
    };
  }, [done]);

  if (done) return null;

  return (
    <div className="intro" onClick={() => setDone(true)} role="button" aria-label="Skip intro" tabIndex={-1}>
      <div className="intro-stage">
        <span className="intro-cord" />
        <span className="intro-bulb" />
      </div>
      <span className="intro-hint">click to skip</span>
    </div>
  );
};

export default Intro;
