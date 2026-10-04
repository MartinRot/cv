import {
  Project,
  SkillCategory,
  ExperienceItem,
  EducationItem,
  Language
} from "@/types/cv";

export const PERSONAL_INFO = {
  name: "Martin Rotelli",
  alias: "martinrot",
  title: "Frontend Developer | React.js | Next.js | Firebase | React Native",
  motto: "Code. Deploy. Improve. Repeat",
  location: {
    es: "Florida - Vicente López, Buenos Aires, Argentina",
    en: "Florida - Vicente López, Buenos Aires, Argentina"
  },
  phone: "+54 9 1121733472",
  phoneClean: "+5491121733472",
  email: "martin_rot@hotmail.com",
  github: "https://github.com/martinrot",
  linkedin: "https://www.linkedin.com/in/martin-rotelli",
  availability: {
    es: "Disponible para nuevas oportunidades",
    en: "Open to new opportunities"
  },
  aboutMe: {
    recruiter: {
      es: "Frontend Developer especializado en React y Next.js, con experiencia en desarrollo de aplicaciones web con SSR, integración con APIs, bases de datos en Firebase y despliegue en Vercel. También desarrollo aplicaciones mobile con React Native. Enfocado en performance, SEO y experiencia de usuario.",
      en: "Frontend Developer specialized in React and Next.js, experienced in building web applications with SSR, API integrations, Firebase databases, and Vercel deployments. Also building mobile apps with React Native. Passionate about performance, SEO, and user experience."
    },
    developer: {
      es: "Desarrollador apasionado por los internos de React 19, Next.js (App Router, Server Actions, RSC, ISR/SSR) y arquitecturas escalables con TypeScript estricto. Me especializo en sincronización en tiempo real con Firebase Firestore, optimización de Core Web Vitals, integración de pasarelas de pago (Mercado Pago, PayPal) y diseño responsivo de alto impacto con Tailwind CSS.",
      en: "Software engineer passionate about React 19 internals, Next.js (App Router, Server Actions, RSC, ISR/SSR), and scalable architectures with strict TypeScript. Specialized in real-time sync with Firebase Firestore, Core Web Vitals optimization, payment gateways (Mercado Pago, PayPal), and high-impact responsive design with Tailwind CSS."
    }
  },
  stats: [
    {
      value: "+500K",
      label: { es: "Visitas anuales en plataformas activas", en: "Annual visits on live platforms" }
    },
    {
      value: "SaaS & PWA",
      label: { es: "Ecosistemas creados desde cero", en: "Ecosystems built from scratch" }
    },
    {
      value: "100%",
      label: { es: "Enfoque TypeScript, React & Next.js", en: "TypeScript, React & Next.js focus" }
    },
    {
      value: "+5.000",
      label: { es: "Usuarios en entornos de soporte LMS", en: "Users in LMS support environments" }
    }
  ]
};

