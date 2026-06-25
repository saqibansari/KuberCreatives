import { useState, useRef, useEffect } from "react";
import { useReveal } from "./useReveal";
import { SectionLabel } from "./SectionLabel";

const services = [
  {
    num: "01",
    title: "Branding",
    tagline: "Built with perception.",
    desc: "From visual identity systems to brand positioning, tone of voice, and communication strategies, we shape brands that stand apart. Because the strongest brands do not chase attention.",
    img: "https://images.unsplash.com/photo-1651657700823-4af60add312b?w=800&h=600&fit=crop&auto=format",
    accent: "#C9A96E",
  },
  {
    num: "02",
    title: "Video Production",
    tagline: "Cinema for commerce.",
    desc: "Automotive films, product commercials, hospitality showcases, corporate films, music videos, documentaries. We capture emotion, energy, and identity in every frame.",
    img: "https://images.unsplash.com/photo-1490971688337-f2c79913ea7d?w=800&h=600&fit=crop&auto=format",
    accent: "#7EB8D4",
  },
  {
    num: "03",
    title: "Digital Marketing",
    tagline: "Clicks are easy. Conversions are earned.",
    desc: "Content marketing, paid advertising, audience targeting, and campaign optimization. We build digital strategies that generate visibility, engagement, and measurable growth.",
    img: "https://images.unsplash.com/photo-1671457942374-9ed89c5e2611?w=800&h=600&fit=crop&auto=format",
    accent: "#A8C5A0",
  },
  {
    num: "04",
    title: "Performance Marketing",
    tagline: "Data meets creativity.",
    desc: "Highly optimized campaigns with a strong focus on ROI, audience retention, and customer acquisition. We build systems that continuously perform and evolve.",
    img: "https://images.unsplash.com/photo-1641463982623-c9f513284a1b?w=800&h=600&fit=crop&auto=format",
    accent: "#D4A574",
  },
  {
    num: "05",
    title: "Social Media Growth",
    tagline: "Communities that last.",
    desc: "250K+ YouTube subscribers, 100M+ video views, 55M+ viral Instagram views. We transform creators and businesses into powerful personal brands.",
    img: "https://images.unsplash.com/photo-1658452241802-296f70b03df0?w=800&h=600&fit=crop&auto=format",
    accent: "#C4A8D4",
  },
  {
    num: "06",
    title: "TV Commercials",
    tagline: "Some stories deserve cinema.",
    desc: "From scripting and pre-production to filming and post-production, we create visually stunning TV commercials that elevate brand value and create lasting impressions.",
    img: "https://images.unsplash.com/photo-1681137063068-081072cf04b4?w=800&h=600&fit=crop&auto=format",
    accent: "#E8B4A0",
  },
  {
    num: "07",
    title: "Software & UI",
    tagline: "Experiences that feel effortless.",
    desc: "Responsive applications, modern interfaces, and scalable digital products built for real users. Creativity, functionality, and usability in every interaction.",
    img: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1200&h=900&dpr=2",
    accent: "#A0C4E8",
  },
  {
    num: "08",
    title: "Business Consultancy",
    tagline: "Businesses need direction.",
    desc: "Positioning, scaling strategies, audience behavior, and digital transformation. Hands-on industry experience across multiple sectors helps businesses make smarter decisions.",
    img: "https://images.unsplash.com/photo-1552858725-693709cc17c7?w=800&h=600&fit=crop&auto=format",
    accent: "#C9A96E",
  },
];

/* ─── keyframe injection ─────────────────────────────────── */
const KEYFRAMES = `
  @keyframes svc-bar-in {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }
  @keyframes svc-tag-in {
    from { opacity: 0; transform: translateY(6px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes svc-num-pop {
    0%   { transform: scale(1); }
    45%  { transform: scale(1.18); }
    100% { transform: scale(1); }
  }
`;

/* ─── helpers ────────────────────────────────────────────── */

