import bcrypt from 'bcryptjs';
import Job from '../models/Job.js';
import Mentor from '../models/Mentor.js';
import RoadmapTask from '../models/RoadmapTask.js';
import SkillModule from '../models/SkillModule.js';
import User from '../models/User.js';

export const DEFAULT_ROADMAP_TASKS = [
  {
    phase: 'Phase 1: Narrative',
    title: 'Translate career break into transferable leadership bullets',
    duration: '15 mins',
    status: 'completed',
    category: 'Resume AI',
    order: 1,
  },
  {
    phase: 'Phase 1: Narrative',
    title: 'Update LinkedIn headline & Open-to-Returnship signal',
    duration: '10 mins',
    status: 'completed',
    category: 'Profile',
    order: 2,
  },
  {
    phase: 'Phase 2: Refresh',
    title: 'Complete "AI-Assisted Product Discovery & Prompting" sprint',
    duration: '45 mins',
    status: 'in_progress',
    category: 'Skill Lab',
    order: 3,
  },
  {
    phase: 'Phase 2: Refresh',
    title: 'Practice 2 behavioral prompts on addressing your career pause',
    duration: '20 mins',
    status: 'pending',
    category: 'Interview Coach',
    order: 4,
  },
  {
    phase: 'Phase 3: Launch',
    title: 'Apply to 3 vetted FinTech Returnship cohorts closing this month',
    duration: '30 mins',
    status: 'pending',
    category: 'Returnships',
    order: 5,
  },
];

const SEED_JOBS = [
  {
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

const SEED_MODULES = [
  {
    title: 'Modern AI Workflows for Product & Ops Leaders',
    category: 'AI Literacy',
    duration: '2.5 hrs',
    defaultProgress: 75,
    priority: 'High Impact',
    description: 'Master AI-assisted PRDs, user research synthesis, and rapid competitive analysis.',
  },
  {
    title: 'Product Analytics: Amplitude, Mixpanel & Cohort Thinking',
    category: 'Data & Metrics',
    duration: '3 hrs',
    defaultProgress: 100,
    priority: 'Completed',
    description: 'Refresh funnel diagnostics, retention curves, and outcome-driven OKRs.',
  },
  {
    title: 'Modern Agile, Async Collaboration & Remote Rituals',
    category: 'Ways of Working',
    duration: '1.5 hrs',
    defaultProgress: 40,
    priority: 'Recommended',
    description: 'Navigate Linear, Notion, Loom, and async stakeholder alignment seamlessly.',
  },
  {
    title: 'Executive Presence & Returnship Salary Negotiation',
    category: 'Career Strategy',
    duration: '2 hrs',
    defaultProgress: 0,
    priority: 'Upcoming',
    description: 'Benchmark total compensation confidently without discounting your prior tenure.',
  },
];

const SEED_MENTORS = [
  {
    name: 'Priya Nair',
    role: 'VP of Product at CloudScale',
    breakNote: 'Returned after a 4-year maternity & caregiving break',
    circle: 'Tech & Product Comeback',
    availability: 'Thu · 11:00 AM',
    initials: 'PN',
  },
  {
    name: 'Elena Rostova',
    role: 'Staff Software Engineer at Stripe',
    breakNote: 'Returned via Returnship after 5 years away',
    circle: 'Engineering Reboot',
    availability: 'Fri · 2:30 PM',
    initials: 'ER',
  },
  {
    name: 'Camille Laurent',
    role: 'Director of People & Returnships',
    breakNote: 'Hired 85+ career returners across Finance & Ops',
    circle: 'Confidence & Negotiation',
    availability: 'Mon · 10:00 AM',
    initials: 'CL',
  },
];

export async function ensureSeedData() {
  const [jobCount, moduleCount, mentorCount] = await Promise.all([
    Job.countDocuments(),
    SkillModule.countDocuments(),
    Mentor.countDocuments(),
  ]);

  if (jobCount === 0) {
    await Job.insertMany(SEED_JOBS);
  }
  if (moduleCount === 0) {
    await SkillModule.insertMany(SEED_MODULES);
  }
  if (mentorCount === 0) {
    await Mentor.insertMany(SEED_MENTORS);
  }

  let demoUser = await User.findOne({ email: 'maya.lin@example.com' });
  if (!demoUser) {
    const passwordHash = await bcrypt.hash('SkillBackDemo123!', 10);
    const modules = await SkillModule.find();
    demoUser = await User.create({
      name: 'Maya Lin',
      email: 'maya.lin@example.com',
      passwordHash,
      avatarInitials: 'ML',
      previousRole: 'Senior Product Manager',
      previousCompany: 'FinPulse Technologies',
      yearsPriorExperience: 7,
      breakDuration: '3.5 years',
      breakReason: 'Family Caregiving & Relocation',
      breakHighlights:
        'Managed multi-generational care logistics, led 600-member school digital fundraising committee, and completed product analytics coursework.',
      targetRole: 'Lead Product Manager / Growth PM',
      targetIndustry: 'FinTech & Enterprise SaaS',
      workPreference: 'Hybrid or Remote (Flexible Core Hours)',
      selectedFlex: ['Remote First', 'Paid Returnship Cohort', 'Flexible Core Hours'],
      readinessScore: 78,
      translatedSkillsCount: 14,
      interviewConfidence: 84,
      onboardingCompleted: true,
      moduleProgress: modules.map((mod) => ({
        moduleId: mod._id,
        progress: mod.defaultProgress,
      })),
    });

    await RoadmapTask.insertMany(
      DEFAULT_ROADMAP_TASKS.map((t) => ({ ...t, userId: demoUser._id })),
    );
  }

  return demoUser;
}
