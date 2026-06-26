import { useEffect, useState } from "react";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 26);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 920) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const navItems = ["about", "services", "work", "contact"];

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 12,
          left: 12,
          right: 12,
          zIndex: 100,
          padding: scrolled ? "10px 14px" : "14px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: scrolled ? "rgba(8,16,22,0.74)" : "rgba(8,16,22,0.42)",
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(12px)",
          borderRadius: "14px",
          transition: "all 320ms ease",
        }}
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            border: "none",
            background: "transparent",
            fontFamily: "'Playfair Display', serif",
            fontSize: "20px",
            fontWeight: 700,
            color: "#f5f2ea",
            letterSpacing: "0.02em",
            cursor: "pointer",
            padding: 0,
          }}
        >
          KUBER CREATIVES<span style={{ color: "#e6b97d" }}>.</span>
        </button>

        <div className="nav-desktop-links" style={{ display: "flex", alignItems: "center", gap: "26px" }}>
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              style={{
                border: "none",
                background: "transparent",
                color: "rgba(245,242,234,0.7)",
                fontFamily: "'Satoshi', 'Inter', sans-serif",
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                cursor: "pointer",
                padding: 0,
              }}
            >
              {item}
            </button>
          ))}

          <button
            onClick={() => scrollTo("contact")}
            style={{
              border: "1px solid rgba(230,185,125,0.65)",
              background: "rgba(230,185,125,0.08)",
              color: "#e6b97d",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "11px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              cursor: "pointer",
              padding: "10px 16px",
            }}
          >
            Start a Project
          </button>
        </div>

        <button
          className="nav-mobile-toggle"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-label="Open navigation"
          style={{
            display: "none",
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(245,242,234,0.04)",
            color: "#f5f2ea",
            width: 40,
            height: 36,
            borderRadius: 10,
            cursor: "pointer",
            fontSize: 16,
            lineHeight: 1,
          }}
        >
          {menuOpen ? "-" : "+"}
        </button>
      </nav>

      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: 66,
            left: 12,
            right: 12,
            zIndex: 99,
            background: "rgba(8,16,22,0.95)",
            border: "1px solid rgba(255,255,255,0.12)",
            backdropFilter: "blur(12px)",
            borderRadius: 14,
            padding: "14px",
            display: "grid",
            gap: "10px",
          }}
        >
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              style={{
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.02)",
                color: "#f5f2ea",
                fontFamily: "'Satoshi', 'Inter', sans-serif",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                cursor: "pointer",
                padding: "12px",
                textAlign: "left",
              }}
            >
              {item}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 920px) {
          .nav-desktop-links {
            display: none !important;
          }

          .nav-mobile-toggle {
            display: inline-grid !important;
            place-items: center;
          }
        }
      `}</style>
    </>
  );
}
