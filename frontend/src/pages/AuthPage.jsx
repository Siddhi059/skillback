import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import Logo from '../components/common/Logo';
import Button from '../components/common/Button';
import { useAuth } from '../context/useAuth';
import './AuthPage.css';

export default function AuthPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const mode = searchParams.get('mode') === 'signup' ? 'signup' : 'login';
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [targetRole, setTargetRole] = useState('Product Manager');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login, signup, loginAsDemo } = useAuth();
  const navigate = useNavigate();

  const switchMode = (nextMode) => {
    setError('');
    setSearchParams(nextMode === 'signup' ? { mode: 'signup' } : {});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (mode === 'signup' && password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    try {
      if (mode === 'signup') {
        await signup({ name, email, password, targetRole });
        navigate('/app/onboarding');
      } else {
        await login({ email, password });
        navigate('/app');
      }
    } catch (err) {
      setError(err.message || 'Unable to authenticate. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemo = async () => {
    setError('');
    setLoading(true);
    try {
      await loginAsDemo();
      navigate('/app');
    } catch (err) {
      setError(err.message || 'Unable to launch demo session.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sb-auth-page">
      <div className="sb-auth-brand-panel">
        <div>
          <Link to="/">
            <Logo light showTagline />
          </Link>
        </div>

        <div style={{ maxWidth: '420px' }}>
            <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#FDE68A',
              marginBottom: '14px',
            }}
          >
            <Sparkles size={14} /> Built For Career Comebacks
          </span>
          <h2 style={{ color: '#FFFFFF', fontSize: '34px', fontWeight: 800, lineHeight: 1.15 }}>
            Your next chapter deserves clarity—not guesswork.
          </h2>
          <p style={{ color: 'var(--text-on-dark-muted)', marginTop: '14px', fontSize: '15px', lineHeight: 1.65 }}>
            Reframe your career pause with confidence, refresh modern workflows, and unlock vetted
            returnships tailored to your life.
          </p>

          <ul style={{ listStyle: 'none', padding: 0, margin: '28px 0 0', display: 'grid', gap: '12px', fontSize: '14px' }}>
            {[
              'Translate caregiving & volunteer work into leadership impact',
              'Personalized 30-60-90 day upskilling checklist',
              'Direct access to break-friendly employers & mentors',
            ].map((item) => (
              <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#FFF5F8' }}>
                <CheckCircle2 size={16} color="#FDE68A" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ fontSize: '13px', color: 'var(--text-on-dark-muted)' }}>
          “Your Experience Never Goes Out of Style.”
        </div>
      </div>

      <div className="sb-auth-form-panel">
        <div className="sb-card sb-auth-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 800 }}>
              {mode === 'signup' ? 'Start your comeback' : 'Welcome back'}
            </h1>
            <Link to="/" style={{ fontSize: '13px', color: 'var(--purple-600)', fontWeight: 600 }}>
              ← Home
            </Link>
          </div>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '6px' }}>
            {mode === 'signup'
              ? 'Create your SkillBack profile in 60 seconds.'
              : 'Sign in to continue your return roadmap.'}
          </p>

          <div className="sb-auth-tabs" role="tablist">
            <button
              type="button"
              className={`sb-auth-tab ${mode === 'login' ? 'active' : ''}`}
              onClick={() => switchMode('login')}
            >
              Sign In
            </button>
            <button
              type="button"
              className={`sb-auth-tab ${mode === 'signup' ? 'active' : ''}`}
              onClick={() => switchMode('signup')}
            >
              Create Account
            </button>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '16px' }}>
            {error && (
              <div
                style={{
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--danger-50)',
                  color: 'var(--danger-600)',
                  fontSize: '13px',
                  fontWeight: 500,
                }}
              >
                {error}
              </div>
            )}
            {mode === 'signup' && (
              <div>
                <label className="sb-label" htmlFor="auth-name">
                  Full Name
                </label>
                <input
                  id="auth-name"
                  className="sb-input"
                  type="text"
                  placeholder="e.g. Meera Deshmukh or Rajesh Kulkarni"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}

            <div>
              <label className="sb-label" htmlFor="auth-email">
                Email Address
              </label>
              <input
                id="auth-email"
                className="sb-input"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="sb-label" htmlFor="auth-password">
                Password {mode === 'signup' ? '(min. 6 characters)' : ''}
              </label>
              <input
                id="auth-password"
                className="sb-input"
                type="password"
                minLength={mode === 'signup' ? 6 : undefined}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {mode === 'signup' && (
              <div>
                <label className="sb-label" htmlFor="auth-role">
                  Target Return Role
                </label>
                <input
                  id="auth-role"
                  className="sb-input"
                  type="text"
                  placeholder="e.g. Product Manager, UX Lead, Data Analyst"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                />
              </div>
            )}

            <Button type="submit" size="lg" variant="primary" disabled={loading}>
              {loading
                ? 'Preparing Workspace...'
                : mode === 'signup'
                  ? 'Create Account & Continue'
                  : 'Sign In to Workspace'}{' '}
              <ArrowRight size={16} />
            </Button>
          </form>

          <div
            style={{
              margin: '20px 0 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontSize: '12px',
              color: 'var(--text-muted)',
            }}
          >
            <div style={{ flex: 1, height: '1px', background: 'var(--border-light)' }} />
            <span>OR PREVIEW INSTANTLY</span>
            <div style={{ flex: 1, height: '1px', background: 'var(--border-light)' }} />
          </div>

          <Button
            type="button"
            variant="secondary"
            size="md"
            style={{ width: '100%' }}
            onClick={handleDemo}
          >
            <Sparkles size={15} /> Continue as Demo Returner (Meera Deshmukh)
          </Button>
        </div>
      </div>
    </div>
  );
}
