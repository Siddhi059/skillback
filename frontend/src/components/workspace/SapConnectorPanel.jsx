import { useMemo, useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  CloudUpload,
  Code2,
  Copy,
  Check,
  Database,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Wand2,
} from 'lucide-react';
import Badge from '../common/Badge';
import Button from '../common/Button';
import { ReturnerAvatar } from '../common/BrandArtwork';
import {
  SKILL_PASSPORT_CANDIDATES,
  buildSkillPassportSapPayload,
  exportSkillPassportToSap,
  fetchSapJobRequisitions,
  pushAuditedRequisitionToSap,
  runBiasAuditOnRequisition,
} from '../../services/sapService';

function HighlightedRequisitionDesc({ text, flaggedPhrases, fixedPhrases }) {
  const tokens = useMemo(() => {
    const all = [...flaggedPhrases, ...fixedPhrases].filter(Boolean);
    if (!text || all.length === 0) return [{ text, type: 'plain' }];
    const escaped = [...new Set(all)].map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const regex = new RegExp(`(${escaped.join('|')})`, 'gi');
    const flaggedSet = new Set(flaggedPhrases.map((p) => p.toLowerCase()));
    const fixedSet = new Set(fixedPhrases.map((p) => p.toLowerCase()));

    return text.split(regex).map((part) => {
      const lower = part.toLowerCase();
      if (flaggedSet.has(lower)) return { text: part, type: 'flagged' };
      if (fixedSet.has(lower)) return { text: part, type: 'fixed' };
      return { text: part, type: 'plain' };
    });
  }, [text, flaggedPhrases, fixedPhrases]);

  return (
    <p style={{ fontSize: '13.5px', lineHeight: 1.65, color: 'var(--text-secondary)' }}>
      {tokens.map((tok, i) => {
        if (tok.type === 'flagged') {
          return (
            <span key={i} className="sb-diff-removed">
              {tok.text}
            </span>
          );
        }
        if (tok.type === 'fixed') {
          return (
            <span key={i} className="sb-ats-highlight">
              {tok.text}
            </span>
          );
        }
        return <span key={i}>{tok.text}</span>;
      })}
    </p>
  );
}

