import React, { useEffect, useRef, useState } from 'react';
import './CountdownFireworks.css';

// Simple particle for fireworks
function createParticle(x, y) {
  const angle = Math.random() * Math.PI * 2;
  const speed = Math.random() * 3 + 2;
  return {
    x,
    y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    alpha: 1,
    size: Math.random() * 2 + 1,
  };
}

export default function CountdownFireworks({ onFinish, duration = 5000 }) {
  const canvasRef = useRef(null);
  const [particles, setParticles] = useState([]);
  const [audioCtx, setAudioCtx] = useState(null);

  // Initialise audio context on first user interaction
  const initAudio = () => {
    if (!audioCtx) {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      setAudioCtx(ctx);
    }
  };

  // Explosion sound – short white‑noise burst
  const playExplosion = () => {
    if (!audioCtx) return;
    const buffer = audioCtx.createBuffer(1, audioCtx.sampleRate, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 2);
    }
    const source = audioCtx.createBufferSource();
    source.buffer = buffer;
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 1000;
    source.connect(filter).connect(audioCtx.destination);
    source.start(0);
  };

  // Trigger fireworks burst
  const launchBurst = () => {
    const rect = canvasRef.current.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const newParticles = [];
    for (let i = 0; i < 120; i++) {
      newParticles.push(createParticle(cx, cy));
    }
    setParticles((prev) => [...prev, ...newParticles]);
    playExplosion();
  };

  // Repeated bursts while the overlay is active
  useEffect(() => {
    const intervalId = setInterval(() => {
      launchBurst();
    }, 600); // burst every 600ms
    return () => clearInterval(intervalId);
  }, []);

  // Animation loop
  useEffect(() => {
    let animationFrameId;
    const ctx = canvasRef.current.getContext('2d');
    const render = () => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      setParticles((ps) => {
        const updated = ps
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.07, // gravity
            alpha: p.alpha - 0.015,
          }))
          .filter((p) => p.alpha > 0);
        updated.forEach((p) => {
          ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        });
        return updated;
      });
      animationFrameId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Auto‑close after duration
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish && onFinish();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onFinish]);

  // Initialise audio and start first burst on mount (interval will handle subsequent bursts)
  useEffect(() => {
    initAudio();
    launchBurst();
  }, []);

  return <canvas ref={canvasRef} className="countdown-fireworks-canvas" />;
}
