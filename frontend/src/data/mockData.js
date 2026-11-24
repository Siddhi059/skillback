export const DEMO_USER = {
  id: 'usr_maya_01',
  name: 'Maya Lin',
  email: 'maya.lin@example.com',
  avatarInitials: 'ML',
  previousRole: 'Senior Product Manager',
  previousCompany: 'FinPulse Technologies',
  yearsPriorExperience: 7,
  breakDuration: '3.5 years',
  breakReason: 'Family Caregiving & Relocation',
  targetRole: 'Lead Product Manager / Growth PM',
  targetIndustry: 'FinTech & Enterprise SaaS',
  workPreference: 'Hybrid or Remote (Flexible Core Hours)',
  readinessScore: 78,
  onboardingCompleted: true,
  translatedSkillsCount: 14,
  interviewConfidence: 84,
};

export const AI_AGENTS = [
  {
    id: 'translator',
    name: 'Break & Resume Translator',
    tag: 'Narrative AI',
    description:
      'Reframes career pauses, caregiving, volunteer leadership, and independent projects into executive-ready competencies.',
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
      'Simulates warm, structured interviews with real-time guidance on addressing career breaks with poise and authority.',
    metric: '+32% Confidence Lift',
    route: '/app/interview-coach',
  },
  {
    id: 'matcher',
    name: 'Returnship & Role Matcher',
    tag: 'Opportunity AI',
    description:
      'Surfaces vetted returnships, flexible roles, and break-friendly hiring teams aligned with your strengths and life rhythm.',
    metric: '180+ Partner Teams',
    route: '/app/jobs',
  },
];

export const RETURN_ROADMAP_TASKS = [
  {
    id: 't1',
    phase: 'Phase 1: Narrative',
    title: 'Translate 3.5-year break into transferable leadership bullets',
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
    title: 'Complete "AI-Assisted Product Discovery & Prompting" sprint',
    duration: '45 mins',
    status: 'in_progress',
    category: 'Skill Lab',
  },
  {
    id: 't4',
    phase: 'Phase 2: Refresh',
    title: 'Practice 2 behavioral prompts on addressing your career pause',
    duration: '20 mins',
    status: 'pending',
    category: 'Interview Coach',
  },
  {
    id: 't5',
    phase: 'Phase 3: Launch',
    title: 'Apply to 3 vetted FinTech Returnship cohorts closing this month',
    duration: '30 mins',
    status: 'pending',
    category: 'Returnships',
  },
];

export const TRANSFERABLE_SKILLS_SAMPLE = [
  {
    lifeContext: 'Managed multi-generational household budget, medical schedules, and care coordination during 3-year break',
    corporateTranslation: 'Cross-Functional Operations, Risk Prioritization & Resource Allocation',
    impactBullet:
      'Directed complex multi-stakeholder logistics, annual budgeting, and contingency planning under high-ambiguity timelines.',
  },
  {
    lifeContext: 'Led PTA fundraising committee and community digital newsletter (600+ families)',
    corporateTranslation: 'Stakeholder Engagement, Campaign Strategy & Lifecycle Communications',
    impactBullet:
      'Spearheaded community outreach and fundraising operations, scaling recurring engagement by 42% across 600+ members.',
  },
  {
    lifeContext: 'Completed self-paced product analytics refresher and built a local tutoring micro-site',
    corporateTranslation: 'Continuous Technical Upskilling & Rapid Product Prototyping',
    impactBullet:
      'Designed and launched a digital scheduling workflow while modernizing skills in AI product workflows and SQL analytics.',
  },
];

