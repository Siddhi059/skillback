import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Circle,
  Compass,
  Mic,
  Briefcase,
  Award,
  TrendingUp,
  SlidersHorizontal,
  RotateCcw,
  BarChart3,
  PieChart,
} from 'lucide-react';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import ProgressRing from '../components/common/ProgressRing';
import { PartnerLogoMark } from '../components/common/BrandArtwork';
import { DoodleSparkle, DoodleSunnyBuddy } from '../components/common/Doodles';
import {
  ReadinessTrajectoryChart,
  SkillBenchmarkChart,
  WeeklyAllocationDonutChart,
} from '../components/common/Charts';
import { useAuth } from '../context/useAuth';
import { workspaceService } from '../services/api';
import { RETURN_ROADMAP_TASKS, RETURNSHIP_JOBS } from '../data/mockData';

const BREAK_DURATIONS = [
  { id: '6-12m', label: '6–12 mos', baseScore: 80, weeks: 4.0, phaseNote: 'rapid re-entry' },
  { id: '1-2y', label: '1–2 yrs', baseScore: 76, weeks: 5.0, phaseNote: 'focused narrative' },
  { id: '3-4y', label: '3–4 yrs', baseScore: 71, weeks: 5.8, phaseNote: 'skill + narrative refresh' },
  { id: '5-7y', label: '5–7 yrs', baseScore: 66, weeks: 7.2, phaseNote: 'returnship cohort ramp' },
  { id: '8y+', label: '8+ yrs', baseScore: 62, weeks: 8.5, phaseNote: 'fellowship + tooling reboot' },
];

const TARGET_ROLES = [
  {
    id: 'pm',
    label: 'Lead Product Manager',
    sprintTopic: 'AI-Assisted Product Discovery & PRDs',
    atsKeyword: 'Cross-Functional Product Strategy',
    roleBoost: 3,
  },
  {
    id: 'data',
    label: 'Senior Data Analyst',
    sprintTopic: 'Modern SQL, dbt & Metric Storytelling',
    atsKeyword: 'Experimentation & Cohort Analytics',
    roleBoost: 2,
  },
  {
    id: 'em',
    label: 'Engineering Manager',
    sprintTopic: 'Modern Architecture & Async Engineering Rituals',
    atsKeyword: 'Technical Delivery & Team Scaling',
    roleBoost: 4,
  },
  {
    id: 'ops',
    label: 'People & Ops Lead',
    sprintTopic: 'Hybrid Operating Cadence & Change Management',
    atsKeyword: 'Executive Operations & Stakeholder Alignment',
    roleBoost: 5,
  },
  {
    id: 'ux',
    label: 'UX Strategy Lead',
    sprintTopic: 'AI Prototyping & Design Systems Refresh',
    atsKeyword: 'User Research & Product Experience',
    roleBoost: 2,
  },
];

const BOOSTER_CHIPS = [
  { id: 'care', label: 'Caregiving & Logistics', boost: 5 },
  { id: 'community', label: 'Community Leadership', boost: 6 },
  { id: 'ai', label: 'AI Tools Refresher', boost: 7 },
  { id: 'advisory', label: 'Pro-Bono / Advisory', boost: 6 },
];

