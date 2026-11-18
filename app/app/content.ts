export const portfolio = {
  name: "Fahim Mubarrat Ishmam",
  givenNames: "FAHIM MUBARRAT",
  role: "Final-year Computer Science student at AIUB · Dhaka",
  introduction:
    "I like knowing what happens after you click a button. That curiosity got me into backend development. These days I’m spending more time in Python, training models on real datasets and figuring out how to turn them into tools people can use.",
  navigation: [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
  ],
  about: "I like building tools around practical problems, from designing APIs and databases to experimenting with machine learning.",
  experience: "Placeholder — add a role, organization, dates, and a short summary.",
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
  ],
  contact: [
    { icon: "email", name: "Email", handle: "fahimishmam.fm@gmail.com", href: "mailto:fahimishmam.fm@gmail.com" },
    { icon: "github", name: "GitHub", handle: "@Ishmam21", href: "https://github.com/Ishmam21" },
    { icon: "linkedin", name: "LinkedIn", handle: "Fahim Mubarrat Ishmam", href: "https://www.linkedin.com/in/fahim-mubarrat-ishmam" },
    { icon: "facebook", name: "Facebook", handle: "Fahim Mubarrat Ishmam", href: "https://www.facebook.com/fahimmubarrat.ishmam" },
  ],
} as const;
