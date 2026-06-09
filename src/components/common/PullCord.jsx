import React, { useEffect, useRef, useState } from 'react';
import './PullCord.css';

// thread geometry, in the svg's own coordinate space
const W = 170;
const SVG_H = 320;
const ANCHOR_X = 135;
const REST_LEN = 76;
const MAX_LEN = 210;    // how far you can yank it down
const CAP_TOP = 16;
const THRESHOLD = 46;
const CLICK_SLOP = 6;

// motion feel (all tunable)
const G = 0.18;          // gravity -> swing speed (lower = slower swing)
const ANG_DAMP = 0.996;  // angular damping per 60fps-frame (higher = swings longer)
const RISE_MS = 5000;    // how long the cord takes to ease back up (fixed, time-based)
const SWING_AMP = 0.5;   // swing size scales with pull...
const SWING_FLOOR = 0.18;// ...plus this floor

// ease-in-out cubic: starts AND ends at zero speed -> no lurch when it releases
const easeInOut = (p) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);

const clamp = (v, m) => Math.max(-m, Math.min(m, v));

const RAYS = [16, 52, 90, 128, 164].map((deg) => {
  const a = (deg * Math.PI) / 180;
  return {
    x1: +(13 * Math.cos(a)).toFixed(2),
    y1: +(13 * Math.sin(a)).toFixed(2),
    x2: +(21 * Math.cos(a)).toFixed(2),
    y2: +(21 * Math.sin(a)).toFixed(2),
  };
});

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

