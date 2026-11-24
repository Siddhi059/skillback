import { useMemo, useState } from 'react';
import { Sparkles, Copy, Check, Wand2, ArrowRight, Columns2, FileText, BarChart3 } from 'lucide-react';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { SkillBenchmarkChart } from '../components/common/Charts';
import { DoodleCoffeeNotebook } from '../components/common/Doodles';
import { useAuth } from '../context/useAuth';
import { agentService } from '../services/api';
import { TRANSFERABLE_SKILLS_SAMPLE } from '../data/mockData';

const ATS_KEYWORDS = [
  'Cross-Functional Operations',
  'Stakeholder Alignment',
  'Stakeholder Engagement',
  'Resource Allocation',
  'Risk Prioritization',
  'Campaign Strategy',
  'Lifecycle Communications',
  'AI-enabled workflows',
  'AI product workflows',
  'Continuous Technical Upskilling',
  'Rapid Product Prototyping',
  'domain expertise',
  'stakeholder coordination',
  'contingency planning',
  'SQL analytics',
];

const WEAK_PHRASES = [
  'career gap',
  'employment gap',
  'took time off',
  'helped with',
  'out of industry',
  'unemployed',
  'just caring',
  'family caregiving',
];

function HighlightedText({ text, phrases, className }) {
  const parts = useMemo(() => {
    if (!text) return [];
    const escaped = phrases.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const regex = new RegExp(`(${escaped.join('|')})`, 'gi');
    return text.split(regex);
  }, [text, phrases]);

  const lowerSet = useMemo(() => new Set(phrases.map((p) => p.toLowerCase())), [phrases]);

  return (
    <>
      {parts.map((part, i) =>
        lowerSet.has(part.toLowerCase()) ? (
          <span key={i} className={className}>
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

export default function ResumeTranslatorPage() {
  const { user } = useAuth();
  const [pastRole, setPastRole] = useState(user?.previousRole || 'Senior Product Manager');
  const [breakDuration, setBreakDuration] = useState(user?.breakDuration || '3.5 years');
  const [breakActivities, setBreakActivities] = useState(
    '3.5-year career gap for family caregiving, helped with school digital fundraising, and studied product analytics',
  );
  const [tone, setTone] = useState('confident');
  const [viewMode, setViewMode] = useState('diff');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [result, setResult] = useState({
    headline: `Seasoned professional returning with renewed clarity: ${user?.previousRole || 'Senior Product Manager'} (${user?.breakDuration || '3.5-year'} intentional pause)`,
    summary:
      'Following an intentional 3.5-year career pause, I bring proven domain expertise alongside Cross-Functional Operations, Stakeholder Alignment, and modern AI-enabled workflows.',
    translations: TRANSFERABLE_SKILLS_SAMPLE,
    atsReadinessLift: '+29%',
  });

  const matchedAts = useMemo(() => {
    const combined = `${result.headline} ${result.summary} ${result.translations
      .map((t) => `${t.corporateTranslation} ${t.impactBullet}`)
      .join(' ')}`.toLowerCase();
    return ATS_KEYWORDS.filter((kw) => combined.includes(kw.toLowerCase()));
  }, [result]);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const output = await agentService.translateCareerBreak({
        pastRole,
        breakDuration,
        breakActivities,
        tone,
      });
      setResult(output);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    const text = `${result.headline}\n\n${result.summary}\n\n${result.translations
      .map((t) => `• ${t.impactBullet}`)
      .join('\n')}`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const rawBeforeSummary = `Unexplained ${breakDuration} career gap after ${pastRole}. Activities: ${breakActivities}.`;

  return (
    <div style={{ display: 'grid', gap: '24px' }}>
      <div
        className="sb-card-lavender"
        style={{
          padding: '22px 26px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '14px',
        }}
      >
        <div>
          <Badge tone="lavender">
            <Sparkles size={12} /> Break & Resume Diff Studio
          </Badge>
          <h2 style={{ fontSize: '22px', fontWeight: 800, marginTop: '8px' }}>
            Side-by-Side Before / After Resume Diff & ATS Keyword Highlighter
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            See exactly how SkillBack replaces apologetic gap wording with high-signal recruiter keywords.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <DoodleCoffeeNotebook size={56} />
          <div style={{ display: 'grid', gap: '6px' }}>
            <Badge tone="success">Est. ATS Lift: {result.atsReadinessLift}</Badge>
            <Badge tone="navy">{matchedAts.length} ATS Keywords Matched</Badge>
          </div>
        </div>
      </div>

      {/* Top Grid: Input Controls + Live Diff Viewer */}
      <div className="sb-bento-grid">
        <form
          onSubmit={handleGenerate}
          className="sb-card sb-bento-span-4"
          style={{ padding: '24px', display: 'grid', gap: '16px', alignContent: 'start' }}
        >
          <h3 style={{ fontSize: '17px', fontWeight: 700 }}>1. Break & Experience Input</h3>

          <div>
            <label className="sb-label">Prior / Target Role</label>
            <input
              className="sb-input"
              value={pastRole}
              onChange={(e) => setPastRole(e.target.value)}
            />
          </div>

          <div>
            <label className="sb-label">Break Duration</label>
            <input
              className="sb-input"
              value={breakDuration}
              onChange={(e) => setBreakDuration(e.target.value)}
            />
          </div>

          <div>
            <label className="sb-label">Raw Break Notes (Before)</label>
            <textarea
              className="sb-textarea"
              value={breakActivities}
              onChange={(e) => setBreakActivities(e.target.value)}
            />
          </div>

          <div>
            <label className="sb-label">Narrative Tone</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {[
                { id: 'confident', label: 'Warm' },
                { id: 'impact', label: 'Impact' },
                { id: 'executive', label: 'Executive' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setTone(opt.id)}
                  style={{
                    padding: '9px 8px',
                    borderRadius: 'var(--radius-md)',
                    border:
                      tone === opt.id
                        ? '1px solid var(--purple-600)'
                        : '1px solid var(--border-strong)',
                    background: tone === opt.id ? 'var(--lavender-100)' : 'var(--white)',
                    color: tone === opt.id ? 'var(--purple-700)' : 'var(--text-secondary)',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <Button type="submit" variant="primary" size="lg" disabled={loading}>
            <Wand2 size={16} /> {loading ? 'Analyzing & Diffing...' : 'Regenerate AI Diff'}
          </Button>
        </form>

        {/* Side-by-Side Diff Viewer */}
        <div
          className="sb-card sb-bento-span-8"
          style={{ padding: '24px', display: 'grid', gap: '18px', alignContent: 'start' }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
            <div>
              <h3 style={{ fontSize: '17px', fontWeight: 700 }}>2. Resume Narrative Diff Viewer</h3>
              <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginTop: '2px' }}>
                Purple tokens indicate ATS-indexed competencies preserved for recruiters.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <div
                style={{
                  display: 'inline-flex',
                  background: 'var(--surface-subtle)',
                  padding: '3px',
                  borderRadius: '10px',
                }}
              >
                <button
                  type="button"
                  onClick={() => setViewMode('diff')}
                  style={{
                    border: 'none',
                    padding: '6px 10px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    background: viewMode === 'diff' ? 'var(--white)' : 'transparent',
                    color: viewMode === 'diff' ? 'var(--text-primary)' : 'var(--text-muted)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                  }}
                >
                  <Columns2 size={13} /> Diff View
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('clean')}
                  style={{
                    border: 'none',
                    padding: '6px 10px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    background: viewMode === 'clean' ? 'var(--white)' : 'transparent',
                    color: viewMode === 'clean' ? 'var(--text-primary)' : 'var(--text-muted)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                  }}
                >
                  <FileText size={13} /> Clean Copy
                </button>
              </div>

              <Button variant="outline" size="sm" onClick={handleCopy}>
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Copied' : 'Copy'}
              </Button>
            </div>
          </div>

          {viewMode === 'diff' ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '14px' }}>
              {/* BEFORE */}
              <div className="sb-diff-panel sb-diff-before">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#991B1B' }}>
                    − Before (Unframed Gap)
                  </span>
                  <Badge tone="neutral">Low ATS Signal</Badge>
                </div>
                <p style={{ marginBottom: '12px' }}>
                  <HighlightedText
                    text={rawBeforeSummary}
                    phrases={WEAK_PHRASES}
                    className="sb-diff-removed"
                  />
                </p>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)', borderTop: '1px solid var(--border-light)', paddingTop: '10px' }}>
                  <strong>Common Pitfall:</strong> Leads with time away instead of transferable
                  operational ownership.
                </div>
              </div>

              {/* AFTER */}
              <div className="sb-diff-panel sb-diff-after">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--purple-700)' }}>
                    + After (SkillBack AI + ATS)
                  </span>
                  <Badge tone="success">High Recruiter Signal</Badge>
                </div>
                <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '8px', color: 'var(--navy-900)' }}>
                  {result.headline}
                </div>
                <p>
                  <HighlightedText
                    text={result.summary}
                    phrases={ATS_KEYWORDS}
                    className="sb-ats-highlight"
                  />
                </p>
              </div>
            </div>
          ) : (
            <div
              style={{
                background: 'var(--navy-900)',
                color: '#FFFFFF',
                padding: '20px',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--lavender-300)', letterSpacing: '0.06em' }}>
                READY-TO-PASTE RESUME SUMMARY
              </span>
              <h4 style={{ color: '#FFFFFF', fontSize: '15.5px', marginTop: '6px' }}>{result.headline}</h4>
              <p style={{ color: 'var(--text-on-dark-muted)', fontSize: '13.5px', marginTop: '8px', lineHeight: 1.65 }}>
                {result.summary}
              </p>
            </div>
          )}

          {/* Highlighted ATS Keyword Chips */}
          <div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Highlighted ATS Keywords Included
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
              {(matchedAts.length > 0 ? matchedAts : ATS_KEYWORDS.slice(0, 6)).map((kw) => (
                <span key={kw} className="sb-ats-highlight" style={{ fontSize: '12px' }}>
                  ✓ {kw}
                </span>
              ))}
            </div>
          </div>

          {/* Visual ATS Signal Lift Chart */}
          <div
            style={{
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              background: '#FFFDF8',
              border: '1px solid var(--border-light)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px', fontSize: '13px', fontWeight: 700, marginBottom: '12px' }}>
              <BarChart3 size={15} color="var(--purple-600)" /> Before vs After ATS Signal Chart
            </div>
            <SkillBenchmarkChart
              items={[
                { label: 'Recruiter Clarity', before: 52, after: 92 },
                { label: 'Leadership Verbs', before: 46, after: 89 },
                { label: 'ATS Keyword Match', before: 38, after: Math.min(96, 72 + matchedAts.length * 4) },
              ]}
            />
          </div>

          {/* Bullet-by-Bullet Diff Translations */}
          <div style={{ display: 'grid', gap: '12px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>
              Bullet-Level Experience Translations
            </span>
            {result.translations.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '12px',
                  padding: '14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-lavender)',
                  background: 'var(--lavender-50)',
                }}
              >
                <div style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>
                  <strong style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '3px' }}>
                    Before (Lived Context)
                  </strong>
                  {item.lifeContext}
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-primary)', lineHeight: 1.55 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', fontWeight: 700, color: 'var(--purple-700)', marginBottom: '4px' }}>
                    <ArrowRight size={13} />{' '}
                    <HighlightedText
                      text={item.corporateTranslation}
                      phrases={ATS_KEYWORDS}
                      className="sb-ats-highlight"
                    />
                  </div>
                  “
                  <HighlightedText
                    text={item.impactBullet}
                    phrases={ATS_KEYWORDS}
                    className="sb-ats-highlight"
                  />
                  ”
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
