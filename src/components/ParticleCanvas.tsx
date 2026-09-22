import { useEffect, useRef } from 'react';

interface ParticleCanvasProps {
  isWhiteMode?: boolean;
}

export default function ParticleCanvas({ isWhiteMode = false }: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let animationFrameId: number;
    const mouse = { x: -1000, y: -1000, vx: 0, vy: 0, lastX: -1000, lastY: -1000, radius: 190 };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.vx = e.clientX - mouse.x;
      mouse.vy = e.clientY - mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.vx = 0;
      mouse.vy = 0;
    };

    // Click produces an anti-gravity outward shockwave blast
    const handleClick = (e: MouseEvent) => {
      const clickX = e.clientX;
      const clickY = e.clientY;
      const blastRadius = 320;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dx = p.x - clickX;
        const dy = p.y - clickY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < blastRadius && dist > 0) {
          const force = ((blastRadius - dist) / blastRadius) * 11;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force - 3.5; // Antigravity upward impulse
        }
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleClick);

    // Color palettes inspired by Google Antigravity spectrum:
    // Left: Cobalt Blues, Cyan, Indigo, Violet
    // Center: Cyan, Teal, Emerald Green
    // Right: Amber Gold, Coral Orange, Crimson Red, Deep Slate
    const darkPalette = [
      '#4285F4', // Google Blue
      '#24C1E0', // Cyan
      '#6366F1', // Indigo
      '#A855F7', // Purple
      '#EC4899', // Pink
      '#EA4335', // Google Red / Coral
      '#FF7043', // Orange
      '#FBBC05', // Google Yellow / Amber
      '#34A853', // Google Green
      '#FFFFFF', // Pure White Star
      '#94A3B8', // Silver Slate
    ];

    const whitePalette = [
      '#1A73E8', // Rich Google Blue
      '#0284C7', // Deep Sky
      '#06B6D4', // Vibrant Cyan
      '#7C3AED', // Vivid Violet
      '#D946EF', // Fuchsia
      '#EA4335', // Coral Red
      '#F97316', // Bright Tangerine
      '#F59E0B', // Warm Amber
      '#10B981', // Emerald
      '#0F172A', // Crisp Charcoal Slate
      '#334155', // Slate
    ];

    class AntigravityParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      baseSpeedX: number;
      baseSpeedY: number;
      length: number;
      thickness: number;
      isCapsule: boolean;
      color: string;
      alpha: number;
      angle: number;
      targetAngle: number;
      rotationSpeed: number;
      orbitCenterX: number;
      orbitCenterY: number;
      orbitRadius: number;
      orbitAngle: number;
      orbitSpeed: number;
      pulsePhase: number;
      pulseSpeed: number;

      constructor(whiteMode: boolean) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;

        // Shape type: 65% elongated capsules/dashes, 35% circular speckles
        this.isCapsule = Math.random() < 0.68;
        if (this.isCapsule) {
          this.length = Math.random() * 6.5 + 4.5; // 4.5 to 11px
          this.thickness = Math.random() * 1.4 + 2.0; // 2.0 to 3.4px
        } else {
          this.length = Math.random() * 1.8 + 1.2; // Tiny dot radius
          this.thickness = this.length;
        }

        // Chromatic placement based on horizontal location across screen
        const xRatio = this.x / Math.max(width, 1);
        const palette = whiteMode ? whitePalette : darkPalette;

        let colorIndex: number;
        const colorRand = Math.random();

        if (colorRand < 0.12) {
          // Charcoal / Slate specks sprinkled everywhere
          colorIndex = whiteMode ? 9 : 9;
        } else if (xRatio < 0.35) {
          // Left side: Blues, Cyans, Purples, Violets
          const leftColors = [0, 1, 2, 3, 4];
          colorIndex = leftColors[Math.floor(Math.random() * leftColors.length)];
        } else if (xRatio < 0.65) {
          // Center: Cyans, Blues, Greens, Purples
          const centerColors = [1, 2, 8, 3, 0];
          colorIndex = centerColors[Math.floor(Math.random() * centerColors.length)];
        } else {
          // Right side: Reds, Corals, Oranges, Ambers, Greens
          const rightColors = [5, 6, 7, 8, 10];
          colorIndex = rightColors[Math.floor(Math.random() * rightColors.length)];
        }

        this.color = palette[colorIndex];
        this.alpha = Math.random() * 0.35 + (whiteMode ? 0.65 : 0.6);

        // Orbital flow properties
        this.orbitCenterX = width * 0.45 + (Math.random() - 0.5) * 200;
        this.orbitCenterY = height * 0.4 + (Math.random() - 0.5) * 200;
        this.orbitRadius = Math.hypot(this.x - this.orbitCenterX, this.y - this.orbitCenterY);
        this.orbitAngle = Math.atan2(this.y - this.orbitCenterY, this.x - this.orbitCenterX);
        this.orbitSpeed = (Math.random() * 0.0018 + 0.0006) * (Math.random() < 0.5 ? 1 : -1);

        // Ambient anti-gravity drift (gentle floating upwards & outwards)
        this.baseSpeedX = (Math.random() - 0.5) * 0.35;
        this.baseSpeedY = -Math.random() * 0.3 - 0.08;
        this.vx = this.baseSpeedX;
        this.vy = this.baseSpeedY;

        this.angle = this.orbitAngle + Math.PI / 2;
        this.targetAngle = this.angle;
        this.rotationSpeed = Math.random() * 0.04 + 0.01;

        this.pulsePhase = Math.random() * Math.PI * 2;
        this.pulseSpeed = Math.random() * 0.03 + 0.01;
      }

      update() {
        this.pulsePhase += this.pulseSpeed;

        // Orbit update
        this.orbitAngle += this.orbitSpeed;
        const targetOrbitX = this.orbitCenterX + Math.cos(this.orbitAngle) * this.orbitRadius;
        const targetOrbitY = this.orbitCenterY + Math.sin(this.orbitAngle) * this.orbitRadius;

        // Flow towards orbital track with loose spring physics
        const orbitDx = targetOrbitX - this.x;
        const orbitDy = targetOrbitY - this.y;
        this.vx += orbitDx * 0.0007;
        this.vy += orbitDy * 0.0007;

        // Apply velocities with anti-gravity upward bias
        this.x += this.vx;
        this.y += this.vy;

        // Friction dampening
        this.vx *= 0.96;
        this.vy *= 0.96;

        // Maintain minimum float
        if (Math.abs(this.vx) < 0.08) this.vx += this.baseSpeedX * 0.5;
        if (Math.abs(this.vy) < 0.08) this.vy += this.baseSpeedY * 0.5;

        // Antigravity repulsion from cursor
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius && dist > 0) {
          const force = ((mouse.radius - dist) / mouse.radius);
          // Push away radially
          const pushX = (dx / dist) * force * 5.2;
          const pushY = (dy / dist) * force * 5.2;
          this.vx -= pushX;
          this.vy -= pushY;

          // Align capsule angle with acceleration vector (liftoff streak)
          this.targetAngle = Math.atan2(this.vy, this.vx);
        } else {
          // When floating, orient along orbit streamline or motion
          const speed = Math.hypot(this.vx, this.vy);
          if (speed > 0.4) {
            this.targetAngle = Math.atan2(this.vy, this.vx);
          } else {
            this.targetAngle = this.orbitAngle + Math.PI / 2 + Math.sin(this.pulsePhase) * 0.3;
          }
        }

        // Smooth rotation interpolation
        let diff = this.targetAngle - this.angle;
        while (diff < -Math.PI) diff += Math.PI * 2;
        while (diff > Math.PI) diff -= Math.PI * 2;
        this.angle += diff * 0.08;

        // Boundary wrap
        const pad = 30;
        if (this.x < -pad) {
          this.x = width + pad;
          this.orbitCenterX = width * 0.45;
        }
        if (this.x > width + pad) {
          this.x = -pad;
          this.orbitCenterX = width * 0.45;
        }
        if (this.y < -pad) {
          this.y = height + pad;
          this.orbitCenterY = height * 0.4;
        }
        if (this.y > height + pad) {
          this.y = -pad;
          this.orbitCenterY = height * 0.4;
        }
      }

      draw() {
        if (!ctx) return;
        const currentAlpha = Math.min(Math.max(this.alpha + Math.sin(this.pulsePhase) * 0.15, 0.2), 1);

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        ctx.fillStyle = this.color;
        ctx.globalAlpha = currentAlpha;

        if (this.isCapsule) {
          // Dynamic stretch on high velocity (liftoff effect)
          const speed = Math.hypot(this.vx, this.vy);
          const dynamicLen = this.length + Math.min(speed * 3.5, 12);
          const halfLen = dynamicLen / 2;
          const halfThick = this.thickness / 2;

          ctx.beginPath();
          if (typeof ctx.roundRect === 'function') {
            ctx.roundRect(-halfLen, -halfThick, dynamicLen, this.thickness, halfThick);
          } else {
            ctx.arc(-halfLen + halfThick, 0, halfThick, Math.PI / 2, (Math.PI * 3) / 2);
            ctx.arc(halfLen - halfThick, 0, halfThick, (Math.PI * 3) / 2, Math.PI / 2);
            ctx.closePath();
          }
          ctx.fill();

          // Soft glow halo on vibrant particles in dark mode
          if (!isWhiteMode && this.length > 7) {
            ctx.shadowColor = this.color;
            ctx.shadowBlur = 6;
          }
        } else {
          // Circular speckle / confetti dot
          ctx.beginPath();
          ctx.arc(0, 0, this.length, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }
    }

    // High density count matching Google Antigravity (180 to 280 particles)
    const count = Math.min(Math.max(Math.floor(window.innerWidth / 5.5), 160), 280);
    const particles: AntigravityParticle[] = [];
    for (let i = 0; i < count; i++) {
      particles.push(new AntigravityParticle(isWhiteMode));
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render all Google Antigravity particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isWhiteMode]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 transition-opacity duration-700 ${
        isWhiteMode ? 'opacity-90' : 'opacity-85'
      }`}
      aria-hidden="true"
    />
  );
}
