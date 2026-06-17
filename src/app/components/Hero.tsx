import { useEffect, useRef } from "react";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let scrollY = 0;
    let pointerX = 0;
    let pointerY = 0;

    const updateTransforms = () => {
      if (containerRef.current) {
        containerRef.current.style.transform = `translate3d(${pointerX * 12}px, ${scrollY * 0.2 + pointerY * 10}px, 0)`;
      }
      if (imageRef.current) {
        imageRef.current.style.transform = `translate3d(0, ${scrollY * 0.42}px, 0) scale(1.08) rotate(${pointerX * 1.6}deg)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${pointerX * 28}px, ${scrollY * -0.08 + pointerY * 18}px, 0)`;
      }
    };

    const els = [line1Ref.current, line2Ref.current, subRef.current, ctaRef.current, scrollIndicatorRef.current];
    els.forEach((el, i) => {
      if (!el) return;
      el.style.opacity = "0";
      el.style.transform = "translateY(40px)";
      setTimeout(() => {
        if (!el) return;
        el.style.transition = "opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)";
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 300 + i * 160);
    });

    const onScroll = () => {
      scrollY = window.scrollY;
      updateTransforms();
    };

    const onMove = (e: MouseEvent) => {
      const section = sectionRef.current;
      if (!section || window.innerWidth < 900) return;
      const rect = section.getBoundingClientRect();
      pointerX = (e.clientX - rect.left) / rect.width - 0.5;
      pointerY = (e.clientY - rect.top) / rect.height - 0.5;
      updateTransforms();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  const scrollToWork = () => {
    const el = document.getElementById("work");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        backgroundColor: "#080808",
      }}
    >
      {/* Background image with parallax */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
        }}
      >
        <div
          ref={imageRef}
          style={{
            position: "absolute",
            inset: "-10%",
            backgroundImage: `url(https://images.unsplash.com/photo-1623575398807-ff30453553a9?w=1800&h=1100&fit=crop&auto=format)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.25,
            willChange: "transform",
          }}
        />
        <div
          ref={glowRef}
          style={{
            position: "absolute",
            top: "12%",
            right: "8%",
            width: "34vw",
            maxWidth: "500px",
            aspectRatio: "1 / 1",
            borderRadius: "999px",
            background: "radial-gradient(circle at 50% 50%, rgba(201,169,110,0.22), rgba(201,169,110,0))",
            filter: "blur(14px)",
            willChange: "transform",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, rgba(8,8,8,0.85) 0%, rgba(8,8,8,0.4) 50%, rgba(8,8,8,0.85) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, transparent 50%, #080808 100%)",
          }}
        />
      </div>

      {/* Noise grain */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
          opacity: 0.3,
          pointerEvents: "none",
        }}
      />

      <div
        ref={containerRef}
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "0 48px",
          width: "100%",
        }}
      >
        <div style={{ marginBottom: "24px" }}>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "11px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#C9A96E",
              display: "inline-block",
            }}
          >
            India &amp; GCC — Est. 2013
          </span>
        </div>

        <div ref={line1Ref}>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(56px, 9vw, 128px)",
              fontWeight: 900,
              lineHeight: "0.93",
              color: "#F0EDE8",
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            <span className="hero-title-line"><span>We Don't Just</span></span>
          </h1>
        </div>
        <div ref={line2Ref} style={{ display: "flex", alignItems: "baseline", gap: "24px", flexWrap: "wrap" }}>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(56px, 9vw, 128px)",
              fontWeight: 900,
              lineHeight: "0.93",
              color: "#F0EDE8",
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            <span className="hero-title-line"><span>Build Brands.</span></span>
          </h1>
          <span
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(32px, 4vw, 56px)",
              fontWeight: 400,
              fontStyle: "italic",
              color: "#C9A96E",
              marginBottom: "8px",
            }}
          >
            <span className="hero-title-line"><span>We Build Recall.</span></span>
          </span>
        </div>

        <p
          ref={subRef}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(14px, 1.4vw, 18px)",
            fontWeight: 300,
            color: "rgba(240,237,232,0.55)",
            maxWidth: "520px",
            lineHeight: "1.8",
            marginTop: "40px",
            marginBottom: "0",
          }}
        >
          Every frame, every campaign, every pixel is designed to make brands impossible to ignore — across India, the GCC, and beyond.
        </p>

        <div
          ref={ctaRef}
          style={{ display: "flex", alignItems: "center", gap: "32px", marginTop: "52px" }}
        >
          <button
            onClick={scrollToWork}
            className="interactive-lift"
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
              padding: "16px 40px",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#F0EDE8";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#C9A96E";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            View Our Work
          </button>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="interactive-lift"
            style={{
              background: "transparent",
              border: "none",
              color: "rgba(240,237,232,0.7)",
              fontFamily: "'Inter', sans-serif",
              fontSize: "13px",
              fontWeight: 400,
              letterSpacing: "0.08em",
              cursor: "pointer",
              padding: 0,
              display: "flex",
              alignItems: "center",
              gap: "10px",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A96E")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(240,237,232,0.7)")}
          >
            Start a Project
            <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
              <path d="M0 6H18M13 1L18 6L13 11" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        style={{
          position: "absolute",
          bottom: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          zIndex: 3,
        }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "10px",
            letterSpacing: "0.2em",
            color: "rgba(240,237,232,0.3)",
            textTransform: "uppercase",
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: "1px",
            height: "60px",
            background: "linear-gradient(to bottom, rgba(201,169,110,0.6), transparent)",
            animation: "scrollPulse 2s ease-in-out infinite",
          }}
        />
      </div>

      <style>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(0.6); transform-origin: top; }
        }
      `}</style>
    </section>
  );
}
