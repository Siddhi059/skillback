export const DEMO_USER = {
  id: 'usr_meera_01',
  name: 'Meera Deshmukh',
  email: 'meera.deshmukh@example.com',
  avatarInitials: 'MD',
  previousRole: 'Senior Corporate Banker',
  previousCompany: 'Axis & FinPulse Markets',
  yearsPriorExperience: 8,
  breakDuration: '3.5 years',
  breakReason: 'Family Caregiving & Relocation',
  targetRole: 'FinTech Risk & Product Strategy Lead',
  targetIndustry: 'FinTech & Enterprise SaaS',
  workPreference: 'Hybrid or Remote (Flexible Core Hours)',
  readinessScore: 82,
  onboardingCompleted: true,
  translatedSkillsCount: 14,
  interviewConfidence: 86,
};

export const AI_AGENTS = [
  {
    id: 'translator',
    name: 'Break & Resume Translator',
    tag: 'Narrative AI',
    description:
      'Reframes career pauses, caregiving, advisory work, and community leadership into executive-ready competencies.',
    metric: '94% ATS Clarity',
    route: '/app/resume-translator',
  },
  {
    id: 'roadmap',
    name: 'Skill Gap Architect',
    tag: 'Learning AI',
    description:
      'Compares your core domain foundation against current industry tools and builds a focused, bite-sized refresher plan.',
    metric: '4–6 Hr/Week Plan',
    route: '/app/skill-roadmap',
  },
  {
    id: 'coach',
    name: 'Interview Confidence Coach',
    tag: 'Practice AI',
    description:
      'Simulates warm, voice-enabled interviews with real-time guidance on addressing career breaks or pivots with poise.',
    metric: '+32% Confidence Lift',
    route: '/app/interview-coach',
  },
  {
    id: 'matcher',
    name: 'Returnship & Role Matcher',
    tag: 'Opportunity AI',
    description:
      'Surfaces vetted returnships, flexible advisory roles, and break-friendly hiring teams aligned with your experience.',
    metric: '180+ Partner Teams',
    route: '/app/jobs',
  },
];

export const REVERSE_MENTORSHIP_STEPS = [
  {
    num: '01',
    title: 'Mutual Matching',
    desc: 'Our matcher pairs returning, mid-career, or retired leaders with Gen-Z digital specialists whose strengths complement each other.',
  },
  {
    num: '02',
    title: 'Skill-Swap Sessions',
    desc: 'Split 30-minute sessions evenly: 15 minutes of leadership, stakeholder, and industry wisdom + 15 minutes of hands-on AI & digital workflows.',
  },
  {
    num: '03',
    title: 'Shared Project Tracks',
    desc: 'Co-build a real portfolio deliverable—like an AI-assisted project audit or FinTech onboarding spec—giving both partners verified proof.',
  },
];

