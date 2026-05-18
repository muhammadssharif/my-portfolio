export type ImpactMetricCategory = "impact" | "performance" | "scale" | "delivery";

export type ImpactMetric = {
  id: string;
  category: ImpactMetricCategory;
  /** Orange highlight stat (e.g. $1M+, ~75%) */
  stat: string;
  caseStudy: string;
  headline: string;
  story: string;
  proofChips: readonly string[];
};

export type CaseStudy = {
  id: string;
  title: string;
  company: string;
  period: string;
  context: string;
  constraint: string;
  built: string[];
  metrics: string[];
  stack: string[];
};

export type HomepageFeaturedCard = {
  /** Stable id for i18n keys under home.cards.{cardId} */
  cardId: string;
  caseStudyId: string;
};

export type TechBadge = {
  id: string;
  label: string;
  brandColor: string;
};

export const siteContent = {
  name: "Muhammad Sheheryar Sharif",
  shortName: "Muhammad Sharif",
  location: "Calgary, AB",
  headline: "Full Stack Developer | Frontend Architecture | Enterprise SaaS | Payments",
  bio: [
    "I build production systems where performance, reliability, and business impact matter, from payment SDKs and compliance platforms to virtualized interfaces handling large datasets.",
    "Recent work includes helping protect a high-value Allianz payments partnership through a 48-hour SDK delivery, stress-tested large-data table architecture for extreme row counts, and frontend modernization with materially faster loads."
  ],
  links: {
    email: "msheheryarsharif@gmail.com",
    phone: "647-548-5349",
    github: "https://github.com/muhammadssharif",
    linkedin: "https://www.linkedin.com/in/muhammad-sharif-bb6774286/",
    portfolio: "https://my-portfolio-moeseneca.vercel.app/"
  },
  impactMetrics: [
    {
      id: "allianz-sdk",
      category: "impact",
      stat: "$1M+",
      caseStudy: "pcc-sdk",
      headline: "Protected a major payments partnership",
      story:
        "Built and shipped a Vanilla JS payments SDK in 48 hours for an urgent Allianz deployment.",
      proofChips: ["48-hour delivery", "Vanilla JS SDK", "Payments integration", "Production release"] as const
    },
    {
      id: "vite-migration",
      category: "performance",
      stat: "~75%",
      caseStudy: "horuz-v2",
      headline: "Frontend architecture upgrade",
      story:
        "Reduced app bundle size and improved load performance by migrating from CRA to Vite, code-splitting key routes, and optimizing production builds.",
      proofChips: ["CRA → Vite", "Route code splitting", "Production build optimization", "Measurable load gains"] as const
    },
    {
      id: "virtualization",
      category: "scale",
      stat: "200K+",
      caseStudy: "horuz-v2",
      headline: "Large data interface",
      story:
        "Built a virtualized enterprise table using TanStack Virtual with segmented scroll logic for high-volume compliance records.",
      proofChips: [
        "TanStack Virtual",
        "Segmented virtualization",
        "High-volume tables",
        "Scroll architecture"
      ] as const
    },
    {
      id: "auth-state",
      category: "delivery",
      stat: "6 modules",
      caseStudy: "horuz-v2",
      headline: "Auth and state refactor",
      story:
        "Improved app reliability by moving auth and shared app state toward a cleaner Zustand-based architecture.",
      proofChips: ["Zustand", "Auth flows", "Shared state", "Reliability"] as const
    }
  ] satisfies ImpactMetric[],
  /** Three homepage preview cards (two may share the same case study anchor). */
  homepageFeatured: [
    { cardId: "payments-sdk", caseStudyId: "pcc-sdk" },
    { cardId: "horuz-compliance", caseStudyId: "horuz-v2" },
    { cardId: "horuz-large-data", caseStudyId: "horuz-v2" }
  ] satisfies HomepageFeaturedCard[],
  techBadges: [
    { id: "react", label: "React", brandColor: "#61DAFB" },
    { id: "typescript", label: "TypeScript", brandColor: "#3178C6" },
    { id: "fastapi", label: "FastAPI", brandColor: "#009688" },
    { id: "mongodb", label: "MongoDB", brandColor: "#47A248" },
    { id: "docker", label: "Docker", brandColor: "#2496ED" },
    { id: "vite", label: "Vite", brandColor: "#646CFF" },
    { id: "zustand", label: "Zustand", brandColor: "#E2845A" },
    { id: "tanstack", label: "TanStack Virtual", brandColor: "#FF4154" },
    { id: "payments", label: "Payments", brandColor: "#635BFF" },
    { id: "websockets", label: "WebSockets", brandColor: "#10B981" },
    { id: "nodejs", label: "Node.js", brandColor: "#339933" },
    { id: "postgres", label: "PostgreSQL", brandColor: "#336791" }
  ] satisfies TechBadge[],
  caseStudies: [
    {
      id: "horuz-v2",
      title: "Horuz V2 Modernization",
      company: "149MKM Software",
      period: "Sept. 2025 - Present",
      context: "Enterprise compliance SaaS used by engineering, legal, and construction teams.",
      constraint: "Legacy CRA stack and large datasets caused load bottlenecks and difficult scaling.",
      built: [
        "Led modernization of six core modules: Dashboard, Obligations, Frameworks, Authentication, Actions, and Files.",
        "Migrated from CRA to Vite, introducing lazy loading, route-level code splitting, and caching.",
        "Designed page-segmented virtualization with TanStack Virtual and cache-aware loading."
      ],
      metrics: ["Bundle 6.6MB -> 3.9MB", "Initial JS 3MB -> ~998KB", "Load times improved up to ~75%", "200K+ records per segment; stress-tested near 1M rows"],
      stack: ["React", "TypeScript", "Vite", "TanStack Virtual", "Zustand", "FastAPI", "MongoDB", "AWS"]
    },
    {
      id: "pcc-sdk",
      title: "PCC / Allianz Payments SDK",
      company: "Paybilt",
      period: "2024 - 2025",
      context: "Custom embeddable payment SDK for merchant checkout flows.",
      constraint: "Critical partnership deadline required full delivery in 48 hours.",
      built: [
        "Built a Vanilla JS SDK in one weekend with CSS theming, dynamic prefill, and locked fields.",
        "Integrated API-triggered payment workflows for enterprise merchant onboarding.",
        "Shipped a stable implementation under tight delivery constraints."
      ],
      metrics: ["Delivered in 48 hours", "5,000+ lines shipped", "$1M+ Allianz partnership protected", "~70% faster merchant onboarding"],
      stack: ["JavaScript", "REST APIs", "CSS", "Payment Integrations"]
    },
    {
      id: "occ-platform",
      title: "OCC Donation Platform",
      company: "Paybilt",
      period: "2024 - 2025",
      context: "Fundraising platform for Conservative Party of Canada donation flow.",
      constraint: "Needed measurable conversion lift while handling compliant payments at scale.",
      built: [
        "Helped deliver OCC V1 donation platform with production-grade payment flow.",
        "Led a four-person frontend team for OCC V2 one-click checkout rebuild.",
        "Improved checkout UX while preserving compliance requirements."
      ],
      metrics: ["$500K+ processed in OCC V1", "+25% conversion in OCC V2", "Led frontend team of 4", "Supported $1M+ weekly transactions across live systems"],
      stack: ["React", "TypeScript", "Next.js", "Payments", "Agile Delivery"]
    },
    {
      id: "template-registry",
      title: "Template Registry Service",
      company: "Paybilt",
      period: "2024 - 2025",
      context: "Template and status system for complex payment notification and workflow rendering.",
      constraint: "Frontend duplication and support issues were slowing delivery across many merchant flows.",
      built: [
        "Built FastAPI + MongoDB service to centralize Jinja2 templates and status handling.",
        "Enabled single-template handling for many payment states through composable rules.",
        "Reduced support overhead by stabilizing template reuse and rendering reliability."
      ],
      metrics: ["100+ Jinja2 templates managed", "300+ payment-status combinations from single templates", "~90% less frontend duplication", "~40% fewer support tickets"],
      stack: ["Python", "FastAPI", "MongoDB", "GraphQL", "Jinja2", "Docker"]
    },
    {
      id: "oasis-mobile",
      title: "Oasis Real Estate App",
      company: "Oasis",
      period: "2025",
      context: "Cross-platform real estate app for brokers and clients.",
      constraint: "Rapid contract build with real-time chat and map-heavy interactions across platforms.",
      built: [
        "Developed app architecture using Clean Architecture and BLoC.",
        "Implemented real-time chat with typing indicators, read receipts, and reconnection logic.",
        "Integrated maps, search, favorites, comparisons, and secure REST API workflows."
      ],
      metrics: ["22+ screens delivered", "iOS, Android, and Web support", "Real-time WebSocket chat features"],
      stack: ["Flutter", "Dart", "BLoC", "WebSockets", "Google Maps", "REST APIs"]
    },
    {
      id: "zamzam",
      title: "Zam Zam Bags and Boutique",
      company: "Independent Client",
      period: "2023",
      context: "Small-business web experience for product showcase and customer discovery.",
      constraint: "Needed a polished and responsive storefront presence with quick iteration cycles.",
      built: [
        "Designed and delivered a responsive site for the business.",
        "Balanced visual identity with maintainable frontend implementation.",
        "Supported product presentation and customer contact flows."
      ],
      metrics: ["Live business website launched", "Responsive and production-ready delivery"],
      stack: ["React", "JavaScript", "HTML", "CSS", "Firebase"]
    }
  ] satisfies CaseStudy[],
  skills: {
    frontend: "React, TypeScript, JavaScript, Next.js, Vite, TanStack Virtual, Zustand, Tailwind CSS, Ant Design, Radix UI, Shadcn, Bootstrap, Chart.js, Recharts, i18next, Ajax, UML, WCAG",
    backend: "Python, FastAPI, Flask, Node.js, Express, GraphQL, REST APIs, Jinja2, WebSockets, JWT, RBAC",
    dataCloud: "MongoDB, PostgreSQL, MySQL, Firestore, AWS, Google Cloud, Firebase",
    mobile: "Flutter, BLoC, Clean Architecture, Google Maps, iOS, Android",
    devopsTools: "Docker, CI/CD, Git, GitHub, JIRA, Vercel, Figma, Adobe Photoshop, Linux, Bash, Excel",
    languages: "JavaScript, TypeScript, Python, C, C++, C#, .NET, SQL, HTML5, CSS"
  },
  education: {
    school: "Seneca Polytechnic",
    degree: "Bachelor of Technology, Software Development",
    date: "Expected Apr. 2026",
    location: "Toronto, ON"
  },
  certifications: [
    {
      title: "Responsive Web Design",
      issuer: "freeCodeCamp",
      date: "Sept. 2023",
      url: "https://www.freecodecamp.org/certification/msheheryarsharif/responsive-web-design"
    },
    {
      title: "Front End Development Libraries",
      issuer: "freeCodeCamp",
      date: "May 2024",
      url: "https://www.freecodecamp.org/certification/msheheryarsharif/front-end-development-libraries"
    },
    {
      title: "Backend Development and APIs",
      issuer: "freeCodeCamp",
      date: "Jan. 2025",
      url: "https://www.freecodecamp.org/certification/msheheryarsharif/back-end-development-and-apis"
    }
  ]
} as const;
