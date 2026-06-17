export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "10px",
        letterSpacing: "0.3em",
        textTransform: "uppercase",
        color: "#C9A96E",
        display: "block",
        marginBottom: "20px",
      }}
    >
      {children}
    </span>
  );
}
