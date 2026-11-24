import { useEffect, useState } from 'react';
import { Calendar, CheckCircle2, Users, MessageCircleHeart } from 'lucide-react';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import { DoodleCoffeeNotebook, DoodlePaperPlane } from '../components/common/Doodles';
import { MENTORS } from '../data/mockData';
import { workspaceService } from '../services/api';

export default function CommunityPage() {
  const [mentors, setMentors] = useState(() => MENTORS.map((m) => ({ ...m, booked: false })));

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
    setMentors((prev) => prev.map((m) => (m.id === id ? { ...m, booked: true } : m)));
    await workspaceService.bookMentor(id);
  };

  return (
    <div style={{ display: 'grid', gap: '24px' }}>
      <div className="sb-card-navy" style={{ padding: '26px 30px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
        <div>
          <Badge tone="navy" style={{ background: 'rgba(253, 230, 138, 0.2)', color: '#FEF3C7' }}>
            <Users size={12} /> Peer Circles & Returner Mentors
          </Badge>
          <h2 style={{ color: '#FFFFFF', fontSize: '24px', fontWeight: 800, marginTop: '10px' }}>
            You Never Have to Restart Alone
          </h2>
          <p style={{ color: 'var(--text-on-dark-muted)', fontSize: '14.5px', marginTop: '6px', maxWidth: '640px' }}>
            Connect 1:1 with women who navigated 2–7 year career breaks and now lead teams across
            Product, Engineering, and People Operations.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <DoodlePaperPlane size={40} />
          <DoodleCoffeeNotebook size={72} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '20px' }}>
        {mentors.map((mentor) => {
          const booked = Boolean(mentor.booked);
          return (
            <div key={mentor.id} className="sb-card sb-card-interactive" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--purple-600), var(--navy-900))',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {mentor.initials}
                </div>
                <div>
                  <h3 style={{ fontSize: '17px', fontWeight: 700 }}>{mentor.name}</h3>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{mentor.role}</div>
                </div>
              </div>

              <Badge tone="lavender">{mentor.circle}</Badge>

              <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.6, flex: 1 }}>
                <MessageCircleHeart size={14} style={{ display: 'inline', verticalAlign: '-2px', marginRight: '6px', color: 'var(--purple-600)' }} />
                {mentor.breakNote}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12.5px', color: 'var(--text-muted)' }}>
                <Calendar size={14} /> Next Coffee Chat: {mentor.availability}
              </div>

              <Button
                variant={booked ? 'secondary' : 'primary'}
                onClick={() => toggleBook(mentor.id)}
              >
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
  );
}