function buildSimulatedRoadmap(baseTasks, roleMeta, durationMeta, boosters) {
  const hasAI = boosters.includes('ai');
  return [
    {
      id: baseTasks[0]?.id || 't1',
      phase: 'Phase 1: Narrative',
      title: `Translate ${durationMeta.label} break into ${roleMeta.atsKeyword} bullets`,
      duration: '15 mins',
      status: baseTasks[0]?.status || 'completed',
      category: 'Resume AI',
    },
    {
      id: baseTasks[1]?.id || 't2',
      phase: 'Phase 1: Narrative',
      title: `Align LinkedIn & Returnship profile for ${roleMeta.label}`,
      duration: '10 mins',
      status: baseTasks[1]?.status || 'completed',
      category: 'Profile',
    },
    {
      id: baseTasks[2]?.id || 't3',
      phase: 'Phase 2: Refresh',
      title: `Complete "${roleMeta.sprintTopic}" refresher sprint`,
      duration: hasAI ? '25 mins' : '45 mins',
      status: hasAI ? 'completed' : baseTasks[2]?.status || 'in_progress',
      category: 'Skill Lab',
    },
    {
      id: baseTasks[3]?.id || 't4',
      phase: 'Phase 2: Refresh',
      title: `Rehearse voice answer on your ${durationMeta.label} pause for ${roleMeta.label}`,
      duration: '20 mins',
      status: baseTasks[3]?.status || 'pending',
      category: 'Interview Coach',
    },
    {
      id: baseTasks[4]?.id || 't5',
      phase: 'Phase 3: Launch',
      title: `Target 3 break-friendly ${roleMeta.label} cohorts (${durationMeta.phaseNote})`,
      duration: '30 mins',
      status: baseTasks[4]?.status || 'pending',
      category: 'Returnships',
    },
  ];
}

