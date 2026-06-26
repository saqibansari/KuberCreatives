import { useReveal } from "./useReveal";
import { SectionLabel } from "./SectionLabel";

export function About() {
  const labelRef = useReveal<HTMLDivElement>({ delay: 0, direction: "right" });
  const headRef = useReveal<HTMLHeadingElement>({ delay: 100, direction: "right" });
  const textRef = useReveal<HTMLParagraphElement>({ delay: 220, direction: "up" });
  const imgRef = useReveal<HTMLDivElement>({ delay: 80, direction: "left" });
  const statsRef = useReveal<HTMLDivElement>({ delay: 300, direction: "right" });

  return (
    <section
      id="about"
      style={{
        position: "relative",
        backgroundColor: "transparent",
        overflow: "hidden",
        padding: "160px 48px",
        maxWidth: "1400px",
        margin: "0 auto",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "44px" }}>
        <div ref={labelRef}>
          <SectionLabel>About Us</SectionLabel>
        </div>

        <div
          ref={statsRef}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
            flexWrap: "wrap",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            paddingBottom: "24px",
          }}
        >
          <h2
            ref={headRef}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(30px, 4vw, 56px)",
              fontWeight: 800,
              color: "#F0EDE8",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              margin: 0,
              whiteSpace: "nowrap",
            }}
          >
            Creativity Backed By Strategy
          </h2>

          <div style={{ display: "flex", gap: "28px", flexWrap: "wrap", justifyContent: "flex-end" }}>
            {[
              { num: "10+", label: "Experience" },
              { num: "500+", label: "Campaigns" },
              { num: "2", label: "Continents" },
            ].map((s) => (
              <div key={s.label}>
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(24px, 2.5vw, 36px)",
                  fontWeight: 900,
                  color: "#C9A96E",
                  lineHeight: 1,
                  marginBottom: "6px",
                }}
              >
                {s.num}
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "10px",
                  letterSpacing: "0.16em",
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

      <div ref={imgRef} style={{ position: "relative", width: "100%" }}>
        <div
          style={{
            width: "100%",
          }}
        >
          <img
            src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExZjZxMmMxbXZ3M3d2OHVhbG8xdWRxZ25rYTNzY3hrMTcxNDdoa29sYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3CkGTumD6S5hhCRyuK/giphy.gif"
            alt="Brand promotion stage event motion"
            style={{
              width: "100%",
              height: "clamp(220px, 32vw, 420px)",
              objectFit: "cover",
              filter: "brightness(0.84) contrast(1.08)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          />
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          gap: "42px",
          alignItems: "start",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          paddingTop: "32px",
        }}
      >
        <p
          ref={textRef}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "16px",
            fontWeight: 300,
            color: "rgba(240,237,232,0.68)",
            lineHeight: 1.95,
            margin: 0,
          }}
        >
          Kuber Creatives is a full-service creative and marketing powerhouse built for modern brands that want more than just visibility. We combine storytelling, branding, digital marketing, video production, performance campaigns, and technology to create experiences that connect and deliver measurable impact.
        </p>

        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "16px",
            fontWeight: 300,
            color: "rgba(240,237,232,0.62)",
            lineHeight: 1.95,
            margin: 0,
          }}
        >
          Over the years, we have worked across automotive, luxury lifestyle, hospitality, technology, tourism, real estate, and entertainment industries. Operating from India through to the GCC under Andromedia Solutions LLC.
        </p>
      </div>
      </div>
    </section>
  );
}
