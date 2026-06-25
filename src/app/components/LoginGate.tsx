import { useEffect, useRef, useState } from "react";

type LoginGateProps = {
  onEnter: () => void;
};

export function LoginGate({ onEnter }: LoginGateProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const leftEyeRef = useRef<HTMLDivElement>(null);
  const rightEyeRef = useRef<HTMLDivElement>(null);
  const leftPupilRef = useRef<HTMLDivElement>(null);
  const rightPupilRef = useRef<HTMLDivElement>(null);
  const [eyesHappy, setEyesHappy] = useState(false);

  useEffect(() => {
    const eyes = [
      { eye: leftEyeRef.current, pupil: leftPupilRef.current },
      { eye: rightEyeRef.current, pupil: rightPupilRef.current },
    ];

    const maxTravel = 12;

    const updateEyes = (clientX: number, clientY: number) => {
      const mid = wrapRef.current?.getBoundingClientRect();
      let shrinkScale = 1;

      if (mid) {
        const centerX = mid.left + mid.width / 2;
        const centerY = mid.top + mid.height / 2;
        const distToEyes = Math.hypot(clientX - centerX, clientY - centerY);
        const clamped = Math.min(distToEyes, 380);
        shrinkScale = 0.45 + (clamped / 380) * 0.75;
      }

      eyes.forEach(({ eye, pupil }) => {
        if (!eye || !pupil) return;
        const rect = eye.getBoundingClientRect();
        const eyeX = rect.left + rect.width / 2;
        const eyeY = rect.top + rect.height / 2;

        const dx = clientX - eyeX;
        const dy = clientY - eyeY;
        const dist = Math.hypot(dx, dy) || 1;
        const travel = Math.min(maxTravel, dist * 0.25);

        const x = (dx / dist) * travel;
        const y = (dy / dist) * travel;

        pupil.style.transform = `translate(${x}px, ${y}px) scale(${shrinkScale})`;
      });
    };

    const onMouseMove = (e: MouseEvent) => updateEyes(e.clientX, e.clientY);

    const centerEyes = () => {
      const vw = window.innerWidth / 2;
      const vh = window.innerHeight / 2;
      updateEyes(vw, vh);
    };

    centerEyes();
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", centerEyes);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", centerEyes);
    };
  }, []);

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "32px",
        position: "relative",
        overflow: "hidden",
        background:
          "radial-gradient(circle at 12% 8%, rgba(230,185,125,0.24), transparent 42%), radial-gradient(circle at 88% 84%, rgba(122,206,226,0.16), transparent 48%), linear-gradient(155deg, #04070a 0%, #0a1118 48%, #05080d 100%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: "52vmax",
          height: "52vmax",
          borderRadius: "999px",
          top: "-22vmax",
          right: "-18vmax",
          background: "radial-gradient(circle at 30% 35%, rgba(230,185,125,0.32), rgba(230,185,125,0))",
          filter: "blur(10px)",
          animation: "gateFloatA 14s ease-in-out infinite alternate",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "58vmax",
          height: "58vmax",
          borderRadius: "999px",
          bottom: "-30vmax",
          left: "-24vmax",
          background: "radial-gradient(circle at 58% 42%, rgba(109,190,220,0.22), rgba(109,190,220,0))",
          filter: "blur(14px)",
          animation: "gateFloatB 18s ease-in-out infinite alternate",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: "6% 10%",
          borderRadius: "24px",
          border: "1px solid rgba(255,255,255,0.08)",
          transform: "perspective(1100px) rotateX(12deg)",
          transformOrigin: "top center",
          opacity: 0.42,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
          backgroundSize: "70px 70px, 70px 70px",
          maskImage: "radial-gradient(circle at center, rgba(0,0,0,0.95), transparent 92%)",
        }}
      />

      <div
        style={{
          width: "min(760px, 100%)",
          border: "1px solid rgba(255,255,255,0.1)",
          background: "linear-gradient(145deg, rgba(13,20,28,0.56), rgba(8,12,16,0.4))",
          boxShadow: "0 34px 80px rgba(0,0,0,0.44), inset 0 1px 0 rgba(255,255,255,0.1)",
          backdropFilter: "blur(14px)",
          padding: "clamp(24px, 5vw, 52px)",
          textAlign: "center",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "11px",
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "rgba(240,237,232,0.7)",
            marginBottom: "18px",
          }}
        >
          Kuber Creatives Access
        </div>

        <h1
          style={{
            margin: 0,
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(40px, 7vw, 76px)",
            lineHeight: 0.95,
            fontWeight: 900,
            color: "#F0EDE8",
            letterSpacing: "-0.02em",
          }}
        >
          Eyes On
          <br />
          Your Brand
        </h1>

        <p
          style={{
            margin: "20px auto 34px",
            maxWidth: "560px",
            fontFamily: "'Inter', sans-serif",
            color: "rgba(240,237,232,0.62)",
            lineHeight: 1.9,
            fontSize: "15px",
            fontWeight: 300,
          }}
        >
          We build campaigns, films, and digital experiences that keep audiences watching.
        </p>

        <div
          ref={wrapRef}
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginBottom: "34px",
            alignItems: "center",
          }}
        >
          {[leftEyeRef, rightEyeRef].map((eyeRef, idx) => (
            <div
              key={idx}
              ref={eyeRef}
              style={{
                width: "clamp(86px, 10.5vw, 116px)",
                height: "clamp(86px, 10.5vw, 116px)",
                borderRadius: "24px",
                background: "linear-gradient(165deg, rgba(10,16,24,0.95), rgba(18,28,38,0.88))",
                border: eyesHappy ? "1px solid rgba(157,214,255,0.78)" : "1px solid rgba(146,174,210,0.36)",
                boxShadow: eyesHappy
                  ? "0 0 0 1px rgba(164,220,255,0.3), 0 14px 34px rgba(0,0,0,0.48), inset 0 0 24px rgba(95,168,230,0.16)"
                  : "0 12px 30px rgba(0,0,0,0.48), inset 0 0 22px rgba(88,120,170,0.1)",
                position: "relative",
                overflow: "hidden",
                transform: eyesHappy ? "translateY(-2px) scale(1.03)" : "scale(1)",
                transformOrigin: "center",
                transition: "transform 0.22s cubic-bezier(0.2, 0.9, 0.3, 1)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: "10%",
                  borderRadius: "20px",
                  border: "1px solid rgba(120,150,190,0.34)",
                  boxShadow: "inset 0 0 14px rgba(136,190,235,0.1)",
                  pointerEvents: "none",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div
                  ref={idx === 0 ? leftPupilRef : rightPupilRef}
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "999px",
                    background: "radial-gradient(circle at 38% 38%, #1f4562 0%, #0a1b2a 62%, #040a10 100%)",
                    transform: "translate(0px, 0px) scale(1)",
                    transition: "transform 0.12s linear, opacity 0.16s ease",
                    opacity: 1,
                    border: "1px solid rgba(160, 206, 234, 0.22)",
                    boxShadow: "0 0 10px rgba(120,210,255,0.16)",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "6px",
                      left: "7px",
                      width: "5px",
                      height: "5px",
                      borderRadius: "999px",
                      background: "rgba(255,255,255,0.9)",
                      boxShadow: "0 0 8px rgba(255,255,255,0.35)",
                    }}
                  />
                </div>
              </div>

              <div
                style={{
                  position: "absolute",
                  left: "12%",
                  right: "12%",
                  top: "18%",
                  height: "2px",
                  borderRadius: "999px",
                  background: "linear-gradient(90deg, rgba(132,214,255,0), rgba(132,214,255,0.8), rgba(132,214,255,0))",
                  opacity: eyesHappy ? 1 : 0.56,
                  transition: "opacity 0.2s ease",
                  pointerEvents: "none",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  background: "radial-gradient(circle at 50% 105%, rgba(148,218,255,0.24), rgba(148,218,255,0))",
                  opacity: eyesHappy ? 1 : 0.45,
                  transition: "opacity 0.2s ease",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  left: "22%",
                  right: "22%",
                  top: "68%",
                  height: "9px",
                  borderBottom: "2px solid rgba(162,228,255,0.92)",
                  borderRadius: "0 0 999px 999px",
                  background: "transparent",
                  boxShadow: "0 0 10px rgba(129,206,245,0.42)",
                  opacity: eyesHappy ? 1 : 0,
                  transition: "opacity 0.2s ease",
                  pointerEvents: "none",
                }}
              />
            </div>
          ))}
        </div>

        <button
          onClick={onEnter}
          style={{
            background: "transparent",
            color: "#e8c798",
            border: "1px solid rgba(232,199,152,0.78)",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            padding: "16px 40px",
            fontSize: "13px",
            cursor: "pointer",
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.08)",
            transition: "transform 0.25s ease, border-color 0.25s ease, color 0.25s ease",
          }}
          onMouseEnter={(e) => {
            setEyesHappy(true);
            e.currentTarget.style.borderColor = "rgba(240,237,232,0.92)";
            e.currentTarget.style.color = "#F0EDE8";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            setEyesHappy(false);
            e.currentTarget.style.borderColor = "rgba(232,199,152,0.78)";
            e.currentTarget.style.color = "#e8c798";
            e.currentTarget.style.transform = "translateY(0px)";
          }}
          onFocus={() => setEyesHappy(true)}
          onBlur={() => setEyesHappy(false)}
        >
          Enter
        </button>
      </div>

      <style>{`
        @keyframes gateFloatA {
          0% { transform: translate3d(0, 0, 0) scale(1); }
          100% { transform: translate3d(-7vmax, 5vmax, 0) scale(1.08); }
        }

        @keyframes gateFloatB {
          0% { transform: translate3d(0, 0, 0) scale(1); }
          100% { transform: translate3d(8vmax, -6vmax, 0) scale(1.06); }
        }
      `}</style>
    </section>
  );
}