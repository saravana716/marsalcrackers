import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Sparkles } from 'lucide-react';
import './FestiveCountdown.css';

/* ── Color palettes per cracker type ─────────────────────────────────── */
const CRACKER_PALETTES = {
  sparkler:  ['#ffd700', '#ffec3d', '#fff176', '#ffe57f', '#ffca28'],
  rocket:    ['#ff1744', '#ff4081', '#f50057', '#ff6d00', '#ff9100'],
  burst:     ['#00e5ff', '#18ffff', '#00b0ff', '#40c4ff', '#80d8ff'],
  fountain:  ['#76ff03', '#b2ff59', '#ccff90', '#69f0ae', '#00e676'],
};

const CRACKER_NAMES = ['sparkler', 'rocket', 'burst', 'fountain'];

function pickRandom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

export default function FestiveCountdown() {
  const targetDate = new Date('Nov 8, 2026 00:00:00').getTime();

  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: false,
  });

  const canvasRef    = useRef(null);
  const particlesRef = useRef([]);
  const animRef      = useRef(null);
  const audioCtxRef  = useRef(null);
  const isRunning    = useRef(false);

  /* ── Countdown timer ─────────────────────────────────────────────── */
  useEffect(() => {
    const tick = () => {
      const diff = targetDate - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days:0, hours:0, minutes:0, seconds:0, isExpired:true });
        return;
      }
      setTimeLeft({
        days:    Math.floor(diff / 86400000),
        hours:   Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000)  / 60000),
        seconds: Math.floor((diff % 60000)    / 1000),
        isExpired: false,
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  /* ── Canvas resize ───────────────────────────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current;
    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  /* ── Animation loop (runs on demand) ────────────────────────────── */
  const startAnimLoop = useCallback(() => {
    if (isRunning.current) return; // already running
    isRunning.current = true;

    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');

    const draw = () => {
      if (particlesRef.current.length === 0) {
        // No more particles — stop loop & clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        isRunning.current = false;
        return;
      }

      // Fade trail
      ctx.fillStyle = 'rgba(2, 5, 14, 0.18)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesRef.current = particlesRef.current
        .map(p => {
          const np = {
            ...p,
            x:     p.x + p.vx,
            y:     p.y + p.vy,
            vy:    p.vy + 0.09,   // gravity
            vx:    p.vx * 0.97,   // friction
            alpha: p.alpha - 0.011,
            tail:  [...(p.tail || []).slice(-7), { x: p.x, y: p.y }],
          };

          // Draw tail
          np.tail.forEach((pt, i) => {
            ctx.globalAlpha = (i / np.tail.length) * np.alpha * 0.4;
            ctx.fillStyle   = np.color;
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, np.size * 0.55, 0, Math.PI * 2);
            ctx.fill();
          });

          // Draw particle
          ctx.globalAlpha = np.alpha;
          ctx.fillStyle   = np.color;
          ctx.shadowColor = np.color;
          ctx.shadowBlur  = 12;
          ctx.beginPath();
          ctx.arc(np.x, np.y, np.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur  = 0;

          return np;
        })
        .filter(p => p.alpha > 0);

      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(draw);
    };

    draw();
  }, []);

  /* ── Cracker pop sound ───────────────────────────────────────────── */
  const playPop = useCallback((type) => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx  = audioCtxRef.current;
      const dur  = type === 'sparkler' ? 0.12 : type === 'rocket' ? 0.25 : 0.18;
      const len  = Math.floor(ctx.sampleRate * dur);
      const buf  = ctx.createBuffer(1, len, ctx.sampleRate);
      const data = buf.getChannelData(0);
      const freq = type === 'burst' ? 600 : type === 'fountain' ? 1200 : 900;
      for (let i = 0; i < len; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.5);
      }
      const src  = ctx.createBufferSource();
      src.buffer = buf;
      const gain = ctx.createGain(); gain.gain.value = 0.45;
      const filt = ctx.createBiquadFilter();
      filt.type = 'bandpass';
      filt.frequency.value = freq;
      src.connect(filt).connect(gain).connect(ctx.destination);
      src.start();
    } catch (_) {}
  }, []);

  /* ── Spawn particles for one cracker burst ───────────────────────── */
  const spawnBurst = useCallback((cx, cy, type) => {
    const palette = CRACKER_PALETTES[type];
    const configs = {
      sparkler:  { count: 90,  speedMin: 1.5, speedMax: 4,   sizeMin: 1,   sizeMax: 2.5 },
      rocket:    { count: 140, speedMin: 3,   speedMax: 8,   sizeMin: 2,   sizeMax: 4   },
      burst:     { count: 70,  speedMin: 1,   speedMax: 3.5, sizeMin: 1,   sizeMax: 2   },
      fountain:  { count: 110, speedMin: 2,   speedMax: 6,   sizeMin: 1.5, sizeMax: 3   },
    };
    const cfg = configs[type];

    for (let i = 0; i < cfg.count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * (cfg.speedMax - cfg.speedMin) + cfg.speedMin;
      const size  = Math.random() * (cfg.sizeMax  - cfg.sizeMin)  + cfg.sizeMin;
      particlesRef.current.push({
        x: cx, y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        alpha: 1,
        size,
        color: pickRandom(palette),
        tail: [],
      });
    }
  }, []);

  /* ── Click handler ───────────────────────────────────────────────── */
  const handleClick = useCallback((e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const cx   = e.clientX - rect.left;
    const cy   = e.clientY - rect.top;

    // Pick a different cracker type each click
    const type = pickRandom(CRACKER_NAMES);

    spawnBurst(cx, cy, type);
    playPop(type);
    startAnimLoop(); // starts animation if not already running
  }, [spawnBurst, playPop, startAnimLoop]);

  /* ── Cleanup on unmount ──────────────────────────────────────────── */
  useEffect(() => {
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  /* ── Render ──────────────────────────────────────────────────────── */
  return (
    <section
      className="countdown-section"
      onClick={handleClick}
      style={{ cursor: 'crosshair' }}
    >
      {/* Fireworks canvas — click-driven background */}
      <canvas ref={canvasRef} className="countdown-canvas-bg" />

      {/* Foreground content */}
      <div className="countdown-container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="countdown-glow-orb positive" />
        <div className="countdown-glow-orb negative" />

        <div className="countdown-content">
          <div className="countdown-badge">
            <Sparkles size={16} className="sparkle-accent" />
            <span>Festive Celebration Countdown</span>
          </div>

          <h2 className="countdown-title">Diwali Sparkles Loading</h2>
          <p className="countdown-subtitle">
            Get your celebrations ready! Order Sivakasi's best green crackers before the rush.
          </p>

          {!timeLeft.isExpired ? (
            <div className="countdown-grid">
              {[
                { val: timeLeft.days,    label: 'Days' },
                { val: timeLeft.hours,   label: 'Hours' },
                { val: timeLeft.minutes, label: 'Minutes' },
                { val: timeLeft.seconds, label: 'Seconds' },
              ].map(({ val, label }) => (
                <div className="countdown-card" key={label}>
                  <div className="card-number">{String(val).padStart(2, '0')}</div>
                  <div className="card-label">{label}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="countdown-expired-msg">
              <h3>Happy Diwali! 🎆</h3>
              <p>The celebrations are here. Order now for immediate local delivery!</p>
            </div>
          )}

          <div className="countdown-action">
            <a
              href="#bestsellers"
              className="countdown-btn"
              onClick={e => e.stopPropagation()}
            >
              <span>Explore Crackers</span>
            </a>
          </div>

          <p className="countdown-hint">🎇 Click anywhere here to burst a cracker!</p>
        </div>
      </div>
    </section>
  );
}
