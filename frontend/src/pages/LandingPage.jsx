import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ArrowLeftRight,
  CheckCircle2,
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
  Layers,
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
import {
  RETURNSHIP_JOBS,
  REVERSE_MENTORSHIP_PAIRS,
  REVERSE_MENTORSHIP_STEPS,
  STORIES,
} from '../data/mockData';
import { useAuth } from '../context/useAuth';
import './LandingPage.css';

const HERO_TRANSFORMATIONS = [
  {
    id: 'meera',
    tabLabel: 'Meera · 4-Yr Break',
    name: 'Meera Deshmukh',
    avatar: 'meera',
    targetTrack: 'FinTech Risk & Strategy Lead',
    priorContext: '8 yrs Corporate Banking · Family Caregiving pause',
    readiness: 88,
    atsLift: '+31% ATS Lift',
    rawContext: 'Managed household finances, community audit volunteering, and regulatory reading.',
    reframedBullet:
      'Directed financial controls, compliance risk diagnostics, and AI-assisted lending UX flows through a 4-week Reverse Mentorship co-build.',
    company: 'Veridian Pay',
    matchedRole: 'FinTech Risk & Product Strategy — Returnship',
    matchDetails: 'Remote · Executive Sponsor + Gen-Z AI Buddy',
    matchScore: '95% Match',
  },
  {
    id: 'rajesh',
    tabLabel: 'Rajesh · Retired Eng',
    name: 'Rajesh Kulkarni',
    avatar: 'rajesh',
    targetTrack: 'Principal AI Project Advisor',
    priorContext: '28 yrs Mechanical Engineering · Encore Advisory Track',
    readiness: 91,
    atsLift: '+34% ATS Lift',
    rawContext: 'Retired Chief Engineer mentoring junior builders and learning AI project tracking.',
    reframedBullet:
      'Paired 28 years of capital project governance with Notion AI, Linear roadmaps, and Copilot technical spec workflows.',
    company: 'Aurelia Systems',
    matchedRole: 'Principal Project Advisor — Encore Fellowship',
    matchDetails: 'Hybrid — Pune / Flexible · AI Co-Pilot Track',
    matchScore: '94% Match',
  },
  {
    id: 'arjun',
    tabLabel: 'Arjun · Educator Pivot',
    name: 'Arjun Mehta',
    avatar: 'arjun',
    targetTrack: 'EdTech Curriculum & AI Lead',
    priorContext: '10 yrs STEM Educator · 2-Yr Sabbatical & Tech Pivot',
    readiness: 86,
    atsLift: '+29% ATS Lift',
    rawContext: 'Taught high school physics and designed adaptive study guides during family sabbatical.',
    reframedBullet:
      'Translated decade of STEM curriculum design into interactive LLM learning flows and cohort retention analytics.',
    company: 'Northstar Cloud',
    matchedRole: 'EdTech Curriculum & AI Learning Lead',
    matchDetails: 'Remote · Async-First · Flexible Core Hours',
    matchScore: '92% Match',
  },
];

const STEPS = [
  {
    num: '01',
    title: 'Share Your Story & Pause',
    desc: 'Tell us about your prior career, retirement, sabbatical, or caregiving pause—plus the projects and leadership you carried forward.',
  },
  {
    num: '02',
    title: 'Translate Transferable Value',
    desc: 'Our Break & Resume AI reframes career breaks and pivots into executive-ready competencies backed by high-signal ATS keywords.',
  },
  {
    num: '03',
    title: 'Swap Skills via Reverse Mentorship',
    desc: 'Pair with a Gen-Z digital mentor to trade decades of domain judgment for hands-on fluency in AI tools and modern workflows.',
  },
  {
    num: '04',
    title: 'Land Break-Friendly Roles',
    desc: 'Match directly with paid returnships, encore fellowships, and flexible-hour teams who champion nonlinear careers.',
  },
];

const PARTNER_COMPANIES = [
  'Veridian Pay',
  'Lumina Health',
  'Northstar Cloud',
  'Aurelia Systems',
  'CloudScale',
];

