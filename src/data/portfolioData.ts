import type { CaseStudy, ExperienceItem, MetricItem, SkillCategory } from '../types';

export const PROFILE = {
  name: 'Saddam Hussain',
  role: 'Senior Full Stack Engineer & AI Systems Architect',
  shortBio:
    '8+ years building and shipping high-throughput production web applications, specializing in Python (Django DRF, FastAPI), TypeScript (Next.js, React), and Production AI Automations. Proven track record designing OCR document pipelines, WebSocket RPA bridges, and resilient cloud architectures.',
  email: 'saddamhussainuos04@gmail.com',
  phone: '+92 317 4016016',
  location: 'Lahore, Pakistan (Open to Global Remote)',
  linkedin: 'https://www.linkedin.com',
  status: 'Open for Senior Roles',
  avatarUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDUXj0YyXL2kNfqhE40wIbhZEajbpBCBmk0afk46ERZD3sW4VUmlCFbn9LTJoVDp7zjMOEk37r9JS4sZjh2YUZlMGal6vEvbA8Go-Z5oUtwoemXirPVH9HDBaUVNQOufN8zcfgvz92tTAW1wghyT_kw1BQAbLIxK9tiK5nolqUlt95imv40Gc1ZlzS59KfQxyK5uzUbXZ1ohH-uXD62CqFXiz22EA6OKm-wMYF8gfSDG7Ejfhkvw68VkhpkQCo8wmM8Ug',
  highlights: [
    'Python (Django DRF, FastAPI)',
    'TypeScript (Next.js App Router, React)',
    'Production AI Pipelines & LLM Evals',
    'Docker Containerization & AWS Cloud Infrastructure',
  ],
};

