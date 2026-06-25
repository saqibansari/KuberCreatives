import { useReveal } from "./useReveal";
import { SectionLabel } from "./SectionLabel";
import { Marquee } from "./Marquee";

const industries = [
  "Automotive Brands", "Luxury Lifestyle", "Hospitality & Resorts",
  "Technology Companies", "Tourism & Travel", "Real Estate",
  "Fashion & Lifestyle", "Personal Brands", "Restaurants & Cafes",
  "Corporate Business", "Entertainment & Music", "Influencers & Creators",
];

export function Industries() {
  const labelRef = useReveal<HTMLDivElement>({ delay: 0 });
  const headRef = useReveal<HTMLHeadingElement>({ delay: 100 });
  const textRef = useReveal<HTMLParagraphElement>({ delay: 200 });

  return (
    <section
      style={{
        position: "relative",
        backgroundColor: "transparent",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        paddingTop: "120px",
        paddingBottom: "80px",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 48px 80px" }}>
        <div ref={labelRef}><SectionLabel>Industries We Work With</SectionLabel></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "end" }}>
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
            Built For Every Industry That Wants To Lead
          </h2>
          <p
            ref={textRef}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "16px",
              fontWeight: 300,
              color: "rgba(240,237,232,0.55)",
              lineHeight: "2",
              margin: 0,
            }}
          >
            No matter the industry, the goal remains the same. Create impact that people remember. We have successfully delivered campaigns and creative solutions across the world's most competitive markets.
          </p>
        </div>
      </div>

      {/* Marquee rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            padding: "28px 0",
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(22px, 2.5vw, 32px)",
            fontWeight: 700,
            color: "rgba(240,237,232,0.7)",
            fontStyle: "italic",
          }}
        >
          <Marquee items={industries.slice(0, 6)} speed={35} />
        </div>
        <div
          style={{
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            padding: "28px 0",
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(22px, 2.5vw, 32px)",
            fontWeight: 700,
            color: "rgba(240,237,232,0.35)",
            fontStyle: "normal",
          }}
        >
          <Marquee items={industries.slice(6)} speed={28} direction="right" />
        </div>
      </div>
    </section>
  );
}
