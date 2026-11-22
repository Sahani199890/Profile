export const profile = {
  email: "sahani199890@gmail.com",
  github: "https://github.com/Sahani199890",
  linkedin: "",
  portrait: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-P6XzSO9FjhWokxSwDEJDsPjNyklScl.png",
  education: { institution: "", degree: "", dates: "" },
};

export const intro =
  "I'm a Software Engineer specializing in Java Full Stack Development, building scalable backend systems, modern frontend applications, and AI-powered solutions. I enjoy solving complex engineering problems and transforming ideas into reliable, production-ready software.";

export const skills = [
  ["Languages", "Java 8", "JavaScript", "TypeScript", "Python"],
  [
    "Backend",
    "Spring Boot",
    "Spring MVC",
    "Spring Security",
    "Hibernate",
    "JPA",
    "REST APIs",
  ],
  [
    "Frontend",
    "React.js",
    "React TypeScript",
    "Redux",
    "Redux-Saga",
    "HTML5",
    "CSS3",
    "Bootstrap",
  ],
  [
    "AI & Generative AI",
    "LangChain",
    "Retrieval-Augmented Generation (RAG)",
    "Model Context Protocol (MCP)",
    "Agentic AI",
    "LLM Integration",
    "LLM Evaluation",
  ],
  [
    "Microservices",
    "Microservices Architecture",
    "Spring Cloud",
    "Eureka Server",
    "OpenFeign",
    "API Gateway",
    "Resilience4j",
  ],
  ["Databases", "MySQL", "AWS DynamoDB", "H2 Database"],
  ["Messaging", "Apache Kafka", "AWS SQS"],
  ["Cloud & DevOps", "AWS EC2", "AWS S3", "CloudFront", "Docker"],
  ["Testing", "JUnit 5", "Mockito", "Jest", "Enzyme"],
  [
    "Tools",
    "Git",
    "GitHub",
    "Bitbucket",
    "Postman",
    "Swagger",
    "IntelliJ IDEA",
    "VS Code",
  ],
];

export const jobs = [
  {
    company: "Voltuswave Private Limited",
    role: "Software Engineer",
    meta: "November 2024 — Present",
    points: [
      "QMentis-AI: Led a team of 12 developers through an 8-month delivery cycle, developing RAG modules and LLM integration.",
      "Dashboard Builder: Developed interactive dashboards and connected them to Jira integrations and AWS SQS event-driven actions.",
      "Global E-invoicing Integration: Engineered robust, compliant integration workflows for electronic invoicing services.",
      "Desktop Application (Freight): Contributed to building a high-performance freight desktop application using Electron JS.",
    ],
  },
  {
    company: "RChilli Inc.",
    role: "Software Engineer",
    meta: "Mohali, Punjab",
    points: [
      "Enrich Shopping Cart: Delivered full-stack shopping cart with React.js, Redux, Redux-Saga, Spring Boot APIs, MySQL, Stripe payments, and OAuth authentication (Google, LinkedIn, Facebook).",
      "AutomateTaxonomyKPI: Automated data retrieval to CSV files, saving several hours of manual work each week; achieved 85–88% code coverage using Mockito (Tech Stack: Spring Boot).",
      "FilterRelatedSkillJobProfile: Deleted redundant skill and job profile data from production, reducing database size and improving query performance (Tech Stack: Core Java, MySQL).",
      "Accuracy Tool & Skill Taxonomy Tool: Fixed critical issues, boosting performance by 20% with 85–88% code coverage using Mockito (Tech Stack: Java JSP).",
    ],
  },
  {
    company: "Geekster",
    role: "Teaching Associate",
    meta: "Technical instruction",
    points: [
      "Taught Java, data structures and algorithms, Spring Boot, and MySQL.",
      "Resolved technical questions and guided students through hands-on coding exercises.",
    ],
  },
];

