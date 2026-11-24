import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Compass,
  Mic,
  Briefcase,
  HeartHandshake,
  Quote,
  MapPin,
  Clock,
  Wand2,
  SlidersHorizontal,
  BarChart3,
} from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import ProgressRing from '../components/common/ProgressRing';
import { PartnerLogoMark, ReturnerAvatar } from '../components/common/BrandArtwork';
import {
  DoodleHeartNote,
  DoodlePaperPlane,
  DoodleSparkle,
  DoodleSunnyBuddy,
  DoodleUnderline,
  HeroComebackDrawing,
} from '../components/common/Doodles';
import { ReadinessTrajectoryChart, SkillBenchmarkChart } from '../components/common/Charts';
import { RETURNSHIP_JOBS, STORIES } from '../data/mockData';
import { useAuth } from '../context/useAuth';
import './LandingPage.css';

const HERO_TRANSFORMATIONS = [
  {
    id: 'maya',
    tabLabel: 'Maya · 3.5-Yr Break',
    name: 'Maya Lin',
    avatar: 'maya',
    targetTrack: 'Lead Product Manager',
    priorContext: '7 yrs FinTech Product · Caregiving & Relocation pause',
    readiness: 86,
    atsLift: '+29% ATS Lift',
    rawContext: 'Managed family care schedules, relocation logistics, and school digital fundraising.',
    reframedBullet:
      'Directed multi-stakeholder operations, annual budgeting, and community outreach (+42% digital engagement) while completing AI product workflows.',
    company: 'Veridian Pay',
    matchedRole: 'Product Manager — Returnship Cohort',
    matchDetails: 'Remote · Paid Mentorship · Flexible Hours',
    matchScore: '95% Match',
  },
  {
    id: 'elena',
    tabLabel: 'Elena · 5-Yr Break',
    name: 'Elena Rostova',
    avatar: 'elena',
    targetTrack: 'Staff Data Engineer',
    priorContext: '6 yrs Cloud Analytics · Maternity & Elder Care pause',
    readiness: 89,
    atsLift: '+34% ATS Lift',
    rawContext:
      'Coordinated elder care medical records and built an open-source neighborhood mutual-aid tracker.',
    reframedBullet:
      'Architected Python/SQL data pipelines for a local civic initiative and modernized fluency in dbt, Snowflake, and LLM evaluation workflows.',
    company: 'Northstar Cloud',
    matchedRole: 'Senior Data Platform Returnship',
    matchDetails: 'Hybrid or Remote · 16-Week Ramp · Executive Sponsor',
    matchScore: '93% Match',
  },
  {
    id: 'priya',
    tabLabel: 'Priya · 2-Yr Break',
    name: 'Priya Sharma',
    avatar: 'priya',
    targetTrack: 'Director of People Ops',
    priorContext: '9 yrs HR Strategy · Health & Personal Sabbatical',
    readiness: 92,
    atsLift: '+31% ATS Lift',
    rawContext:
      'Advised two early-stage founders pro bono and redesigned return-to-work onboarding playbooks.',
    reframedBullet:
      'Advised seed-stage leadership on async onboarding frameworks, retention diagnostics, and inclusive career re-entry programs.',
    company: 'Lumina Health',
    matchedRole: 'Senior Program Manager, People Ops',
    matchDetails: 'Flexible Core Hours · 4-Day Ramp Option',
    matchScore: '96% Match',
  },
];

const STEPS = [
  {
    num: '01',
    title: 'Share Your Story & Pause',
    desc: 'Tell us about your prior career, your break duration, and the caregiving, community, or personal projects you led along the way.',
  },
  {
    num: '02',
    title: 'Translate Transferable Value',
    desc: 'Our Break & Resume AI reframes non-traditional experience into executive-ready competencies without apologizing for your gap.',
  },
  {
    num: '03',
    title: 'Bridge Modern Skill Gaps',
    desc: 'Follow a realistic 4–6 hr/week refresher roadmap and practice behavioral interviews with our warm AI Confidence Coach.',
  },
  {
    num: '04',
    title: 'Land Break-Friendly Roles',
    desc: 'Match directly with paid returnships, flexible-hour teams, and mentors who champion nonlinear career paths.',
  },
];

