export type ImpactMetric = {
  id: string;
  value: string;
  label: string;
  proof: string;
  caseStudy: string;
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

export const siteContent = {
  name: "Muhammad Sheheryar Sharif",
  shortName: "Muhammad Sharif",
  location: "Calgary, AB",
  headline: "Full Stack Developer | Frontend Architecture | Enterprise SaaS | Payments",
  bio: [
    "Full stack developer specializing in React, TypeScript, FastAPI, MongoDB, WebSockets, Docker, and CI/CD for enterprise SaaS, payments, and compliance products.",
    "Known for turning urgent business requirements into production systems with measurable impact, including saving a single $1M+ Allianz partnership through a 48-hour SDK delivery, 200K+ row virtualization with page-segmented TanStack Virtual, and up to ~75% load-time improvements."
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
      value: "$1M+",
      label: "Partnership saved",
      proof: "48-hour Vanilla JS payments SDK that protected a single Allianz partnership.",
      caseStudy: "pcc-sdk"
    },
    {
      id: "vite-migration",
      value: "~75%",
      label: "Faster load times",
      proof: "CRA to Vite migration with lazy loading and route-level code splitting.",
      caseStudy: "horuz-v2"
    },
    {
      id: "virtualization",
      value: "1M rows",
      label: "Stress-tested scale",
      proof: "Page-segmented TanStack Virtual architecture handling 200K+ records per segment.",
      caseStudy: "horuz-v2"
    },
    {
      id: "promotions",
      value: "4x",
      label: "Promoted in 12 months",
      proof: "Progressed from junior frontend intern to full stack developer at Paybilt.",
      caseStudy: "occ-platform"
    }
  ] satisfies ImpactMetric[],
  featuredCaseStudies: ["horuz-v2", "pcc-sdk"],
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
