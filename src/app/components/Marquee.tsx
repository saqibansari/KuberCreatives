import { useEffect, useRef } from "react";

interface MarqueeProps {
  items: string[];
  speed?: number;
  direction?: "left" | "right";
  separator?: string;
}

export function Marquee({ items, speed = 40, direction = "left", separator = "·" }: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const rafRef = useRef<number>(0);
  const widthRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      const clone = track.firstElementChild as HTMLElement;
      if (clone) widthRef.current = clone.offsetWidth;
    };

    measure();
    window.addEventListener("resize", measure);

    const animate = () => {
      if (!track) return;
      const w = widthRef.current;
      if (w === 0) { rafRef.current = requestAnimationFrame(animate); return; }

      posRef.current += direction === "left" ? -(speed / 60) : (speed / 60);

      if (direction === "left" && posRef.current <= -w) posRef.current += w;
      if (direction === "right" && posRef.current >= 0) posRef.current -= w;

      track.style.transform = `translateX(${posRef.current}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", measure);
    };
  }, [speed, direction]);

  const content = items.map((item, i) => (
    <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: "32px", paddingRight: "32px" }}>
      {item}
      <span style={{ color: "#C9A96E", fontSize: "0.6em" }}>{separator}</span>
    </span>
  ));

  return (
    <div style={{ overflow: "hidden", width: "100%" }}>
      <div ref={trackRef} style={{ display: "inline-flex", whiteSpace: "nowrap", willChange: "transform" }}>
        <span style={{ display: "inline-flex" }}>{content}</span>
        <span style={{ display: "inline-flex" }}>{content}</span>
        <span style={{ display: "inline-flex" }}>{content}</span>
      </div>
    </div>
  );
}