export const METRICS: MetricItem[] = [
  { value: '8+', label: 'Years Production Exp' },
  { value: '5+', label: 'Companies Scaled' },
  { value: 'AI & Cloud', label: 'Production Architectures' },
  { value: 'AWS & Docker', label: 'Production Cloud Deployments' },
  { value: '0 to 1 & Scale', label: 'Architecture to Launch' },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'aimyable',
    title: 'Aimyable — Intelligent Accounts Payable Automation SaaS',
    role: 'Core Full-Stack Engineer / AI Architect',
    company: 'Stech Experts LTD',
    period: 'Apr 2025 – Present',
    flagshipBadge: 'Flagship AI Architecture (Stech Experts LTD • 2025–Present)',
    techStack: ['Python (DRF)', 'Next.js', 'PostgreSQL', 'Docker on AWS', 'Claude Code', 'Google Cloud Vision', 'WebSockets', 'basedpyright'],
    problem:
      'Corporate accounts-payable workflows require tedious manual invoice data entry, verification against ERP databases, approval routing, and repetitive manual UI execution into legacy Windows accounting applications without open APIs.',
    contributions: [
      'Workflow Orchestration Engine: Designed an intelligent routing engine with specialized components: an execution orchestrator for multi-step workflows, relational queries for normalized schemas, and an RPA bridge for UI execution.',
      'Automated Invoice Ingestion: Built OCR pipelines utilizing Google Cloud Vision API (Python SDK) to automatically convert raw unstructured PDF/image invoices into validated JSON entities without human entry.',
      'WebSocket RPA Bridge: Developed an orchestration layer linking backend database actions with a Windows RPA desktop client via persistent WebSockets for real-time task dispatch and two-way progress telemetry.',
      'Robust Auth & Provisioning: Implemented invitation-based tenant registration, RBAC, session-refresh security, and machine-to-machine token auth for automated worker nodes. Integrated Bland AI voice automation for conversational review collection.',
      'Static Typing & Quality: Enforced rigorous type checking with basedpyright to prevent runtime errors, backed by daily AI coding assistants (Claude Code / Codex) with strict diff inspection.',
    ],
    architectureFlow: [
      {
        step: '1. Ingestion & Extraction',
        description: 'Google Cloud Vision API (Python SDK)',
        subtext: 'Parsed unstructured PDF/image invoices into validated JSON entities.',
      },
      {
        step: '2. Workflow Orchestration',
        description: 'Django DRF Service Layer',
        subtext: 'Evaluates business approval rules and dispatches tasks to execution pipelines.',
      },
      {
        step: '3. DB & RPA Execution',
        description: 'PostgreSQL + WebSocket RPA Bridge',
        subtext: 'Performs relational integrity checks and executes commands into Windows accounting software.',
      },
      {
        step: '4. Verified Record & UI',
        description: 'Next.js Admin UI & Audit Trail',
        subtext: 'Complete end-to-end ledger reconciliation with zero human intervention required.',
      },
    ],
    impact: [
      { metric: '100%', label: 'Zero Manual Handoff' },
      { metric: 'Autonomous', label: 'Self-Serve Onboarding' },
    ],
  },
  {
    id: 'udu-com',
    title: 'Udu.com — Topic-Based Realtime Collaboration Platform',
    role: 'Senior Full Stack Engineer / Team Lead',
    company: 'Inner Machinations (Silicon Valley)',
    period: 'Mar 2024 – Apr 2025',
    flagshipBadge: 'Team Lead & Performance Engineering (Silicon Valley • Mar 2024 – Apr 2025)',
    techStack: ['Next.js App Router', 'React', 'TypeScript', 'Node.js', 'Clerk Auth', 'Server Actions', 'Agile/Scrum'],
    problem:
      'High latency, redundant API roundtrips, and slow initial rendering on an enterprise communication platform centered around dense threaded discussions, media attachments, and real-time collaboration.',
    contributions: [
      'Led development of Udu.com, heading an engineering team of 5 senior developers under strict Agile 2-week sprint cadences.',
      'Built and optimized the frontend in TypeScript and React (Next.js), reducing page load times by ~25% through component and API improvements.',
      'Moved critical operations directly to Next.js Server Actions, removing round-trips to external services and noticeably speeding up data-intensive flows.',
      'Customized Clerk integration for user and organization auth, simplifying enterprise admin workflows for granular permission control.',
      'Shipped robust posting and interaction features with media attachments (images/PDFs), rich-text commenting, and instantaneous topic discussion search.',
    ],
    architectureFlow: [
      {
        step: '1. User & Org Context',
        description: 'Clerk Multi-Tenant Auth',
        subtext: 'Granular role-based permissions and organization workspace isolation.',
      },
      {
        step: '2. Server Actions Layer',
        description: 'Next.js App Router',
        subtext: 'Colocated mutation actions eliminating external proxy hops and latency.',
      },
      {
        step: '3. Realtime Discussions',
        description: 'Threaded Topic Search & Streaming',
        subtext: 'Instant indexing with rich media attachments and optimistic UI updates.',
      },
    ],
    impact: [
      { metric: '~25% Faster', label: 'Reduced Page Load Time' },
      { metric: '5 Engineers', label: 'Team Leadership & Agile' },
    ],
  },
  {
    id: 'banyo-pos',
    title: 'Cloud POS & Distributed Multi-Store Inventory Engine',
    role: 'Full Stack Developer',
    company: 'Banyo Ltd UK',
    period: 'Apr 2023 – Mar 2024',
    flagshipBadge: 'Real-time Cloud Inventory & POS (Banyo Ltd UK • 2023–2024)',
    techStack: ['Django REST Framework', 'MongoDB', 'Next.js SSR', 'AWS EC2', 'GitHub Actions', 'Redis'],
    problem:
      'Retail stores experienced data desynchronization between physical offline cash registers and cloud warehouses, leading to inaccurate stock levels and checkout delays.',
    contributions: [
      'Built a POS and inventory web application with Django backend and Next.js frontend, covering a comprehensive catalog of REST endpoints.',
      'Implemented real-time inventory management with Django REST Framework and MongoDB, improving stock and sales sync latency and accuracy.',
      'Configured scalable AWS infrastructure (EC2) and CI/CD pipelines with Git and GitHub Actions, removing manual deployment friction.',
    ],
    architectureFlow: [
      {
        step: '1. Register Transactions',
        description: 'Next.js POS Terminal',
        subtext: 'Responsive interface optimized for touch terminals and barcode scanners.',
      },
      {
        step: '2. Low-Latency Sync',
        description: 'DRF & MongoDB Pipeline',
        subtext: 'High-speed document writes accommodating burst transactional traffic.',
      },
      {
        step: '3. Cloud Deployment',
        description: 'AWS EC2 & GitHub Actions',
        subtext: 'Automated continuous delivery with zero downtime deployment rollouts.',
      },
    ],
    impact: [
      { metric: '<100ms', label: 'Store Sync Latency' },
      { metric: '100%', label: 'Automated CI/CD Deployments' },
    ],
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    title: 'Senior Full Stack Engineer',
    company: 'Stech Experts LTD',
    location: 'Remote',
    period: 'Apr 2025 – Present',
    active: true,
    bulletPoints: [
      'Core full-stack engineer on Aimyable: an AI-powered accounts payable automation SaaS, built using Django DRF, Next.js, TypeScript, and PostgreSQL, containerized with Docker on AWS.',
      'Contributed to system design alongside the CTO, owning implementation across backend services, data modeling, and frontend workflows.',
      'Built an orchestration workflow engine that routes tasks across specialized components (state machine for orchestration, relational queries for data, and an RPA bridge for UI actions) to run multi-step invoice automation.',
      'Leveraged daily AI coding assistants (Claude Code, Codex) for scaffolding, refactoring, and debugging across multi-repo codebases, rigorously reviewing every diff and backing changes with type checks.',
      'Engineered automated invoice ingestion with Google Cloud Vision API (Python SDK) for zero manual entry.',
      'Constructed an orchestration layer connecting DB operations with a Windows RPA client over persistent WebSockets for real-time task execution.',
      'Designed normalized PostgreSQL schemas and core REST APIs with service-layer separation, serializer validation, and static type checking via basedpyright.',
      'Integrated Bland AI voice automation into backend to streamline customer review collection.',
    ],
  },
  {
    title: 'Senior Full Stack Engineer / Team Lead',
    company: 'Inner Machinations',
    location: 'Silicon Valley (Remote)',
    period: 'Mar 2024 – Apr 2025',
    active: false,
    bulletPoints: [
      'Led development of Udu.com, a topic-based communication platform, heading a team of 5 senior developers in an Agile process.',
      'Built and optimized the frontend in TypeScript and React (Next.js), cutting page load times by ~25% through component and API improvements.',
      'Moved critical operations to Next.js Server Actions, removing round-trips to external services and noticeably speeding up data-intensive flows.',
      'Customized Clerk integration for user and organization auth, simplifying admin workflows.',
      'Shipped robust posting and interaction features with media attachments (images/PDFs), commenting, and fast topic search.',
    ],
  },
  {
    title: 'Full Stack Developer',
    company: 'Banyo Ltd UK',
    location: 'Remote',
    period: 'Apr 2023 – Mar 2024',
    active: false,
    bulletPoints: [
      'Built a POS and inventory web app with Django backend and Next.js frontend, covering a broad set of REST APIs.',
      'Implemented real-time inventory management with Django REST Framework and MongoDB, improving stock and sales sync latency and accuracy.',
      'Set up AWS infrastructure (EC2) and CI/CD pipelines with Git and GitHub Actions, removing manual deployment steps.',
    ],
  },
  {
    title: 'Full Stack & Software Developer Foundation',
    company: 'One Clout • Smart Venture Tech • Linked Matrix',
    location: 'Lahore, Pakistan',
    period: '2018 – 2023',
    active: false,
    bulletPoints: [
      'One Clout (2022–2023): Built TypeScript backend services in Node.js, GraphQL & REST APIs; integrated MapBox satellite mapping and React Redux-Saga frontends. Shortened deployment cycles with Docker CI/CD.',
      'Smart Venture Technologies (2020–2022): Boosted project efficiency by 38% utilizing Material UI, SQL, PostgreSQL, Docker, and GitHub CI/CD.',
      'Linked Matrix (2018–2020): Developed robust PostgreSQL databases managing high-volume sensitive HR records and structured transactional data.',
    ],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: 'Backend & Languages',
    icon: 'server',
    skills: ['Python', 'Django (DRF)', 'FastAPI', 'TypeScript', 'JavaScript', 'Node.js / Express', 'REST APIs', 'GraphQL', 'SQL'],
  },
  {
    name: 'Frontend Architecture',
    icon: 'layout',
    skills: ['Next.js (App Router)', 'React', 'Redux / Zustand', 'Tailwind CSS', 'Material UI', 'React Hook Form', 'Server Actions'],
  },
  {
    name: 'AI & Automation Systems',
    icon: 'sparkles',
    skills: ['Production AI Pipelines', 'LLM Evals', 'OpenAI API', 'Claude Code / Codex', 'Google Cloud Vision OCR', 'Bland AI Voice Automation', 'State Graph Workflows'],
  },
  {
    name: 'Databases & Caching',
    icon: 'database',
    skills: ['PostgreSQL', 'Supabase', 'MongoDB', 'Redis (Cache/Queues)', 'MySQL', 'SQLite'],
  },
  {
    name: 'Cloud & DevOps',
    icon: 'cloud',
    skills: ['AWS (EC2, S3)', 'Docker Containerization', 'GitHub Actions CI/CD', 'Google Cloud Platform', 'Azure'],
  },
  {
    name: 'Type Safety & Testing',
    icon: 'shield-check',
    skills: ['basedpyright', 'React Testing Library', 'RBAC & Tenant Gating', 'WebSocket Protocols', 'NumPy & Pandas'],
  },
];

export const ENGINEERING_PHILOSOPHIES = [
  {
    number: '01',
    title: 'End-to-End Delivery',
    tag: 'Ownership',
    description:
      'From database schema migration to Next.js UI animations and Dockerized AWS deployment—owning features without throwing code over the fence.',
  },
  {
    number: '02',
    title: 'Deterministic AI',
    tag: 'Reliability',
    description:
      'LLMs must have strict structural guardrails, fallback states, and human-in-the-loop review triggers for high-stakes business operations.',
  },
  {
    number: '03',
    title: 'Compile-Time Sanity',
    tag: 'Type Safety',
    description:
      'Leveraging strict TypeScript and Python basedpyright. Catch regressions before code ever reaches runtime or staging environments.',
  },
  {
    number: '04',
    title: 'Measure & Optimize',
    tag: 'Performance',
    description:
      'Eliminating unnecessary network hops with Server Actions, tuning MongoDB/PostgreSQL indexes, and minimizing Core Web Vitals latency.',
  },
];
