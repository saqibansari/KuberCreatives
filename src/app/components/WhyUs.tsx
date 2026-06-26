import { useReveal } from "./useReveal";
import { SectionLabel } from "./SectionLabel";

const reasons = [
  {
    num: "01",
    title: "Luxury Precision",
    desc: "We understand premium presentation. Every visual, every frame, every word is crafted to command attention and respect from the most discerning audiences.",
  },
  {
    num: "02",
    title: "Performance Focus",
    desc: "Creativity without results is just art. We align storytelling with conversion strategy, building campaigns that deliver measurable ROI alongside premium aesthetics.",
  },
  {
    num: "03",
    title: "Cross-Market Expertise",
    desc: "Operating across India and the GCC, we understand the pulse of modern marketing and consumer behavior across different regions, cultures, and platforms.",
  },
  {
    num: "04",
    title: "Fresh Creative Thinking",
    desc: "We do not believe in generic content or repetitive campaigns. Every project gets a fresh approach — premium execution, performance-focused strategy, and original creative vision.",
  },
];

const punchlines = [
  "Turning Attention Into Obsession.",
  "Where Creativity Meets Conversion.",
  "Designed To Be Remembered.",
  "Good Brands Exist. Great Brands Lead.",
];

export function WhyUs() {
  const labelRef = useReveal<HTMLDivElement>({ delay: 0, direction: "right" });
  const headRef = useReveal<HTMLHeadingElement>({ delay: 100, direction: "right" });
  const quoteRef = useReveal<HTMLDivElement>({ delay: 200, direction: "left" });

  return (
    <section
      style={{
        position: "relative",
        backgroundColor: "transparent",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "160px 48px",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "relative", zIndex: 1, maxWidth: "1400px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "120px" }}>
          <div>
            <div ref={labelRef}><SectionLabel>Why Kuber Creatives</SectionLabel></div>
            <h2
              ref={headRef}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(36px, 4vw, 56px)",
                fontWeight: 800,
                color: "#F0EDE8",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                margin: "0 0 64px",
              }}
            >
              Why Brands<br />Choose Us
            </h2>

            {reasons.map((r, i) => (
              <ReasonItem key={r.num} reason={r} index={i} />
            ))}
          </div>

          <div>
            {/* Philosophy quote */}
            <div
              ref={quoteRef}
              style={{
                borderLeft: "2px solid #C9A96E",
                paddingLeft: "40px",
                marginBottom: "80px",
                marginTop: "80px",
              }}
            >
              <blockquote
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(24px, 2.5vw, 36px)",
                  fontWeight: 700,
                  fontStyle: "italic",
                  color: "#F0EDE8",
                  lineHeight: 1.4,
                  margin: "0 0 24px",
                }}
              >
                "If your audience remembers you, your brand wins."
              </blockquote>
              <cite
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "11px",
                  letterSpacing: "0.2em",
                  color: "#C9A96E",
                  textTransform: "uppercase",
                  fontStyle: "normal",
                }}
              >
                — Kuber Creatives Philosophy
              </cite>
            </div>

            {/* Punchlines */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {punchlines.map((line, i) => (
                <PunchLine key={i} text={line} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ReasonItem({ reason, index }: { reason: (typeof reasons)[0]; index: number }) {
  const ref = useReveal<HTMLDivElement>({ delay: index * 100, direction: "right" });

  return (
    <div
      ref={ref}
      style={{
        display: "grid",
        gridTemplateColumns: "48px 1fr",
        gap: "24px",
        paddingBottom: "36px",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        marginBottom: "36px",
      }}
    >
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "11px",
          color: "#C9A96E",
          letterSpacing: "0.1em",
          paddingTop: "4px",
        }}
      >
        {reason.num}
      </span>
      <div>
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "22px",
            fontWeight: 700,
            color: "#F0EDE8",
            marginBottom: "12px",
          }}
        >
          {reason.title}
        </div>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "14px",
            fontWeight: 300,
            color: "rgba(240,237,232,0.55)",
            lineHeight: "1.8",
            margin: 0,
          }}
        >
          {reason.desc}
        </p>
      </div>
    </div>
  );
}

function PunchLine({ text, index }: { text: string; index: number }) {
  const ref = useReveal<HTMLDivElement>({ delay: index * 80, direction: "left" });

  return (
    <div
      ref={ref}
      style={{
        padding: "20px 0",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(16px, 1.5vw, 20px)",
        fontStyle: "italic",
        color: "rgba(240,237,232,0.35)",
        transition: "color 0.3s ease",
        cursor: "default",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A96E")}
      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(240,237,232,0.35)")}
    >
      {text}
    </div>
  );
}
