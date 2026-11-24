import { useState } from 'react';
import { CheckCircle2, Save } from 'lucide-react';
import Button from '../components/common/Button';
import { useAuth } from '../context/useAuth';

export default function SettingsPage() {
  const { user, updateUserProfile } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [targetRole, setTargetRole] = useState(user?.targetRole || '');
  const [workPreference, setWorkPreference] = useState(user?.workPreference || '');
  const [saved, setSaved] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    await updateUserProfile({ name, targetRole, workPreference });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{ maxWidth: '680px' }}>
      <form onSubmit={handleSave} className="sb-card" style={{ padding: '28px', display: 'grid', gap: '18px' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 800 }}>Profile & Return Preferences</h2>
          <p style={{ fontSize: '13.5px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Keep your target role and flexibility requirements updated for accurate returnship matching.
          </p>
        </div>

        <div>
          <label className="sb-label">Full Name</label>
          <input className="sb-input" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div>
          <label className="sb-label">Target Role</label>
          <input
            className="sb-input"
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
          />
        </div>

        <div>
          <label className="sb-label">Preferred Work Model</label>
          <input
            className="sb-input"
            value={workPreference}
            onChange={(e) => setWorkPreference(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Button type="submit" variant="primary">
            <Save size={15} /> Save Preferences
          </Button>
          {saved && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '13px', fontWeight: 600, color: 'var(--success-600)' }}>
              <CheckCircle2 size={15} /> Saved
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
