import { ShieldCheck } from 'lucide-react';
import Badge from '../components/common/Badge';
import { DoodleSparkle } from '../components/common/Doodles';
import SapConnectorPanel from '../components/workspace/SapConnectorPanel';

export default function BiasAuditPage() {
  return (
    <div style={{ display: 'grid', gap: '24px' }}>
      <div
        className="sb-card-lavender"
        style={{
          padding: '22px 26px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '14px',
        }}
      >
        <div>
          <Badge tone="lavender">
            <ShieldCheck size={12} /> Bias Audit Agent + SAP SuccessFactors
          </Badge>
          <h2 style={{ fontSize: '22px', fontWeight: 800, marginTop: '8px' }}>
            Audit Live Requisitions & Export Verified Skill Passports
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px', maxWidth: '720px' }}>
            Automatically detect career-gap exclusion, age bias, and rigid scheduling language in
            SAP SuccessFactors requisitions—fix flagged phrases in one click, and push clean roles
            or Skill Passports back to SAP.
          </p>
        </div>
        <DoodleSparkle size={28} color="#E5C2CC" />
      </div>

      <SapConnectorPanel defaultTab="requisitions" />
    </div>
  );
}