export const PROJECTS: Project[] = [
  {
    id: "playoff",
    title: "Playoff",
    tagline: {
      es: "Software SaaS de Gestión Deportiva para Clubes",
      en: "SaaS Sports Management Platform for Clubs and Leagues"
    },
    description: {
      es: "Plataforma integral SaaS para la digitalización y gestión de clubes deportivos: generación automática de sitios web públicos autoadministrables para cada institución, control de socios, cobro de cuotas y estadísticas.",
      en: "All-in-one SaaS platform for sports club digitization: auto-generated self-managed public websites for institutions, membership management, fee collection, and sports data."
    },
    role: {
      es: "Fundador y Frontend Developer",
      en: "Founder & Frontend Developer"
    },
    year: "2026 / Actualidad",
    category: "SaaS / Platform",
    featured: true,
    hp: 100,
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Firebase Firestore",
      "Mercado Pago",
      "Resend",
      "Vercel",
      "SSR / ISR"
    ],
    metrics: {
      es: "Generación automática de sitios web públicos institucionales con SSR/ISR y cobro recurrente con Mercado Pago.",
      en: "Automated institutional website generation with SSR/ISR and recurring checkout with Mercado Pago."
    },
    architectureDetails: {
      es: [
        "Generación automática de sitios web públicos autoadministrables para cada club, optimizados para SEO y performance.",
        "Arquitectura escalable en Firebase Firestore con sincronización de datos en tiempo real.",
        "Integración de pasarela Mercado Pago para cobro de cuotas sociales y módulo de E-commerce.",
        "Dashboard administrativo completo para gestión de jugadores, cuerpo técnico y datos deportivos.",
        "Autenticación, sesiones y protección granular de rutas mediante Next.js Middleware.",
        "Implementación de SSR e ISR, caching y optimización de consultas para reducir costos y maximizar velocidad."
      ],
      en: [
        "Automated generation of self-managed public websites for each club, optimized for SEO and performance.",
        "Scalable architecture in Firebase Firestore with real-time data synchronization.",
        "Mercado Pago integration for social membership fee billing and integrated e-commerce module.",
        "Comprehensive admin dashboard for managing players, coaching staff, and sports match data.",
        "Authentication, session control, and route protection via Next.js Middleware.",
        "SSR and ISR caching and query optimization to reduce operational costs and maximize speed."
      ]
    },
    liveUrl: "https://jugaplayoff.com",
    secondaryLiveUrl: "https://clubplayoff.com/argentina"
  },
  {
    id: "parenlapelotafutsal",
    title: "Paren La Pelota Futsal",
    tagline: {
      es: "Plataforma deportiva con +500.000 visitas anuales",
      en: "Sports tournament platform with +500,000 annual visits"
    },
    description: {
      es: "Plataforma líder para el seguimiento de torneos y fixtures de futsal en Argentina. Tablas de posiciones, estadísticas en vivo y monetización integrada.",
      en: "Leading futsal tournament platform in Argentina: dynamic standings, live stats, and integrated ad monetization."
    },
    role: {
      es: "Fundador y Full Stack Developer",
      en: "Founder & Full Stack Developer"
    },
    year: "2023 / Actualidad",
    category: "Frontend",
    featured: true,
    hp: 100,
    tags: [
      "Next.js",
      "React",
      "JavaScript",
      "Tailwind CSS",
      "Firebase Firestore",
      "Google AdSense",
      "Vercel",
      "SSR / ISR"
    ],
    metrics: {
      es: "+500.000 visitas anuales, alta recurrencia de usuarios activos y SEO técnico optimizado para los primeros resultados.",
      en: "+500,000 annual visits, high recurring active user retention, and technical SEO tuned for top ranking."
    },
    architectureDetails: {
      es: [
        "Desarrollo completo de la plataforma web utilizando Next.js, React y Tailwind CSS.",
        "Implementación de Server Side Rendering (SSR) e Incremental Static Regeneration (ISR) para SEO y performance récord.",
        "Diseño y administración de base de datos en Firebase Firestore, optimizando queries y reduciendo lecturas.",
        "Endpoints y APIs personalizadas para ingesta y procesamiento de partidos y fixtures.",
        "Integración de Google AdSense y optimización del layout visual para monetización sin sacrificar UX.",
        "Optimización de Core Web Vitals y estructura semántica para ranking orgánico en Google."
      ],
      en: [
        "End-to-end web platform development using Next.js, React, and Tailwind CSS.",
        "Server Side Rendering (SSR) and Incremental Static Regeneration (ISR) for record-breaking SEO and load times.",
        "Firebase Firestore database schema design, optimizing query depth and read costs.",
        "Custom APIs and endpoints for tournament data processing and live match fixtures.",
        "Google AdSense integration with UX-friendly layout optimization for monetization.",
        "Core Web Vitals tuning and semantic tagging for top organic Google search ranking."
      ]
    },
    liveUrl: "https://parenlapelotafutsal.com.ar"
  },
  {
    id: "futsalero",
    title: "Futsalero (Browser Game)",
    tagline: {
      es: "Juego de navegador y simulador de carrera de futsal",
      en: "Browser-based futsal career simulator & match engine"
    },
    description: {
      es: "Juego de navegador interactivo desarrollado con Next.js 16 y React 19. Cuenta con un motor de simulación de partidos propio, modo carrera de jugador, sistema de ligas y copas, vitrinas comunitarias de trofeos, generación de relatos dinámicos impulsados por IA (Groq) y soporte multi-idioma con next-intl.",
      en: "Interactive browser game built with Next.js 16 and React 19. Features an in-house real-time match simulation engine (240KB+ in TypeScript), player career progression, multi-tier leagues & cups, community trophy showcases, AI-generated match story narratives (Groq), and next-intl internationalization."
    },
    role: {
      es: "Creador & Full Stack Game Developer",
      en: "Creator & Full Stack Game Developer"
    },
    year: "2026",
    category: "Browser Game",
    featured: true,
    hp: 100,
    tags: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "Firebase Firestore",
      "next-intl",
      "Custom Match Engine",
      "Groq AI"
    ],
    metrics: {
      es: "Motor de simulación propio, generación de relatos con IA en tiempo real y arquitectura de temporadas.",
      en: "Custom in-house match simulation engine, real-time AI commentary generator, and seasonal league architecture."
    },
    architectureDetails: {
      es: [
        "Motor matemático propio (futsalEngine.ts) para simulación de física, probabilidades y eventos de partido.",
        "Integración de IA (Groq API) para relatoría dinámica y generación de historias personalizadas de cada encuentro.",
        "Base de datos en Firebase Firestore con colecciones independientes para estadísticas, vitrina comunitaria y rankings de temporada.",
        "Soporte multi-idioma nativo con next-intl para jugadores de habla hispana e internacional.",
        "Pipeline de scripts Node.js para procesamiento de mapas de escudos vectoriales e importación masiva."
      ],
      en: [
        "Custom mathematical simulation engine (futsalEngine.ts) modeling match physics, probabilities, and tactical outcomes.",
        "AI integration (Groq API) for dynamic real-time commentary and procedural match story generation.",
        "Independent Firebase Firestore database schema for player statistics, community trophy rooms, and seasonal leaderboards.",
        "Native internationalization using next-intl for multilingual player audiences.",
        "Node.js asset pipeline for automated vector club crest mapping and batch data ingestion."
      ]
    },
    liveUrl: "https://futsalero.parenlapelotafutsal.com.ar/"
  },
  {
    id: "parenlapelota",
    title: "Paren La Pelota (Fútbol 11)",
    tagline: {
      es: "Plataforma deportiva para el seguimiento de los torneos juveniles AFA",
      en: "Sports platform for monitoring AFA youth amateur soccer tournaments"
    },
    description: {
      es: "Portal deportivo para la visualización de torneos juveniles de fútbol 11. Fixtures, tablas de posiciones, estadísticas y monetización integrada.",
      en: "Sports portal for 11-a-side soccer league management: interactive fixtures, automatic points table calculation, and graphic social card exporter."
    },
    role: {
      es: "Fundador y Full Stack Developer",
      en: "Founder & Full Stack Developer"
    },
    year: "2023 / Actualidad",
    category: "Full Stack",
    featured: true,
    hp: 90,
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Firebase Firestore",
      "html-to-image",
      "Vercel"
    ],
    metrics: {
      es: "Desarrollo completo de plataforma web utilizando Next.js, React y Tailwind CSS.",
      en: "League fixture automation and instant high-res PNG graphic card generation for Instagram social sharing."
    },
    architectureDetails: {
      es: [
        "Módulo de renderizado DOM-to-Canvas para exportación gráfica en alta resolución con un solo click.",
        "Lógica matemática para cruces, desempates olímpicos y tablas de posiciones en tiempo real.",
        "Sincronización en la nube con Firestore para actualización inmediata durante la fecha de partidos."
      ],
      en: [
        "DOM-to-Canvas rendering pipeline for instant high-resolution graphics ready for social media.",
        "Automated bracket generation, tiebreak resolution, and live table computation.",
        "Real-time Firestore synchronization for live updates during tournament matchdays."
      ]
    },
    liveUrl: "https://parenlapelota.com.ar"
  },
  {
    id: "forotigre",
    title: "Foro Tigre",
    tagline: {
      es: "Comunidad & Portal PWA en tiempo real para hinchas de Tigre",
      en: "Real-time PWA Community & News Portal for Tigre fans"
    },
    description: {
      es: "Plataforma comunitaria de noticias, debates y encuestas con soporte PWA offline, notificaciones y sincronización en tiempo real.",
      en: "Community news and debate portal with offline PWA support, notifications, and real-time Firestore sync."
    },
    role: {
      es: "Full Stack Developer",
      en: "Full Stack Developer"
    },
    year: "2026 / Actualidad",
    category: "Mobile / PWA",
    featured: false,
    hp: 85,
    tags: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Firebase Firestore",
      "Tailwind CSS",
      "Serwist (PWA)",
      "TanStack Query",
      "Zustand"
    ],
    metrics: {
      es: "PWA instalable en iOS/Android con caché optimizada y Service Workers.",
      en: "Installable PWA on iOS/Android with custom caching and Service Workers via Serwist."
    },
    architectureDetails: {
      es: [
        "Arquitectura App Router con Server Components para velocidad de carga instantánea.",
        "Base de datos en tiempo real en Firestore con reglas de seguridad y validaciones.",
        "Caché en cliente y estados con TanStack Query y Zustand."
      ],
      en: [
        "App Router architecture with React Server Components for instant load speeds.",
        "Real-time Firestore database with granular security rules and schema guards.",
        "Client caching and state management powered by TanStack Query and Zustand."
      ]
    },
    liveUrl: "https://forotigre.com"
  },
  {
    id: "invicu",
    title: "Invicu",
    tagline: {
      es: "Plataforma de Ticketing & Pagos para Eventos",
      en: "Event Ticketing & Dual Payment Gateway Platform"
    },
    description: {
      es: "Sistema de gestión de eventos con pasarelas de pago duales (Mercado Pago y PayPal), invitaciones digitales y verificación de entradas mediante credenciales QR dinámicas.",
      en: "Event management system with dual payment gateways (Mercado Pago and PayPal), digital invites, and dynamic QR access control."
    },
    role: {
      es: "Full Stack Developer",
      en: "Full Stack Developer"
    },
    year: "2026 / Actualidad",
    category: "Full Stack",
    featured: false,
    hp: 85,
    tags: [
      "Next.js",
      "TypeScript",
      "Mercado Pago SDK",
      "PayPal SDK",
      "Firebase Admin",
      "QR Code Engine",
      "Tailwind CSS",
      "Framer Motion"
    ],
    metrics: {
      es: "Checkout seguro multimoneda y validación de entradas QR en menos de 100ms.",
      en: "Secure multi-currency checkout and sub-100ms QR access pass verification."
    },
    architectureDetails: {
      es: [
        "Integración de Webhooks y Server Actions para validación atómica de transacciones.",
        "Generador de códigos QR con hashes criptográficos para control de accesos.",
        "Formularios dinámicos validados con React Hook Form y Zod."
      ],
      en: [
        "Webhook and Server Action pipelines for atomic payment reconciliation.",
        "Cryptographically hashed dynamic QR token engine for physical door check-in.",
        "Strictly validated dynamic checkout forms using React Hook Form and Zod."
      ]
    },
    liveUrl: "https://invicu.com"
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    period: "2026 / Actualidad",
    role: {
      es: "Fundador y Frontend Developer – Playoff (Gestión Deportiva SaaS)",
      en: "Founder & Frontend Developer – Playoff (SaaS Sports Management)"
    },
    company: "Playoff App",
    website: "https://jugaplayoff.com",
    description: {
      es: "Desarrollo completo de la plataforma SaaS para la administración integral de clubes deportivos utilizando Next.js, React y TypeScript.",
      en: "End-to-end development of the SaaS platform for sports club management using Next.js, React, and TypeScript."
    },
    highlights: {
      es: [
        "Implementación de generación automática de sitios web públicos autoadministrables para cada institución, optimizados para SEO y performance.",
        "Diseño de arquitectura escalable en Firebase Firestore con sincronización en tiempo real.",
        "Integración de Mercado Pago para cobro de cuotas sociales y módulo de E-commerce.",
        "Desarrollo de dashboard administrativo para gestión de jugadores, cuerpo técnico y datos deportivos.",
        "Implementación de SSR e ISR, caching y optimización de consultas para mejorar performance y reducir costos.",
        "Configuración de autenticación, sesiones y protección de rutas mediante Next.js Middleware.",
        "Despliegue, monitoreo y optimización continua en Vercel."
      ],
      en: [
        "Implemented automated generation of self-managed public websites for institutions, optimized for SEO and performance.",
        "Designed scalable architecture on Firebase Firestore with real-time state sync.",
        "Integrated Mercado Pago for recurring social club fees and e-commerce transactions.",
        "Built comprehensive administrative dashboard for player rosters, coaching staff, and match data.",
        "Configured SSR, ISR, caching, and query optimization to enhance speed and minimize cloud costs.",
        "Configured authentication, session lifecycle, and route guards using Next.js Middleware.",
        "Continuous deployment, monitoring, and performance tuning on Vercel."
      ]
    },
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Firebase",
      "Firestore",
      "Mercado Pago",
      "Resend",
      "Vercel",
      "SSR",
      "ISR"
    ]
  },
  {
    period: "2023 / Actualidad",
    role: {
      es: "Fundador y Frontend Developer – Paren La Pelota Futsal",
      en: "Founder & Frontend Developer – Paren La Pelota Futsal"
    },
    company: "Paren La Pelota Futsal",
    website: "https://parenlapelotafutsal.com.ar",
    description: {
      es: "Desarrollo y mantenimiento de la plataforma web líder para torneos de futsal con más de 500.000 visitas anuales.",
      en: "Development and ongoing maintenance of the leading futsal tournament portal with over 500,000 annual visits."
    },
    highlights: {
      es: [
        "Desarrollo completo de plataforma web utilizando Next.js, React y Tailwind CSS.",
        "Implementación de Server Side Rendering (SSR) e Incremental Static Regeneration (ISR) para mejorar performance y SEO.",
        "Diseño y gestión de base de datos en Firebase Firestore, optimizando consultas y estructura de datos.",
        "Desarrollo de APIs y endpoints para obtención y procesamiento de datos deportivos.",
        "Implementación de caching y revalidación de datos para optimizar el rendimiento.",
        "Integración de Google AdSense y optimización de layout para monetización.",
        "Optimización SEO técnico (meta tags, estructura semántica, performance, Core Web Vitals).",
        "Plataforma con +500.000 visitas anuales y base de usuarios activos recurrentes.",
        "Desarrollo continuo de mejoras en UX/UI y nuevas funcionalidades orientadas a retención de usuarios."
      ],
      en: [
        "Complete web platform development leveraging Next.js, React, and Tailwind CSS.",
        "Implemented SSR and Incremental Static Regeneration (ISR) to boost performance and Google rankings.",
        "Firebase Firestore schema design and query optimization for low latency.",
        "Engineered custom APIs and endpoints for tournament schedules and match result processing.",
        "Data caching and background revalidation strategies to optimize resource utilization.",
        "Integrated Google AdSense with layout optimization for smooth ad delivery without hurting UX.",
        "Technical SEO optimization (meta tags, semantic layout, Core Web Vitals).",
        "Platform serving +500,000 annual visits with a highly recurrent active user base.",
        "Continuous UI/UX refinements aimed at boosting engagement and user retention."
      ]
    },
    technologies: [
      "Next.js",
      "React",
      "JavaScript",
      "Tailwind CSS",
      "Firebase",
      "Firestore",
      "Google AdSense",
      "Vercel",
      "SSR",
      "ISR"
    ]
  },
  {
    period: "2020 / Actualidad",
    role: {
      es: "Asistente Operativo – Área de Capacitación",
      en: "Operations Assistant – Training & LMS Department"
    },
    company: "TÜV Rheinland Academy",
    description: {
      es: "Administración, gestión y soporte técnico del campus virtual y plataforma LMS para más de 5.000 usuarios.",
      en: "Administration, tech support, and management of the virtual campus and LMS platform for +5,000 users."
    },
    highlights: {
      es: [
        "Gestión del sistema LMS con más de 5.000 usuarios activos.",
        "Soporte técnico integral a usuarios en el campus virtual, mejorando la experiencia educativa digital.",
        "Mantenimiento del aula virtual operativa para cursos simultáneos, facilitando la ejecución de capacitaciones corporativas."
      ],
      en: [
        "Managed LMS platform infrastructure supporting over 5,000 users.",
        "Delivered technical support for virtual campus learners, optimizing the digital learning journey.",
        "Maintained continuous uptime across simultaneous virtual classrooms for enterprise training."
      ]
    },
    technologies: ["LMS Management", "Technical Support", "Virtual Classrooms", "User Experience"]
  }
];