export const REVERSE_MENTORSHIP_PAIRS = [
  {
    id: 'pair-eng',
    badge: 'Engineering ↔ AI Tooling',
    trackTitle: 'Smart Infrastructure Modernization Audit',
    cadence: 'Weekly · 30-min Skill Swap',
    senior: {
      name: 'Rajesh Kulkarni',
      avatar: 'rajesh',
      title: 'Retired Chief Mechanical Engineer (28 yrs)',
      shares: ['Capital Project Governance', 'Vendor & Safety Negotiation', 'Risk Escalation Judgment'],
    },
    genZ: {
      name: 'Aarav Sharma',
      avatar: 'aarav',
      title: 'Gen-Z AI Workflow Engineer (Age 24)',
      shares: ['Notion AI & Linear Roadmaps', 'AI Prompting for Technical Specs', 'Async Cloud Collaboration'],
    },
    outcome:
      'Rajesh became fluent in AI project suites in 3 weeks and now consults part-time; Aarav gained executive client presentation confidence.',
  },
  {
    id: 'pair-bank',
    badge: 'Banking ↔ Product Design',
    trackTitle: 'Inclusive Digital Lending Onboarding Flow',
    cadence: 'Bi-Weekly · 45-min Co-Build',
    senior: {
      name: 'Meera Deshmukh',
      avatar: 'meera',
      title: 'Former Corporate Banker (4-Yr Break)',
      shares: ['Credit Underwriting Rigor', 'Regulatory Stakeholder Poise', 'P&L & Risk Prioritization'],
    },
    genZ: {
      name: 'Chloe Vance',
      avatar: 'chloe',
      title: 'Gen-Z Product Designer (Age 25)',
      shares: ['Figma Collaborative Reviews', 'LLM User-Research Synthesis', 'Modern SaaS Design Systems'],
    },
    outcome:
      'Meera refreshed modern product rituals and landed a FinTech Risk Lead offer; Chloe shipped a compliance-ready UX case study.',
  },
  {
    id: 'pair-ops',
    badge: 'Operations ↔ Growth AI',
    trackTitle: 'AI-Assisted Supply Chain Forecasting Playbook',
    cadence: 'Weekly · 30-min Skill Swap',
    senior: {
      name: 'Vikram Nair',
      avatar: 'vikram',
      title: 'Senior Operations Lead (16 yrs Supply Chain)',
      shares: ['Cross-Border Ops Scaling', 'Crisis Playbooks & Budgeting', 'Board-Level Alignment'],
    },
    genZ: {
      name: 'Zoya Khan',
      avatar: 'zoya',
      title: 'Gen-Z Growth & AI Strategist (Age 23)',
      shares: ['Automated No-Code Workflows', 'Prompt-Driven Ops Analytics', 'Loom Async Storytelling'],
    },
    outcome:
      'Vikram cut manual reporting prototypes by 60% using AI automation; Zoya mastered enterprise procurement and ops strategy.',
  },
];

export const RETURN_ROADMAP_TASKS = [
  {
    id: 't1',
    phase: 'Phase 1: Narrative',
    title: 'Translate career break into transferable leadership bullets',
    duration: '15 mins',
    status: 'completed',
    category: 'Resume AI',
  },
  {
    id: 't2',
    phase: 'Phase 1: Narrative',
    title: 'Update LinkedIn headline & Open-to-Returnship signal',
    duration: '10 mins',
    status: 'completed',
    category: 'Profile',
  },
  {
    id: 't3',
    phase: 'Phase 2: Refresh',
    title: 'Complete "AI-Assisted Product & Ops Workflows" sprint',
    duration: '45 mins',
    status: 'in_progress',
    category: 'Skill Lab',
  },
  {
    id: 't4',
    phase: 'Phase 2: Refresh',
    title: 'Join a Two-Way Reverse Mentorship skill-swap session',
    duration: '30 mins',
    status: 'pending',
    category: 'Reverse Mentorship',
  },
  {
    id: 't5',
    phase: 'Phase 3: Launch',
    title: 'Apply to 3 vetted Returnship cohorts closing this month',
    duration: '30 mins',
    status: 'pending',
    category: 'Returnships',
  },
];

export const TRANSFERABLE_SKILLS_SAMPLE = [
  {
    lifeContext:
      'Managed multi-generational household budget, medical schedules, and care coordination during career pause',
    corporateTranslation: 'Cross-Functional Operations, Risk Prioritization & Resource Allocation',
    impactBullet:
      'Directed complex multi-stakeholder logistics, annual budgeting, and contingency planning under high-ambiguity timelines.',
  },
  {
    lifeContext: 'Led community fundraising committee and digital neighborhood newsletter (600+ families)',
    corporateTranslation: 'Stakeholder Engagement, Campaign Strategy & Lifecycle Communications',
    impactBullet:
      'Spearheaded community outreach and fundraising operations, scaling recurring engagement by 42% across 600+ members.',
  },
  {
    lifeContext: 'Completed reverse-mentorship AI sprints and built a local scheduling micro-site',
    corporateTranslation: 'Continuous Technical Upskilling & Rapid Digital Prototyping',
    impactBullet:
      'Designed and launched a digital workflow prototype while modernizing fluency in AI tools and SQL analytics.',
  },
];