const PARTNER_COMPANIES = [
  'Veridian Pay',
  'Lumina Health',
  'Northstar Cloud',
  'Aurelia Systems',
  'CloudScale',
];

const STORY_AVATARS = ['ananya', 'rachel', 'sofia'];

export default function LandingPage() {
  const navigate = useNavigate();
  const { loginAsDemo } = useAuth();
  const [selectedId, setSelectedId] = useState('maya');

  const activeTransform =
    HERO_TRANSFORMATIONS.find((item) => item.id === selectedId) || HERO_TRANSFORMATIONS[0];

  const handleDemoLaunch = async (targetPath = '/app') => {
    await loginAsDemo();
    navigate(targetPath);
  };

  return (
    <div className="sb-landing">
      <Navbar />

      {/* Hero Section with Pastel Yellow & Pink Ambient Mesh Gradient */}
      <section className="sb-hero">
        <div className="sb-hero-mesh" aria-hidden="true">
          <div className="sb-hero-grid-bg" />
          <div className="sb-mesh-orb sb-mesh-orb-1" />
          <div className="sb-mesh-orb sb-mesh-orb-2" />
          <div className="sb-mesh-orb sb-mesh-orb-3" />
        </div>

        <div className="sb-container sb-hero-grid">
          <div style={{ position: 'relative' }}>
            <DoodleSparkle
              size={26}
              color="#FBBF24"
              style={{ position: 'absolute', top: '-12px', right: '28px' }}
            />
            <span className="sb-hero-eyebrow">
              <Sparkles size={13} /> AI-Powered Career Restart Platform
            </span>

            <h1 className="sb-hero-title">
              Your Experience Never{' '}
              <span style={{ display: 'inline-block', position: 'relative' }}>
                <span className="sb-hero-accent">Goes Out of Style.</span>
                <DoodleUnderline width={300} />
              </span>
            </h1>

            <p className="sb-hero-subtitle">
              SkillBack helps talented professionals—especially women returning after caregiving,
              relocation, or personal career breaks—translate lived expertise, refresh modern
              skills, and connect with vetted returnship employers.
            </p>

            <div className="sb-hero-ctas">
              <Button size="lg" variant="primary" onClick={() => navigate('/auth?mode=signup')}>
                Start Your Restart Plan <ArrowRight size={17} />
              </Button>
              <Button size="lg" variant="outline" onClick={() => handleDemoLaunch('/app')}>
                Explore Live Workspace
              </Button>
            </div>

            <div className="sb-hero-trust">
              <span>
                <CheckCircle2 size={15} color="var(--purple-600)" /> Built for 1–10+ year breaks
              </span>
              <span>
                <ShieldCheck size={15} color="var(--purple-600)" /> Zero-judgment AI coaching
              </span>
              <span>
                <HeartHandshake size={15} color="var(--purple-600)" /> 180+ return-friendly teams
              </span>
            </div>
          </div>

          {/* Interactive Live Transformation Snapshot Card */}
          <div className="sb-preview-card sb-glass-dark">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '12px',
                fontSize: '12px',
              }}
            >
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: 600,
                  color: '#FDE68A',
                }}
              >
                <span className="sb-live-dot" /> Live Break-to-Impact Preview
              </span>
              <span style={{ color: 'var(--text-on-dark-muted)' }}>Toggle persona</span>
            </div>

            <div className="sb-preview-switcher" role="tablist" aria-label="Sample career-break transformations">
              {HERO_TRANSFORMATIONS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={selectedId === item.id}
                  onClick={() => setSelectedId(item.id)}
                  className={`sb-preview-tab ${selectedId === item.id ? 'active' : ''}`}
                >
                  {item.tabLabel}
                </button>
              ))}
            </div>

            <div key={activeTransform.id} className="sb-animate-swap">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <ReturnerAvatar variant={activeTransform.avatar} size={50} />
                  <div>
                    <Badge tone="navy" style={{ background: 'rgba(244, 114, 182, 0.24)', color: '#FDE68A' }}>
                      {activeTransform.targetTrack}
                    </Badge>
                    <h3 style={{ color: '#FFFFFF', fontSize: '19px', marginTop: '7px' }}>
                      {activeTransform.name}
                    </h3>
                    <p style={{ color: 'var(--text-on-dark-muted)', fontSize: '12.5px', marginTop: '2px' }}>
                      {activeTransform.priorContext}
                    </p>
                  </div>
                </div>
                <ProgressRing value={activeTransform.readiness} size={82} label="Ready" dark />
              </div>

              <div className="sb-preview-pill">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#FDE68A', letterSpacing: '0.06em' }}>
                    BREAK CONTEXT → AI TRANSLATION
                  </span>
                  <span style={{ fontSize: '11.5px', color: '#6EE7B7', fontWeight: 700 }}>
                    {activeTransform.atsLift}
                  </span>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-on-dark-muted)', marginBottom: '8px', lineHeight: 1.45 }}>
                  <strong style={{ color: '#FBCFE8' }}>Pause:</strong> {activeTransform.rawContext}
                </p>
                <div
                  style={{
                    padding: '10px 12px',
                    borderRadius: '10px',
                    background: 'rgba(244, 114, 182, 0.16)',
                    border: '1px solid rgba(253, 230, 138, 0.28)',
                    fontSize: '13px',
                    color: '#FFF9FB',
                    lineHeight: 1.5,
                  }}
                >
                  “{activeTransform.reframedBullet}”
                </div>
              </div>

              <div
                className="sb-preview-pill"
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <PartnerLogoMark company={activeTransform.company} size={36} />
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#FDE68A', display: 'block' }}>
                      TOP RETURNSHIP MATCH · {activeTransform.company.toUpperCase()}
                    </span>
                    <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#FFFFFF' }}>
                      {activeTransform.matchedRole}
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--text-on-dark-muted)', display: 'block' }}>
                      {activeTransform.matchDetails}
                    </span>
                  </div>
                </div>
                <span
                  style={{
                    background: 'rgba(16, 185, 129, 0.18)',
                    color: '#6EE7B7',
                    padding: '6px 10px',
                    borderRadius: '999px',
                    fontSize: '12px',
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {activeTransform.matchScore}
                </span>
              </div>

              <div
                style={{
                  marginTop: '14px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '12.5px',
                }}
              >
                <span style={{ color: 'var(--text-on-dark-muted)' }}>
                  Interactive preview · Try with your own break story
                </span>
                <button
                  type="button"
                  onClick={() => handleDemoLaunch('/app/resume-translator')}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    color: '#FDE68A',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                  }}
                >
                  <Wand2 size={13} /> Open AI Studio →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Partners Bar */}
      <section className="sb-partners-strip" aria-label="Returnship partner companies">
        <div className="sb-container sb-partners-row">
          <span style={{ fontSize: '12.5px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
            Vetted Returnship Partners
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
            {PARTNER_COMPANIES.map((company) => (
              <div key={company} className="sb-partner-chip">
                <PartnerLogoMark company={company} size={28} />
                <span>{company}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Metrics Bar */}
      <section className="sb-stats-strip">
        <div className="sb-container sb-stats-grid">
          <div className="sb-stat-item">
            <h3>18,400+</h3>
            <p>Women & career returners supported across Tech, Finance, and Ops</p>
          </div>
          <div className="sb-stat-item">
            <h3>6.2 Weeks</h3>
            <p>Average time from resume translation to first returnship interview</p>
          </div>
          <div className="sb-stat-item">
            <h3>180+</h3>
            <p>Employer partners offering paid returnships & structured onboarding</p>
          </div>
          <div className="sb-stat-item">
            <h3>92%</h3>
            <p>Returners report higher confidence explaining career pauses</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="sb-section">
        <div className="sb-container">
          <div
            className="sb-card-lavender"
            style={{
              padding: '28px 32px',
              marginBottom: '48px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              alignItems: 'center',
              gap: '28px',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Badge tone="lavender">Guided Return Framework</Badge>
                <DoodlePaperPlane size={34} />
              </div>
              <h2 style={{ fontSize: 'clamp(26px, 3.2vw, 36px)', fontWeight: 800, marginTop: '12px' }}>
                A Structured Comeback Designed Around Real Life
              </h2>
              <p style={{ fontSize: '15.5px', color: 'var(--text-secondary)', marginTop: '12px', lineHeight: 1.65 }}>
                Career breaks aren’t empty spaces on a timeline—they are chapters of resilience,
                adaptability, and perspective. Here is how SkillBack turns your pause into momentum.
              </p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <HeroComebackDrawing />
            </div>
          </div>

          <div className="sb-grid-4">
            {STEPS.map((step) => (
              <div key={step.num} className="sb-card sb-card-interactive sb-step-card">
                <span className="sb-step-num">{step.num}</span>
                <h3 style={{ fontSize: '18px', fontWeight: 700 }}>{step.title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.62 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flagship Bento-Grid Workspace + Live Charts Showcase */}
      <section id="ai-agents" className="sb-section sb-section-lavender">
        <div className="sb-container">
          <div className="sb-section-header">
            <Badge tone="yellow">Flagship Career Analytics & AI Suite</Badge>
            <h2>A Purpose-Built Bento Workspace With Visual Momentum</h2>
            <p>
              Track your 6-week readiness trajectory, inspect ATS keyword diffs, rehearse answers
              by voice, and match directly to break-friendly cohorts.
            </p>
          </div>

          <div className="sb-bento-grid">
            {/* Bento Cell 1 (7 cols): Live Readiness Trajectory Chart */}
            <div className="sb-card sb-card-interactive sb-bento-card sb-bento-span-7">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div className="sb-agent-icon">
                    <BarChart3 size={20} />
                  </div>
                  <div>
                    <span style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--purple-600)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Readiness Analytics
                    </span>
                    <h3 style={{ fontSize: '20px', fontWeight: 700 }}>6-Week Return Trajectory</h3>
                  </div>
                </div>
                <Badge tone="success">+32% Readiness Lift</Badge>
              </div>

              <ReadinessTrajectoryChart currentScore={86} height={195} />
            </div>

            {/* Bento Cell 2 (5 cols): Career-Break Simulator */}
            <div className="sb-card-navy sb-card-interactive sb-bento-card sb-bento-span-5">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Badge tone="navy" style={{ background: 'rgba(253, 230, 138, 0.2)', color: '#FEF3C7' }}>
                  <SlidersHorizontal size={12} /> Interactive Simulator
                </Badge>
                <span style={{ fontSize: '12px', color: '#6EE7B7', fontWeight: 700 }}>Live Score</span>
              </div>

              <div>
                <h3 style={{ color: '#FFFFFF', fontSize: '20px', fontWeight: 700 }}>
                  Career-Break Readiness Simulator
                </h3>
                <p style={{ color: 'var(--text-on-dark-muted)', fontSize: '13.5px', marginTop: '6px' }}>
                  Adjust your pause duration and target role to watch your readiness score and
                  30-60-90 day milestones adapt instantaneously.
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '14px', borderRadius: '14px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(253, 230, 138, 0.2)' }}>
                <ProgressRing value={84} size={72} label="Sim" dark />
                <div style={{ fontSize: '12.5px', color: 'var(--text-on-dark-muted)', display: 'grid', gap: '4px' }}>
                  <strong style={{ color: '#FFFFFF' }}>3–4 Yr Break → Lead PM</strong>
                  <span>Est. 5.5 weeks to first returnship offer</span>
                </div>
              </div>

              <div style={{ marginTop: 'auto' }}>
                <button
                  type="button"
                  onClick={() => handleDemoLaunch('/app')}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    color: '#FDE68A',
                    fontWeight: 600,
                    fontSize: '13.5px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  Run Simulator in Dashboard <ArrowRight size={14} className="sb-agent-cta-arrow" />
                </button>
              </div>
            </div>

            {/* Bento Cell 3 (6 cols): Resume Diff + ATS Highlights Preview */}
            <div className="sb-card sb-card-interactive sb-bento-card sb-bento-span-6">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div className="sb-agent-icon">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <span style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--purple-600)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Break & Resume Translator
                    </span>
                    <h3 style={{ fontSize: '19px', fontWeight: 700 }}>Side-by-Side ATS Diff Studio</h3>
                  </div>
                </div>
                <Badge tone="yellow">+29% ATS Clarity</Badge>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '12px' }}>
                <div className="sb-diff-panel sb-diff-before">
                  <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '6px' }}>
                    Before · Raw Gap
                  </div>
                  <span className="sb-diff-removed">3.5-year employment gap</span> caring for family and{' '}
                  <span className="sb-diff-removed">helping out</span> at school events.
                </div>
                <div className="sb-diff-panel sb-diff-after">
                  <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--purple-700)', marginBottom: '6px' }}>
                    After · Highlighted ATS Keywords
                  </div>
                  Directed <span className="sb-ats-highlight">Cross-Functional Operations</span> and{' '}
                  <span className="sb-ats-highlight">Stakeholder Alignment</span> (+42% reach).
                </div>
              </div>

              <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>
                  Highlights high-signal recruiter keywords automatically
                </span>
                <button
                  type="button"
                  onClick={() => handleDemoLaunch('/app/resume-translator')}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    color: 'var(--purple-600)',
                    fontWeight: 600,
                    fontSize: '13.5px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  Open Diff Viewer <ArrowRight size={14} className="sb-agent-cta-arrow" />
                </button>
              </div>
            </div>

            {/* Bento Cell 4 (6 cols): Skill Benchmark Bar Chart */}
            <div className="sb-card sb-card-interactive sb-bento-card sb-bento-span-6">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div className="sb-agent-icon">
                    <Compass size={20} />
                  </div>
                  <div>
                    <span style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--purple-600)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Skill Gap Architect
                    </span>
                    <h3 style={{ fontSize: '19px', fontWeight: 700 }}>Pre-Break vs Translated Competency</h3>
                  </div>
                </div>
                <Badge tone="lavender">4–6 Hr / Week</Badge>
              </div>

              <SkillBenchmarkChart />
            </div>

            {/* Bento Cell 5 (6 cols): Voice Interview Coach */}
            <div className="sb-card sb-card-interactive sb-bento-card sb-bento-span-6">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="sb-agent-icon">
                  <Mic size={20} />
                </div>
                <div className="sb-voice-bars" aria-hidden="true">
                  <span style={{ height: '10px' }} />
                  <span style={{ height: '18px' }} />
                  <span style={{ height: '13px' }} />
                  <span style={{ height: '21px' }} />
                  <span style={{ height: '12px' }} />
                </div>
              </div>
              <div>
                <span style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--purple-600)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Voice-Enabled Coach
                </span>
                <h3 style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px' }}>
                  Speak Your Answer Live
                </h3>
                <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', marginTop: '6px' }}>
                  Use browser voice dictation to rehearse career-pause answers and get scored on
                  Clarity, Confidence, and Impact.
                </p>
              </div>
              <div style={{ marginTop: 'auto' }}>
                <button
                  type="button"
                  onClick={() => handleDemoLaunch('/app/interview-coach')}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    color: 'var(--purple-600)',
                    fontWeight: 600,
                    fontSize: '13.5px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  Try Voice Coach <ArrowRight size={14} className="sb-agent-cta-arrow" />
                </button>
              </div>
            </div>

            {/* Bento Cell 6 (6 cols): Returnship Matcher */}
            <div className="sb-card sb-card-interactive sb-bento-card sb-bento-span-6">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="sb-agent-icon">
                  <Briefcase size={20} />
                </div>
                <Badge tone="success">180+ Teams</Badge>
              </div>
              <div>
                <span style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--purple-600)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Returnship Matcher
                </span>
                <h3 style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px' }}>
                  Paid Cohorts & Flex Roles
                </h3>
                <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', marginTop: '6px' }}>
                  Filter vetted employers offering mentorship, 4-day ramps, and 2–10 year break
                  transparency from day one.
                </p>
              </div>
              <div style={{ marginTop: 'auto' }}>
                <button
                  type="button"
                  onClick={() => handleDemoLaunch('/app/jobs')}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    color: 'var(--purple-600)',
                    fontWeight: 600,
                    fontSize: '13.5px',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  Explore Returnships <ArrowRight size={14} className="sb-agent-cta-arrow" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curated Returnships Preview */}
      <section id="returnships" className="sb-section">
        <div className="sb-container">
          <div className="sb-section-header">
            <Badge tone="lavender">Vetted Opportunity Board</Badge>
            <h2>Employers Who Actively Welcome Career Breaks</h2>
            <p>
              Every listing highlights paid returnship cohorts, structured onboarding ramps,
              mentorship availability, and flexible work arrangements.
            </p>
          </div>

          <div className="sb-grid-2">
            {RETURNSHIP_JOBS.slice(0, 2).map((job) => (
              <div key={job.id} className="sb-card sb-card-interactive" style={{ padding: '26px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <PartnerLogoMark company={job.company} size={42} />
                    <div>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--purple-600)' }}>
                        {job.company}
                      </span>
                      <h3 style={{ fontSize: '19px', fontWeight: 700, marginTop: '2px' }}>{job.title}</h3>
                    </div>
                  </div>
                  <Badge tone="success">{job.matchScore}% Fit</Badge>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', fontSize: '13px', color: 'var(--text-muted)', margin: '14px 0 12px' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                    <MapPin size={14} /> {job.location}
                  </span>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                    <Clock size={14} /> {job.type}
                  </span>
                </div>

                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.62, marginBottom: '16px' }}>
                  {job.summary}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {job.tags.map((tag) => (
                    <Badge key={tag} tone="lavender">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '34px' }}>
            <Button variant="secondary" size="lg" onClick={() => handleDemoLaunch('/app/jobs')}>
              Browse All Returnships in Workspace <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </section>

      {/* Stories */}
      <section id="stories" className="sb-section sb-section-lavender">
        <div className="sb-container">
          <div className="sb-section-header">
            <Badge tone="yellow">Community Proof</Badge>
            <h2>Stories of Bold, Supported Comebacks</h2>
            <p>
              Thousands of women have reclaimed their career momentum with clarity, peer circles,
              and break-friendly employers.
            </p>
          </div>

          <div className="sb-grid-3">
            {STORIES.map((story, idx) => (
              <div
                key={story.name}
                className="sb-card sb-card-interactive"
                style={{ padding: '26px', display: 'flex', flexDirection: 'column', gap: '18px' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Quote size={24} color="var(--lavender-400)" />
                  <Badge tone="success">Verified Return</Badge>
                </div>
                <p style={{ fontSize: '14.5px', color: 'var(--text-secondary)', lineHeight: 1.7, flex: 1 }}>
                  “{story.quote}”
                </p>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    paddingTop: '14px',
                    borderTop: '1px solid var(--border-light)',
                  }}
                >
                  <ReturnerAvatar variant={STORY_AVATARS[idx % STORY_AVATARS.length]} size={44} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '14.5px' }}>{story.name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{story.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="sb-section">
        <div className="sb-container">
          <div className="sb-cta-banner">
            <DoodleSunnyBuddy
              size={64}
              style={{ position: 'absolute', top: '18px', right: '26px', opacity: 0.92 }}
            />
            <div style={{ maxWidth: '600px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Badge tone="navy" style={{ background: 'rgba(253, 230, 138, 0.2)', color: '#FEF3C7' }}>
                  Ready When You Are
                </Badge>
                <DoodleHeartNote size={36} />
              </div>
              <h2 style={{ color: '#FFFFFF', fontSize: 'clamp(26px, 3.2vw, 36px)', marginTop: '14px' }}>
                Step Back In With Clarity, Confidence, and Strategy.
              </h2>
              <p style={{ color: 'var(--text-on-dark-muted)', fontSize: '15px', marginTop: '10px' }}>
                Build your personalized career restart roadmap in under 5 minutes—free to start.
              </p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
              <Button size="lg" variant="primary" onClick={() => navigate('/auth?mode=signup')}>
                Create Free Account <ArrowRight size={17} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', borderColor: 'rgba(253,230,138,0.34)' }}
                onClick={() => handleDemoLaunch('/app')}
              >
                Try Demo Workspace
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
