export type ProjectScreenshot = { src: string; alt: string };

export type Project = {
  id: string;
  title: string;
  description: string;
  stack: string[];
  screenshots?: ProjectScreenshot[];
  github?: string;
  live?: string;
  docs?: string;
};

export const projects: Project[] = [
  {
    id: "seatz",
    title: "Seatz",
    description: "A seat reservation app with editable venue layouts, 360° seat previews, and demo checkout.",
    stack: ["ASP.NET Core MVC", "EF Core", "PostgreSQL", "Pannellum"],
    github: "https://github.com/Ishmam21/Seat-Booking",
    live: "https://seatz-h5ena4f4fxdrfwen.indiasouthcentral-01.azurewebsites.net/",
    screenshots: [
      {
        src: "/projects/seatz/layouts.png",
        alt: "Seatz layout browser with available venues",
      },
      {
        src: "/projects/seatz/seat-map.png",
        alt: "Seat map with selected seats and a running total",
      },
      {
        src: "/projects/seatz/seat-panel.png",
        alt: "Seat details panel with a 360° preview",
      },
      {
        src: "/projects/seatz/preview-360.png",
        alt: "Full 360° view from a selected seat",
      },
      {
        src: "/projects/seatz/checkout.png",
        alt: "Checkout with the selected seats and booking total",
      },
      {
        src: "/projects/seatz/my-bookings.png",
        alt: "My bookings page with saved reservations",
      },
      {
        src: "/projects/seatz/layout-creator.png",
        alt: "Venue layout creator with an editable seat grid",
      },
      {
        src: "/projects/seatz/seat-editor.png",
        alt: "Seat editor with pricing and an image upload",
      },
    ],
  },
  {
    id: "insurance-premium-predictor",
    title: "Insurance Premium Estimator",
    description: "A Next.js form and FastAPI backend that use a Random Forest classifier to predict a low, medium, or high insurance premium category.",
    stack: ["Next.js", "TypeScript", "FastAPI", "scikit-learn"],
    github: "https://github.com/Ishmam21/Insurance-Tier-Model",
    live: "https://insurance-tier-model.vercel.app/",
    docs: "https://insurance-tier-model.onrender.com/docs",
    screenshots: [
      {
        src: "/projects/insurance-premium-predictor/desktop.png",
        alt: "Completed insurance form with calculated BMI and a predicted premium category",
      },
      {
        src: "/projects/insurance-premium-predictor/prediction.png",
        alt: "Calculated BMI and a successful premium category prediction",
      },
      {
        src: "/projects/insurance-premium-predictor/api-docs-1.png",
        alt: "FastAPI documentation showing the prediction endpoint",
      },
      {
        src: "/projects/insurance-premium-predictor/api-docs-2.png",
        alt: "FastAPI documentation showing the prediction request and response",
      },
    ],
  },
  {
    id: "chatbotlocal",
    title: "ChatBotLocal",
    description: "A local terminal chatbot that retrieves relevant restaurant reviews before answering questions with an Ollama model.",
    stack: ["Python", "LangChain", "Ollama", "Chroma"],
    github: "https://github.com/Ishmam21/ChatBotLocal",
    screenshots: [
      {
        src: "/projects/chatbotlocal/question2.png",
        alt: "Terminal chatbot answering a question about restaurant service",
      },
      {
        src: "/projects/chatbotlocal/question1.png",
        alt: "Terminal chatbot answering a question about the best-rated pizza",
      },
      {
        src: "/projects/chatbotlocal/spreadsheet.png",
        alt: "Source review spreadsheet with titles, ratings, dates, and review text",
      },
    ],
  },
];

export const projectAnchor = (id: Project["id"]) => `project-${id}`;
