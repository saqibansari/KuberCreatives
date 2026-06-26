import { useRef } from "react";

const creativeGifOptions = {
  kineticType: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExb2Vzd2c0N2JvaTd0bHI0eTIzOGx6ZWxrcmpheTQyNXkyZnhneDRobSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/FQrKPsolkooUTalcMx/giphy.gif",
  designStudio: "https://media.giphy.com/media/l0HlNQ03J5JxX6lva/giphy.gif",
  colorFlow: "https://media.giphy.com/media/xTiTnxpQ3ghPiB2Hp6/giphy.gif",
} as const;

const heroGif = creativeGifOptions.kineticType;

export function Hero() {
  return (
    <section
      style={{
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
        display: "grid",
        alignItems: "center",
        padding: "120px 0 90px",
        background: "transparent",
      }}
    >
      <div
        style={{
          position: "absolute",
          right: "8%",
          top: "18%",
          width: "min(36vw, 520px)",
          aspectRatio: "4 / 5",
          borderRadius: "16px",
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 34px 80px rgba(0,0,0,0.45)",
          background: "#0b141a",
        }}
      >
        <img
          src={heroGif}
          alt="Creative branding animation"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.8) contrast(1.08)",
          }}
        />
        <img
          src="https://images.unsplash.com/photo-1623575398807-ff30453553a9?w=1100&h=1400&fit=crop&auto=format"
          alt="Campaign scene"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(0.8) contrast(1.08)",
            opacity: 0,
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(160deg, rgba(7,16,21,0.2), rgba(7,16,21,0.72) 72%), linear-gradient(to top, rgba(7,16,21,0.95), transparent 48%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 20,
            right: 20,
            bottom: 22,
            padding: "14px 14px 12px",
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(11, 20, 26, 0.62)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "10px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#e6b97d",
            }}
          >
            Live Campaign Surface
          </div>
          <div
            style={{
              marginTop: 8,
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(18px, 2vw, 26px)",
              color: "#f5f2ea",
              lineHeight: 1.1,
              fontWeight: 700,
            }}
          >
            Built for tactile storytelling.
          </div>
        </div>
      </div>

      <div style={{
          position: "relative",
          zIndex: 4,
          width: "min(1400px, 100%)",
          margin: "0 auto",
          padding: "0 48px",
        }}>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "11px",
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "rgba(245,242,234,0.72)",
            marginBottom: "28px",
          }}
        >
          India + GCC / EST 2013
        </div>

        <h1
          style={{
            margin: 0,
            maxWidth: "840px",
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(48px, 9vw, 118px)",
            lineHeight: 0.92,
            letterSpacing: "-0.03em",
            color: "#f5f2ea",
            textWrap: "balance",
          }}
        >
          We don't Just 
          <br />
          Build Brands
          <br />
          <span style={{ color: "#e6b97d", fontStyle: "italic", fontWeight: 500 }}>
            We Build Recall
          </span>
        </h1>

        <p
          style={{
            marginTop: "36px",
            maxWidth: "560px",
            fontFamily: "'Satoshi', 'Inter', sans-serif",
            fontSize: "clamp(14px, 1.5vw, 18px)",
            lineHeight: 1.85,
            color: "rgba(245,242,234,0.66)",
          }}
        >
          We craft branded worlds with depth, contrast, and movement. Every layer is intentional: from visual systems to performance campaigns, built to hold attention longer.
        </p>

        <div
          style={{
            marginTop: "44px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
            className="interactive-lift"
            style={{
              border: "1px solid rgba(230,185,125,0.8)",
              background: "linear-gradient(120deg, #e6b97d, #f3d2a5)",
              color: "#071015",
              fontFamily: "'Satoshi', 'Inter', sans-serif",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              padding: "14px 30px",
              cursor: "pointer",
            }}
          >
            Enter Projects
          </button>

          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(10, 20, 27, 0.5)",
              color: "#f5f2ea",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "11px",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              padding: "14px 24px",
              cursor: "pointer",
              backdropFilter: "blur(8px)",
            }}
          >
            Start a Project
          </button>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          bottom: "24px",
          zIndex: 5,
          textAlign: "center",
          color: "rgba(245,242,234,0.45)",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "10px",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
        }}
      >
        Scroll to dive
      </div>
    </section>
  );
}
