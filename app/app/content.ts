export const portfolio = {
  name: "Fahim Mubarrat Ishmam",
  givenNames: "FAHIM MUBARRAT",
  role: "Final-year Computer Science student at AIUB · Dhaka",
  introduction:
    "Aspiring software engineer, full-time debugger.",
  navigation: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
  ],
  about: "I’m a final-year Computer Science and Engineering student at American International University-Bangladesh. I have hands-on experience with C# and .NET, including building and deploying Seatz, a reservation app built with ASP.NET Core, Entity Framework Core, and PostgreSQL. I’m now exploring Python for applied AI and machine learning, with an interest in building tools that work with data and language models. During my internship at OddFlock, I built a Python pipeline that turned news stories into ready-to-publish posters.",
  experience: {
    company: "OddFlock",
    role: "Software Engineer Intern",
    dates: "May–September 2026",
    summary: "I built a Python pipeline that gathered news from RSS feeds and Twitter/X, ranked stories with a language model, and turned each selected story into a ready-to-publish image poster.",
  },
  education: [
    {
      qualification: "O-Levels",
      institution: "Manarat Dhaka International School and College",
      date: "2020-07",
      label: "July 2020",
    },
    {
      qualification: "A-Levels",
      institution: "Manarat Dhaka International School and College",
      date: "2022-07",
      label: "July 2022",
    },
    {
      qualification: "BSc in Computer Science and Engineering",
      institution: "American International University-Bangladesh",
      date: "2027-01",
      label: "Expected January 2027",
    },
    { qualification: "Coming soon" },
  ],
  contact: [
    { icon: "email", name: "Email", handle: "fahimishmam.fm@gmail.com", href: "mailto:fahimishmam.fm@gmail.com" },
    { icon: "github", name: "GitHub", handle: "@Ishmam21", href: "https://github.com/Ishmam21" },
    { icon: "linkedin", name: "LinkedIn", handle: "Fahim Mubarrat Ishmam", href: "https://www.linkedin.com/in/fahim-mubarrat-ishmam" },
    { icon: "facebook", name: "Facebook", handle: "Fahim Mubarrat Ishmam", href: "https://www.facebook.com/fahimmubarrat.ishmam" },
  ],
} as const;
