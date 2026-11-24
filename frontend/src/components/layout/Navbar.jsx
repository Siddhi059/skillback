import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import Logo from '../common/Logo';
import Button from '../common/Button';
import { useAuth } from '../../context/useAuth';
import './Navbar.css';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sb-navbar">
      <div className="sb-container sb-navbar-inner">
        <Link to="/" aria-label="SkillBack Home">
          <Logo />
        </Link>

        <nav className="sb-nav-links" aria-label="Main navigation">
          <a href="#how-it-works" className="sb-nav-link">
            How It Works
          </a>
          <a href="#ai-agents" className="sb-nav-link">
            AI Agents
          </a>
          <a href="#returnships" className="sb-nav-link">
            Returnships
          </a>
          <a href="#stories" className="sb-nav-link">
            Returner Stories
          </a>
        </nav>

        <div className="sb-nav-actions">
          {isAuthenticated ? (
            <Button variant="primary" onClick={() => navigate('/app')}>
              Go to Workspace <ArrowRight size={15} />
            </Button>
          ) : (
            <>
              <Button variant="ghost" onClick={() => navigate('/auth')}>
                Sign In
              </Button>
              <Button variant="primary" onClick={() => navigate('/auth?mode=signup')}>
                Restart Your Career <ArrowRight size={15} />
              </Button>
            </>
          )}
        </div>

        <button
          type="button"
          className="sb-nav-mobile-toggle"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div className={`sb-mobile-drawer ${open ? 'open' : ''}`}>
        <a href="#how-it-works" className="sb-nav-link" onClick={() => setOpen(false)}>
          How It Works
        </a>
        <a href="#ai-agents" className="sb-nav-link" onClick={() => setOpen(false)}>
          AI Agents
        </a>
        <a href="#returnships" className="sb-nav-link" onClick={() => setOpen(false)}>
          Returnships
        </a>
        <a href="#stories" className="sb-nav-link" onClick={() => setOpen(false)}>
          Returner Stories
        </a>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '6px' }}>
          {isAuthenticated ? (
            <Button variant="primary" onClick={() => navigate('/app')}>
              Go to Workspace
            </Button>
          ) : (
            <>
              <Button variant="outline" onClick={() => navigate('/auth')}>
                Sign In
              </Button>
              <Button variant="primary" onClick={() => navigate('/auth?mode=signup')}>
                Restart Your Career
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
