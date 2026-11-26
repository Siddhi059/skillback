import { useEffect, useState } from 'react';
import {
  ArrowLeftRight,
  Calendar,
  CheckCircle2,
  Layers,
  MessageCircleHeart,
  Sparkles,
  Users,
} from 'lucide-react';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import { ReturnerAvatar } from '../components/common/BrandArtwork';
import { DoodleCoffeeNotebook, DoodlePaperPlane } from '../components/common/Doodles';
import { MENTORS, REVERSE_MENTORSHIP_PAIRS } from '../data/mockData';
import { workspaceService } from '../services/api';

export default function CommunityPage() {
  const [mentors, setMentors] = useState(() => MENTORS.map((m) => ({ ...m, booked: false })));
  const [bookedIds, setBookedIds] = useState([]);
  const [requestedPairIds, setRequestedPairIds] = useState([]);
  const [swapRole, setSwapRole] = useState('senior');

  useEffect(() => {
    let active = true;
    workspaceService.getMentors().then((data) => {
      if (active && Array.isArray(data) && data.length > 0) setMentors(data);
    });
    return () => {
      active = false;
    };
  }, []);

  const toggleBook = async (id) => {
    setBookedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
    setMentors((prev) => prev.map((m) => (m.id === id ? { ...m, booked: true } : m)));
    await workspaceService.bookMentor(id);
  };

  const togglePairRequest = (id) => {
    setRequestedPairIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  return (
    <div style={{ display: 'grid', gap: '24px' }}>
      {/* Hero Banner */}
      <div
        className="sb-card-navy"
        style={{
          padding: '26px 30px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '20px',
        }}
      >
        <div style={{ maxWidth: '680px' }}>
          <Badge tone="navy" style={{ background: 'rgba(241, 220, 226, 0.18)', color: '#F8ECEF' }}>
            <ArrowLeftRight size={12} /> Two-Way Reverse Mentorship & Mentor Circles
          </Badge>
          <h2 style={{ color: '#FFFFFF', fontSize: '24px', fontWeight: 800, marginTop: '10px' }}>
            Share Industry Wisdom. Master Modern AI Together.
          </h2>
          <p style={{ color: 'var(--text-on-dark-muted)', fontSize: '14.5px', marginTop: '6px' }}>
            Whether you are an experienced returner, retired engineer, career pivoter, or Gen-Z
            digital specialist—connect for structured two-way skill swaps and shared project tracks.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '16px' }}>
            {[
              { id: 'senior', label: 'I Share Domain Wisdom & Learn AI Tools' },
              { id: 'genz', label: 'I Mentor AI Workflows & Learn Leadership' },
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setSwapRole(opt.id)}
                style={{
                  padding: '8px 14px',
                  borderRadius: '999px',
                  border:
                    swapRole === opt.id
                      ? '1px solid #E5C2CC'
                      : '1px solid rgba(255,255,255,0.2)',
                  background:
                    swapRole === opt.id
                      ? 'linear-gradient(135deg, rgba(184, 93, 121, 0.5), rgba(160, 71, 100, 0.34))'
                      : 'rgba(255,255,255,0.06)',
                  color: '#FFFFFF',
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <DoodlePaperPlane size={40} />
          <DoodleCoffeeNotebook size={72} />
        </div>
      </div>

      {/* Active Two-Way Reverse Mentorship Pairings */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={17} color="var(--purple-600)" /> Sample Two-Way Reverse Mentorship Tracks
          </h3>
          <Badge tone="yellow">
            Mode: {swapRole === 'senior' ? 'Senior / Returning Partner' : 'Gen-Z Digital Mentor'}
          </Badge>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '18px' }}>
          {REVERSE_MENTORSHIP_PAIRS.map((pair) => {
            const requested = requestedPairIds.includes(pair.id);
            return (
              <div
                key={pair.id}
                className="sb-card sb-card-interactive"
                style={{ padding: '22px', display: 'flex', flexDirection: 'column', gap: '14px' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                  <Badge tone="yellow">{pair.badge}</Badge>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 600 }}>
                    {pair.cadence}
                  </span>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr auto 1fr',
                    gap: '10px',
                    alignItems: 'center',
                    padding: '12px',
                    borderRadius: '14px',
                    background: 'var(--lavender-50)',
                    border: '1px solid var(--border-lavender)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                    <ReturnerAvatar variant={pair.senior.avatar} size={36} />
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: '13px', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {pair.senior.name}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Domain Lead</div>
                    </div>
                  </div>

                  <ArrowLeftRight size={16} color="var(--purple-600)" />

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                    <ReturnerAvatar variant={pair.genZ.avatar} size={36} />
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: '13px', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {pair.genZ.name}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Gen-Z AI</div>
                    </div>
                  </div>
                </div>

                <div style={{ fontSize: '12.5px', display: 'grid', gap: '6px' }}>
                  <div>
                    <strong style={{ color: '#53444B' }}>Wisdom Shared:</strong>{' '}
                    <span style={{ color: 'var(--text-secondary)' }}>{pair.senior.shares.join(' · ')}</span>
                  </div>
                  <div>
                    <strong style={{ color: 'var(--purple-700)' }}>AI & Tech Learned:</strong>{' '}
                    <span style={{ color: 'var(--text-secondary)' }}>{pair.genZ.shares.join(' · ')}</span>
                  </div>
                </div>

                <div style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px', marginTop: 'auto' }}>
                  <Layers size={13} color="var(--purple-600)" /> Project: {pair.trackTitle}
                </div>

                <Button
                  variant={requested ? 'secondary' : 'primary'}
                  size="sm"
                  onClick={() => togglePairRequest(pair.id)}
                >
                  {requested ? (
                    <>
                      <CheckCircle2 size={14} /> Skill-Swap Match Requested
                    </>
                  ) : (
                    'Join Similar Skill-Swap Track'
                  )}
                </Button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Diverse Mentor & Reverse-Mentor Directory */}
      <div>
        <h3 style={{ fontSize: '18px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
          <Users size={17} color="var(--purple-600)" /> Community Mentors & Skill-Swap Partners
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '18px' }}>
          {mentors.map((mentor) => {
            const booked = Boolean(mentor.booked) || bookedIds.includes(mentor.id);
            return (
              <div
                key={mentor.id}
                className="sb-card sb-card-interactive"
                style={{ padding: '22px', display: 'flex', flexDirection: 'column', gap: '14px' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {mentor.avatar ? (
                    <ReturnerAvatar variant={mentor.avatar} size={46} />
                  ) : (
                    <div
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, var(--purple-600), var(--yellow-500))',
                        color: '#fff',
                        fontWeight: 700,
                        fontSize: '15px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {mentor.initials}
                    </div>
                  )}
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: 700 }}>{mentor.name}</h4>
                    <div style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>{mentor.role}</div>
                  </div>
                </div>

                <Badge tone="lavender">{mentor.circle}</Badge>

                <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.6, flex: 1 }}>
                  <MessageCircleHeart
                    size={14}
                    style={{ display: 'inline', verticalAlign: '-2px', marginRight: '6px', color: 'var(--purple-600)' }}
                  />
                  {mentor.breakNote}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', color: 'var(--text-muted)' }}>
                  <Calendar size={14} /> Next Coffee Chat: {mentor.availability}
                </div>

                <Button variant={booked ? 'secondary' : 'outline'} onClick={() => toggleBook(mentor.id)}>
                  {booked ? (
                    <>
                      <CheckCircle2 size={15} /> Session Requested
                    </>
                  ) : (
                    'Request 20-Min Coffee Chat'
                  )}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
