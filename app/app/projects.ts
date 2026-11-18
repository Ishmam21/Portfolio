export type Project = {
  title: string;
  description: string;
  stack: string[];
  screenshot?: { src: string; alt: string };
  github?: string;
  live?: string;
};

export const projects: Project[] = [
  {
    title: "Seatz",
    description: "A demo booking project for browsing and reserving seats.",
    stack: ["Web app", "Database"],
  },
  {
    title: "Insurance Premium Predictor",
    description: "A demo tool that estimates insurance premiums from input data.",
    stack: ["Python", "Machine learning"],
  },
  {
    title: "ChatBotLocal",
    description: "A demo chat interface for experimenting with local AI models.",
    stack: ["Local AI", "Chat interface"],
  },
  {
    title: "ReelNotes",
    description: "A demo tool for keeping notes alongside videos.",
    stack: ["Web app", "Video"],
  },
];
