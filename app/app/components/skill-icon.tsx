type PixelLayer = { fill: string; d: string };

const logos: Record<string, PixelLayer[]> = {
  Python: [
    { fill: "#4b8bbe", d: "M5 1h7v1h1v6H6v3H2V9H1V5h1V4h7V3H5z" },
    { fill: "#ffd343", d: "M14 5h1v2h1v4h-1v2H8v1h4v1H5V9h8V5z" },
    { fill: "#0d1117", d: "M6 2h2v2H6z M10 12h2v2h-2z" },
  ],
  "scikit-learn": [
    { fill: "#3499cd", d: "M2 3h5v1h2v5H7v2H2V9H0V5h2z" },
    { fill: "#f89939", d: "M10 6h4v1h2v5h-1v2h-2v1H7v-1H5V9h2V7h3z" },
    { fill: "#e6edf3", d: "M8 9h2v1H9v1h1v2H8v-1h1v-1H8z M11 10h2v1h-1v1h1v1h-2z M14 10h1v3h-1z" },
  ],
  pandas: [
    { fill: "#9b8dd2", d: "M2 5h2v9H2z M5 2h2v5H5z M5 11h2v3H5z M9 2h2v3H9z M9 9h2v5H9z M12 2h2v9h-2z" },
    { fill: "#f0cf5e", d: "M5 8h2v2H5z" },
    { fill: "#e36ea3", d: "M9 6h2v2H9z" },
  ],
  NumPy: [
    { fill: "#71d3ef", d: "M7 0h2v1h2v1h2v1h2v2h-2v1h-2v1H9v1H7V7H5V6H3V5H1V3h2V2h2V1h2z" },
    { fill: "#4285ba", d: "M1 6h2v1h2v1h2v7H5v-1H3v-1H1z" },
    { fill: "#3eb9df", d: "M15 6h-2v1h-2v1H9v7h2v-1h2v-1h2z" },
    { fill: "#e6edf3", d: "M3 8h1v1h1v1h1v4H5v-2H4v-1H3z M10 10h1v3h-1z M12 9h1v3h-1z" },
  ],
  Matplotlib: [
    { fill: "#8b949e", d: "M4 1h8v1h2v2h1v8h-1v2h-2v1H4v-1H2v-2H1V4h1V2h2z M4 2v1H3v1H2v8h1v1h1v1h8v-1h1v-1h1V4h-1V3h-1V2z" },
    { fill: "#55a9d7", d: "M4 8h2v5H4z" },
    { fill: "#e1b55e", d: "M7 5h2v8H7z" },
    { fill: "#68bf8e", d: "M10 7h2v6h-2z" },
  ],
  FastAPI: [
    { fill: "#38b8a7", d: "M4 0h8v1h2v2h1v2h1v6h-1v2h-1v2h-2v1H4v-1H2v-2H1v-2H0V5h1V3h1V1h2z" },
    { fill: "#e6edf3", d: "M8 2h3v2h-1v2h3v2h-2v2H9v2H7v2H5v-3h1V9H3V7h2V5h2V3h1z" },
  ],
  "C#": [
    { fill: "#9475cf", d: "M6 1h4v1h2v1h2v2h1v6h-1v2h-2v1h-2v1H6v-1H4v-1H2v-2H1V5h1V3h2V2h2z" },
    { fill: "#e6edf3", d: "M5 5h4v1H6v4h3v1H5v-1H4V6h1z M10 6h1v1h1V6h1v1h1v1h-1v1h1v1h-1v1h-1v-1h-1v1h-1v-1H9V9h1V8H9V7h1z M11 8v1h1V8z" },
  ],
  TypeScript: [
    { fill: "#3178c6", d: "M1 1h14v14H1z" },
    { fill: "#e6edf3", d: "M3 6h6v2H7v5H5V8H3z M10 6h4v1h-3v2h3v4h-4v-1h3v-2h-3z" },
  ],
  "Next.js": [
    { fill: "#aab5c0", d: "M4 1h8v1h2v2h1v8h-1v2h-2v1H4v-1H2v-2H1V4h1V2h2z M4 2v1H3v1H2v8h1v1h1v1h8v-1h1v-1h1V4h-1V3h-1V2z" },
    { fill: "#e6edf3", d: "M5 5h2v1h1v2h1v2h1v1h1v2h-1v-1H9v-2H8V9H7V8H6v4H5z M10 5h1v4h-1z" },
  ],
  React: [
    { fill: "#61dafb", d: "M7 7h2v2H7z M3 5h10v1h2v1h1v2h-1v1h-2v1H3v-1H1V9H0V7h1V6h2z M3 6v1H1v2h2v1h10V9h2V7h-2V6z M4 1h3v1h2v1h1v2h1v2h1v3h1v4h-1v1H9v-1H7v-1H6v-2H5V9H4V6H3V2h1z M4 2v4h1v3h1v2h1v2h2v1h3v-4h-1V7h-1V5H9V3H7V2z M9 1h3v1h1v4h-1v3h-1v2h-1v2H9v1H7v1H4v-1H3v-4h1V7h1V5h1V3h1V2h2z M9 2v1H7v2H6v2H5v3H4v4h3v-1h2v-2h1V9h1V6h1V2z" },
  ],
  PostgreSQL: [
    { fill: "#6eadd7", d: "M4 2h9v1h2v7h-2v2h-2v3H8v-1H7v-3H4v-1H2V4h2z" },
    { fill: "#e6edf3", d: "M4 3h8v1h2v5h-2v2h-2v3H8v-4H5V9H3V5h1z M4 5v4h2v1h3v3h1v-3h2V9h1V4H5v1z M6 6h1v1H6z M11 6h1v1h-1z" },
  ],
  "SQL Server": [
    { fill: "#e46b6b", d: "M3 2h10v1h2v10h-2v1H3v-1H1V3h2z" },
    { fill: "#0d1117", d: "M3 4h10v1H3z M3 7h10v1H3z M3 10h10v1H3z" },
  ],
  LangChain: [
    { fill: "#8fc9af", d: "M4 2h6v2h2v4h-2V5H5v1H3v4h3v2H2v-2H1V5h3z M10 4h4v2h1v5h-3v3H6v-2H4V8h2v3h5v-1h2V6h-3z" },
  ],
  Chroma: [
    { fill: "#f3be5a", d: "M1 4h3v8H1z M4 6h1v4H4z" },
    { fill: "#e97975", d: "M6 3h4v10H6z" },
    { fill: "#7ba7ed", d: "M12 4h3v8h-3z M11 6h1v4h-1z" },
  ],
};

export function SkillIcon({ tool }: { tool: string }) {
  const layers = logos[tool];
  if (!layers) return null;

  return (
    <svg className="skill-icon" width="16" height="16" viewBox="0 0 16 16" shapeRendering="crispEdges" aria-hidden="true">
      {layers.map(({ fill, d }) => <path key={d} fill={fill} d={d} fillRule="evenodd" />)}
    </svg>
  );
}