export default function SapConnectorPanel({ defaultTab = 'requisitions' }) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  // Job Requisition Sync & Bias Audit State
  const [syncing, setSyncing] = useState(false);
  const [syncMeta, setSyncMeta] = useState(null);
  const [requisitions, setRequisitions] = useState([]);
  const [fixedMap, setFixedMap] = useState({});
  const [pushedMap, setPushedMap] = useState({});
  const [pushingId, setPushingId] = useState('');

  // Skill Passport Export State
  const [selectedCandId, setSelectedCandId] = useState('priya');
  const [exporting, setExporting] = useState(false);
  const [exportedPassports, setExportedPassports] = useState({});
  const [copiedPayload, setCopiedPayload] = useState(false);

  const selectedCandidate =
    SKILL_PASSPORT_CANDIDATES.find((c) => c.id === selectedCandId) ||
    SKILL_PASSPORT_CANDIDATES[0];

  const activeExportResult = exportedPassports[selectedCandidate.id];
  const previewPayload = useMemo(
    () => activeExportResult?.payload || buildSkillPassportSapPayload(selectedCandidate),
    [activeExportResult, selectedCandidate],
  );

  const handleSyncRequisitions = async () => {
    setSyncing(true);
    try {
      const res = await fetchSapJobRequisitions();
      setSyncMeta({
        status: res.status,
        isLive: res.isLive,
        reason: res.reason,
        syncedAt: res.syncedAt,
      });
      setRequisitions(res.requisitions);
      setFixedMap({});
      setPushedMap({});
    } finally {
      setSyncing(false);
    }
  };

  const applyOneClickFix = (jobReqId, finding) => {
    setRequisitions((prev) =>
      prev.map((req) => {
        if (req.jobReqId !== jobReqId) return req;
        const escaped = finding.phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const nextDesc = req.externalJobDesc.replace(
          new RegExp(escaped, 'gi'),
          finding.replacement,
        );
        const updatedReq = { ...req, externalJobDesc: nextDesc };
        return {
          ...updatedReq,
          audit: runBiasAuditOnRequisition(updatedReq),
        };
      }),
    );

    setFixedMap((prev) => ({
      ...prev,
      [jobReqId]: [...(prev[jobReqId] || []), finding.replacement],
    }));
  };

  const applyAllFixesForReq = (req) => {
    let nextDesc = req.externalJobDesc;
    const replacements = [];

    for (const finding of req.audit.findings) {
      const escaped = finding.phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      nextDesc = nextDesc.replace(new RegExp(escaped, 'gi'), finding.replacement);
      replacements.push(finding.replacement);
    }

    setRequisitions((prev) =>
      prev.map((item) => {
        if (item.jobReqId !== req.jobReqId) return item;
        const updatedReq = { ...item, externalJobDesc: nextDesc };
        return {
          ...updatedReq,
          audit: runBiasAuditOnRequisition(updatedReq),
        };
      }),
    );

    setFixedMap((prev) => ({
      ...prev,
      [req.jobReqId]: [...(prev[req.jobReqId] || []), ...replacements],
    }));
  };

  const handlePushToSap = async (req) => {
    setPushingId(req.jobReqId);
    try {
      const res = await pushAuditedRequisitionToSap({
        ...req,
        inclusivityScore: req.audit.inclusivityScore,
      });
      setPushedMap((prev) => ({
        ...prev,
        [req.jobReqId]: res,
      }));
    } finally {
      setPushingId('');
    }
  };

  const handleExportPassport = async () => {
    setExporting(true);
    try {
      const res = await exportSkillPassportToSap(selectedCandidate);
      setExportedPassports((prev) => ({
        ...prev,
        [selectedCandidate.id]: res,
      }));
      setSyncMeta((prev) => ({
        status: res.status,
        isLive: res.isLive,
        reason: prev?.reason,
        syncedAt: new Date().toISOString(),
      }));
    } finally {
      setExporting(false);
    }
  };

  const handleCopyPayload = () => {
    navigator.clipboard?.writeText(JSON.stringify(previewPayload, null, 2));
    setCopiedPayload(true);
    setTimeout(() => setCopiedPayload(false), 1800);
  };

  return (
    <div className="sb-card" style={{ padding: '26px', display: 'grid', gap: '20px' }}>
      {/* Connector Header */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '14px',
          paddingBottom: '16px',
          borderBottom: '1px solid var(--border-light)',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <Badge tone="navy">
              <Database size={12} /> SAP SuccessFactors Connector
            </Badge>
            {syncMeta ? (
              <Badge tone={syncMeta.isLive ? 'success' : 'yellow'}>
                {syncMeta.status}
              </Badge>
            ) : (
              <Badge tone="lavender">OData v2 Ready</Badge>
            )}
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: 800, marginTop: '8px' }}>
            Live SAP Job Requisition Bias Audit & Skill Passport Sync
          </h3>
          <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Pull open requisitions from SAP SuccessFactors, clear returner-exclusionary wording in
            one click, and export verified Skill Passports.
          </p>
        </div>

        {/* Mode Switcher */}
        <div
          style={{
            display: 'inline-flex',
            background: 'var(--surface-subtle)',
            padding: '4px',
            borderRadius: '12px',
            border: '1px solid var(--border-light)',
          }}
          role="tablist"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'requisitions'}
            onClick={() => setActiveTab('requisitions')}
            style={{
              border: 'none',
              padding: '8px 14px',
              borderRadius: '9px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              background: activeTab === 'requisitions' ? 'var(--white)' : 'transparent',
              color: activeTab === 'requisitions' ? 'var(--purple-700)' : 'var(--text-muted)',
              boxShadow: activeTab === 'requisitions' ? 'var(--shadow-xs)' : 'none',
            }}
          >
            Requisition Bias Audit
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'passport'}
            onClick={() => setActiveTab('passport')}
            style={{
              border: 'none',
              padding: '8px 14px',
              borderRadius: '9px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              background: activeTab === 'passport' ? 'var(--white)' : 'transparent',
              color: activeTab === 'passport' ? 'var(--purple-700)' : 'var(--text-muted)',
              boxShadow: activeTab === 'passport' ? 'var(--shadow-xs)' : 'none',
            }}
          >
            Skill Passport Export
          </button>
        </div>
      </div>

      {activeTab === 'requisitions' && (
        <div style={{ display: 'grid', gap: '18px' }}>
          <div
            className="sb-card-lavender"
            style={{
              padding: '18px 20px',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '14px',
            }}
          >
            <div style={{ maxWidth: '620px' }}>
              <div style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--navy-900)' }}>
                Step 1 · Pull Top 5 SAP SuccessFactors OData JobRequisitions
              </div>
              <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginTop: '3px' }}>
                {syncMeta?.reason ||
                  'Connects to sandbox.api.sap.com/successfactors/odata/v2/JobRequisition with automatic resilient fallback.'}
              </div>
            </div>

            <Button variant="primary" size="md" onClick={handleSyncRequisitions} disabled={syncing}>
              <RefreshCw size={15} />
              {syncing ? 'Syncing SAP Sandbox...' : 'Sync Live SAP Job Requisitions'}
            </Button>
          </div>

          {requisitions.length === 0 ? (
            <div
              style={{
                padding: '28px',
                borderRadius: 'var(--radius-md)',
                border: '1px dashed var(--border-lavender)',
                background: '#FFFDF8',
                textAlign: 'center',
              }}
            >
              <ShieldCheck size={28} color="var(--purple-600)" style={{ margin: '0 auto 10px' }} />
              <div style={{ fontWeight: 700, fontSize: '15px' }}>
                Ready to Audit Live SAP Requisitions
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
                Click <strong>“Sync Live SAP Job Requisitions”</strong> above to fetch roles and run
                our Bias Audit Agent.
              </p>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '16px' }}>
              {requisitions.map((req) => {
                const findings = req.audit?.findings || [];
                const flaggedPhrases = findings.map((f) => f.phrase);
                const fixedPhrases = fixedMap[req.jobReqId] || [];
                const pushResult = pushedMap[req.jobReqId];
                const isClean = findings.length === 0;

                return (
                  <div
                    key={req.jobReqId}
                    className="sb-card sb-animate-swap"
                    style={{
                      padding: '20px',
                      borderColor: isClean
                        ? 'rgba(5, 150, 105, 0.28)'
                        : 'rgba(245, 158, 11, 0.35)',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        gap: '12px',
                        marginBottom: '12px',
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                          <Badge tone="neutral">{req.jobReqId}</Badge>
                          <span style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--purple-600)' }}>
                            {req.department}
                          </span>
                          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                            · {req.location}
                          </span>
                        </div>
                        <h4 style={{ fontSize: '17px', fontWeight: 700, marginTop: '6px' }}>
                          {req.defaultJobTitle}
                        </h4>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <Badge tone={isClean ? 'success' : 'warning'}>
                          Inclusivity: {req.audit.inclusivityScore}%
                        </Badge>
                        {pushResult && (
                          <Badge tone="success">
                            <CheckCircle2 size={12} /> {pushResult.confirmationBadge}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="sb-diff-panel sb-diff-after" style={{ marginBottom: '12px' }}>
                      <HighlightedRequisitionDesc
                        text={req.externalJobDesc}
                        flaggedPhrases={flaggedPhrases}
                        fixedPhrases={fixedPhrases}
                      />
                    </div>

                    {findings.length > 0 ? (
                      <div style={{ display: 'grid', gap: '10px' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '12px', fontWeight: 700, color: '#B45309', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                            <AlertTriangle size={14} /> {findings.length} biased phrase
                            {findings.length > 1 ? 's' : ''} detected by Bias Audit Agent
                          </span>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => applyAllFixesForReq(req)}
                          >
                            <Wand2 size={13} /> Fix All Bias Flags
                          </Button>
                        </div>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                          {findings.map((finding) => (
                            <button
                              key={finding.id}
                              type="button"
                              onClick={() => applyOneClickFix(req.jobReqId, finding)}
                              title={finding.reason}
                              style={{
                                padding: '7px 12px',
                                borderRadius: '10px',
                                border: '1px solid rgba(236, 72, 153, 0.28)',
                                background: '#FFF5F8',
                                color: 'var(--purple-700)',
                                fontSize: '12px',
                                fontWeight: 600,
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                              }}
                            >
                              <Sparkles size={12} />
                              <span>
                                Fix “{finding.phrase}” → “{finding.replacement}”
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                        <span style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--success-600)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                          <CheckCircle2 size={15} /> Bias Audit Cleared — Ready to sync back to SAP
                        </span>
                        <Button
                          variant={pushResult ? 'secondary' : 'primary'}
                          size="sm"
                          disabled={pushingId === req.jobReqId}
                          onClick={() => handlePushToSap(req)}
                        >
                          <CloudUpload size={14} />
                          {pushingId === req.jobReqId
                            ? 'Pushing to SAP...'
                            : pushResult
                              ? `Synced (${pushResult.confirmationBadge})`
                              : 'Push Audited Role to SAP'}
                        </Button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {activeTab === 'passport' && (
        <div style={{ display: 'grid', gap: '18px' }}>
          {/* Candidate Selector: Priya, Rajesh, Kabir */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
            {SKILL_PASSPORT_CANDIDATES.map((cand) => {
              const selected = cand.id === selectedCandidate.id;
              const exported = exportedPassports[cand.id];
              return (
                <button
                  key={cand.id}
                  type="button"
                  onClick={() => setSelectedCandId(cand.id)}
                  className="sb-card"
                  style={{
                    textAlign: 'left',
                    padding: '16px',
                    cursor: 'pointer',
                    borderColor: selected ? 'var(--purple-600)' : 'var(--border-light)',
                    background: selected
                      ? 'linear-gradient(145deg, #FFF5F8 0%, #FEF9C3 100%)'
                      : 'var(--white)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <ReturnerAvatar variant={cand.avatar} size={40} />
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '14.5px' }}>
                          {cand.firstName} {cand.lastName}
                        </div>
                        <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>
                          {cand.candidateId}
                        </div>
                      </div>
                    </div>
                    {exported ? (
                      <Badge tone="success">{exported.confirmationBadge}</Badge>
                    ) : (
                      <Badge tone="lavender">{cand.readinessScore}%</Badge>
                    )}
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '10px', lineHeight: 1.45 }}>
                    {cand.headline}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Export Action & Payload Preview */}
          <div
            className="sb-card-navy"
            style={{
              padding: '22px',
              display: 'grid',
              gap: '14px',
            }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#FDE68A', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <Code2 size={14} /> SAP OData v2 Skill Passport Payload · {selectedCandidate.firstName}{' '}
                    {selectedCandidate.lastName}
                  </span>
                  {activeExportResult && (
                    <Badge tone="success">
                      <CheckCircle2 size={12} /> {activeExportResult.confirmationBadge}
                    </Badge>
                  )}
                </div>
                <p style={{ fontSize: '12.5px', color: 'var(--text-on-dark-muted)', marginTop: '4px' }}>
                  {selectedCandidate.reverseMentorshipPair}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <Button variant="outline" size="sm" onClick={handleCopyPayload}>
                  {copiedPayload ? <Check size={14} /> : <Copy size={14} />}
                  {copiedPayload ? 'Copied JSON' : 'Copy JSON'}
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleExportPassport}
                  disabled={exporting}
                >
                  <CloudUpload size={15} />
                  {exporting
                    ? 'Exporting...'
                    : 'Export Skill Passport to SAP SuccessFactors'}
                </Button>
              </div>
            </div>

            <pre
              style={{
                margin: 0,
                padding: '16px',
                borderRadius: '12px',
                background: 'rgba(0, 0, 0, 0.34)',
                border: '1px solid rgba(253, 230, 138, 0.22)',
                color: '#FFF9FB',
                fontSize: '12px',
                lineHeight: 1.55,
                overflowX: 'auto',
                maxHeight: '290px',
              }}
            >
              {JSON.stringify(previewPayload, null, 2)}
            </pre>

            {activeExportResult && (
              <div
                style={{
                  padding: '10px 14px',
                  borderRadius: '10px',
                  background: 'rgba(16, 185, 129, 0.16)',
                  border: '1px solid rgba(110, 231, 183, 0.35)',
                  color: '#6EE7B7',
                  fontSize: '13px',
                  fontWeight: 600,
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span>
                  ✓ Exported {selectedCandidate.firstName}’s verified Skill Passport ({activeExportResult.status})
                </span>
                <span>Confirmation Badge: {activeExportResult.confirmationBadge}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