const PullCord = () => {
  const [theme, setTheme] = useState(() =>
    typeof window === 'undefined' ? 'dark' : localStorage.getItem('theme') || 'dark'
  );
  const [pos, setPos] = useState({ x: ANCHOR_X, y: REST_LEN });
  const [dragging, setDragging] = useState(false);
  const [origin, setOrigin] = useState({ left: 0, top: 0 });

  // sim state lives in refs so the animation loop is decoupled from React renders
  const sim = useRef({ theta: 0, omega: 0, len: REST_LEN });
  const rise = useRef({ active: false, fromLen: REST_LEN, startT: null }); // length tween
  const bulbRef = useRef({ x: ANCHOR_X, y: REST_LEN });
  const velRef = useRef({ x: 0, y: 0 });
  const svgRef = useRef(null);
  const rectRef = useRef(null);
  const grabOffset = useRef({ x: 0, y: 0 });
  const draggingRef = useRef(false);
  const peakStretch = useRef(0);
  const peakDisp = useRef(0);
  const discoTimer = useRef(null);
  const lastActiveRef = useRef(0);
  const endDragRef = useRef(() => {});

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'light' ? 'dark' : 'light'));

  // ONE persistent loop for the whole life of the component, so a theme change
  // (or any re-render) can never orphan it -> it can never freeze.
  useEffect(() => {
    let raf;
    let lastT = null;
    const loop = (t) => {
      raf = requestAnimationFrame(loop);
      const s = sim.current;
      const r = rise.current;

      // idle: fully at rest and not interacting -> skip everything (no renders)
      if (!draggingRef.current && !r.active && s.omega === 0 && s.theta === 0 && s.len === REST_LEN) {
        lastT = t;
        return;
      }

      if (lastT == null) lastT = t;
      let dt = (t - lastT) / 16.667;
      lastT = t;
      if (dt > 3) dt = 3;
      if (dt <= 0) dt = 1;

      // watchdog: a drag with no activity for too long means the release was
      // missed -> force-release so the bulb can never stay stuck
      if (draggingRef.current && lastActiveRef.current && t - lastActiveRef.current > 4000) {
        endDragRef.current();
      }

      if (!draggingRef.current) {
        // swing: damped pendulum about the anchor
        const angAcc = -(G / Math.max(s.len, 1)) * Math.sin(s.theta);
        s.omega = (s.omega + angAcc * dt) * Math.pow(ANG_DAMP, dt);
        s.theta += s.omega * dt;

        // rise: fixed-duration, ease-in-out tween of the cord length back to rest
        if (r.active) {
          if (r.startT == null) r.startT = t;
          const p = Math.min(1, (t - r.startT) / RISE_MS);
          s.len = r.fromLen + (REST_LEN - r.fromLen) * easeInOut(p);
          if (p >= 1) {
            s.len = REST_LEN;
            r.active = false;
          }
        }

        // settle once the cord is up AND the swing has died down
        if (!r.active && Math.abs(s.omega) < 0.002 && Math.abs(s.theta) < 0.01) {
          sim.current = { theta: 0, omega: 0, len: REST_LEN };
          velRef.current = { x: 0, y: 0 };
          bulbRef.current = { x: ANCHOR_X, y: REST_LEN };
          setPos({ x: ANCHOR_X, y: REST_LEN });
          return;
        }
      }

      const nx = ANCHOR_X + s.len * Math.sin(s.theta);
      const ny = s.len * Math.cos(s.theta);
      velRef.current = { x: nx - bulbRef.current.x, y: ny - bulbRef.current.y };
      bulbRef.current = { x: nx, y: ny };
      setPos({ x: nx, y: ny });
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Drag handled by PERMANENT window listeners gated on a flag. Attached once, so
  // there's no timing gap and no reliance on pointer capture -> release is never
  // missed, so the bulb can never get stuck mid-drag.
  useEffect(() => {
    const onUp = () => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      setDragging(false);
      const s = sim.current;
      const isClick = peakDisp.current < CLICK_SLOP;
      if (isClick || peakStretch.current >= THRESHOLD) toggleTheme();
      // a pure click just toggles — only a real drag seeds a swing
      if (isClick) {
        sim.current = { theta: 0, omega: 0, len: REST_LEN };
        rise.current.active = false;
        return;
      }
      // seed the swing, and start the slow ease-in-out rise from wherever it is
      const pullFrac = Math.min(1, Math.max(0, (s.len - REST_LEN) / (MAX_LEN - REST_LEN)));
      const dir = Math.sign(s.omega) || Math.sign(s.theta) || -1;
      const amp = SWING_AMP * pullFrac + SWING_FLOOR;
      s.omega = clamp(dir * amp * Math.sqrt(G / Math.max(s.len, 1)) + s.omega * 0.4, 0.14);
      rise.current = { active: true, fromLen: s.len, startT: null };
    };
    endDragRef.current = onUp;

    const onMove = (e) => {
      if (!draggingRef.current) return;
      // PRIMARY release detection: if the mouse button is no longer held, the
      // release was missed by pointerup -> end the drag now. Independent of pointerup.
      if (e.pointerType === 'mouse' && e.buttons === 0) {
        onUp();
        return;
      }
      lastActiveRef.current = e.timeStamp || 0;
      const rect = rectRef.current;
      if (!rect) return;
      const dx = e.clientX - rect.left + grabOffset.current.x - ANCHOR_X;
      const dy = e.clientY - rect.top + grabOffset.current.y;
      let len = Math.hypot(dx, dy);
      len = Math.max(12, Math.min(MAX_LEN, len));
      const theta = Math.atan2(dx, Math.max(dy, 0.001));
      const s = sim.current;
      s.omega = theta - s.theta; // carry the swing momentum into the release
      s.theta = theta;
      s.len = len;
      const stretch = len - REST_LEN;
      if (stretch > peakStretch.current) peakStretch.current = stretch;
      const disp = Math.hypot(len * Math.sin(theta), len * Math.cos(theta) - REST_LEN);
      if (disp > peakDisp.current) peakDisp.current = disp;
    };

    // redundant release events (pointerup is unreliable in some setups)
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    window.addEventListener('blur', onUp);
    document.addEventListener('mouseup', onUp);
    document.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
      window.removeEventListener('blur', onUp);
      document.removeEventListener('mouseup', onUp);
      document.removeEventListener('touchend', onUp);
    };
  }, []);

  // track the svg's screen origin so the room-glow can follow the bulb
  useEffect(() => {
    const update = () => {
      if (svgRef.current) {
        const rect = svgRef.current.getBoundingClientRect();
        setOrigin({ left: rect.left, top: rect.top });
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // konami code -> disco mode
  useEffect(() => {
    let idx = 0;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        document.documentElement.classList.remove('disco');
        return;
      }
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      idx = k === KONAMI[idx] ? idx + 1 : k === KONAMI[0] ? 1 : 0;
      if (idx === KONAMI.length) {
        idx = 0;
        document.documentElement.classList.add('disco');
        window.clearTimeout(discoTimer.current);
        discoTimer.current = window.setTimeout(
          () => document.documentElement.classList.remove('disco'),
          9000
        );
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.clearTimeout(discoTimer.current);
    };
  }, []);

  // pointerdown just STARTS the drag; window listeners do the rest
  const onPointerDown = (e) => {
    e.preventDefault();
    const rect = svgRef.current.getBoundingClientRect();
    rectRef.current = rect;
    const s = sim.current;
    const curX = ANCHOR_X + s.len * Math.sin(s.theta);
    const curY = s.len * Math.cos(s.theta);
    grabOffset.current = { x: curX - (e.clientX - rect.left), y: curY - (e.clientY - rect.top) };
    peakStretch.current = 0;
    peakDisp.current = 0;
    s.omega = 0;
    rise.current.active = false;
    lastActiveRef.current = e.timeStamp || 0;
    draggingRef.current = true;
    setDragging(true);
  };

  const onKeyDown = (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    e.preventDefault();
    toggleTheme();
    const len = REST_LEN + 90;
    sim.current = { theta: 0, omega: -(SWING_AMP * 0.6 + SWING_FLOOR) * Math.sqrt(G / len), len };
    rise.current = { active: true, fromLen: len, startT: null };
  };

  // --- geometry for this frame ---
  const s = sim.current;
  const sinT = Math.sin(s.theta);
  const cosT = Math.cos(s.theta);
  const ex = pos.x - sinT * CAP_TOP;
  const ey = pos.y - cosT * CAP_TOP;
  const slack = Math.max(0, REST_LEN - s.len);
  const horiz = ex - ANCHOR_X;
  const vx = velRef.current.x;
  const vy = velRef.current.y;

  let cpx = (ANCHOR_X + ex) / 2;
  let cpy = ey / 2;
  cpy += Math.abs(horiz) * 0.18;   // catenary droop when angled (flexible look)
  cpx += clamp(-vx * 2.0, 55);     // trail the bulb's motion
  cpy += clamp(-vy * 1.0, 45);
  if (slack > 0) {
    cpy += slack * 1.6;
    cpx += horiz * 0.5 - slack * 0.8;
  }
  const d = `M ${ANCHOR_X} 0 Q ${cpx.toFixed(1)} ${cpy.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}`;
  const angleDeg = (-s.theta * 180) / Math.PI;

  const glowX = origin.left + pos.x;
  const glowY = origin.top + pos.y;

  return (
    <>
      <div
        className="pc-roomglow"
        aria-hidden="true"
        style={{
          background: `radial-gradient(circle 500px at ${glowX.toFixed(0)}px ${glowY.toFixed(0)}px, rgba(255,206,130,0.22), rgba(255,180,90,0.07) 42%, transparent 72%)`,
        }}
      />
      <svg
        ref={svgRef}
        className={`pull-cord ${dragging ? 'dragging' : ''}`}
        width={W}
        height={SVG_H}
      >
        <defs>
          <radialGradient id="pc-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffe1a3" stopOpacity="0.9" />
            <stop offset="45%" stopColor="#ffc869" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ffbe5a" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="pc-glass" cx="42%" cy="34%" r="68%">
            <stop offset="0%" stopColor="#fff7e0" />
            <stop offset="55%" stopColor="#ffd877" />
            <stop offset="100%" stopColor="#f3ad36" />
          </radialGradient>
        </defs>

        <rect className="pull-cord-mount" x={ANCHOR_X - 6} y="0" width="12" height="5" rx="2" />
        <path className="pull-cord-thread" d={d} />

        <g
          className="pull-cord-bulb-group"
          transform={`translate(${pos.x.toFixed(1)} ${pos.y.toFixed(1)}) rotate(${angleDeg.toFixed(1)})`}
        >
          <circle className="pull-cord-glow" cx="0" cy="3" r="22" fill="url(#pc-glow)" />
          <g className="pull-cord-rays">
            {RAYS.map((r, i) => (
              <line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2} />
            ))}
          </g>
          <path
            className="pull-cord-glass"
            d="M -3.6 -8 C -8 -7 -10.5 -2 -10.5 3 C -10.5 10 -6 13.5 0 13.5 C 6 13.5 10.5 10 10.5 3 C 10.5 -2 8 -7 3.6 -8 Z"
          />
          <g className="pull-cord-filament">
            <line x1="-2.2" y1="-7" x2="-1.4" y2="1.5" />
            <line x1="2.2" y1="-7" x2="1.4" y2="1.5" />
            <path d="M -1.4 1.5 q 1.4 3.4 2.8 0" />
          </g>
          <path className="pull-cord-cap" d="M -3.6 -16 L 3.6 -16 L 4.2 -8 L -4.2 -8 Z" />
          <line className="pull-cord-screw" x1="-3.7" y1="-13.5" x2="3.7" y2="-13.5" />
          <line className="pull-cord-screw" x1="-3.95" y1="-11" x2="3.95" y2="-11" />
        </g>

        <circle
          className="pull-cord-hit"
          cx={pos.x}
          cy={pos.y}
          r="20"
          role="button"
          tabIndex={0}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          aria-pressed={theme === 'dark'}
          onPointerDown={onPointerDown}
          onKeyDown={onKeyDown}
        >
          <title>Pull to switch theme</title>
        </circle>
      </svg>
    </>
  );
};

export default PullCord;