export const SKILL_MODULES = [
  {
    id: 'mod-1',
    title: 'Modern AI Workflows for Product & Ops Leaders',
    category: 'AI Literacy',
    duration: '2.5 hrs',
    progress: 75,
    priority: 'High Impact',
    description: 'Master AI-assisted PRDs, user research synthesis, and rapid competitive analysis.',
  },
  {
    id: 'mod-2',
    title: 'Product Analytics: Amplitude, Mixpanel & Cohort Thinking',
    category: 'Data & Metrics',
    duration: '3 hrs',
    progress: 100,
    priority: 'Completed',
    description: 'Refresh funnel diagnostics, retention curves, and outcome-driven OKRs.',
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
    title: 'Executive Presence & Returnship Salary Negotiation',
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
    title: 'Product Manager — Returnship Cohort',
    company: 'Veridian Pay',
    location: 'Remote (US / Flexible)',
    type: '16-Week Paid Returnship → Full-Time',
    compensation: '$145k – $165k annualized',
    matchScore: 95,
    breakFriendly: true,
    mentorship: true,
    flexibleHours: true,
    tags: ['FinTech', 'Mentorship Included', '4+ Yr Break Welcome'],
    summary:
      'Designed for experienced PMs returning after a 2+ year career pause. Includes a dedicated executive sponsor, onboarding ramp, and full-time conversion path.',
  },
  {
    id: 'job-2',
    title: 'Senior Program Manager, Customer Operations',
    company: 'Lumina Health',
    location: 'Hybrid — Boston / Flexible',
    type: 'Full-Time (4-Day Ramp Option)',
    compensation: '$132k – $150k',
    matchScore: 91,
    breakFriendly: true,
    mentorship: true,
    flexibleHours: true,
    tags: ['HealthTech', 'Caregiver Friendly', 'Hybrid'],
    summary:
      'Lead cross-functional clinical onboarding initiatives. We value life experience, empathy, and operational rigor over uninterrupted resumes.',
  },
  {
    id: 'job-3',
    title: 'Product Strategy & Operations Lead',
    company: 'Northstar Cloud',
    location: 'Remote',
    type: 'Full-Time',
    compensation: '$140k – $162k',
    matchScore: 88,
    breakFriendly: true,
    mentorship: false,
    flexibleHours: true,
    tags: ['Enterprise SaaS', 'Async-First', 'SkillBack Partner'],
    summary:
      'Partner with Product & GTM leadership to streamline planning cycles. Flexible core hours and structured 60-day onboarding.',
  },
  {
    id: 'job-4',
    title: 'Engineering Manager — Reboot Fellowship',
    company: 'Aurelia Systems',
    location: 'Hybrid — Austin / Seattle',
    type: '12-Week Paid Fellowship',
    compensation: '$165k – $185k annualized',
    matchScore: 82,
    breakFriendly: true,
    mentorship: true,
    flexibleHours: false,
    tags: ['Platform', 'Paid Upskilling', 'Cohort Peer Group'],
    summary:
      'For former technical leads or EMs returning to engineering leadership with hands-on architecture refreshers and pair-mentoring.',
  },
];

export const INTERVIEW_PROMPTS = [
  {
    id: 'int-1',
    category: 'Career Break Framing',
    question: 'Tell me about your recent career break and what brings you back to product leadership now.',
    tip: 'Keep your break explanation concise (20–30%), highlight one transferable skill or project, and pivot enthusiastically to the value you bring today.',
    sampleResponse:
      'After seven years leading fintech product launches, I took a planned 3.5-year break for family caregiving and relocation. During that time, I stayed sharp by advising a local nonprofit on digital operations and completing an AI product workflows refresher. Now that my family foundation is settled, I am energized to bring my 0-to-1 execution experience and fresh perspective back to a collaborative product team.',
  },
  {
    id: 'int-2',
    category: 'Leadership & Impact',
    question: 'Walk me through a complex cross-functional initiative where you had to align conflicting stakeholders.',
    tip: 'Use the STAR method (Situation, Task, Action, Result) and anchor on measurable customer or revenue outcomes.',
    sampleResponse:
      'At FinPulse, Engineering and Compliance disagreed on our instant-onboarding rollout timeline. I facilitated a risk-tiering workshop, split the release into a low-risk MVP for verified users, and cut onboarding drop-off by 28% within one quarter.',
  },
  {
    id: 'int-3',
    category: 'Modernization & Growth',
    question: 'How have you kept your skills current while away from a traditional full-time role?',
    tip: 'Show deliberate curiosity: name specific tools, workflows, or communities you engaged with recently.',
    sampleResponse:
      'I approached my return systematically—shadowing product peers, rebuilding analytics fluency with cohort case studies, and integrating LLM synthesis tools into user research exercises.',
  },
];

export const MENTORS = [
  {
    id: 'm1',
    name: 'Priya Nair',
    role: 'VP of Product at CloudScale',
    breakNote: 'Returned after a 4-year maternity & caregiving break',
    circle: 'Tech & Product Comeback',
    availability: 'Thu · 11:00 AM',
    initials: 'PN',
  },
  {
    id: 'm2',
    name: 'Elena Rostova',
    role: 'Staff Software Engineer at Stripe',
    breakNote: 'Returned via Returnship after 5 years away',
    circle: 'Engineering Reboot',
    availability: 'Fri · 2:30 PM',
    initials: 'ER',
  },
  {
    id: 'm3',
    name: 'Camille Laurent',
    role: 'Director of People & Returnships',
    breakNote: 'Hired 85+ career returners across Finance & Ops',
    circle: 'Confidence & Negotiation',
    availability: 'Mon · 10:00 AM',
    initials: 'CL',
  },
];

export const STORIES = [
  {
    quote:
      'After four years caring for my parents, I worried my PM experience looked outdated. SkillBack translated my gap with dignity and matched me to a paid returnship in 5 weeks.',
    name: 'Ananya Sharma',
    role: 'Lead Product Manager · Returned after 4 years',
    initials: 'AS',
  },
  {
    quote:
      'The Interview Confidence Coach helped me practice talking about my sabbatical without apologizing. I walked into final rounds feeling grounded and landed two offers.',
    name: 'Rachel Bennett',
    role: 'Senior Data Analyst · Returned after 6 years',
    initials: 'RB',
  },
  {
    quote:
      'Instead of generic job boards, every company on SkillBack actually understood nonlinear careers. Having mentorship built into my returnship changed everything.',
    name: 'Sofia Morales',
    role: 'Engineering Manager · Returned after 3 years',
    initials: 'SM',
  },
];
