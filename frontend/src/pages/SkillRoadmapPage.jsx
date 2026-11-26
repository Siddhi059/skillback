import { useEffect, useState } from 'react';
import { BookOpen, CheckCircle2, Clock, Sparkles, BarChart3 } from 'lucide-react';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import { SKILL_MODULES } from '../data/mockData';
import { workspaceService } from '../services/api';

export default function SkillRoadmapPage() {
  const [modules, setModules] = useState(SKILL_MODULES);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    let active = true;
    workspaceService.getSkillModules().then((data) => {
      if (active && Array.isArray(data) && data.length > 0) setModules(data);
    });
    return () => {
      active = false;
    };
  }, []);

  const categories = ['All', 'AI Literacy', 'Data & Metrics', 'Ways of Working', 'Career Strategy'];
  const visibleModules =
    filter === 'All' ? modules : modules.filter((m) => m.category === filter);

  const advanceModule = async (id) => {
    setModules((prev) =>
      prev.map((m) => {
        if (m.id !== id) return m;
        const next = m.progress >= 100 ? 0 : Math.min(100, m.progress + 25);
        return {
          ...m,
          progress: next,
          priority: next === 100 ? 'Completed' : 'In Progress',
        };
      }),
    );
    const updated = await workspaceService.updateSkillModuleProgress(id);
    if (updated) {
      setModules((prev) => prev.map((m) => (m.id === id ? updated : m)));
    }
  };

  return (
    <div style={{ display: 'grid', gap: '24px' }}>
      <div className="sb-card" style={{ padding: '24px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
        <div>
          <Badge tone="lavender">
            <Sparkles size={12} /> Skill Gap Architect
          </Badge>
          <h2 style={{ fontSize: '22px', fontWeight: 800, marginTop: '8px' }}>
            Focused Refresher Modules — Zero Busywork
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Your core experience is intact. These short sprints bridge only what has evolved since
            your break.
          </p>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              style={{
                padding: '7px 14px',
                borderRadius: '999px',
                border: filter === cat ? '1px solid var(--purple-600)' : '1px solid var(--border-light)',
                background: filter === cat ? 'var(--lavender-100)' : 'var(--white)',
                color: filter === cat ? 'var(--purple-700)' : 'var(--text-secondary)',
                fontSize: '12.5px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="sb-card-lavender" style={{ padding: '22px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BarChart3 size={16} color="var(--purple-600)" /> Skill Refresher Mastery Chart
          </h3>
          <Badge tone="yellow">
            Avg {Math.round(modules.reduce((acc, m) => acc + m.progress, 0) / Math.max(1, modules.length))}% Complete
          </Badge>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
          {modules.map((mod) => (
            <div key={mod.id} style={{ background: 'rgba(255,255,255,0.88)', padding: '12px 14px', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                <span style={{ color: 'var(--text-secondary)' }}>{mod.category}</span>
                <span className="tabular-nums" style={{ color: 'var(--purple-700)' }}>{mod.progress}%</span>
              </div>
              <div style={{ height: '8px', borderRadius: '999px', background: '#F8ECEF', overflow: 'hidden' }}>
                <div
                  style={{
                    width: `${mod.progress}%`,
                    height: '100%',
                    background: mod.progress === 100 ? '#1F6F5B' : 'linear-gradient(90deg, #E5C2CC, #A04764)',
                    borderRadius: '999px',
                    transition: 'width 280ms ease',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {visibleModules.map((mod) => (
          <div key={mod.id} className="sb-card sb-card-interactive" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Badge tone={mod.progress === 100 ? 'success' : 'lavender'}>{mod.priority}</Badge>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '12.5px', color: 'var(--text-muted)' }}>
                <Clock size={13} /> {mod.duration}
              </span>
            </div>

            <div>
              <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--purple-600)' }}>
                {mod.category}
              </span>
              <h3 style={{ fontSize: '18px', fontWeight: 700, marginTop: '4px' }}>{mod.title}</h3>
            </div>

            <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.6, flex: 1 }}>
              {mod.description}
            </p>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Module Progress</span>
                <span style={{ fontWeight: 700 }}>{mod.progress}%</span>
              </div>
              <div style={{ height: '7px', borderRadius: '999px', background: 'var(--lavender-100)', overflow: 'hidden' }}>
                <div
                  style={{
                    width: `${mod.progress}%`,
                    height: '100%',
                    background: mod.progress === 100 ? 'var(--success-600)' : 'var(--purple-600)',
                    borderRadius: '999px',
                    transition: 'width 250ms ease',
                  }}
                />
              </div>
            </div>

            <Button
              variant={mod.progress === 100 ? 'outline' : 'secondary'}
              size="md"
              onClick={() => advanceModule(mod.id)}
            >
              {mod.progress === 100 ? (
                <>
                  <CheckCircle2 size={15} /> Completed (Reset)
                </>
              ) : (
                <>
                  <BookOpen size={15} /> {mod.progress > 0 ? 'Continue Sprint (+25%)' : 'Start Sprint'}
                </>
              )}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
