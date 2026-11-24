import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import { useAuth } from '../context/useAuth';

const BREAK_REASONS = [
  'Family & Child Caregiving',
  'Elder / Health Caregiving',
  'Relocation / Partner Move',
  'Health & Personal Sabbatical',
  'Independent Consulting / Entrepreneurship',
];

const FLEX_OPTIONS = [
  'Remote First',
  'Hybrid (2–3 days)',
  'Paid Returnship Cohort',
  'Flexible Core Hours',
  '4-Day Ramp Option',
];

export default function OnboardingPage() {
  const { user, completeOnboarding } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    previousRole: user?.previousRole || 'Senior Product Manager',
    previousCompany: user?.previousCompany || 'FinPulse Technologies',
    yearsPriorExperience: user?.yearsPriorExperience || 7,
    breakDuration: user?.breakDuration || '3.5 years',
    breakReason: user?.breakReason || BREAK_REASONS[0],
    breakHighlights:
      'Managed household operations, led school digital fundraising committee, and completed product analytics coursework.',
    targetRole: user?.targetRole || 'Lead Product Manager',
    targetIndustry: user?.targetIndustry || 'FinTech & Enterprise SaaS',
    workPreference: user?.workPreference || 'Hybrid or Remote (Flexible Core Hours)',
    selectedFlex: ['Remote First', 'Paid Returnship Cohort', 'Flexible Core Hours'],
  });

  const toggleFlex = (item) => {
    setForm((prev) => ({
      ...prev,
      selectedFlex: prev.selectedFlex.includes(item)
        ? prev.selectedFlex.filter((x) => x !== item)
        : [...prev.selectedFlex, item],
    }));
  };

  const handleFinish = async () => {
    setSaving(true);
    try {
      await completeOnboarding(form);
      navigate('/app');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ maxWidth: '820px', margin: '0 auto' }}>
      <div style={{ marginBottom: '24px' }}>
        <Badge tone="lavender">
          <Sparkles size={13} /> Step {step} of 3 · Personalized Return Intake
        </Badge>
        <h2 style={{ fontSize: '26px', fontWeight: 800, marginTop: '10px' }}>
          Tell Us About Your Journey So Far
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14.5px', marginTop: '6px' }}>
          We use your prior strengths and break experiences—never penalizing time away—to tailor
          your AI agents and returnship matches.
        </p>
      </div>

      {/* Stepper indicator */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '24px' }}>
        {['Prior Experience', 'Career Break Context', 'Return Goals'].map((label, idx) => {
          const active = step >= idx + 1;
          return (
            <div key={label}>
              <div
                style={{
                  height: '6px',
                  borderRadius: '999px',
                  background: active ? 'var(--purple-600)' : 'var(--lavender-200)',
                  marginBottom: '6px',
                  transition: 'background 200ms',
                }}
              />
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: active ? 700 : 500,
                  color: active ? 'var(--text-primary)' : 'var(--text-muted)',
                }}
              >
                {idx + 1}. {label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="sb-card" style={{ padding: '32px' }}>
        {step === 1 && (
          <div style={{ display: 'grid', gap: '18px' }}>
            <h3 style={{ fontSize: '19px', fontWeight: 700 }}>Your Foundation Before the Break</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              <div>
                <label className="sb-label">Most Recent Role Title</label>
                <input
                  className="sb-input"
                  value={form.previousRole}
                  onChange={(e) => setForm({ ...form, previousRole: e.target.value })}
                />
              </div>
              <div>
                <label className="sb-label">Organization / Industry</label>
                <input
                  className="sb-input"
                  value={form.previousCompany}
                  onChange={(e) => setForm({ ...form, previousCompany: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="sb-label">Years of Prior Professional Experience</label>
              <input
                className="sb-input"
                type="number"
                min="1"
                max="35"
                value={form.yearsPriorExperience}
                onChange={(e) => setForm({ ...form, yearsPriorExperience: Number(e.target.value) })}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div style={{ display: 'grid', gap: '18px' }}>
            <h3 style={{ fontSize: '19px', fontWeight: 700 }}>Your Career Pause & Lived Leadership</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              <div>
                <label className="sb-label">Break Duration</label>
                <select
                  className="sb-select"
                  value={form.breakDuration}
                  onChange={(e) => setForm({ ...form, breakDuration: e.target.value })}
                >
                  <option value="6–12 months">6–12 months</option>
                  <option value="1–2 years">1–2 years</option>
                  <option value="3.5 years">2–4 years</option>
                  <option value="5+ years">5+ years</option>
                  <option value="8+ years">8+ years</option>
                </select>
              </div>
              <div>
                <label className="sb-label">Primary Context</label>
                <select
                  className="sb-select"
                  value={form.breakReason}
                  onChange={(e) => setForm({ ...form, breakReason: e.target.value })}
                >
                  {BREAK_REASONS.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="sb-label">
                Projects, Volunteer Work, Care Coordination, or Learning During Your Break
              </label>
              <textarea
                className="sb-textarea"
                value={form.breakHighlights}
                onChange={(e) => setForm({ ...form, breakHighlights: e.target.value })}
                placeholder="Share anything you managed, organized, studied, or advised—our AI turns this into professional proof."
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div style={{ display: 'grid', gap: '18px' }}>
            <h3 style={{ fontSize: '19px', fontWeight: 700 }}>Where You Are Heading Next</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              <div>
                <label className="sb-label">Target Role</label>
                <input
                  className="sb-input"
                  value={form.targetRole}
                  onChange={(e) => setForm({ ...form, targetRole: e.target.value })}
                />
              </div>
              <div>
                <label className="sb-label">Preferred Industry</label>
                <input
                  className="sb-input"
                  value={form.targetIndustry}
                  onChange={(e) => setForm({ ...form, targetIndustry: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="sb-label">Flexibility & Support Preferences</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '6px' }}>
                {FLEX_OPTIONS.map((item) => {
                  const selected = form.selectedFlex.includes(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleFlex(item)}
                      style={{
                        padding: '8px 14px',
                        borderRadius: '999px',
                        border: selected
                          ? '1px solid var(--purple-600)'
                          : '1px solid var(--border-strong)',
                        background: selected ? 'var(--lavender-100)' : 'var(--white)',
                        color: selected ? 'var(--purple-700)' : 'var(--text-secondary)',
                        fontSize: '13px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      {selected && <CheckCircle2 size={14} />}
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '28px',
            paddingTop: '20px',
            borderTop: '1px solid var(--border-light)',
          }}
        >
          <Button
            variant="ghost"
            disabled={step === 1}
            onClick={() => setStep((s) => Math.max(1, s - 1))}
          >
            <ArrowLeft size={16} /> Previous
          </Button>

          {step < 3 ? (
            <Button variant="primary" onClick={() => setStep((s) => s + 1)}>
              Continue <ArrowRight size={16} />
            </Button>
          ) : (
            <Button variant="primary" onClick={handleFinish} disabled={saving}>
              {saving ? 'Saving Plan...' : 'Save & Launch My Return Plan'} <Sparkles size={16} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
