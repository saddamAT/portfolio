import { useEffect, useRef } from 'react';

interface ParticleCanvasProps {
  isWhiteMode?: boolean;
}

type ParticleType = 'micro-circle' | 'circle' | 'glow-circle' | 'pill';

interface AntigravityParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVy: number;
  type: ParticleType;
  radius: number;
  length: number;
  angle: number;
  vRot: number;
  swaySpeed: number;
  swayAmp: number;
  swayOffset: number;
  depth: number;
  alpha: number;
  baseAlpha: number;
  color: string;
  glowColor: string;
  pulseSpeed: number;
  pulseOffset: number;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  life: number;
  decay: number;
  color: string;
  glowColor: string;
  isStar: boolean;
}

export default function ParticleCanvas({ isWhiteMode = false }: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationFrameId: number;
    let time = 0;

    // Device Pixel Ratio for ultra-crisp circles & geometry
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();

    const mouse = {
      x: -2000,
      y: -2000,
      radius: 175,
      active: false,
    };

    const lastMouse = {
      x: -2000,
      y: -2000,
    };

    // Palettes calibrated for Antigravity aesthetic
    // Dark mode: vibrant neon/Google colors on deep space (#080a0f)
    const darkPalette = [
      { color: '#00F0FF', glow: 'rgba(0, 240, 255, 0.65)' }, // Electric Cyan
      { color: '#38BDF8', glow: 'rgba(56, 189, 248, 0.55)' }, // Sky Blue
      { color: '#4285F4', glow: 'rgba(66, 133, 244, 0.65)' }, // Google Blue
      { color: '#34A853', glow: 'rgba(52, 168, 83, 0.65)' },  // Google Green
      { color: '#FBBC05', glow: 'rgba(251, 188, 5, 0.7)' },   // Google Yellow
      { color: '#EA4335', glow: 'rgba(234, 67, 53, 0.65)' },  // Google Coral/Red
      { color: '#E879F9', glow: 'rgba(232, 121, 249, 0.6)' }, // Radiant Magenta
      { color: '#A855F7', glow: 'rgba(168, 85, 247, 0.6)' },  // Purple/Violet
      { color: '#FFFFFF', glow: 'rgba(255, 255, 255, 0.75)' },// Crisp White
    ];

    // Light mode: rich, high-contrast jewel tones on light slate (#f8fafc)
    const lightPalette = [
      { color: '#2563EB', glow: 'rgba(37, 99, 235, 0.45)' },  // Deep Blue
      { color: '#0284C7', glow: 'rgba(2, 132, 199, 0.45)' },  // Deep Cyan
      { color: '#059669', glow: 'rgba(5, 150, 105, 0.45)' },  // Emerald
      { color: '#D97706', glow: 'rgba(217, 119, 6, 0.5)' },   // Warm Amber
      { color: '#E11D48', glow: 'rgba(225, 29, 72, 0.45)' },  // Coral Crimson
      { color: '#7C3AED', glow: 'rgba(124, 58, 237, 0.45)' }, // Royal Violet
      { color: '#475569', glow: 'rgba(71, 85, 105, 0.35)' },  // Slate accent
    ];

    const currentPalette = isWhiteMode ? lightPalette : darkPalette;

    let particles: AntigravityParticle[] = [];
    const sparks: Spark[] = [];

    // Helper to spawn dynamic sparks on cursor movement
    const spawnSpark = (x: number, y: number, moveDx: number, moveDy: number) => {
      const paletteItem = currentPalette[Math.floor(Math.random() * currentPalette.length)];
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 3.2 + 1.2;

      // Burst velocity with slight trail inertia
      const vx = Math.cos(angle) * speed - moveDx * 0.15;
      const vy = Math.sin(angle) * speed - moveDy * 0.15;

      sparks.push({
        x: x + (Math.random() - 0.5) * 14,
        y: y + (Math.random() - 0.5) * 14,
        vx,
        vy,
        radius: Math.random() * 2.2 + 1.4,
        life: 1.0,
        decay: Math.random() * 0.026 + 0.02,
        color: paletteItem.color,
        glowColor: paletteItem.glow,
        isStar: Math.random() < 0.35, // 35% starburst glints, 65% circular glowing sparks
      });

      // Keep spark buffer bounded for peak performance
      if (sparks.length > 140) {
        sparks.shift();
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const currentX = e.clientX;
      const currentY = e.clientY;

      let dx = 0;
      let dy = 0;

      if (lastMouse.x > -1000) {
        dx = currentX - lastMouse.x;
        dy = currentY - lastMouse.y;
      }

      mouse.x = currentX;
      mouse.y = currentY;
      mouse.active = true;

      const speed = Math.hypot(dx, dy);

      // Spawn Antigravity sparks proportional to cursor velocity
      const sparksCount = Math.min(Math.floor(speed * 0.32) + 2, 7);
      for (let i = 0; i < sparksCount; i++) {
        spawnSpark(currentX, currentY, dx, dy);
      }

      lastMouse.x = currentX;
      lastMouse.y = currentY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const currentX = touch.clientX;
        const currentY = touch.clientY;

        const dx = lastMouse.x > -1000 ? currentX - lastMouse.x : 0;
        const dy = lastMouse.y > -1000 ? currentY - lastMouse.y : 0;

        mouse.x = currentX;
        mouse.y = currentY;
        mouse.active = true;

        for (let i = 0; i < 3; i++) {
          spawnSpark(currentX, currentY, dx, dy);
        }

        lastMouse.x = currentX;
        lastMouse.y = currentY;
      }
    };

    const handleMouseLeave = () => {
      mouse.x = -2000;
      mouse.y = -2000;
      lastMouse.x = -2000;
      lastMouse.y = -2000;
      mouse.active = false;
    };

    const initParticles = () => {
      particles = [];
      // Enhanced density: significantly more dots across the screen as requested
      const baseCount = Math.floor((width * height) / 4600);
      const count = Math.min(Math.max(baseCount, 160), 280);

      for (let i = 0; i < count; i++) {
        const rand = Math.random();
        let type: ParticleType = 'circle';

        // Distribution: 85% dots of various sizes, 15% zero-gravity pills
        if (rand < 0.42) {
          type = 'micro-circle'; // Crisp starlight micro-dot
        } else if (rand < 0.72) {
          type = 'circle'; // Standard circular dot
        } else if (rand < 0.85) {
          type = 'glow-circle'; // Luminous glowing circular node
        } else {
          type = 'pill'; // Floating antigravity capsule
        }

        const depth = Math.random() * 0.6 + 0.4; // 0.4 to 1.0 (depth layer)
        const paletteItem = currentPalette[Math.floor(Math.random() * currentPalette.length)];

        // Upward buoyancy drift: smooth zero-gravity ascent
        const baseVy = -(Math.random() * 0.42 + 0.18) * depth;

        let radius = 1.6;
        let length = 0;

        if (type === 'micro-circle') {
          // Sharp micro circular dot: 0.9px - 1.8px
          radius = (Math.random() * 0.9 + 0.9) * depth;
        } else if (type === 'circle') {
          // Medium circular dot: 1.8px - 3.4px
          radius = (Math.random() * 1.6 + 1.8) * depth;
        } else if (type === 'glow-circle') {
          // Luminous circular dot: 3.5px - 5.8px
          radius = (Math.random() * 2.3 + 3.5) * depth;
        } else {
          // Antigravity pill/capsule: width 2.2 - 3.4px, length 10 - 20px
          radius = (Math.random() * 0.7 + 1.2) * depth;
          length = (Math.random() * 10 + 10) * depth;
        }

        const baseAlpha = isWhiteMode
          ? Math.random() * 0.35 + 0.45 // Crisp high contrast on light background
          : Math.random() * 0.45 + 0.35; // Luminous on dark background

        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: 0,
          vy: baseVy,
          baseVy,
          type,
          radius,
          length,
          angle: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.022,
          swaySpeed: Math.random() * 0.014 + 0.007,
          swayAmp: Math.random() * 26 + 8,
          swayOffset: Math.random() * Math.PI * 2,
          depth,
          alpha: baseAlpha,
          baseAlpha,
          color: paletteItem.color,
          glowColor: paletteItem.glow,
          pulseSpeed: Math.random() * 0.035 + 0.015,
          pulseOffset: Math.random() * Math.PI * 2,
        });
      }
    };

    initParticles();

    const handleResize = () => {
      resizeCanvas();
      initParticles();
    };

    const animate = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw and update background dots & particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Horizontal sinusoidal sway simulating zero-G weightless drift
        const sway = Math.sin(time * p.swaySpeed + p.swayOffset) * p.swayAmp;
        const currentX = p.x + sway;
        const currentY = p.y;

        // Interactive Antigravity Repulsion on cursor hover
        if (mouse.active) {
          const dx = currentX - mouse.x;
          const dy = currentY - mouse.y;
          const dist = Math.hypot(dx, dy);

          if (dist < mouse.radius && dist > 1) {
            const force = ((mouse.radius - dist) / mouse.radius) * 2.8;
            p.vx += (dx / dist) * force * 0.45;
            p.vy += (dy / dist) * force * 0.45;
          }
        }

        // Apply smooth velocity damping and return towards upward float
        p.vx *= 0.93;
        p.vy = p.vy * 0.93 + p.baseVy * 0.07;

        p.x += p.vx;
        p.y += p.vy;
        p.angle += p.vRot;

        // Wrap around viewport bounds
        if (p.y < -35) {
          p.y = height + 35;
          p.x = Math.random() * width;
        } else if (p.y > height + 35) {
          p.y = -35;
          p.x = Math.random() * width;
        }

        if (p.x < -40) {
          p.x = width + 40;
        } else if (p.x > width + 40) {
          p.x = -40;
        }

        // Render based on particle geometry
        if (p.type === 'micro-circle' || p.type === 'circle') {
          // Perfectly round, pristine circular dot
          ctx.beginPath();
          ctx.arc(currentX, currentY, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.fill();
        } else if (p.type === 'glow-circle') {
          // Luminous hero circular dot with soft radial glow
          const pulse = Math.sin(time * p.pulseSpeed + p.pulseOffset) * 0.3 + 1;
          const r = p.radius * pulse;
          const glowRadius = r * 2.7;

          // Ambient luminous aura
          const grad = ctx.createRadialGradient(currentX, currentY, r * 0.2, currentX, currentY, glowRadius);
          grad.addColorStop(0, p.color);
          grad.addColorStop(0.45, p.glowColor);
          grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

          ctx.beginPath();
          ctx.arc(currentX, currentY, glowRadius, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.globalAlpha = p.alpha * 0.75;
          ctx.fill();

          // Core crisp circular dot
          ctx.beginPath();
          ctx.arc(currentX, currentY, r, 0, Math.PI * 2);
          ctx.fillStyle = isWhiteMode ? p.color : '#ffffff';
          ctx.globalAlpha = p.alpha;
          ctx.fill();
        } else if (p.type === 'pill') {
          // Floating antigravity capsule / pill (like Google Antigravity confetti)
          ctx.save();
          ctx.translate(currentX, currentY);
          ctx.rotate(p.angle);
          ctx.beginPath();
          ctx.strokeStyle = p.color;
          ctx.lineWidth = p.radius * 2;
          ctx.lineCap = 'round';
          ctx.globalAlpha = p.alpha;

          const halfLen = Math.max(1, p.length / 2 - p.radius);
          ctx.moveTo(-halfLen, 0);
          ctx.lineTo(halfLen, 0);
          ctx.stroke();
          ctx.restore();
        }
      }

      // 2. Render and update interactive cursor sparks (Antigravity spark trail)
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];

        // Upward zero-G float and air drag
        s.x += s.vx;
        s.y += s.vy;
        s.vy -= 0.05; // Gentle antigravity lift
        s.vx *= 0.94;
        s.vy *= 0.94;
        s.life -= s.decay;

        if (s.life <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        const currentRadius = s.radius * s.life;
        if (currentRadius <= 0.2) continue;

        ctx.save();
        ctx.globalAlpha = s.life * (isWhiteMode ? 0.9 : 1.0);

        if (s.isStar) {
          // 4-pointed diamond starburst spark glint
          const arm = currentRadius * 3.0;
          ctx.strokeStyle = s.color;
          ctx.lineWidth = Math.max(1, currentRadius * 0.7);
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(s.x - arm, s.y);
          ctx.lineTo(s.x + arm, s.y);
          ctx.moveTo(s.x, s.y - arm);
          ctx.lineTo(s.x, s.y + arm);
          ctx.stroke();

          // Center bright core
          ctx.beginPath();
          ctx.arc(s.x, s.y, currentRadius * 0.8, 0, Math.PI * 2);
          ctx.fillStyle = isWhiteMode ? s.color : '#ffffff';
          ctx.fill();
        } else {
          // Radiant glowing circular spark
          const glowR = currentRadius * 3.0;
          const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, glowR);
          grad.addColorStop(0, s.color);
          grad.addColorStop(0.4, s.glowColor);
          grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

          ctx.beginPath();
          ctx.arc(s.x, s.y, glowR, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();

          // Specular white center
          ctx.beginPath();
          ctx.arc(s.x, s.y, currentRadius, 0, Math.PI * 2);
          ctx.fillStyle = isWhiteMode ? s.color : '#ffffff';
          ctx.fill();
        }

        ctx.restore();
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchend', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchend', handleMouseLeave);
    };
  }, [isWhiteMode]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-500"
    />
  );
}
