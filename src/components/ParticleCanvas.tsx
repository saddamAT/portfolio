import { useEffect, useRef } from 'react';

interface ParticleCanvasProps {
  isWhiteMode?: boolean;
}

type ParticleType = 'circle' | 'glow-circle' | 'pill';

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
      radius: 170,
      active: false,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.x = -2000;
      mouse.y = -2000;
      mouse.active = false;
    };

    // Palettes calibrated for Antigravity aesthetic
    // Dark mode: vibrant neon/Google colors on deep space (#080a0f)
    const darkPalette = [
      { color: '#00F0FF', glow: 'rgba(0, 240, 255, 0.45)' }, // Electric Cyan
      { color: '#38BDF8', glow: 'rgba(56, 189, 248, 0.4)' },  // Sky Blue
      { color: '#4285F4', glow: 'rgba(66, 133, 244, 0.45)' }, // Google Blue
      { color: '#34A853', glow: 'rgba(52, 168, 83, 0.45)' },  // Google Green
      { color: '#FBBC05', glow: 'rgba(251, 188, 5, 0.45)' },  // Google Yellow
      { color: '#EA4335', glow: 'rgba(234, 67, 53, 0.45)' },  // Google Coral/Red
      { color: '#E879F9', glow: 'rgba(232, 121, 249, 0.4)' }, // Radiant Magenta
      { color: '#A855F7', glow: 'rgba(168, 85, 247, 0.4)' },  // Purple/Violet
      { color: '#FFFFFF', glow: 'rgba(255, 255, 255, 0.5)' }, // Crisp White
    ];

    // Light mode: rich, high-contrast jewel tones on light slate (#f8fafc)
    const lightPalette = [
      { color: '#2563EB', glow: 'rgba(37, 99, 235, 0.35)' },  // Deep Blue
      { color: '#0284C7', glow: 'rgba(2, 132, 199, 0.35)' },  // Deep Cyan
      { color: '#059669', glow: 'rgba(5, 150, 105, 0.35)' },  // Emerald
      { color: '#D97706', glow: 'rgba(217, 119, 6, 0.35)' },  // Warm Amber
      { color: '#E11D48', glow: 'rgba(225, 29, 72, 0.35)' },  // Coral Crimson
      { color: '#7C3AED', glow: 'rgba(124, 58, 237, 0.35)' }, // Royal Violet
      { color: '#475569', glow: 'rgba(71, 85, 105, 0.25)' },  // Slate accent
    ];

    const currentPalette = isWhiteMode ? lightPalette : darkPalette;

    let particles: AntigravityParticle[] = [];

    const initParticles = () => {
      particles = [];
      // Dynamic count: ~70 on mobile, ~120 on wide screens
      const baseCount = Math.floor((width * height) / 13000);
      const count = Math.min(Math.max(baseCount, 65), 130);

      for (let i = 0; i < count; i++) {
        const rand = Math.random();
        // Particle distribution: 65% circular dots, 35% antigravity pills
        let type: ParticleType = 'circle';
        if (rand < 0.5) {
          type = 'circle'; // Standard circular dot
        } else if (rand < 0.65) {
          type = 'glow-circle'; // Hero luminous circular dot
        } else {
          type = 'pill'; // Floating antigravity capsule
        }

        const depth = Math.random() * 0.55 + 0.45; // 0.45 to 1.0 (depth layer)
        const paletteItem = currentPalette[Math.floor(Math.random() * currentPalette.length)];

        // Upward antigravity buoyancy: particles float upward naturally
        const baseVy = -(Math.random() * 0.45 + 0.22) * depth;

        let radius = 1.6;
        let length = 0;

        if (type === 'circle') {
          // Sharp circular dot: 1.2px - 3.2px
          radius = (Math.random() * 1.8 + 1.2) * depth;
        } else if (type === 'glow-circle') {
          // Luminous circular dot: 3.5px - 5.5px
          radius = (Math.random() * 2.2 + 3.2) * depth;
        } else {
          // Antigravity pill/capsule: width 2.2 - 3.4px, length 10 - 22px
          radius = (Math.random() * 0.8 + 1.2) * depth;
          length = (Math.random() * 12 + 10) * depth;
        }

        const baseAlpha = isWhiteMode
          ? Math.random() * 0.35 + 0.45 // Slightly higher opacity on light background
          : Math.random() * 0.45 + 0.4;  // Vibrant opacity on dark background

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
          vRot: (Math.random() - 0.5) * 0.024,
          swaySpeed: Math.random() * 0.015 + 0.008,
          swayAmp: Math.random() * 24 + 10,
          swayOffset: Math.random() * Math.PI * 2,
          depth,
          alpha: baseAlpha,
          baseAlpha,
          color: paletteItem.color,
          glowColor: paletteItem.glow,
          pulseSpeed: Math.random() * 0.03 + 0.015,
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
            p.vx += (dx / dist) * force * 0.4;
            p.vy += (dy / dist) * force * 0.4;
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
        if (p.type === 'circle') {
          // Perfectly round, pristine circular dot
          ctx.beginPath();
          ctx.arc(currentX, currentY, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.fill();
        } else if (p.type === 'glow-circle') {
          // Luminous hero circular dot with soft radial glow
          const pulse = Math.sin(time * p.pulseSpeed) * 0.35 + 1;
          const r = p.radius * pulse;
          const glowRadius = r * 2.6;

          // Ambient luminous aura
          const grad = ctx.createRadialGradient(currentX, currentY, r * 0.3, currentX, currentY, glowRadius);
          grad.addColorStop(0, p.color);
          grad.addColorStop(0.5, p.glowColor);
          grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

          ctx.beginPath();
          ctx.arc(currentX, currentY, glowRadius, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.globalAlpha = p.alpha * 0.7;
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

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
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