export default function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [baseTasks, setBaseTasks] = useState(RETURN_ROADMAP_TASKS);
  const [jobs, setJobs] = useState(RETURNSHIP_JOBS.slice(0, 2));

  // Career-Break Simulator State
  const [simDurationId, setSimDurationId] = useState('3-4y');
  const [simRoleId, setSimRoleId] = useState('pm');
  const [simBoosters, setSimBoosters] = useState(['care', 'community']);
  const [customOverrides, setCustomOverrides] = useState({});

  useEffect(() => {
    let active = true;
    workspaceService.getRoadmap().then((data) => {
      if (active && Array.isArray(data) && data.length > 0) setBaseTasks(data);
    });
    workspaceService.getJobs().then((data) => {
      if (active && Array.isArray(data) && data.length > 0) setJobs(data.slice(0, 2));
    });
    return () => {
      active = false;
    };
  }, []);

  const durationMeta = useMemo(
    () => BREAK_DURATIONS.find((d) => d.id === simDurationId) || BREAK_DURATIONS[2],
    [simDurationId],
  );

  const roleMeta = useMemo(
    () => TARGET_ROLES.find((r) => r.id === simRoleId) || TARGET_ROLES[0],
    [simRoleId],
  );

  const simulatedTasks = useMemo(() => {
    const generated = buildSimulatedRoadmap(baseTasks, roleMeta, durationMeta, simBoosters);
    return generated.map((task) =>
      customOverrides[task.id] !== undefined ? { ...task, status: customOverrides[task.id] } : task,
    );
  }, [baseTasks, roleMeta, durationMeta, simBoosters, customOverrides]);

  const completedCount = simulatedTasks.filter((t) => t.status === 'completed').length;

  const liveReadiness = useMemo(() => {
    const boosterTotal = BOOSTER_CHIPS.filter((b) => simBoosters.includes(b.id)).reduce(
      (sum, item) => sum + item.boost,
      0,
    );
    const taskBonus = completedCount * 2;
    return Math.min(97, durationMeta.baseScore + roleMeta.roleBoost + boosterTotal + taskBonus - 4);
  }, [durationMeta, roleMeta, simBoosters, completedCount]);

  const estimatedWeeks = useMemo(() => {
    const speedFactor = simBoosters.length * 0.45 + completedCount * 0.2;
    return Math.max(2.5, Number((durationMeta.weeks - speedFactor).toFixed(1)));
  }, [durationMeta, simBoosters, completedCount]);

  const progressPct = simulatedTasks.length
    ? Math.round((completedCount / simulatedTasks.length) * 100)
    : 0;

  const benchmarkData = useMemo(
    () => [
      { label: roleMeta.atsKeyword.split(' ')[0] + ' Strategy', before: 70, after: Math.min(96, liveReadiness + 6) },
      { label: 'Stakeholder Ops', before: 65, after: Math.min(95, liveReadiness + 4) },
      { label: 'AI Workflows', before: simBoosters.includes('ai') ? 58 : 42, after: simBoosters.includes('ai') ? 91 : 80 },
      { label: 'Data Fluency', before: 56, after: Math.min(92, liveReadiness) },
      { label: 'Executive Pitch', before: 52, after: Math.min(94, liveReadiness + 2) },
    ],
    [roleMeta, liveReadiness, simBoosters],
  );

  const toggleBooster = (id) => {
    setSimBoosters((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const toggleTask = async (id) => {
    const current = simulatedTasks.find((t) => t.id === id);
    const nextStatus = current?.status === 'completed' ? 'pending' : 'completed';
    setCustomOverrides((prev) => ({ ...prev, [id]: nextStatus }));
    await workspaceService.toggleRoadmapTask(id);
  };

  const resetSimulator = () => {
    setSimDurationId('3-4y');
    setSimRoleId('pm');
    setSimBoosters(['care', 'community']);
    setCustomOverrides({});
  };

  return (
    <div style={{ display: 'grid', gap: '20px' }}>
      {/* Top Bento Row: Career-Break Simulator (8 cols) + Live Readiness Card (4 cols) */}
      <div className="sb-bento-grid">
        <div className="sb-card-navy sb-bento-span-8" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
            <Badge tone="navy" style={{ background: 'rgba(253, 230, 138, 0.2)', color: '#FEF3C7' }}>
              <SlidersHorizontal size={12} /> Interactive Career-Break Simulator
            </Badge>
            <button
              type="button"
              onClick={resetSimulator}
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.16)',
                color: '#FDE68A',
                borderRadius: '999px',
                padding: '5px 11px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
              }}
            >
              <RotateCcw size={12} /> Reset
            </button>
          </div>

          <h2 style={{ color: '#FFFFFF', fontSize: '24px', fontWeight: 800, marginTop: '12px' }}>
            Welcome back, {user?.name?.split(' ')[0] || 'Meera'}. Model Your Comeback Live.
          </h2>
          <p style={{ color: 'var(--text-on-dark-muted)', fontSize: '13.5px', marginTop: '4px' }}>
            Adjust your break duration, target role, and lived experience boosters to see your
            readiness charts and 30-60-90 day roadmap adapt in real time.
          </p>

          <div style={{ display: 'grid', gap: '16px', marginTop: '20px' }}>
            {/* Break Duration Selector */}
            <div>
              <div style={{ fontSize: '11.5px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#FDE68A', marginBottom: '8px' }}>
                1. Career Break Duration
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {BREAK_DURATIONS.map((item) => {
                  const active = simDurationId === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSimDurationId(item.id)}
                      style={{
                        padding: '7px 13px',
                        borderRadius: '10px',
                        border: active
                          ? '1px solid rgba(253, 230, 138, 0.7)'
                          : '1px solid rgba(255,255,255,0.14)',
                        background: active
                          ? 'linear-gradient(135deg, rgba(244, 63, 142, 0.6), rgba(245, 158, 11, 0.42))'
                          : 'rgba(255,255,255,0.06)',
                        color: active ? '#FFFFFF' : 'var(--text-on-dark-muted)',
                        fontSize: '12.5px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 160ms ease',
                      }}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Target Role Selector + Boosters */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
              <div>
                <label
                  htmlFor="sim-target-role"
                  style={{ display: 'block', fontSize: '11.5px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#FDE68A', marginBottom: '8px' }}
                >
                  2. Target Role
                </label>
                <select
                  id="sim-target-role"
                  value={simRoleId}
                  onChange={(e) => setSimRoleId(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '9px 12px',
                    borderRadius: '10px',
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(253, 230, 138, 0.34)',
                    color: '#FFFFFF',
                    fontSize: '13.5px',
                    fontWeight: 600,
                  }}
                >
                  {TARGET_ROLES.map((r) => (
                    <option key={r.id} value={r.id} style={{ color: '#2B182E' }}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div style={{ fontSize: '11.5px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#FDE68A', marginBottom: '8px' }}>
                  3. Break Experience Boosters
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
                  {BOOSTER_CHIPS.map((b) => {
                    const active = simBoosters.includes(b.id);
                    return (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => toggleBooster(b.id)}
                        style={{
                          padding: '6px 10px',
                          borderRadius: '999px',
                          border: active
                            ? '1px solid #FDE047'
                            : '1px solid rgba(255,255,255,0.16)',
                          background: active ? 'rgba(253, 224, 71, 0.18)' : 'rgba(255,255,255,0.06)',
                          color: active ? '#FEF08A' : 'var(--text-on-dark-muted)',
                          fontSize: '12px',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        {active ? '✓ ' : '+ '}
                        {b.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Readiness & Action Bento Tile */}
        <div
          className="sb-card sb-card-lavender sb-bento-span-4"
          style={{ padding: '26px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '18px', position: 'relative' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Badge tone="lavender">
              <Sparkles size={12} /> Live Simulation
            </Badge>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Badge tone="yellow">Est. {estimatedWeeks} wks</Badge>
              <DoodleSunnyBuddy size={34} />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '18px', position: 'relative' }}>
            <DoodleSparkle size={20} color="#F472B6" style={{ position: 'absolute', top: '-6px', left: '72px' }} />
            <ProgressRing value={liveReadiness} size={96} label="Ready" />
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--purple-700)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Simulated Readiness
              </div>
              <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--navy-900)', marginTop: '3px' }}>
                {roleMeta.label}
              </div>
              <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                {durationMeta.label} break · {simBoosters.length} boosters active
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gap: '8px' }}>
            <Button variant="primary" size="md" onClick={() => navigate('/app/resume-translator')}>
              Open ATS Diff Studio <ArrowRight size={15} />
            </Button>
            <Button variant="outline" size="md" onClick={() => navigate('/app/interview-coach')}>
              <Mic size={15} /> Rehearse With Voice Coach
            </Button>
          </div>
        </div>
      </div>

      {/* KPI Bento Strip */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(215px, 1fr))',
          gap: '16px',
        }}
      >
        {[
          {
            label: 'Skills Translated',
            value: `${(user?.translatedSkillsCount || 12) + simBoosters.length} Core`,
            sub: `Focused on ${roleMeta.atsKeyword}`,
            icon: Award,
          },
          {
            label: 'Interview Confidence',
            value: `${user?.interviewConfidence || 84}%`,
            sub: 'Voice Coach + STAR scoring active',
            icon: Mic,
          },
          {
            label: 'Curated Returnships',
            value: '12 Matches',
            sub: '4 cohorts closing within 14 days',
            icon: Briefcase,
          },
          {
            label: 'Roadmap Completion',
            value: `${progressPct}%`,
            sub: `${completedCount} of ${simulatedTasks.length} tailored steps done`,
            icon: TrendingUp,
          },
        ].map(({ label, value, sub, icon: Icon }) => (
          <div key={label} className="sb-card sb-card-interactive" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-muted)' }}>
                {label}
              </span>
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #FFEAF2, #FEF3C7)',
                  color: 'var(--purple-600)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon size={17} />
              </div>
            </div>
            <div
              className="tabular-nums"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '26px',
                fontWeight: 800,
                marginTop: '10px',
              }}
            >
              {value}
            </div>
            <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              {sub}
            </div>
          </div>
        ))}
      </div>

      {/* Analytics & Charts Bento Row */}
      <div className="sb-bento-grid">
        <div className="sb-card sb-bento-span-6" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <TrendingUp size={17} color="var(--purple-600)" /> 6-Week Readiness Trajectory
              </h3>
              <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginTop: '2px' }}>
                Hover points to inspect your weekly readiness & interview confidence
              </p>
            </div>
            <Badge tone="lavender">Live</Badge>
          </div>
          <ReadinessTrajectoryChart currentScore={liveReadiness} height={200} />
        </div>

        <div className="sb-card sb-bento-span-6" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BarChart3 size={17} color="var(--purple-600)" /> Skill Readiness vs Benchmark
              </h3>
              <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginTop: '2px' }}>
                Updates live as you toggle simulator boosters for {roleMeta.label}
              </p>
            </div>
            <Badge tone="yellow">+{simBoosters.length * 5}% Lift</Badge>
          </div>
          <SkillBenchmarkChart items={benchmarkData} />
        </div>
      </div>

      {/* Bottom Bento Row: Tailored 30-60-90 Roadmap (7 cols) + Weekly Allocation Donut & Jobs (5 cols) */}
      <div className="sb-bento-grid">
        <div className="sb-card sb-bento-span-7" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 700 }}>
                Tailored 30-60-90 Day Restart Plan
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>
                Updated live for <strong>{roleMeta.label}</strong> ({durationMeta.label} pause)
              </p>
            </div>
            <Badge tone="lavender">
              {completedCount}/{simulatedTasks.length} Done
            </Badge>
          </div>

          <div style={{ display: 'grid', gap: '10px' }}>
            {simulatedTasks.map((task) => {
              const done = task.status === 'completed';
              return (
                <button
                  key={task.id}
                  type="button"
                  onClick={() => toggleTask(task.id)}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    padding: '13px 14px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-light)',
                    background: done ? 'var(--lavender-50)' : 'var(--white)',
                    cursor: 'pointer',
                    transition: 'all 160ms ease',
                  }}
                >
                  {done ? (
                    <CheckCircle2 size={18} color="var(--purple-600)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  ) : (
                    <Circle size={18} color="var(--text-muted)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  )}
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: '14px',
                        fontWeight: 600,
                        color: done ? 'var(--text-muted)' : 'var(--text-primary)',
                        textDecoration: done ? 'line-through' : 'none',
                      }}
                    >
                      {task.title}
                    </div>
                    <div style={{ display: 'flex', gap: '10px', marginTop: '4px', fontSize: '12px', color: 'var(--text-muted)' }}>
                      <span>{task.phase}</span>
                      <span>·</span>
                      <span>{task.duration}</span>
                      <span>·</span>
                      <span style={{ color: 'var(--purple-600)', fontWeight: 600 }}>{task.category}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="sb-bento-span-5" style={{ display: 'grid', gap: '20px', alignContent: 'start' }}>
          <div className="sb-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '17px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <PieChart size={17} color="var(--purple-600)" /> Weekly Comeback Allocation
              </h3>
              <Badge tone="yellow">6 hrs / wk</Badge>
            </div>
            <WeeklyAllocationDonutChart />
          </div>

          <div className="sb-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ fontSize: '17px', fontWeight: 700 }}>Top Matched Returnships</h3>
              <Button variant="ghost" size="sm" onClick={() => navigate('/app/jobs')}>
                View all →
              </Button>
            </div>

            <div style={{ display: 'grid', gap: '12px' }}>
              {jobs.map((job) => (
                <div
                  key={job.id}
                  style={{
                    padding: '14px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-light)',
                    background: 'var(--surface-page)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '12px',
                  }}
                >
                  <div style={{ display: 'flex', gap: '11px', alignItems: 'flex-start' }}>
                    <PartnerLogoMark company={job.company} size={36} />
                    <div>
                      <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--purple-600)' }}>
                        {job.company}
                      </div>
                      <div style={{ fontSize: '14px', fontWeight: 700, marginTop: '2px' }}>{job.title}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '3px' }}>
                        {job.location} · {job.compensation}
                      </div>
                    </div>
                  </div>
                  <Badge tone="success">{job.matchScore}%</Badge>
                </div>
              ))}
            </div>
          </div>

          <div className="sb-card-lavender" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <Compass size={18} color="var(--purple-600)" />
              <h4 style={{ fontSize: '15.5px', fontWeight: 700 }}>Recommended Refresher</h4>
            </div>
            <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Jump into <strong>{roleMeta.sprintTopic}</strong> to strengthen your{' '}
              {roleMeta.label} readiness score.
            </p>
            <Button
              variant="secondary"
              size="sm"
              style={{ marginTop: '12px' }}
              onClick={() => navigate('/app/skill-roadmap')}
            >
              Continue Learning Module <ArrowRight size={14} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
