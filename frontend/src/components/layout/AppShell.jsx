import { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Sparkles,
  Compass,
  Mic,
  Briefcase,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  ClipboardCheck,
  Bell,
} from 'lucide-react';
import Logo from '../common/Logo';
import Badge from '../common/Badge';
import { useAuth } from '../../context/useAuth';
import './AppShell.css';

const NAV_ITEMS = [
  { to: '/app', label: 'Restart Dashboard', icon: LayoutDashboard, end: true },
  { to: '/app/onboarding', label: 'Career Break Intake', icon: ClipboardCheck },
];

const AGENT_ITEMS = [
  { to: '/app/resume-translator', label: 'Break & Resume AI', icon: Sparkles },
  { to: '/app/skill-roadmap', label: 'Skill Gap Roadmap', icon: Compass },
  { to: '/app/interview-coach', label: 'Interview Coach', icon: Mic },
  { to: '/app/jobs', label: 'Returnship Roles', icon: Briefcase },
];

const COMMUNITY_ITEMS = [
  { to: '/app/community', label: 'Reverse Mentorship', icon: Users },
  { to: '/app/settings', label: 'Preferences', icon: Settings },
];

const PAGE_TITLES = {
  '/app': 'Career Restart Hub',
  '/app/onboarding': 'Career Break & Profile Intake',
  '/app/resume-translator': 'AI Break & Resume Translator',
  '/app/skill-roadmap': 'Skill Gap & Upskilling Plan',
  '/app/interview-coach': 'AI Interview Confidence Coach',
  '/app/jobs': 'Returnships & Flexible Roles',
  '/app/community': 'Two-Way Reverse Mentorship',
  '/app/settings': 'Account & Return Preferences',
};

export default function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const currentTitle = PAGE_TITLES[location.pathname] || 'SkillBack Workspace';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="sb-app-shell">
      <div
        className={`sb-sidebar-backdrop ${sidebarOpen ? 'open' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      <aside className={`sb-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sb-sidebar-header">
          <NavLink to="/" onClick={() => setSidebarOpen(false)}>
            <Logo light size="sm" />
          </NavLink>
          <button
            type="button"
            className="sb-mobile-menu-btn"
            style={{ background: 'transparent', color: '#fff', borderColor: 'rgba(255,255,255,0.2)' }}
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="sb-sidebar-nav" aria-label="Workspace navigation">
          <div className="sb-sidebar-section-label">Overview</div>
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => `sb-sidebar-link ${isActive ? 'active' : ''}`}
            >
              <Icon size={17} />
              <span>{label}</span>
            </NavLink>
          ))}

          <div className="sb-sidebar-section-label">AI Career Agents</div>
          {AGENT_ITEMS.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => `sb-sidebar-link ${isActive ? 'active' : ''}`}
            >
              <Icon size={17} />
              <span>{label}</span>
            </NavLink>
          ))}

          <div className="sb-sidebar-section-label">Support</div>
          {COMMUNITY_ITEMS.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => `sb-sidebar-link ${isActive ? 'active' : ''}`}
            >
              <Icon size={17} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sb-sidebar-footer">
          <div className="sb-readiness-mini">
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
              <span style={{ color: '#FDE68A', fontWeight: 600 }}>Return Readiness</span>
              <span style={{ color: '#FFFFFF', fontWeight: 700 }}>{user?.readinessScore || 78}%</span>
            </div>
            <div
              style={{
                height: '6px',
                borderRadius: '999px',
                background: 'rgba(255,255,255,0.14)',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${user?.readinessScore || 78}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #FBBF24, #F472B6)',
                  borderRadius: '999px',
                }}
              />
            </div>
            <p style={{ fontSize: '11px', color: 'var(--text-on-dark-muted)', marginTop: '8px' }}>
              Target: {user?.targetRole || 'Lead Product Manager'}
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="sb-sidebar-link"
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', width: '100%' }}
          >
            <LogOut size={17} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      <div className="sb-main-area">
        <header className="sb-topbar">
          <div className="sb-topbar-left">
            <button
              type="button"
              className="sb-mobile-menu-btn"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open navigation"
            >
              <Menu size={19} />
            </button>
            <div>
              <h1 style={{ fontSize: '18px', fontWeight: 700 }}>{currentTitle}</h1>
            </div>
          </div>

          <div className="sb-topbar-right">
            <Badge tone="lavender" style={{ display: 'inline-flex' }}>
              <Sparkles size={12} /> AI Agents Ready (Preview)
            </Badge>
            <button
              type="button"
              aria-label="Notifications"
              onClick={() => navigate('/app/jobs')}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                border: '1px solid var(--border-light)',
                background: 'var(--white)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--text-secondary)',
              }}
            >
              <Bell size={16} />
            </button>
            <div className="sb-avatar-pill">
              <div className="sb-avatar-circle">{user?.avatarInitials || 'MD'}</div>
              <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {user?.name || 'Meera Deshmukh'}
                </span>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                  {user?.breakDuration ? `${user.breakDuration} break` : 'Career Returner'}
                </span>
              </div>
            </div>
          </div>
        </header>

        <main className="sb-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
