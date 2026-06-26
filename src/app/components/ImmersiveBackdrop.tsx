import { useEffect, useRef } from "react";

type ImmersiveBackdropProps = {
  accent: string;
  coolAccent: string;
};

export function ImmersiveBackdrop({ accent, coolAccent }: ImmersiveBackdropProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let rafId = 0;
    let pointerX = 0;
    let pointerY = 0;
    let scrollProgress = 0;
    let width = 0;
    let height = 0;

    type Particle = {
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      size: number;
    };

    const particles: Particle[] = Array.from({ length: 26 }, () => ({
      x: Math.random(),
      y: Math.random(),
      z: 0.25 + Math.random() * 0.75,
      vx: (Math.random() - 0.5) * 0.00004,
      vy: (Math.random() - 0.5) * 0.00004,
      size: 0.8 + Math.random() * 1.8,
    }));

    const resize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = document.documentElement.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const context = canvas.getContext("2d");
      if (context) {
        context.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
    };

    const draw = () => {
      rafId = 0;

      const canvas = canvasRef.current;
      const context = canvas?.getContext("2d");
      if (!canvas || !context || width <= 0 || height <= 0) return;

      context.clearRect(0, 0, width, height);

      const base = context.createLinearGradient(0, 0, width, height);
      base.addColorStop(0, "rgba(3,7,10,0.98)");
      base.addColorStop(0.52, "rgba(4,9,12,0.93)");
      base.addColorStop(1, "rgba(1,2,4,0.99)");
      context.fillStyle = base;
      context.fillRect(0, 0, width, height);

      const glowX = width * (0.25 + pointerX * 0.08);
      const glowY = height * (0.2 + pointerY * 0.06);
      const warmGlow = context.createRadialGradient(glowX, glowY, 0, glowX, glowY, width * 0.32);
      warmGlow.addColorStop(0, `${accent}2a`);
      warmGlow.addColorStop(0.42, `${accent}10`);
      warmGlow.addColorStop(1, "rgba(0,0,0,0)");
      context.fillStyle = warmGlow;
      context.fillRect(0, 0, width, height);

      const coolX = width * (0.72 - pointerX * 0.05);
      const coolY = height * (0.7 + pointerY * 0.05);
      const coolGlow = context.createRadialGradient(coolX, coolY, 0, coolX, coolY, width * 0.26);
      coolGlow.addColorStop(0, `${coolAccent}22`);
      coolGlow.addColorStop(0.4, `${coolAccent}0d`);
      coolGlow.addColorStop(1, "rgba(0,0,0,0)");
      context.fillStyle = coolGlow;
      context.fillRect(0, 0, width, height);

      context.save();
      context.globalAlpha = 0.07 + scrollProgress * 0.08;
      context.strokeStyle = "rgba(255,255,255,0.08)";
      context.lineWidth = 1;
      const spacing = 96;
      const shiftX = (width * 0.1 + pointerX * 22) % spacing;
      const shiftY = (height * 0.05 + scrollProgress * 36) % spacing;

      for (let x = -spacing; x < width + spacing; x += spacing) {
        context.beginPath();
        context.moveTo(x + shiftX, 0);
        context.lineTo(x + shiftX, height);
        context.stroke();
      }

      for (let y = -spacing; y < height + spacing; y += spacing) {
        context.beginPath();
        context.moveTo(0, y + shiftY);
        context.lineTo(width, y + shiftY);
        context.stroke();
      }
      context.restore();

      context.save();
      context.globalCompositeOperation = "lighter";

      particles.forEach((particle, index) => {
        particle.x = (particle.x + particle.vx + pointerX * 0.00003 + 1) % 1;
        particle.y = (particle.y + particle.vy + pointerY * 0.00003 + 1) % 1;

        const x = particle.x * width + Math.sin(scrollProgress * Math.PI * 2 + index) * 14 * particle.z;
        const y = particle.y * height + Math.cos(scrollProgress * Math.PI * 2 + index * 1.7) * 10 * particle.z;
        const radius = particle.size * (1.6 + particle.z * 2.2);
        const alpha = 0.05 + particle.z * 0.09;

        const particleGlow = context.createRadialGradient(x, y, 0, x, y, radius * 15);
        particleGlow.addColorStop(0, `${index % 2 === 0 ? accent : coolAccent}${Math.round(alpha * 255)
          .toString(16)
          .padStart(2, "0")}`);
        particleGlow.addColorStop(0.4, "rgba(255,255,255,0.025)");
        particleGlow.addColorStop(1, "rgba(255,255,255,0)");

        context.fillStyle = particleGlow;
        context.beginPath();
        context.arc(x, y, radius * (2.2 + particle.z * 1.8), 0, Math.PI * 2);
        context.fill();
      });

      context.restore();

      const vignette = context.createRadialGradient(width * 0.5, height * 0.42, width * 0.14, width * 0.5, height * 0.5, width * 0.82);
      vignette.addColorStop(0, "rgba(0,0,0,0)");
      vignette.addColorStop(0.72, "rgba(0,0,0,0.2)");
      vignette.addColorStop(1, "rgba(0,0,0,0.62)");
      context.fillStyle = vignette;
      context.fillRect(0, 0, width, height);
    };

    const schedule = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(draw);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      if (window.innerWidth < 900) return;

      pointerX = (event.clientX / window.innerWidth - 0.5) * 2;
      pointerY = (event.clientY / window.innerHeight - 0.5) * 2;
      schedule();
    };

    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress = total > 0 ? Math.min(Math.max(window.scrollY / total, 0), 1) : 0;
      schedule();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize);
    resize();
    onScroll();

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [accent, coolAccent]);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 0,
        opacity: 0.95,
        mixBlendMode: "screen",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}