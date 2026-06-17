import { useEffect, useRef } from "react";

type LoginGateProps = {
  onEnter: () => void;
};

export function LoginGate({ onEnter }: LoginGateProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const leftEyeRef = useRef<HTMLDivElement>(null);
  const rightEyeRef = useRef<HTMLDivElement>(null);
  const leftPupilRef = useRef<HTMLDivElement>(null);
  const rightPupilRef = useRef<HTMLDivElement>(null);

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
          "radial-gradient(circle at 25% 10%, rgba(201,169,110,0.18), transparent 45%), radial-gradient(circle at 90% 90%, rgba(77,140,170,0.15), transparent 50%), #080808",
      }}
    >
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
        //   border: "1px solid rgba(255,255,255,0.1)",
        //   background: "rgba(10,10,10,0.72)",
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
            gap: "30px",
            marginBottom: "34px",
            alignItems: "center",
          }}
        >
          {[leftEyeRef, rightEyeRef].map((eyeRef, idx) => (
            <div
              key={idx}
              ref={eyeRef}
              style={{
                width: "clamp(78px, 10vw, 110px)",
                height: "clamp(78px, 10vw, 110px)",
                borderRadius: "999px",
                background: "linear-gradient(160deg, #fff 0%, #ece9e2 100%)",
                border: "2px solid rgba(8,8,8,0.2)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.35), inset 0 8px 20px rgba(255,255,255,0.35)",
                position: "relative",
                overflow: "hidden",
              }}
            >
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
                    width: "34px",
                    height: "34px",
                    borderRadius: "999px",
                    background: "radial-gradient(circle at 35% 35%, #3d372f 0%, #0d0d0d 64%)",
                    transform: "translate(0px, 0px) scale(1)",
                    transition: "transform 0.12s linear",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "8px",
                      left: "8px",
                      width: "7px",
                      height: "7px",
                      borderRadius: "999px",
                      background: "rgba(255,255,255,0.9)",
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onEnter}
          style={{
            background: "#C9A96E",
            color: "#080808",
            border: "none",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            padding: "16px 40px",
            fontSize: "13px",
            cursor: "pointer",
            transition: "transform 0.25s ease, background 0.25s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#F0EDE8";
            e.currentTarget.style.transform = "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#C9A96E";
            e.currentTarget.style.transform = "translateY(0px)";
          }}
        >
          Enter
        </button>
      </div>
    </section>
  );
}