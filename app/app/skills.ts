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
    tools: ["FastAPI", "ASP.NET Core", "NestJS"],
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
    tools: ["PyTorch", "Chroma", "LangGraph"],
  },
];
