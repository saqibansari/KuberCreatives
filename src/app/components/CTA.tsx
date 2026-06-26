import { useRef, useEffect, useState } from "react";
import { useReveal } from "./useReveal";
import { SectionLabel } from "./SectionLabel";

export function CTA() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const headRef = useReveal<HTMLHeadingElement>({ delay: 0, direction: "right" });
  const labelRef = useReveal<HTMLDivElement>({ delay: 0, direction: "right" });
  const formRef = useReveal<HTMLFormElement>({ delay: 200, direction: "left" });
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bgRef.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const progress = 1 - rect.top / window.innerHeight;
      el.style.transform = `translateY(${progress * -40}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid rgba(255,255,255,0.12)",
    color: "#F0EDE8",
    fontFamily: "'Inter', sans-serif",
    fontSize: "16px",
    fontWeight: 300,
    padding: "16px 0",
    outline: "none",
    transition: "border-color 0.3s ease",
    boxSizing: "border-box",
  };

  return (
    <section
      id="contact"
      style={{
        position: "relative",
        backgroundColor: "transparent",
        overflow: "hidden",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at center, rgba(201,169,110,0.04) 0%, transparent 70%)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "160px 48px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "120px",
          alignItems: "start",
        }}
      >
        <div>
          <div ref={labelRef}><SectionLabel>Let's Create Together</SectionLabel></div>
          <h2
            ref={headRef}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(40px, 5vw, 72px)",
              fontWeight: 900,
              color: "#F0EDE8",
              lineHeight: "1.02",
              letterSpacing: "-0.02em",
              margin: "0 0 32px",
            }}
          >
            Ready To Elevate Your Brand?
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "16px",
              fontWeight: 300,
              color: "rgba(240,237,232,0.55)",
              lineHeight: "2",
              marginBottom: "48px",
              maxWidth: "420px",
            }}
          >
            Whether you're building a luxury brand, scaling a startup, launching a campaign, or producing a commercial — Kuber Creatives is built to make your brand impossible to ignore.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {[
              { label: "Email", value: "hello@kubercreatives.com" },
              { label: "India", value: "+91 98XXX XXXXX" },
              { label: "GCC / UAE", value: "+971 5X XXX XXXX" },
            ].map((item) => (
              <div key={item.label}>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "10px",
                    letterSpacing: "0.25em",
                    color: "#C9A96E",
                    textTransform: "uppercase",
                    marginBottom: "6px",
                  }}
                >
                  {item.label}
                </div>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "16px",
                    fontWeight: 400,
                    color: "rgba(240,237,232,0.7)",
                  }}
                >
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          {sent ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "400px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "48px",
                  fontWeight: 900,
                  color: "#C9A96E",
                  marginBottom: "24px",
                }}
              >
                Thank You.
              </div>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "16px",
                  fontWeight: 300,
                  color: "rgba(240,237,232,0.55)",
                  lineHeight: 1.8,
                }}
              >
                We'll be in touch to create something<br />people remember.
              </p>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
              <div>
                <label
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "10px",
                    letterSpacing: "0.25em",
                    color: "#C9A96E",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: "4px",
                  }}
                >
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  required
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderBottomColor = "#C9A96E")}
                  onBlur={(e) => (e.target.style.borderBottomColor = "rgba(255,255,255,0.12)")}
                />
              </div>
              <div>
                <label
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "10px",
                    letterSpacing: "0.25em",
                    color: "#C9A96E",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: "4px",
                  }}
                >
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderBottomColor = "#C9A96E")}
                  onBlur={(e) => (e.target.style.borderBottomColor = "rgba(255,255,255,0.12)")}
                />
              </div>
              <div>
                <label
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "10px",
                    letterSpacing: "0.25em",
                    color: "#C9A96E",
                    textTransform: "uppercase",
                    display: "block",
                    marginBottom: "4px",
                  }}
                >
                  Tell Us About Your Project
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your brand, goals, and what you'd like to create..."
                  rows={4}
                  required
                  style={{
                    ...inputStyle,
                    resize: "none",
                    lineHeight: "1.8",
                  }}
                  onFocus={(e) => (e.target.style.borderBottomColor = "#C9A96E")}
                  onBlur={(e) => (e.target.style.borderBottomColor = "rgba(255,255,255,0.12)")}
                />
              </div>
              <button
                type="submit"
                style={{
                  background: "#C9A96E",
                  border: "none",
                  color: "#080808",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  padding: "20px 48px",
                  alignSelf: "flex-start",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#F0EDE8";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#C9A96E";
                  e.currentTarget.style.transform = "none";
                }}
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
