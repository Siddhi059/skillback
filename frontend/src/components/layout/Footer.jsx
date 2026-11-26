import { Link } from 'react-router-dom';
import Logo from '../common/Logo';

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--navy-950)',
        color: 'var(--text-on-dark-muted)',
        padding: '64px 0 36px',
        marginTop: 'auto',
      }}
    >
      <div className="sb-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: '40px',
            paddingBottom: '48px',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div>
            <Logo light showTagline />
            <p style={{ marginTop: '16px', fontSize: '14px', lineHeight: 1.65, maxWidth: '280px' }}>
              Empowering career returners, mid-career pivoters, and retired leaders to translate
              lived experience and swap AI skills through two-way mentorship.
            </p>
          </div>

          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '14px', marginBottom: '14px' }}>Platform</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '10px', fontSize: '14px' }}>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#reverse-mentorship">Reverse Mentorship</a></li>
              <li><a href="#ai-agents">AI Career Suite</a></li>
              <li><a href="#returnships">Returnship Board</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '14px', marginBottom: '14px' }}>For Returners</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '10px', fontSize: '14px' }}>
              <li><Link to="/auth?mode=signup">Break Narrative Studio</Link></li>
              <li><Link to="/auth?mode=signup">30-60-90 Day Restart Plan</Link></li>
              <li><Link to="/auth?mode=signup">Interview Confidence Coach</Link></li>
              <li><Link to="/auth?mode=signup">Mentor Circles</Link></li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '14px', marginBottom: '14px' }}>Partner With Us</h4>
            <p style={{ fontSize: '14px', lineHeight: 1.6, marginBottom: '12px' }}>
              Hiring break-friendly talent or launching a paid returnship cohort?
            </p>
            <Link
              to="/auth"
              style={{
                color: 'var(--lavender-300)',
                fontWeight: 600,
                fontSize: '14px',
              }}
            >
              Explore Employer Partnerships →
            </Link>
          </div>
        </div>

        <div
          style={{
            paddingTop: '24px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '12px',
            fontSize: '13px',
          }}
        >
          <span>© {new Date().getFullYear()} SkillBack Inc. All rights reserved.</span>
          <span style={{ color: '#E5C2CC' }}>
            Your Experience Never Goes Out of Style.
          </span>
        </div>
      </div>
    </footer>
  );
}
