import { useEffect, useState } from "react";
import "../styles/fonts.css";
import { CustomCursor } from "./components/CustomCursor";
import { ImmersiveBackdrop } from "./components/ImmersiveBackdrop";
import { LoginGate } from "./components/LoginGate";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Services } from "./components/Services";
import { Stats } from "./components/Stats";
import { Work } from "./components/Work";
import { Industries } from "./components/Industries";
import { WhyUs } from "./components/WhyUs";
import { CTA } from "./components/CTA";
import { Footer } from "./components/Footer";

export default function App() {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (!entered) return;

    document.documentElement.style.scrollBehavior = "smooth";
    document.body.style.overflowX = "hidden";

    const progressBar = document.createElement("div");
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: linear-gradient(to right, #C9A96E, rgba(201,169,110,0.3));
      z-index: 9997;
      transform-origin: left;
      transform: scaleX(0);
    `;
    document.body.appendChild(progressBar);

    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? Math.min(Math.max(window.scrollY / total, 0), 1) : 0;
      progressBar.style.transform = `scaleX(${progress})`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (document.body.contains(progressBar)) document.body.removeChild(progressBar);
    };
  }, [entered]);

  useEffect(() => {
    if (!entered) return;

    document.documentElement.style.removeProperty("--scene-pointer-x");
    document.documentElement.style.removeProperty("--scene-pointer-y");
    document.documentElement.style.removeProperty("--scene-pointer-shift-x");
    document.documentElement.style.removeProperty("--scene-pointer-shift-y");
    document.documentElement.style.removeProperty("--scene-scroll");
  }, [entered]);

  if (!entered) {
    return <LoginGate onEnter={() => setEntered(true)} />;
  }

  return (
    <div
      className="site-shell"
      style={{
        backgroundColor: "transparent",
        color: "#F5F2EA",
        fontFamily: "'Satoshi', 'Inter', sans-serif",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <ImmersiveBackdrop accent="#C9A96E" coolAccent="#7EB8D4" />
      <CustomCursor />
      <Nav />
      <main aria-label="Kuber creatives showcase">
        <Hero />
        <About />
        <Stats />
        <Services />
        <Work />
        <Industries />
        <WhyUs />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
