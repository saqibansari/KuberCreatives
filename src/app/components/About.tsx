import { useReveal } from "./useReveal";
import { SectionLabel } from "./SectionLabel";

export function About() {
  const labelRef = useReveal<HTMLDivElement>({ delay: 0 });
  const headRef = useReveal<HTMLHeadingElement>({ delay: 100 });
  const textRef = useReveal<HTMLParagraphElement>({ delay: 220 });
  const imgRef = useReveal<HTMLDivElement>({ delay: 80, direction: "left" });
  const statsRef = useReveal<HTMLDivElement>({ delay: 300 });

  return (
    <section
      id="about"
      style={{
        backgroundColor: "#080808",
        padding: "160px 48px",
        maxWidth: "1400px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "80px",
        alignItems: "center",
      }}
    >
      <div>
        <div ref={labelRef}>
          <SectionLabel>About Us</SectionLabel>
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
            margin: "0 0 32px",
          }}
        >
          Creativity
          <br />
          <em style={{ color: "#C9A96E", fontStyle: "italic" }}>Backed By</em>
          <br />
          Strategy
        </h2>
        <p
          ref={textRef}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "16px",
            fontWeight: 300,
            color: "rgba(240,237,232,0.6)",
            lineHeight: "2",
            marginBottom: "24px",
            maxWidth: "480px",
          }}
        >
          Kuber Creatives is a full-service creative and marketing powerhouse built for modern brands that want more than just visibility. We combine storytelling, branding, digital marketing, video production, performance campaigns, and technology to create experiences that connect and deliver measurable impact.
        </p>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "16px",
            fontWeight: 300,
            color: "rgba(240,237,232,0.6)",
            lineHeight: "2",
            maxWidth: "480px",
          }}
        >
          Over the years, we have worked across automotive, luxury lifestyle, hospitality, technology, tourism, real estate, and entertainment industries. Operating from India through to the GCC under Andromedia Solutions LLC.
        </p>

        <div
          ref={statsRef}
          style={{
            display: "flex",
            gap: "48px",
            marginTop: "56px",
            paddingTop: "40px",
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {[
            { num: "10+", label: "Years Experience" },
            { num: "500+", label: "Campaigns" },
            { num: "2", label: "Continents" },
          ].map((s) => (
            <div key={s.label}>
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(28px, 3vw, 44px)",
                  fontWeight: 900,
                  color: "#C9A96E",
                  lineHeight: 1,
                  marginBottom: "8px",
                }}
              >
                {s.num}
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "11px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "rgba(240,237,232,0.4)",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div ref={imgRef} style={{ position: "relative" }}>
        <div
          style={{
            aspectRatio: "3/4",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1767907571229-01cf4ba03590?w=800&h=1100&fit=crop&auto=format"
            alt="Two luxury sports cars in a dark showroom"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "brightness(0.85) contrast(1.1)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to bottom, transparent 60%, rgba(8,8,8,0.6) 100%)",
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "-20px",
            right: "-20px",
            width: "200px",
            height: "200px",
            border: "1px solid rgba(201,169,110,0.2)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
            background: "rgba(8,8,8,0.9)",
            border: "1px solid rgba(255,255,255,0.08)",
            padding: "20px 24px",
            backdropFilter: "blur(12px)",
          }}
        >
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "10px",
              letterSpacing: "0.2em",
              color: "#C9A96E",
              textTransform: "uppercase",
              marginBottom: "8px",
            }}
          >
            From India to the GCC
          </div>
          <div
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "20px",
              fontWeight: 700,
              color: "#F0EDE8",
            }}
          >
            A Decade of Impact
          </div>
        </div>
      </div>
    </section>
  );
}
