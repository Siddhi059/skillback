import { useEffect, useState } from 'react';
import { Briefcase, Bookmark, MapPin, Clock, CheckCircle2, Search, Sparkles } from 'lucide-react';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import { RETURNSHIP_JOBS } from '../data/mockData';
import { workspaceService } from '../services/api';

export default function JobsBoardPage() {
  const [allJobs, setAllJobs] = useState(() =>
    RETURNSHIP_JOBS.map((j) => ({ ...j, saved: j.id === 'job-1', applied: false })),
  );
  const [query, setQuery] = useState('');
  const [onlyMentorship, setOnlyMentorship] = useState(false);
  const [onlyFlexible, setOnlyFlexible] = useState(false);

  useEffect(() => {
    let active = true;
    workspaceService.getJobs().then((data) => {
      if (active && Array.isArray(data) && data.length > 0) setAllJobs(data);
    });
    return () => {
      active = false;
    };
  }, []);

  const filtered = allJobs.filter((job) => {
    const matchesText =
      !query.trim() ||
      `${job.title} ${job.company} ${job.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase());
    const matchesMentor = !onlyMentorship || job.mentorship;
    const matchesFlex = !onlyFlexible || job.flexibleHours;
    return matchesText && matchesMentor && matchesFlex;
  });

  const toggleSave = async (id) => {
    setAllJobs((prev) =>
      prev.map((job) => (job.id === id ? { ...job, saved: !job.saved } : job)),
    );
    await workspaceService.toggleSaveJob(id);
  };

  const handleApply = async (id) => {
    setAllJobs((prev) =>
      prev.map((job) => (job.id === id ? { ...job, applied: true } : job)),
    );
    await workspaceService.applyToJob(id);
  };

  return (
    <div style={{ display: 'grid', gap: '24px' }}>
      <div className="sb-card" style={{ padding: '24px', display: 'grid', gap: '16px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
          <div>
            <Badge tone="lavender">
              <Sparkles size={12} /> Returnship & Role Matcher
            </Badge>
            <h2 style={{ fontSize: '22px', fontWeight: 800, marginTop: '8px' }}>
              Vetted Roles That Celebrate Career Returners
            </h2>
          </div>
          <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text-muted)' }}>
            Showing {filtered.length} break-friendly opportunities
          </span>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: '1 1 260px' }}>
            <Search
              size={16}
              color="var(--text-muted)"
              style={{ position: 'absolute', left: '13px', top: '50%', transform: 'translateY(-50%)' }}
            />
            <input
              className="sb-input"
              style={{ paddingLeft: '38px' }}
              placeholder="Search role, company, FinTech, Remote..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <button
            type="button"
            onClick={() => setOnlyMentorship((v) => !v)}
            style={{
              padding: '10px 14px',
              borderRadius: 'var(--radius-md)',
              border: onlyMentorship ? '1px solid var(--purple-600)' : '1px solid var(--border-strong)',
              background: onlyMentorship ? 'var(--lavender-100)' : 'var(--white)',
              color: onlyMentorship ? 'var(--purple-700)' : 'var(--text-secondary)',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Mentorship Included
          </button>

          <button
            type="button"
            onClick={() => setOnlyFlexible((v) => !v)}
            style={{
              padding: '10px 14px',
              borderRadius: 'var(--radius-md)',
              border: onlyFlexible ? '1px solid var(--purple-600)' : '1px solid var(--border-strong)',
              background: onlyFlexible ? 'var(--lavender-100)' : 'var(--white)',
              color: onlyFlexible ? 'var(--purple-700)' : 'var(--text-secondary)',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Flexible Hours
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gap: '16px' }}>
        {filtered.map((job) => {
          const saved = Boolean(job.saved);
          const applied = Boolean(job.applied);
          return (
            <div key={job.id} className="sb-card sb-card-interactive" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--purple-600)' }}>
                      {job.company}
                    </span>
                    <Badge tone="success">{job.matchScore}% AI Skill Match</Badge>
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, marginTop: '6px' }}>{job.title}</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', fontSize: '13px', color: 'var(--text-muted)', marginTop: '8px' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                      <MapPin size={14} /> {job.location}
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                      <Clock size={14} /> {job.type}
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                      <Briefcase size={14} /> {job.compensation}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <Button variant="outline" size="md" onClick={() => toggleSave(job.id)}>
                    <Bookmark size={15} fill={saved ? 'var(--purple-600)' : 'none'} color={saved ? 'var(--purple-600)' : 'currentColor'} />
                    {saved ? 'Saved' : 'Save'}
                  </Button>
                  <Button
                    variant={applied ? 'secondary' : 'primary'}
                    size="md"
                    onClick={() => handleApply(job.id)}
                  >
                    {applied ? (
                      <>
                        <CheckCircle2 size={15} /> Applied
                      </>
                    ) : (
                      'Apply With Translated Profile'
                    )}
                  </Button>
                </div>
              </div>

              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.65, margin: '14px 0' }}>
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
          );
        })}
      </div>
    </div>
  );
}
