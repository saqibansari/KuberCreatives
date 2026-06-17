import { useEffect, useRef, useState } from "react";
import { SectionLabel } from "./SectionLabel";
import { useReveal } from "./useReveal";

const projects = [
  {
    id: 1,
    title: "Lamborghini Launch",
    category: "Automotive Film",
    location: "Dubai, UAE",
    img: "https://images.unsplash.com/photo-1623575398807-ff30453553a9?w=900&h=600&fit=crop&auto=format",
    accent: "#C9A96E",
    description: "High-impact launch film showcasing performance and design excellence.",
  },
  {
    id: 2,
    title: "Ferrari Campaign",
    category: "Brand Campaign",
    location: "India",
    img: "https://images.unsplash.com/photo-1735013189841-79729fcc3a57?w=900&h=600&fit=crop&auto=format",
    accent: "#7EB8D4",
    description: "Strategic brand campaign expanding market presence and engagement.",
  },
  {
    id: 3,
    title: "Dubai Tourism",
    category: "Digital Campaign",
    location: "Dubai, UAE",
    img: "https://images.unsplash.com/photo-1641463982623-c9f513284a1b?w=900&h=600&fit=crop&auto=format",
    accent: "#A8C5A0",
    description: "Immersive digital experience driving tourism and cultural discovery.",
  },
  {
    id: 4,
    title: "Supercar Blondie",
    category: "Social Media Growth",
    location: "Global",
    img: "https://images.unsplash.com/photo-1735013189295-ddb63e404945?w=900&h=600&fit=crop&auto=format",
    accent: "#D4A574",
    description: "Viral content strategy generating millions of engagements worldwide.",
  },
  {
    id: 5,
    title: "Mercedes-Benz",
    category: "Commercial Photography",
    location: "GCC",
    img: "https://images.unsplash.com/photo-1652241802-296f70b03df0?w=900&h=600&fit=crop&auto=format",
    accent: "#E8B4A0",
    description: "Premium lifestyle visuals capturing luxury and precision engineering.",
  },
];

function WorkCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateX(-40px)";
    const delay = index * 100;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.transition = `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}ms`;
            el.style.opacity = "1";
            el.style.transform = "translateX(0)";
          }, 0);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        cursor: "pointer",
        perspective: "1000px",
        position: "relative",
        borderRadius: "2px",
        border: `1px solid ${hovered ? project.accent + "44" : "rgba(255,255,255,0.08)"}`,
        transition: "border-color 0.35s ease",
        boxShadow: hovered ? `0 16px 48px rgba(0,0,0,0.45), 0 0 0 1px ${project.accent}22` : "0 2px 12px rgba(0,0,0,0.3)",
      }}
    >
      {/* Flip container */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "clamp(320px, 36vw, 420px)",
          transformStyle: "preserve-3d",
          transform: hovered ? "rotateY(180deg)" : "rotateY(0deg)",
          transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* FRONT FACE */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${project.img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transition: "transform 0.7s cubic-bezier(0.16,1,0.3,1), filter 0.5s ease",
              transform: hovered ? "scale(1.06)" : "scale(1)",
              filter: hovered ? "brightness(0.5) contrast(1.1)" : "brightness(0.75) contrast(1.05)",
            }}
          />

          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(to bottom, transparent 50%, rgba(8,8,8,0.5) 100%)`,
            }}
          />

          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "2px",
              background: project.accent,
            }}
          />

          <div
            style={{
              position: "absolute",
              inset: 0,
              padding: "36px 30px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              zIndex: 2,
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "10px",
                letterSpacing: "0.18em",
                color: "rgba(240,237,232,0.6)",
                textTransform: "uppercase",
                marginBottom: "12px",
              }}
            >
              {project.category}
            </div>

            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(18px, 2.4vw, 28px)",
                fontWeight: 800,
                color: "#F0EDE8",
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
                marginBottom: "12px",
              }}
            >
              {project.title}
            </div>

            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "11px",
                letterSpacing: "0.15em",
                color: project.accent,
                textTransform: "uppercase",
                marginTop: "auto",
              }}
            >
              → {project.location}
            </div>
          </div>
        </div>

        {/* BACK FACE */}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: `linear-gradient(135deg, ${project.accent}14 0%, ${project.accent}08 100%)`,
            backdropFilter: "blur(10px)",
            border: `1px solid ${project.accent}33`,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "36px 30px",
            overflow: "hidden",
          }}
        >
          {/* Top accent bar */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "3px",
              background: `linear-gradient(90deg, ${project.accent}, transparent)`,
            }}
          />

          <div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "9px",
                letterSpacing: "0.2em",
                color: project.accent,
                textTransform: "uppercase",
                marginBottom: "16px",
                opacity: 0.8,
              }}
            >
              PROJECT DETAILS
            </div>

            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "20px",
                fontWeight: 800,
                color: "#F0EDE8",
                lineHeight: 1.2,
                marginBottom: "20px",
              }}
            >
              {project.title}
            </div>

            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                color: "rgba(240,237,232,0.85)",
                lineHeight: 1.6,
                marginBottom: "20px",
              }}
            >
              {project.description}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: "16px",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "9px",
                  letterSpacing: "0.15em",
                  color: "rgba(240,237,232,0.5)",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}
              >
                Location
              </div>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "14px",
                  color: project.accent,
                  fontWeight: 600,
                }}
              >
                {project.location}
              </div>
            </div>

            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: project.accent + "22",
                border: `2px solid ${project.accent}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke={project.accent}
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Work() {
  const labelRef = useReveal<HTMLDivElement>({ delay: 0 });
  const headRef = useReveal<HTMLHeadingElement>({ delay: 100 });

  return (
    <section
      id="work"
      style={{
        backgroundColor: "#080808",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "140px 48px",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
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
              <SectionLabel>Selected Work</SectionLabel>
            </div>
            <h2
              ref={headRef}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(36px, 4.5vw, 64px)",
                fontWeight: 800,
                color: "#F0EDE8",
                lineHeight: 1.05,
                letterSpacing: "-0.02em",
                margin: 0,
              }}
            >
              Work That <em style={{ color: "#C9A96E" }}>Moves</em>
              <br />
              People & Markets
            </h2>
          </div>
          <a
            href="#contact"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "13px",
              color: "rgba(240,237,232,0.5)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A96E")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(240,237,232,0.5)")}
          >
            View All
            <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
              <path d="M0 6H18M13 1L18 6L13 11" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </a>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "16px",
          }}
        >
          {projects.map((p, i) => (
            <WorkCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