/* ─── ServiceCard ────────────────────────────────────────── */
function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const leaveTimerRef = useRef<number | null>(null);
  const [hovered, setHovered] = useState(false);

  /* scroll-reveal entrance */
  useEffect(() => {
    return () => {
      if (leaveTimerRef.current) {
        window.clearTimeout(leaveTimerRef.current);
      }
    };
  }, []);

  const clearLeaveTimer = () => {
    if (leaveTimerRef.current) {
      window.clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
  };

  const scheduleLeave = () => {
    clearLeaveTimer();
    leaveTimerRef.current = window.setTimeout(() => {
      setHovered(false);
      leaveTimerRef.current = null;
    }, 70);
  };

  const onEnter = () => setHovered(true);
  const onLeave = () => scheduleLeave();

  const onMove = () => {
    clearLeaveTimer();
    if (!hovered) setHovered(true);
  };

  const onSafeEnter = () => {
    clearLeaveTimer();
    onEnter();
  };

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(48px)";
    const delay = (index % 4) * 80;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.transition = `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms`;
            el.style.opacity = "1";
            el.style.transform = "none";
          }, 0);
          obs.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [index]);

  return (
    <div
      ref={cardRef}
      data-cursor-expand
      onMouseEnter={onSafeEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        borderRadius: "2px",
        border: `1px solid ${hovered ? service.accent + "55" : "rgba(255,255,255,0.07)"}`,
        transition: "border-color 0.4s ease, box-shadow 0.4s ease",
        boxShadow: hovered ? `0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px ${service.accent}22` : "0 4px 20px rgba(0,0,0,0.3)",
      }}
    >
      {/* bg image */}
      {/* bg image — absolute so content, not aspect-ratio, drives card height */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${service.img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "transform 0.65s cubic-bezier(0.16,1,0.3,1), filter 0.5s ease",
          transform: hovered ? "scale(1.1)" : "scale(1)",
          filter: hovered ? "brightness(0.45) contrast(1.1)" : "brightness(0.7) contrast(1.05)",
          willChange: "transform",
        }}
      />

      {/* gradient scrim */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: hovered
            ? `linear-gradient(to top, rgba(8,8,8,0.97) 0%, rgba(8,8,8,0.6) 50%, transparent 100%)`
            : `linear-gradient(to top, rgba(8,8,8,0.78) 0%, transparent 55%)`,
          transition: "background 0.45s ease",
        }}
      />

      {/* accent bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "3px",
          width: "100%",
          background: service.accent,
          transformOrigin: "left",
          transform: hovered ? "scaleX(1)" : "scaleX(0)",
          transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
        }}
      />

      {/* corner number */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "11px",
          letterSpacing: "0.18em",
          color: hovered ? service.accent : "rgba(240,237,232,0.3)",
          transition: "color 0.35s ease, transform 0.35s ease",
          transform: hovered ? "scale(1.18)" : "scale(1)",
          zIndex: 2,
        }}
      >
        {service.num}
      </div>

      {/* content block — this drives the card height */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          minHeight: "clamp(200px, 20vw, 280px)",
          padding: "28px",
        }}
      >
        {/* title */}
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(18px, 1.9vw, 26px)",
            fontWeight: 800,
            color: "#F0EDE8",
            lineHeight: 1.15,
            letterSpacing: "-0.01em",
            transform: hovered ? "translateY(-4px)" : "translateY(0)",
            transition: "transform 0.45s cubic-bezier(0.16,1,0.3,1)",
          }}
        >
          {service.title}
        </div>

        {/* tagline */}
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "12px",
            fontStyle: "italic",
            color: service.accent,
            letterSpacing: "0.04em",
            marginTop: "6px",
            maxHeight: hovered ? "48px" : "0px",
            overflow: "hidden",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(4px)",
            transition:
              "max-height 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.35s ease 0.08s, transform 0.35s ease 0.08s",
          }}
        >
          {service.tagline}
        </div>

        {/* description */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "13px",
            fontWeight: 300,
            color: "rgba(240,237,232,0.72)",
            lineHeight: 1.75,
            margin: 0,
            marginTop: hovered ? "12px" : "0px",
            maxHeight: hovered ? "300px" : "0px",
            overflow: "hidden",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(8px)",
            transition:
              "max-height 0.55s cubic-bezier(0.16,1,0.3,1) 0.04s, margin-top 0.4s ease, opacity 0.4s ease 0.13s, transform 0.4s ease 0.13s",
          }}
        >
          {service.desc}
        </p>

        {/* arrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginTop: hovered ? "16px" : "0px",
            maxHeight: hovered ? "32px" : "0px",
            overflow: "hidden",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateX(0)" : "translateX(-8px)",
            transition:
              "max-height 0.4s ease 0.08s, margin-top 0.4s ease, opacity 0.35s ease 0.2s, transform 0.35s ease 0.2s",
          }}
        >
          <div style={{ width: "28px", height: "1px", background: service.accent }} />
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "10px",
              letterSpacing: "0.18em",
              color: service.accent,
              textTransform: "uppercase",
            }}
          >
            Explore
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── Services section ───────────────────────────────────── */
export function Services() {
  const headRef = useReveal<HTMLHeadingElement>({ delay: 0 });
  const labelRef = useReveal<HTMLDivElement>({ delay: 0 });

  return (
    <section
      id="services"
      style={{
        position: "relative",
        backgroundColor: "transparent",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        paddingTop: "120px",
        paddingBottom: "140px",
        overflow: "hidden",
      }}
    >
      <style>{KEYFRAMES}</style>

      <div style={{ position: "relative", zIndex: 1, maxWidth: "1400px", margin: "0 auto", padding: "0 48px" }}>
        {/* header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "72px",
          }}
        >
          <div>
            <div ref={labelRef}>
              <SectionLabel>What We Do</SectionLabel>
            </div>
            <h2
              ref={headRef}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(36px, 4.5vw, 64px)",
                fontWeight: 800,
                color: "#F0EDE8",
                lineHeight: "1.05",
                letterSpacing: "-0.02em",
                margin: 0,
              }}
            >
              Our Services
            </h2>
          </div>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "11px",
              letterSpacing: "0.15em",
              color: "rgba(240,237,232,0.3)",
              textTransform: "uppercase",
            }}
          >
            {String(services.length).padStart(2, "0")} Disciplines
          </span>
        </div>

        {/* ── uniform 4-column grid ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "16px",
          }}
        >
          {services.map((s, i) => (
            <ServiceCard key={s.num} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Services section closes here ──────────────────────── */

// stub retained so TypeScript doesn't complain about unused import paths
function ServiceRow(_p: { service: (typeof services)[0]; isActive: boolean; onHover: (a: boolean) => void }) {
  return null;
}
void ServiceRow;