export const SKILL_MODULES = [
  {
    id: 'mod-1',
    title: 'Modern AI Workflows for Product, Finance & Ops Leaders',
    category: 'AI Literacy',
    duration: '2.5 hrs',
    progress: 75,
    priority: 'High Impact',
    description: 'Master AI-assisted briefs, research synthesis, and rapid scenario modeling.',
  },
  {
    id: 'mod-2',
    title: 'Analytics & Decision Intelligence: Cohort & Funnel Metrics',
    category: 'Data & Metrics',
    duration: '3 hrs',
    progress: 100,
    priority: 'Completed',
    description: 'Refresh KPI diagnostics, retention curves, and outcome-driven OKRs.',
  },
  {
    id: 'mod-3',
    title: 'Modern Agile, Async Collaboration & Remote Rituals',
    category: 'Ways of Working',
    duration: '1.5 hrs',
    progress: 40,
    priority: 'Recommended',
    description: 'Navigate Linear, Notion, Loom, and async stakeholder alignment seamlessly.',
  },
  {
    id: 'mod-4',
    title: 'Executive Presence & Returnship Compensation Strategy',
    category: 'Career Strategy',
    duration: '2 hrs',
    progress: 0,
    priority: 'Upcoming',
    description: 'Benchmark total compensation confidently without discounting your prior tenure.',
  },
];

export const RETURNSHIP_JOBS = [
  {
    id: 'job-1',
    title: 'FinTech Risk & Product Strategy — Returnship Cohort',
    company: 'Veridian Pay',
    location: 'Remote (Global / Flexible)',
    type: '16-Week Paid Returnship → Full-Time',
    compensation: '$145k – $165k annualized',
    matchScore: 95,
    breakFriendly: true,
    mentorship: true,
    flexibleHours: true,
    tags: ['FinTech', 'Reverse Mentorship', '4+ Yr Break Welcome'],
    summary:
      'Designed for experienced bankers, analysts, and PMs returning after a 2+ year pause. Includes an executive sponsor and Gen-Z AI workflow buddy.',
  },
  {
    id: 'job-2',
    title: 'Senior Program Manager, Operations & Transformation',
    company: 'Lumina Health',
    location: 'Hybrid — Bengaluru / Boston',
    type: 'Full-Time (4-Day Ramp Option)',
    compensation: '$132k – $150k',
    matchScore: 91,
    breakFriendly: true,
    mentorship: true,
    flexibleHours: true,
    tags: ['HealthTech', 'Caregiver Friendly', 'Hybrid'],
    summary:
      'Lead cross-functional onboarding initiatives. We value lived leadership, empathy, and operational rigor over uninterrupted resumes.',
  },
  {
    id: 'job-3',
    title: 'EdTech Curriculum & AI Learning Lead',
    company: 'Northstar Cloud',
    location: 'Remote',
    type: 'Full-Time / Advisory Track',
    compensation: '$128k – $152k',
    matchScore: 89,
    breakFriendly: true,
    mentorship: true,
    flexibleHours: true,
    tags: ['EdTech', 'Educator Pivot Friendly', 'Async-First'],
    summary:
      'Ideal for educators and domain specialists pivoting into EdTech product design with structured onboarding and flexible hours.',
  },
  {
    id: 'job-4',
    title: 'Principal Project Advisor — Encore Fellowship',
    company: 'Aurelia Systems',
    location: 'Hybrid — Pune / Austin',
    type: '12-Week Paid Fellowship',
    compensation: '$155k – $180k annualized',
    matchScore: 86,
    breakFriendly: true,
    mentorship: true,
    flexibleHours: false,
    tags: ['Engineering', 'Encore & Retired Welcome', 'AI Co-Pilot'],
    summary:
      'For seasoned or retired engineers re-entering advisory leadership with reverse-mentorship pairing in modern AI project tooling.',
  },
];