export default function LandingPage() {
  const navigate = useNavigate();
  const { loginAsDemo } = useAuth();
  const [selectedId, setSelectedId] = useState('meera');
  const [selectedPairId, setSelectedPairId] = useState(REVERSE_MENTORSHIP_PAIRS[0].id);

  const activeTransform =
    HERO_TRANSFORMATIONS.find((item) => item.id === selectedId) || HERO_TRANSFORMATIONS[0];
  const activePair =
    REVERSE_MENTORSHIP_PAIRS.find((p) => p.id === selectedPairId) || REVERSE_MENTORSHIP_PAIRS[0];

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
              <Sparkles size={13} /> AI Career Restart & Two-Way Reverse Mentorship
            </span>

            <h1 className="sb-hero-title">
              Your Experience Never{' '}
              <span style={{ display: 'inline-block', position: 'relative' }}>
                <span className="sb-hero-accent">Goes Out of Style.</span>
                <DoodleUnderline width={300} />
              </span>
            </h1>

            <p className="sb-hero-subtitle">
              SkillBack helps talented professionals—career returners, caregivers, mid-career
              pivoters, and retired experts—translate lived wisdom, master modern AI tools through
              two-way reverse mentorship, and connect with vetted employers.
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
                <CheckCircle2 size={15} color="var(--purple-600)" /> Career breaks, pivots & encore tracks
              </span>
              <span>
                <ArrowLeftRight size={15} color="var(--purple-600)" /> Two-way Gen-Z ↔ Senior swaps
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
              <span style={{ color: 'var(--text-on-dark-muted)' }}>Toggle profile</span>
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
                    EXPERIENCE → AI TRANSLATION
                  </span>
                  <span style={{ fontSize: '11.5px', color: '#6EE7B7', fontWeight: 700 }}>
                    {activeTransform.atsLift}
                  </span>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-on-dark-muted)', marginBottom: '8px', lineHeight: 1.45 }}>
                  <strong style={{ color: '#FBCFE8' }}>Context:</strong> {activeTransform.rawContext}
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
                      TOP MATCH · {activeTransform.company.toUpperCase()}
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
                  Interactive preview · Try with your own story
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
            <p>Returners, pivoters & encore professionals supported globally</p>
          </div>
          <div className="sb-stat-item">
            <h3>2,900+</h3>
            <p>Active Two-Way Reverse Mentorship pairs swapping wisdom & AI skills</p>
          </div>
          <div className="sb-stat-item">
            <h3>180+</h3>
            <p>Employer partners offering paid returnships & encore fellowships</p>
          </div>
          <div className="sb-stat-item">
            <h3>92%</h3>
            <p>Members report higher confidence bridging gaps & modern tools</p>
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
                Whether you paused for family caregiving, retired from a decades-long career, or
                are pivoting industries—your experience is an asset. Here is how SkillBack turns
                transition into momentum.
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

      {/* Flagship Two-Way Reverse Mentorship Section */}
      <section id="reverse-mentorship" className="sb-section sb-section-lavender">
        <div className="sb-container">
          <div className="sb-section-header">
            <Badge tone="yellow">
              <ArrowLeftRight size={13} /> Two-Way Reverse Mentorship
            </Badge>
            <h2>Wisdom Meets Modern Tech: Both Generations Teach & Grow</h2>
            <p>
              Experienced and retired professionals bring irreplaceable stakeholder judgment,
              industry depth, and calm leadership—while Gen-Z specialists mentor them hands-on in
              AI tools, modern digital workflows, and emerging tech trends.
            </p>
          </div>

          {/* How Two-Way Reverse Mentorship Works */}
          <div className="sb-grid-3" style={{ marginBottom: '44px' }}>
            {REVERSE_MENTORSHIP_STEPS.map((step) => (
              <div key={step.num} className="sb-card sb-card-interactive sb-step-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="sb-step-num">{step.num}</span>
                  <Badge tone="lavender">Two-Way Exchange</Badge>
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 700 }}>{step.title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.62 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Interactive Sample Pairing Cards */}
          <div>
            <div style={{ textAlign: 'center', marginBottom: '14px' }}>
              <span style={{ fontSize: '12.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--purple-700)' }}>
                Explore Live Skill-Swap Pairings
              </span>
            </div>

            <div className="sb-rm-pair-tabs" role="tablist" aria-label="Sample reverse mentorship pairings">
              {REVERSE_MENTORSHIP_PAIRS.map((pair) => (
                <button
                  key={pair.id}
                  type="button"
                  role="tab"
                  aria-selected={selectedPairId === pair.id}
                  onClick={() => setSelectedPairId(pair.id)}
                  className={`sb-rm-pair-tab ${selectedPairId === pair.id ? 'active' : ''}`}
                >
                  <span>{pair.senior.name.split(' ')[0]}</span>
                  <ArrowLeftRight size={13} />
                  <span>{pair.genZ.name.split(' ')[0]}</span>
                  <span style={{ opacity: 0.75, fontSize: '11.5px' }}>· {pair.badge}</span>
                </button>
              ))}
            </div>

            {/* Active Interactive Pairing Spotlight Card */}
            <div key={activePair.id} className="sb-card sb-animate-swap" style={{ padding: '28px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                  <Badge tone="yellow">{activePair.badge}</Badge>
                  <Badge tone="neutral">
                    <Clock size={12} /> {activePair.cadence}
                  </Badge>
                </div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 700, color: 'var(--purple-700)' }}>
                  <Layers size={15} /> Shared Track: {activePair.trackTitle}
                </div>
              </div>

              <div className="sb-rm-exchange-grid">
                {/* Senior / Returning Professional Side */}
                <div
                  style={{
                    padding: '20px',
                    borderRadius: 'var(--radius-md)',
                    background: 'linear-gradient(155deg, #FEFCE8 0%, #FEF3C7 100%)',
                    border: '1px solid rgba(245, 158, 11, 0.28)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                    <ReturnerAvatar variant={activePair.senior.avatar} size={48} />
                    <div>
                      <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#92400E' }}>
                        Experienced / Returning Partner
                      </span>
                      <h4 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--navy-900)' }}>
                        {activePair.senior.name}
                      </h4>
                      <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                        {activePair.senior.title}
                      </div>
                    </div>
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#92400E', marginBottom: '8px' }}>
                    Teaches & Shares:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
                    {activePair.senior.shares.map((skill) => (
                      <Badge key={skill} tone="yellow" style={{ background: '#FFFFFF', borderColor: 'rgba(245, 158, 11, 0.35)' }}>
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Two-Way Bridge */}
                <div className="sb-rm-swap-bridge">
                  <div className="sb-rm-swap-circle" aria-hidden="true">
                    <ArrowLeftRight size={20} />
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Skill Swap
                  </span>
                </div>

                {/* Gen-Z Digital Mentor Side */}
                <div
                  style={{
                    padding: '20px',
                    borderRadius: 'var(--radius-md)',
                    background: 'linear-gradient(155deg, #FFF5F8 0%, #FFEAF2 100%)',
                    border: '1px solid rgba(236, 72, 153, 0.24)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                    <ReturnerAvatar variant={activePair.genZ.avatar} size={48} />
                    <div>
                      <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--purple-700)' }}>
                        Gen-Z Digital & AI Mentor
                      </span>
                      <h4 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--navy-900)' }}>
                        {activePair.genZ.name}
                      </h4>
                      <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                        {activePair.genZ.title}
                      </div>
                    </div>
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--purple-700)', marginBottom: '8px' }}>
                    Mentors In:
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
                    {activePair.genZ.shares.map((skill) => (
                      <Badge key={skill} tone="lavender" style={{ background: '#FFFFFF' }}>
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div
                style={{
                  marginTop: '18px',
                  paddingTop: '16px',
                  borderTop: '1px solid var(--border-light)',
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '14px',
                }}
              >
                <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', maxWidth: '720px' }}>
                  <strong style={{ color: 'var(--navy-900)' }}>Mutual Outcome:</strong>{' '}
                  {activePair.outcome}
                </p>
                <Button variant="primary" size="md" onClick={() => handleDemoLaunch('/app/community')}>
                  Request a Skill-Swap Pair <ArrowRight size={15} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flagship Bento-Grid Workspace + Live Charts Showcase */}
      <section id="ai-agents" className="sb-section">
        <div className="sb-container">
          <div className="sb-section-header">
            <Badge tone="lavender">Flagship Career Analytics & AI Suite</Badge>
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

              <ReadinessTrajectoryChart currentScore={88} height={195} />
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
                <ProgressRing value={86} size={72} label="Sim" dark />
                <div style={{ fontSize: '12.5px', color: 'var(--text-on-dark-muted)', display: 'grid', gap: '4px' }}>
                  <strong style={{ color: '#FFFFFF' }}>3–4 Yr Break → Risk & Product Lead</strong>
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
                  <span className="sb-diff-removed">helping out</span> at community events.
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
                  Use browser voice dictation to rehearse career-pause or pivot answers and get
                  scored on Clarity, Confidence, and Impact.
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
                  Returnship & Encore Matcher
                </span>
                <h3 style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px' }}>
                  Paid Cohorts, Advisory & Flex Roles
                </h3>
                <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', marginTop: '6px' }}>
                  Filter vetted employers offering reverse mentorship, 4-day ramps, encore
                  fellowships, and transparent career-break hiring.
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
      <section id="returnships" className="sb-section sb-section-lavender">
        <div className="sb-container">
          <div className="sb-section-header">
            <Badge tone="lavender">Vetted Opportunity Board</Badge>
            <h2>Employers Who Actively Welcome Nonlinear Careers</h2>
            <p>
              Every listing highlights paid returnship cohorts, encore fellowships, structured
              onboarding ramps, and flexible work arrangements.
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
      <section id="stories" className="sb-section">
        <div className="sb-container">
          <div className="sb-section-header">
            <Badge tone="yellow">Community Proof</Badge>
            <h2>Stories of Bold, Supported Comebacks & Pivots</h2>
            <p>
              Returners, retired specialists, and mid-career professionals across industries have
              reclaimed momentum through SkillBack and two-way reverse mentorship.
            </p>
          </div>

          <div className="sb-grid-3">
            {STORIES.map((story) => (
              <div
                key={story.name}
                className="sb-card sb-card-interactive"
                style={{ padding: '26px', display: 'flex', flexDirection: 'column', gap: '18px' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Quote size={24} color="var(--lavender-400)" />
                  <Badge tone="success">Verified Story</Badge>
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
                  <ReturnerAvatar variant={story.avatar} size={44} />
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
                Build your personalized career restart roadmap or join a reverse-mentorship skill
                swap in under 5 minutes.
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
