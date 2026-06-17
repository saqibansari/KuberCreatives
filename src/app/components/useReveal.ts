import { useEffect, useRef } from "react";

export function useReveal<T extends HTMLElement>(
  options: { threshold?: number; delay?: number; direction?: "up" | "left" } = {}
) {
  const ref = useRef<T>(null);
  const { threshold = 0.15, delay = 0, direction = "up" } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const initial = direction === "up" ? "translateY(60px)" : "translateX(-40px)";
    el.style.opacity = "0";
    el.style.transform = initial;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.transition = `opacity 1s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 1s cubic-bezier(0.16,1,0.3,1) ${delay}ms`;
            el.style.opacity = "1";
            el.style.transform = "none";
          }, 0);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, delay, direction]);

  return ref;
}
