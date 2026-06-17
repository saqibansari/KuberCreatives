import { Marquee } from "./Marquee";

const tagline = [
  "We Build Recall", "Turning Attention Into Obsession", "From Vision To Virality",
  "Built For Brands That Refuse To Blend In", "Luxury Is Not Just A Look",
];

export function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#050505",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Giant tagline marquee */}
      <div
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "40px 0",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(28px, 4vw, 52px)",
            fontWeight: 900,
            color: "rgba(240,237,232,0.08)",
            fontStyle: "italic",
          }}
        >
          <Marquee items={tagline} speed={60} />
        </div>
      </div>

      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "80px 48px 48px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
            gap: "48px",
            marginBottom: "80px",
          }}
        >
          {/* Brand */}
          <div>
            <div
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "28px",
                fontWeight: 900,
                color: "#F0EDE8",
                marginBottom: "16px",
              }}
            >
              KUBER<span style={{ color: "#C9A96E" }}>.</span>
            </div>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                fontWeight: 300,
                color: "rgba(240,237,232,0.4)",
                lineHeight: "1.8",
                margin: "0 0 24px",
              }}
            >
              A full-service creative and marketing powerhouse. India & GCC.
            </p>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "10px",
                letterSpacing: "0.2em",
                color: "#C9A96E",
                textTransform: "uppercase",
              }}
            >
              Est. 2013
            </div>
          </div>

          {/* Services */}
          <div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "10px",
                letterSpacing: "0.25em",
                color: "#C9A96E",
                textTransform: "uppercase",
                marginBottom: "24px",
              }}
            >
              Services
            </div>
            {["Branding", "Video Production", "Digital Marketing", "Performance Marketing", "Social Media Growth", "TV Commercials"].map((s) => (
              <div
                key={s}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "13px",
                  fontWeight: 300,
                  color: "rgba(240,237,232,0.4)",
                  marginBottom: "12px",
                  cursor: "pointer",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A96E")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(240,237,232,0.4)")}
              >
                {s}
              </div>
            ))}
          </div>

          {/* Presence */}
          <div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "10px",
                letterSpacing: "0.25em",
                color: "#C9A96E",
                textTransform: "uppercase",
                marginBottom: "24px",
              }}
            >
              Presence
            </div>
            {["India", "UAE — Dubai", "GCC Region", "Andromedia Solutions LLC"].map((p) => (
              <div
                key={p}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "13px",
                  fontWeight: 300,
                  color: "rgba(240,237,232,0.4)",
                  marginBottom: "12px",
                }}
              >
                {p}
              </div>
            ))}
          </div>

          {/* Contact */}
          <div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "10px",
                letterSpacing: "0.25em",
                color: "#C9A96E",
                textTransform: "uppercase",
                marginBottom: "24px",
              }}
            >
              Get In Touch
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                fontWeight: 300,
                color: "rgba(240,237,232,0.4)",
                lineHeight: "2",
              }}
            >
              hello@kubercreatives.com
            </div>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              style={{
                marginTop: "24px",
                background: "transparent",
                border: "1px solid rgba(201,169,110,0.3)",
                color: "#C9A96E",
                fontFamily: "'Inter', sans-serif",
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                cursor: "pointer",
                padding: "12px 24px",
                transition: "all 0.3s ease",
                display: "block",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#C9A96E";
                e.currentTarget.style.color = "#080808";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#C9A96E";
              }}
            >
              Start a Project
            </button>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: "32px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "11px",
              letterSpacing: "0.1em",
              color: "rgba(240,237,232,0.2)",
            }}
          >
            © 2024 Kuber Creatives. All rights reserved. · Andromedia Solutions LLC
          </span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "11px",
              letterSpacing: "0.1em",
              color: "rgba(240,237,232,0.2)",
            }}
          >
            Attention is expensive. The right creativity makes it priceless.
          </span>
        </div>
      </div>
    </footer>
  );
}