export const EDUCATION: EducationItem[] = [
  {
    period: "03/2025 - 07/2025",
    degree: {
      es: "Backend Developer",
      en: "Backend Developer"
    },
    institution: "Talento Tech",
    description: {
      es: "Arquitectura backend, desarrollo de APIs RESTful seguras, autenticación basada en tokens JWT y bases de datos con Firebase y MongoDB.",
      en: "Backend architecture, secure RESTful APIs, JWT token-based authentication, and Firebase & MongoDB databases."
    },
    technologies: ["Node.JS", "Express", "Firebase", "JWT", "REST APIs"],
    projectUrl: "https://github.com/MartinRot/proyecto-final-talentotech"
  },
  {
    period: "02/2021 - 11/2021",
    degree: {
      es: "Frontend Developer",
      en: "Frontend Developer"
    },
    institution: "Coderhouse",
    description: {
      es: "Desarrollo frontend moderno, arquitectura de componentes, consumo de APIs y gestión de estado con React.",
      en: "Modern frontend development, component architecture, API consumption, and React state management."
    },
    technologies: ["HTML5", "CSS3", "JavaScript ES6+", "React.JS"]
  },
  {
    period: "02/2019 - 02/2022 (Aplazado)",
    degree: {
      es: "Tecnicatura Superior en Sistemas",
      en: "Associate Degree in Computer Systems"
    },
    institution: "Universidad Tecnológica Nacional (UTN)",
    description: {
      es: "Fundamentos de ingeniería de software, estructuras de datos, programación orientada a objetos y bases de datos.",
      en: "Software engineering fundamentals, data structures, object-oriented programming, and relational databases."
    },
    status: {
      es: "Completado",
      en: "Completed"
    }
  },
  {
    period: "Formación Continua",
    degree: {
      es: "Cursos de Especialización",
      en: "Specialization Courses"
    },
    institution: "Udemy & Plataformas Online",
    description: {
      es: "Especializaciones en Next.js + Tailwind CSS, Fundamentos de Bases de Datos Relacionales y Seguridad / Ethical Hacking.",
      en: "Specializations in Next.js + Tailwind CSS, Relational Database Fundamentals, and Ethical Hacking."
    },
    technologies: ["Next.js", "Tailwind CSS", "Relational Databases", "Ethical Hacking"]
  }
];

