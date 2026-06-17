import { useEffect, useRef } from "react";
import { Marquee } from "./Marquee";

const stats = [
  { value: 500, suffix: "+", label: "Successful Campaigns Executed" },
  { value: 300, suffix: "+", label: "Real Estate Sales via Marketing" },
  { value: 100, suffix: "M+", label: "Combined Video Views" },
  { value: 250, suffix: "K+", label: "YouTube Audience Growth" },
  { value: 55, suffix: "M+", label: "Viral Instagram Views" },
];

const clients = [
  "Mercedes-Benz", "Lamborghini", "Ferrari", "Nissan", "Samsung",
  "OnePlus", "Dubai Duty Free", "Johnnie Walker", "Dubai Tourism",
  "Supercar Blondie", "Mo Vlogs", "Daniel Mac",
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const start = performance.now();
          const animate = (now: number) => {
            const t = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - t, 3);
            el.textContent = Math.round(ease * target) + suffix;
            if (t < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    el.textContent = "0" + suffix;
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, suffix]);

  return <span ref={ref}>0{suffix}</span>;
}

export function Stats() {
  return (
    <section
      style={{
        backgroundColor: "#0D0D0D",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Stats grid */}
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "120px 48px",
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "0",
        }}
      >
        {stats.map((s, i) => (
          <div
            key={i}
            style={{
              padding: "40px 32px",
              borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(40px, 4vw, 64px)",
                fontWeight: 900,
                color: "#C9A96E",
                lineHeight: 1,
                marginBottom: "12px",
              }}
            >
              <CountUp target={s.value} suffix={s.suffix} />
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "12px",
                fontWeight: 400,
                color: "rgba(240,237,232,0.4)",
                lineHeight: 1.5,
                maxWidth: "120px",
                margin: "0 auto",
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Marquee */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          padding: "32px 0",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(13px, 1.4vw, 17px)",
            fontWeight: 400,
            letterSpacing: "0.05em",
            color: "rgba(240,237,232,0.35)",
            textTransform: "uppercase",
          }}
        >
          <Marquee items={clients} speed={50} />
        </div>
      </div>
    </section>
  );
}
