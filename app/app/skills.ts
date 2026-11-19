type SkillCategory = {
  label: string;
  tools: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    label: "AI & DATA",
    tools: ["Python", "scikit-learn", "pandas", "NumPy", "Matplotlib", "LangChain"],
  },
  {
    label: "BACKEND",
    tools: ["FastAPI", "C#", "ASP.NET Core", "EF Core"],
  },
  {
    label: "FRONTEND",
    tools: ["JavaScript", "TypeScript", "Next.js", "React", "CSS"],
  },
  {
    label: "DATABASES",
    tools: ["PostgreSQL", "Microsoft SQL Server"],
  },
  {
    label: "LEARNING",
    tools: ["PyTorch", "retrieval-augmented generation (RAG)", "Chroma"],
  },
];