export const ACADEMIC_PROJECTS = [
  {
    title: "Tienda Online DeZapas.com",
    tech: "React JS + Tailwind CSS + Firebase",
    url: "http://bit.ly/47zFqg3"
  },
  {
    title: "Aplicación del Clima",
    tech: "React JS + Tailwind CSS + Web API",
    url: "https://bit.ly/47AjeCt"
  },
  {
    title: "Pokédex",
    tech: "React JS + Tailwind CSS + Web API",
    url: "https://bit.ly/47TiqsP"
  },
  {
    title: "Calculadora de IMC",
    tech: "Javascript + Bootstrap",
    url: "https://bit.ly/3ul4UQ3"
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: {
      es: "Frontend & Frameworks",
      en: "Frontend & Frameworks"
    },
    skills: [
      { name: "React / React 19", level: { es: "Avanzado", en: "Advanced" } },
      { name: "Next.js (App Router / SSR / ISR)", level: { es: "Avanzado", en: "Advanced" } },
      { name: "TypeScript", level: { es: "Avanzado", en: "Advanced" } },
      { name: "React Native (Mobile)", level: { es: "Competente", en: "Proficient" } },
      { name: "Tailwind CSS", level: { es: "Avanzado", en: "Advanced" } },
      { name: "JavaScript (ES6+)", level: { es: "Avanzado", en: "Advanced" } }
    ]
  },
  {
    name: {
      es: "Backend, BaaS & Datos",
      en: "Backend, BaaS & Data"
    },
    skills: [
      { name: "Firebase (Firestore, Auth)", level: { es: "Avanzado", en: "Advanced" } },
      { name: "Node.js & Express", level: { es: "Competente", en: "Proficient" } },
      { name: "APIs RESTful & Server Actions", level: { es: "Avanzado", en: "Advanced" } },
      { name: "JWT & Next.js Middleware", level: { es: "Avanzado", en: "Advanced" } },
      { name: "Bases de Datos Relacionales", level: { es: "Competente", en: "Proficient" } }
    ]
  },
  {
    name: {
      es: "Integraciones, Pagos & Despliegue",
      en: "Integrations, Payments & Deploy"
    },
    skills: [
      { name: "Mercado Pago SDK", level: { es: "Avanzado", en: "Advanced" } },
      { name: "Vercel (Deploy, Monitoring)", level: { es: "Avanzado", en: "Advanced" } },
      { name: "Google AdSense", level: { es: "Avanzado", en: "Advanced" } },
      { name: "SEO Técnico & Core Web Vitals", level: { es: "Avanzado", en: "Advanced" } },
      { name: "Resend (Emailing)", level: { es: "Avanzado", en: "Advanced" } },
      { name: "Git & GitHub", level: { es: "Avanzado", en: "Advanced" } }
    ]
  }
];

