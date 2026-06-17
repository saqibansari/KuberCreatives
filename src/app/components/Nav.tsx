import { useEffect, useRef, useState } from "react";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      ref={navRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "24px 48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "background 0.5s ease, padding 0.4s ease, backdrop-filter 0.5s ease",
        background: scrolled ? "rgba(8,8,8,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
      }}
    >
      <div
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "22px",
          fontWeight: 700,
          color: "#F0EDE8",
          letterSpacing: "0.02em",
          cursor: "pointer",
        }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        KUBER<span style={{ color: "#C9A96E" }}>.</span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "40px" }}>
        {["about", "services", "work", "contact"].map((item) => (
          <button
            key={item}
            onClick={() => scrollTo(item)}
            style={{
              background: "none",
              border: "none",
              color: "rgba(240,237,232,0.6)",
              fontFamily: "'Inter', sans-serif",
              fontSize: "13px",
              fontWeight: 400,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "color 0.3s ease",
              padding: 0,
            }}
            onMouseEnter={(e) => ((e.target as HTMLButtonElement).style.color = "#C9A96E")}
            onMouseLeave={(e) => ((e.target as HTMLButtonElement).style.color = "rgba(240,237,232,0.6)")}
          >
            {item}
          </button>
        ))}
        <button
          onClick={() => scrollTo("contact")}
          style={{
            background: "transparent",
            border: "1px solid rgba(201,169,110,0.5)",
            color: "#C9A96E",
            fontFamily: "'Inter', sans-serif",
            fontSize: "12px",
            fontWeight: 500,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            cursor: "pointer",
            padding: "10px 24px",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            const btn = e.currentTarget;
            btn.style.background = "#C9A96E";
            btn.style.color = "#080808";
          }}
          onMouseLeave={(e) => {
            const btn = e.currentTarget;
            btn.style.background = "transparent";
            btn.style.color = "#C9A96E";
          }}
        >
          Start a Project
        </button>
      </div>
    </nav>
  );
}
