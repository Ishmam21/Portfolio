type SkillCategory = {
  label: string;
  tools: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    label: "AI & DATA",
    tools: ["Python", "scikit-learn", "pandas", "NumPy", "Matplotlib"],
  },
  {
    label: "BACKEND",
    tools: ["FastAPI", "C#", "ASP.NET Core", "EF Core"],
  },
  {
    label: "FRONTEND",
    tools: ["TypeScript", "Next.js", "React"],
  },
  {
    label: "DATABASES",
    tools: ["PostgreSQL", "SQL Server"],
  },
  {
    label: "LEARNING",
    tools: ["LangChain", "retrieval-augmented generation (RAG)", "Chroma"],
  },
];