export const UI_TRANSLATIONS = {
  nav: {
    projects: { es: "Proyectos", en: "Projects" },
    skills: { es: "Tecnologías", en: "Skills" },
    experience: { es: "Experiencia", en: "Experience" },
    education: { es: "Educación", en: "Education" },
    about: { es: "Sobre mí", en: "About me" },
    contact: { es: "Contacto", en: "Contact" },
    devMode: { es: "Dev Mode", en: "Dev Mode" },
    recruiterMode: { es: "Recruiter", en: "Recruiter" },
    chaosMode: { es: "Modo Caos", en: "Chaos Mode" },
    chaosActive: { es: "Modo Activo", en: "Active Mode" }
  },
  hero: {
    seeProjects: { es: "Ver Proyectos", en: "View Projects" },
    contactMe: { es: "Contactar", en: "Get in touch" },
    exportPdf: { es: "Exportar CV (PDF)", en: "Export CV (PDF)" },
    academicProjects: { es: "Ver proyectos académicos", en: "View academic projects" },
    easterEggTitle: { es: "¿Aburrido de los CVs estáticos?", en: "Tired of boring static CVs?" },
    easterEggDesc: {
      es: "Activa el Modo Caos: controla un personaje retro, salta sobre las tarjetas de este portfolio y destruílas con físicas 2D en tiempo real.",
      en: "Turn on Chaos Mode: control a retro pixel hero, jump on this portfolio's cards, and destroy them with real-time 2D physics."
    },
    activateChaos: { es: "[ 🎮 ACTIVAR MODO CAOS ]", en: "[ 🎮 ACTIVATE CHAOS MODE ]" },
    restoreHint: {
      es: "Tranquilo: incluye botón git checkout --hard para reparar todo.",
      en: "Don't worry: includes a 'git checkout --hard' button to repair everything."
    }
  },
  projects: {
    badge: { es: "Portafolio & Trabajos", en: "Portfolio & Live Works" },
    title: { es: "Proyectos Destacados", en: "Featured Projects" },
    desc: {
      es: "Plataformas SaaS, torneos con cientos de miles de visitas y aplicaciones en producción.",
      en: "SaaS platforms, sports portals with hundreds of thousands of visits, and production apps."
    },
    architectureTitle: { es: "Detalles de Arquitectura:", en: "Architecture Details:" },
    impactTitle: { es: "Impacto / Métrica:", en: "Impact / Metric:" },
    destroyedTitle: { es: "[ OBJETO DESTRUIDO ]", en: "[ OBJECT DESTROYED ]" },
    repairHint: {
      es: "Usa 'git checkout --hard' en el HUD superior para restaurar.",
      en: "Use 'git checkout --hard' in the top HUD to restore."
    },
    all: { es: "Todos", en: "All" }
  },
  experience: {
    badge: { es: "Experiencia & Trayectoria", en: "Experience & Track Record" },
    title: { es: "Historial Profesional", en: "Professional Experience" }
  },
  education: {
    badge: { es: "Formación & Certificaciones", en: "Education & Certifications" },
    title: { es: "Educación & Estudios", en: "Education & Studies" },
    academicProjectsTitle: { es: "Proyectos Académicos:", en: "Academic Projects:" },
    viewProject: { es: "Ver repositorio", en: "View repo" }
  },
  skills: {
    badge: { es: "Habilidades & Tecnologías", en: "Skills & Technologies" },
    title: { es: "Stack Tecnológico", en: "Tech Stack" },
    desc: {
      es: "Herramientas especializadas con las que construyo soluciones robustas y escalables.",
      en: "Specialized tools and libraries I leverage to build robust, scalable solutions."
    }
  },
  about: {
    badge: { es: "Biografía & Filosofía", en: "Bio & Philosophy" },
    title: { es: "Sobre mí", en: "About Me" },
    cleanCode: { es: "Código Limpio & Arquitectura", en: "Clean Code & Architecture" },
    cleanCodeDesc: {
      es: "TypeScript estricto, componentes reutilizables y flujo de datos predecible.",
      en: "Strict TypeScript, reusable components, and predictable data flow."
    },
    perfFirst: { es: "Rendimiento Primero", en: "Performance First" },
    perfFirstDesc: {
      es: "SSR, ISR, Server Components y optimización rigurosa de Core Web Vitals.",
      en: "SSR, ISR, Server Components, and strict Core Web Vitals optimization."
    },
    businessFocus: { es: "Foco en el Negocio", en: "Business-Driven Mindset" },
    businessFocusDesc: {
      es: "Productos con monetización, pasarelas de pago y retención de usuarios.",
      en: "Platforms with monetization, payment checkout, and user retention."
    }
  },
  contact: {
    badge: { es: "Contacto Directo", en: "Direct Contact" },
    title: { es: "¿Hablamos?", en: "Let's talk" },
    desc: {
      es: "Estoy disponible para incorporarme a equipos innovadores y proyectos de alto impacto.",
      en: "I am open to joining innovative teams and building high-impact products."
    },
    callOrWhatsapp: { es: "WhatsApp / Teléfono", en: "WhatsApp / Phone" },
    copied: { es: "Copiado", en: "Copied" }
  },
  game: {
    chaosTitle: { es: "MODO CAOS", en: "CHAOS MODE" },
    destroyedCount: { es: "Destruidos", en: "Destroyed" },
    repairBtn: { es: "git checkout --hard", en: "git checkout --hard" },
    repairedToast: {
      es: "✨ ¡Repositorio reparado exitosamente! (git checkout --hard)",
      en: "✨ Repository successfully restored! (git checkout --hard)"
    },
    welcomeToast: {
      es: "¡Usa [A][D]/Flechas para moverte, [W]/Espacio para saltar y Click para disparar!",
      en: "Use [A][D]/Arrows to move, [W]/Space to jump, and Click to shoot!"
    }
  }
};
