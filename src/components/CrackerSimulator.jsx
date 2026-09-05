import React, { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, Play, Flame } from 'lucide-react';
import './CrackerSimulator.css';

export default function CrackerSimulator() {
  const canvasRef = useRef(null);
  const [activeCracker, setActiveCracker] = useState('skyshot');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [instructions, setInstructions] = useState('Click anywhere on the canvas above to launch a Sky Shot!');
  
  // Audio Context Ref
  const audioCtxRef = useRef(null);

  // Initialize Audio Context on demand
  const initAudio = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  // Synthesize sound effects using Web Audio API
  const playSound = (type) => {
    if (!soundEnabled) return;
    initAudio();
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    const now = ctx.currentTime;

    if (type === 'whistle') {
      // Rocket Whistle
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(1800, now + 0.8);
      
      gainNode.gain.setValueAtTime(0.001, now);
      gainNode.gain.linearRampToValueAtTime(0.12, now + 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start(now);
      osc.stop(now + 0.8);
    } else if (type === 'boom') {
      // Huge Explosion Boom
      // 1. Low bass thud (Sine Oscillator)
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.6);
      
      gainNode.gain.setValueAtTime(0.6, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.6);

      // 2. Exploding noise burst (High pass & bandpass filtered white noise)
      const bufferSize = ctx.sampleRate * 1.5;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1000, now);
      filter.frequency.exponentialRampToValueAtTime(150, now + 0.8);
      filter.Q.setValueAtTime(3, now);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.4, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      
      noise.start(now);
      noise.stop(now + 0.8);

      // 3. Crackling tails
      for (let i = 0; i < 15; i++) {
        const crackleTime = now + 0.2 + Math.random() * 0.6;
        const crackleOsc = ctx.createOscillator();
        const crackleGain = ctx.createGain();
        crackleOsc.type = 'sawtooth';
        crackleOsc.frequency.setValueAtTime(2000 + Math.random() * 3000, crackleTime);
        
        crackleGain.gain.setValueAtTime(0.02, crackleTime);
        crackleGain.gain.exponentialRampToValueAtTime(0.001, crackleTime + 0.05);
        
        crackleOsc.connect(crackleGain);
        crackleGain.connect(ctx.destination);
        crackleOsc.start(crackleTime);
        crackleOsc.stop(crackleTime + 0.05);
      }
    } else if (type === 'fountain' || type === 'sparkler') {
      // Crackling Fountain / Sparkler Hiss
      const duration = type === 'fountain' ? 3.0 : 0.4;
      const bufferSize = ctx.sampleRate * duration;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      
      const filter = ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(2000, now);
      
      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0.08, now);
      
      // Add random envelope spikes for realistic crackling
      for (let t = 0; t < duration; t += 0.08) {
        gainNode.gain.setValueAtTime(0.04 + Math.random() * 0.12, now + t);
      }
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);
      
      noise.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      noise.start(now);
      noise.stop(now + duration);
    } else if (type === 'chakkar') {
      // Spinning Chakkar Whiz
      const duration = 4.0;
      const bufferSize = ctx.sampleRate * duration;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.Q.setValueAtTime(4, now);
      
      // Modulate frequency to sound like spinning
      for (let t = 0; t < duration; t += 0.1) {
        const freq = 600 + Math.sin(t * 15) * 300 + Math.random() * 100;
        filter.frequency.setValueAtTime(freq, now + t);
      }

      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0.06, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);
      
      noise.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      noise.start(now);
      noise.stop(now + duration);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Set internal resolution matching DOM size
    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = 400;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle Classes & Physics
    let particles = [];
    let rockets = [];
    let activeFountain = null;
    let activeChakkar = null;
    let sparklerEmitter = null;

    class Particle {
      constructor(x, y, color, vx, vy, life, type = 'spark') {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.color = color;
        this.life = life;
        this.maxLife = life;
        this.type = type; // 'spark', 'flare', 'smoke'
        this.alpha = 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.type === 'spark') {
          this.vy += 0.05; // gravity
          this.vx *= 0.98; // air resistance
        } else if (this.type === 'chakkar-spark') {
          this.vx *= 0.96;
          this.vy *= 0.96;
        } else if (this.type === 'fountain-spark') {
          this.vy += 0.08;
          this.vx *= 0.97;
        }
        
        this.life--;
        this.alpha = Math.max(0, this.life / this.maxLife);
      }

      draw(c) {
        c.save();
        c.globalAlpha = this.alpha;
        c.beginPath();
        c.arc(this.x, this.y, this.type === 'flare' ? 3.5 : 2, 0, Math.PI * 2);
        c.fillStyle = this.color;
        
        // Add visual glowing effect
        c.shadowBlur = this.type === 'flare' ? 12 : 6;
        c.shadowColor = this.color;
        
        c.fill();
        c.restore();
      }
    }

    class Rocket {
      constructor(startX, startY, targetX, targetY, color) {
        this.x = startX;
        this.y = startY;
        this.targetX = targetX;
        this.targetY = targetY;
        this.color = color;
        
        // Calculate velocity
        const dx = targetX - startX;
        const dy = targetY - startY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const speed = 7;
        this.vx = (dx / distance) * speed;
        this.vy = (dy / distance) * speed;
        
        this.alive = true;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        // Add trail particles
        if (Math.random() < 0.6) {
          particles.push(new Particle(this.x, this.y, '#ffd700', (Math.random() - 0.5) * 1.5, Math.random() * 2, 20 + Math.random() * 20));
        }

        // Check if close to target or moving downward
        if (this.vy >= 0 || this.y <= this.targetY) {
          this.explode();
          this.alive = false;
        }
      }

      explode() {
        playSound('boom');
        // Spawn ring explosion
        const particleCount = 70 + Math.floor(Math.random() * 40);
        for (let i = 0; i < particleCount; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 6 + 1.5;
          const vx = Math.cos(angle) * speed;
          const vy = Math.sin(angle) * speed;
          const life = 40 + Math.random() * 40;
          particles.push(new Particle(this.x, this.y, this.color, vx, vy, life, 'spark'));
        }
        
        // Add bright central flash
        for (let i = 0; i < 8; i++) {
          particles.push(new Particle(this.x, this.y, '#FFFFFF', (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2, 15, 'flare'));
        }
      }

      draw(c) {
        c.beginPath();
        c.arc(this.x, this.y, 3.5, 0, Math.PI * 2);
        c.fillStyle = '#FFFFFF';
        c.shadowBlur = 10;
        c.shadowColor = '#ffd700';
        c.fill();
      }
    }

    // Animation Loop
    let animationFrameId;
    const animate = () => {
      ctx.fillStyle = 'rgba(4, 8, 19, 0.25)'; // trail/fade background
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 1. Draw decorative background night-sky stars once in a while
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      for (let i = 0; i < 5; i++) {
        ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 1.5, 1.5);
      }

      // 2. Update and draw Rockets
      rockets = rockets.filter(r => r.alive);
      rockets.forEach(r => {
        r.update();
        r.draw(ctx);
      });

      // 3. Handle Flower Pot Fountain
      if (activeFountain) {
        activeFountain.timer--;
        
        // Emit spark spray
        const intensity = 7;
        for (let i = 0; i < intensity; i++) {
          const angle = -Math.PI / 2 + (Math.random() - 0.5) * 0.45; // vertical fan
          const speed = Math.random() * 8 + 3;
          const vx = Math.cos(angle) * speed;
          const vy = Math.sin(angle) * speed;
          const life = 35 + Math.random() * 25;
          const colors = ['#ffd700', '#ffae19', '#ff6b6b', '#ffffff'];
          const color = colors[Math.floor(Math.random() * colors.length)];
          
          particles.push(new Particle(activeFountain.x, activeFountain.y, color, vx, vy, life, 'fountain-spark'));
        }

        // Draw Fountain nozzle
        ctx.beginPath();
        ctx.moveTo(activeFountain.x - 10, activeFountain.y);
        ctx.lineTo(activeFountain.x + 10, activeFountain.y);
        ctx.lineTo(activeFountain.x, activeFountain.y - 12);
        ctx.closePath();
        ctx.fillStyle = '#ff6b6b';
        ctx.fill();

        if (activeFountain.timer <= 0) {
          activeFountain = null;
        }
      }

      // 4. Handle Chakkar
      if (activeChakkar) {
        activeChakkar.timer--;
        activeChakkar.angle += activeChakkar.speed;
        
        // Spin faster at the beginning, slow down
        activeChakkar.speed = Math.max(0.08, activeChakkar.speed * 0.995);

        // Emit sparks tangentially
        const sparksCount = 4;
        for (let i = 0; i < sparksCount; i++) {
          const emissionAngle = activeChakkar.angle + (i * Math.PI / 2);
          const spinX = activeChakkar.x + Math.cos(emissionAngle) * activeChakkar.radius;
          const spinY = activeChakkar.y + Math.sin(emissionAngle) * activeChakkar.radius;
          
          // Tangential vector
          const force = 4 + Math.random() * 5;
          const vx = -Math.sin(emissionAngle) * force + (Math.random() - 0.5) * 2;
          const vy = Math.cos(emissionAngle) * force + (Math.random() - 0.5) * 2;
          
          const colors = ['#00ffd8', '#ffd700', '#ffffff', '#ff9f43'];
          const color = colors[Math.floor(Math.random() * colors.length)];
          const life = 20 + Math.random() * 20;

          particles.push(new Particle(spinX, spinY, color, vx, vy, life, 'chakkar-spark'));
        }

        // Draw central spinning disc
        ctx.beginPath();
        ctx.arc(activeChakkar.x, activeChakkar.y, activeChakkar.radius, 0, Math.PI * 2);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();

        if (activeChakkar.timer <= 0) {
          activeChakkar = null;
        }
      }

      // 5. Handle Sparkler Emitter (mouse follow)
      if (sparklerEmitter) {
        const colors = ['#ffffff', '#ffd700', '#ffae19'];
        for (let i = 0; i < 4; i++) {
          const angle = Math.random() * Math.PI * 2;
          const force = Math.random() * 3 + 0.5;
          const vx = Math.cos(angle) * force;
          const vy = Math.sin(angle) * force;
          const life = 15 + Math.random() * 15;
          const color = colors[Math.floor(Math.random() * colors.length)];
          particles.push(new Particle(sparklerEmitter.x, sparklerEmitter.y, color, vx, vy, life, 'spark'));
        }
      }

      // 6. Update and draw Particles
      particles = particles.filter(p => p.life > 0);
      particles.forEach(p => {
        p.update();
        p.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();

    // Event Handlers for click trigger
    const handleCanvasClick = (e) => {
      initAudio();
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      if (activeCracker === 'skyshot') {
        // Launch Rocket
        playSound('whistle');
        const startX = canvas.width / 2;
        const startY = canvas.height;
        const colors = ['#ff4757', '#2ed573', '#1e90ff', '#ffa502', '#ffffff', '#e84393'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        rockets.push(new Rocket(startX, startY, clickX, clickY, randomColor));
      } else if (activeCracker === 'fountain') {
        if (!activeFountain) {
          playSound('fountain');
          activeFountain = {
            x: clickX,
            y: canvas.height - 15,
            timer: 180 // 3 seconds at 60fps
          };
        }
      } else if (activeCracker === 'chakkar') {
        if (!activeChakkar) {
          playSound('chakkar');
          activeChakkar = {
            x: clickX,
            y: clickY,
            radius: 12,
            angle: 0,
            speed: 0.35,
            timer: 240 // 4 seconds
          };
        }
      }
    };

    // Sparkler Move Emitter
    const handleCanvasMouseMove = (e) => {
      if (activeCracker === 'sparkler') {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        sparklerEmitter = { x: mouseX, y: mouseY };
        
        // Randomly play sparkler fizz
        if (Math.random() < 0.15) {
          playSound('sparkler');
        }
      }
    };

    const handleCanvasMouseLeave = () => {
      sparklerEmitter = null;
    };

    canvas.addEventListener('mousedown', handleCanvasClick);
    canvas.addEventListener('mousemove', handleCanvasMouseMove);
    canvas.addEventListener('mouseleave', handleCanvasMouseLeave);

    // Touch events for mobile
    const handleCanvasTouchStart = (e) => {
      if (e.touches.length > 0) {
        initAudio();
        const rect = canvas.getBoundingClientRect();
        const touchX = e.touches[0].clientX - rect.left;
        const touchY = e.touches[0].clientY - rect.top;

        if (activeCracker === 'skyshot') {
          playSound('whistle');
          rockets.push(new Rocket(canvas.width / 2, canvas.height, touchX, touchY, '#ff9f43'));
        } else if (activeCracker === 'fountain' && !activeFountain) {
          playSound('fountain');
          activeFountain = { x: touchX, y: canvas.height - 15, timer: 180 };
        } else if (activeCracker === 'chakkar' && !activeChakkar) {
          playSound('chakkar');
          activeChakkar = { x: touchX, y: touchY, radius: 12, angle: 0, speed: 0.35, timer: 240 };
        } else if (activeCracker === 'sparkler') {
          sparklerEmitter = { x: touchX, y: touchY };
        }
      }
    };

    const handleCanvasTouchMove = (e) => {
      if (activeCracker === 'sparkler' && e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        const touchX = e.touches[0].clientX - rect.left;
        const touchY = e.touches[0].clientY - rect.top;
        sparklerEmitter = { x: touchX, y: touchY };
        if (Math.random() < 0.15) {
          playSound('sparkler');
        }
      }
    };

    canvas.addEventListener('touchstart', handleCanvasTouchStart, { passive: true });
    canvas.addEventListener('touchmove', handleCanvasTouchMove, { passive: true });
    canvas.addEventListener('touchend', handleCanvasMouseLeave);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousedown', handleCanvasClick);
      canvas.removeEventListener('mousemove', handleCanvasMouseMove);
      canvas.removeEventListener('mouseleave', handleCanvasMouseLeave);
      canvas.removeEventListener('touchstart', handleCanvasTouchStart);
      canvas.removeEventListener('touchmove', handleCanvasTouchMove);
      canvas.removeEventListener('touchend', handleCanvasMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeCracker, soundEnabled]);

  // Update helper text when changing cracker type
  const selectCracker = (type) => {
    setActiveCracker(type);
    if (type === 'skyshot') {
      setInstructions('Click anywhere on the canvas above to launch and target a Sky Shot rocket!');
    } else if (type === 'fountain') {
      setInstructions('Click near the bottom of the canvas to ignite a beautiful Flower Pot sparkling tree!');
    } else if (type === 'chakkar') {
      setInstructions('Click on the canvas to place and spin a Ground Chakkar wheel!');
    } else if (type === 'sparkler') {
      setInstructions('Click and move/drag your pointer on the canvas to light up a hand Sparkler!');
    }
  };

  return (
    <section className="simulator-section">
      <div className="simulator-container">
        
        <div className="simulator-header">
          <div className="simulator-badge">
            <Flame size={14} className="icon-burn" />
            <span>Interactive Simulator</span>
          </div>
          <h2 className="simulator-title">Virtual Firecracker Testing</h2>
          <p className="simulator-desc">
            Test the visual sparkles and real sound effects of our premium Sivakasi crackers before placing your order.
          </p>
        </div>

        {/* Canvas Display Stage */}
        <div className="simulator-stage-wrapper">
          <canvas ref={canvasRef} className="simulator-canvas"></canvas>
          <div className="canvas-instruction">{instructions}</div>
          
          {/* Sound Controls */}
          <button 
            className={`sound-toggle-btn ${soundEnabled ? 'active' : ''}`}
            onClick={() => setSoundEnabled(!soundEnabled)}
            title={soundEnabled ? 'Mute Sounds' : 'Unmute Sounds'}
          >
            {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
            <span>{soundEnabled ? 'Sound On' : 'Sound Muted'}</span>
          </button>
        </div>

        {/* Toolbar Controls */}
        <div className="simulator-controls">
          <button 
            className={`control-tab-btn ${activeCracker === 'skyshot' ? 'active' : ''}`}
            onClick={() => selectCracker('skyshot')}
          >
            <Sparkles size={16} />
            <span>Sky Shot Rocket</span>
          </button>
          
          <button 
            className={`control-tab-btn ${activeCracker === 'fountain' ? 'active' : ''}`}
            onClick={() => selectCracker('fountain')}
          >
            <Flame size={16} />
            <span>Flower Pot Fountain</span>
          </button>
          
          <button 
            className={`control-tab-btn ${activeCracker === 'chakkar' ? 'active' : ''}`}
            onClick={() => selectCracker('chakkar')}
          >
            <Play size={16} className="rotate-icon" />
            <span>Ground Chakkar</span>
          </button>
          
          <button 
            className={`control-tab-btn ${activeCracker === 'sparkler' ? 'active' : ''}`}
            onClick={() => selectCracker('sparkler')}
          >
            <Sparkles size={16} />
            <span>Hand Sparkler</span>
          </button>
        </div>

      </div>
    </section>
  );
}