export const INTERVIEW_PROMPTS = [
  {
    id: 'int-1',
    category: 'Career Break / Pivot Framing',
    question:
      'Tell me about your recent career pause or transition and what brings you back to leadership now.',
    tip: 'Keep your pause explanation concise (20–30%), highlight one transferable skill or reverse-mentorship project, and pivot enthusiastically to the value you bring today.',
    sampleResponse:
      'After eight years in corporate banking, I took a planned 3.5-year break for family caregiving and relocation. During that time, I stayed sharp by advising a local nonprofit on financial controls and completing a reverse-mentorship sprint in AI product workflows. Now I am energized to bring my risk judgment and refreshed digital toolkit back to a collaborative FinTech team.',
  },
  {
    id: 'int-2',
    category: 'Leadership & Stakeholder Impact',
    question:
      'Walk me through a complex cross-functional initiative where you had to align conflicting stakeholders.',
    tip: 'Use the STAR method (Situation, Task, Action, Result) and anchor on measurable customer, safety, or revenue outcomes.',
    sampleResponse:
      'During a core platform rollout, Compliance and Engineering disagreed on our onboarding verification timeline. I facilitated a risk-tiering workshop, phased the release into a low-risk MVP, and cut drop-off by 28% within one quarter.',
  },
  {
    id: 'int-3',
    category: 'Modernization & Two-Way Learning',
    question: 'How have you kept your digital and AI skills current alongside your domain expertise?',
    tip: 'Highlight reverse mentorship, hands-on micro-projects, and specific modern tools you actively adopted.',
    sampleResponse:
      'I paired with a Gen-Z product designer through a structured reverse-mentorship track—exchanging risk and governance insights for hands-on fluency in Notion AI, Figma reviews, and LLM research synthesis.',
  },
];

export const MENTORS = [
  {
    id: 'm1',
    name: 'Rajesh Kulkarni',
    role: 'Retired Chief Mechanical Engineer → AI Project Advisor',
    breakNote: 'Swaps 28 yrs of project governance for modern AI tooling & cloud workflows',
    circle: 'Engineering & Encore Leaders',
    availability: 'Thu · 11:00 AM',
    initials: 'RK',
    avatar: 'rajesh',
  },
  {
    id: 'm2',
    name: 'Meera Deshmukh',
    role: 'VP of FinTech Risk & Strategy at Veridian Pay',
    breakNote: 'Former banker who returned after a 4-year break via Reverse Mentorship',
    circle: 'Banking & FinTech Comeback',
    availability: 'Fri · 2:30 PM',
    initials: 'MD',
    avatar: 'meera',
  },
  {
    id: 'm3',
    name: 'Arjun Mehta',
    role: 'EdTech Curriculum & AI Product Lead at Northstar',
    breakNote: 'Former STEM educator who pivoted into EdTech after a 2-year sabbatical',
    circle: 'Educators & Career Pivoters',
    availability: 'Tue · 4:00 PM',
    initials: 'AM',
    avatar: 'arjun',
  },
  {
    id: 'm4',
    name: 'Zoya Khan',
    role: 'Gen-Z AI & Growth Designer (Reverse Mentor)',
    breakNote: 'Coaches senior & returning pros in Notion AI, Figma, and automated workflows',
    circle: 'Gen-Z ↔ Senior AI Skill-Swap',
    availability: 'Mon · 10:30 AM',
    initials: 'ZK',
    avatar: 'zoya',
  },
];

export const STORIES = [
  {
    quote:
      'After retiring from 28 years in mechanical engineering, I wanted to advise modern projects without feeling behind on tech. My 24-year-old reverse mentor taught me AI workflows while I coached him on vendor governance.',
    name: 'Rajesh Kulkarni',
    role: 'Principal Project Advisor · Retired Engineer Track',
    initials: 'RK',
    avatar: 'rajesh',
  },
  {
    quote:
      'Returning to finance after a 4-year family break felt daunting. SkillBack translated my banking background, paired me with a Gen-Z product designer for a live co-build, and helped me land a FinTech Risk Lead offer in 5 weeks.',
    name: 'Meera Deshmukh',
    role: 'FinTech Risk & Strategy Lead · 4-Year Break',
    initials: 'MD',
    avatar: 'meera',
  },
  {
    quote:
      'Moving from 10 years of classroom STEM teaching into EdTech after a sabbatical seemed impossible on standard job boards. The Voice Coach and Reverse Mentorship project track gave me undeniable proof of readiness.',
    name: 'Arjun Mehta',
    role: 'EdTech Curriculum & AI Lead · Educator Pivot',
    initials: 'AM',
    avatar: 'arjun',
  },
];