export const projects = [
  {
    title: "QMentis-AI",
    type: "Voltuswave Private Limited",
    desc: "Led a team of 12 developers through an 8-month delivery cycle. Built retrieval-augmented generation (RAG) modules and integrated large language models.",
    points: [
      "Led a 12-developer team through an 8-month delivery cycle.",
      "Built RAG modules and integrated large language models (LLMs).",
    ],
    stack: [
      "LangChain",
      "RAG",
      "LLM Integration",
      "Agentic AI",
      "Python",
      "Java",
      "Spring Boot",
    ],
    github: "",
    demo: "",
  },
  {
    title: "Dashboard Builder",
    type: "Voltuswave Private Limited",
    desc: "Built interactive dashboards and connected them to Jira integrations and AWS SQS event-driven actions.",
    points: [
      "Developed interactive dashboards for real-time tracking.",
      "Integrated Jira workflows and AWS SQS message processing.",
    ],
    stack: [
      "React.js",
      "TypeScript",
      "Java",
      "Spring Boot",
      "Microservices",
      "AWS SQS",
      "Jira",
    ],
    github: "",
    demo: "",
  },
  {
    title: "Global E-invoicing Integration",
    type: "Voltuswave Private Limited",
    desc: "Engineered scalable integration workflows and compliant services for global electronic invoicing.",
    points: [
      "Implemented enterprise electronic invoicing integration pipelines.",
      "Ensured regulatory compliance and high-throughput data processing.",
    ],
    stack: [
      "Java",
      "Spring Boot",
      "Microservices",
      "REST APIs",
      "MySQL",
    ],
    github: "",
    demo: "",
  },
  {
    title: "Desktop Application (Freight)",
    type: "Voltuswave Private Limited",
    desc: "Contributed to building a cross-platform desktop application for freight operations using Electron JS.",
    points: [
      "Developed freight operations desktop application using Electron JS.",
      "Connected desktop client with backend services for real-time tracking.",
    ],
    stack: ["Electron JS", "JavaScript", "Node.js", "React.js"],
    github: "",
    demo: "",
  },
  {
    title: "Enrich Shopping Cart",
    type: "RChilli Inc.",
    desc: "A full-stack shopping cart with user and admin interfaces, secure OAuth login (Google, LinkedIn, Facebook), and Stripe payment processing.",
    points: [
      "Delivered full-stack shopping cart with user and admin interfaces.",
      "Integrated OAuth authentication supporting Google, LinkedIn, and Facebook social login.",
      "Integrated Stripe payments and Spring Boot backend APIs.",
    ],
    stack: [
      "React.js",
      "Redux",
      "Redux-Saga",
      "Spring Boot",
      "MySQL",
      "Stripe",
      "OAuth (Google, LinkedIn, Facebook)",
    ],
    github: "",
    demo: "",
  },
  {
    title: "AutomateTaxonomyKPI",
    type: "RChilli Inc.",
    desc: "Automated data retrieval to CSV files, saving several hours of manual work each week. Testing: 85–88% code coverage using Mockito. Tech Stack: Spring Boot.",
    points: [
      "Automated data retrieval to CSV files, saving several hours of manual work each week.",
      "Testing: 85–88% code coverage using Mockito.",
    ],
    stack: ["Spring Boot", "Mockito", "Java"],
    github: "",
    demo: "",
  },
  {
    title: "FilterRelatedSkillJobProfile",
    type: "RChilli Inc.",
    desc: "Deleted redundant skill and job profile data from production, reducing database size and improving query performance. Tech Stack: Core Java, MySQL.",
    points: [
      "Deleted redundant skill and job profile data from production.",
      "Reduced database size and significantly improved query performance.",
    ],
    stack: ["Core Java", "MySQL"],
    github: "",
    demo: "",
  },
  {
    title: "Accuracy Tool & Skill Taxonomy Tool",
    type: "RChilli Inc.",
    desc: "Fixed critical issues, boosting performance by 20%. Testing: 85–88% code coverage using Mockito. Tech Stack: Java JSP.",
    points: [
      "Fixed critical issues, boosting performance by 20%.",
      "Testing: 85–88% code coverage using Mockito.",
    ],
    stack: ["Java JSP", "Mockito", "Core Java"],
    github: "",
    demo: "",
  },
];
