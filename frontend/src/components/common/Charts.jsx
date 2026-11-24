import { useId, useState } from 'react';

/**
 * Interactive 6-Week Readiness & Confidence Trajectory Area Chart
 */
export function ReadinessTrajectoryChart({ currentScore = 84, height = 210 }) {
  const gradPink = useId();
  const gradYellow = useId();
  const [hoveredIdx, setHoveredIdx] = useState(5);

  const delta = currentScore - 84;
  const points = [
    { week: 'Wk 1', readiness: Math.max(42, 54 + Math.round(delta * 0.4)), confidence: 50 },
    { week: 'Wk 2', readiness: Math.max(48, 62 + Math.round(delta * 0.5)), confidence: 58 },
    { week: 'Wk 3', readiness: Math.max(54, 69 + Math.round(delta * 0.7)), confidence: 66 },
    { week: 'Wk 4', readiness: Math.max(60, 75 + Math.round(delta * 0.8)), confidence: 74 },
    { week: 'Wk 5', readiness: Math.max(65, 80 + Math.round(delta * 0.9)), confidence: 80 },
    { week: 'Wk 6', readiness: Math.min(98, currentScore), confidence: Math.min(96, currentScore - 2) },
  ];

  const width = 520;
  const padL = 34;
  const padR = 18;
  const padT = 18;
  const padB = 30;
  const plotW = width - padL - padR;
  const plotH = height - padT - padB;

  const getX = (i) => padL + (i / (points.length - 1)) * plotW;
  const getY = (val) => padT + ((100 - val) / 70) * plotH;

  const linePath = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${getX(i).toFixed(1)} ${getY(p.readiness).toFixed(1)}`)
    .join(' ');

  const areaPath = `${linePath} L ${getX(points.length - 1).toFixed(1)} ${(padT + plotH).toFixed(1)} L ${getX(0).toFixed(1)} ${(padT + plotH).toFixed(1)} Z`;

  const confPath = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${getX(i).toFixed(1)} ${getY(p.confidence).toFixed(1)}`)
    .join(' ');

  const activePoint = points[hoveredIdx] || points[points.length - 1];

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
        <div style={{ display: 'flex', gap: '14px', fontSize: '12px', fontWeight: 600 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#BE185D' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#E11D74' }} />
            Readiness ({activePoint.readiness}%)
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#B45309' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#F59E0B' }} />
            Confidence ({activePoint.confidence}%)
          </span>
        </div>
        <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)' }}>
          Selected: {activePoint.week}
        </span>
      </div>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}
        role="img"
        aria-label="6-week readiness and confidence trajectory chart"
      >
        <defs>
          <linearGradient id={gradPink} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F472B6" stopOpacity="0.38" />
            <stop offset="100%" stopColor="#FFEAF2" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id={gradYellow} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
        </defs>

        {[40, 60, 80, 100].map((tick) => {
          const y = getY(tick);
          return (
            <g key={tick}>
              <line
                x1={padL}
                y1={y}
                x2={width - padR}
                y2={y}
                stroke="rgba(47, 26, 51, 0.08)"
                strokeDasharray="4 4"
              />
              <text
                x={padL - 8}
                y={y + 4}
                textAnchor="end"
                fontSize="10.5"
                fill="#846A87"
                fontWeight="600"
              >
                {tick}%
              </text>
            </g>
          );
        })}

        <path d={areaPath} fill={`url(#${gradPink})`} />
        <path
          d={confPath}
          fill="none"
          stroke={`url(#${gradYellow})`}
          strokeWidth="2.5"
          strokeDasharray="5 4"
          strokeLinecap="round"
        />
        <path
          d={linePath}
          fill="none"
          stroke="#E11D74"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {points.map((pt, i) => {
          const x = getX(i);
          const yRead = getY(pt.readiness);
          const yConf = getY(pt.confidence);
          const active = hoveredIdx === i;
          return (
            <g
              key={pt.week}
              onMouseEnter={() => setHoveredIdx(i)}
              style={{ cursor: 'pointer' }}
            >
              {active && (
                <line
                  x1={x}
                  y1={padT}
                  x2={x}
                  y2={padT + plotH}
                  stroke="rgba(225, 29, 116, 0.22)"
                  strokeWidth="1.5"
                />
              )}
              <circle
                cx={x}
                cy={yConf}
                r={active ? 5 : 3.5}
                fill="#F59E0B"
                stroke="#FFFFFF"
                strokeWidth="1.8"
              />
              <circle
                cx={x}
                cy={yRead}
                r={active ? 6.5 : 4.5}
                fill="#E11D74"
                stroke="#FFFFFF"
                strokeWidth="2"
              />
              <text
                x={x}
                y={height - 8}
                textAnchor="middle"
                fontSize="11"
                fontWeight={active ? '700' : '500'}
                fill={active ? '#BE185D' : '#846A87'}
              >
                {pt.week}
              </text>
              <rect x={x - 24} y={padT} width={48} height={plotH} fill="transparent" />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/**
 * Pastel Grouped Bar Chart: Prior Foundation vs AI-Translated Readiness
 */
export function SkillBenchmarkChart({ items }) {
  const defaultItems = items || [
    { label: 'Domain Strategy', before: 74, after: 94 },
    { label: 'Stakeholder Ops', before: 68, after: 91 },
    { label: 'AI Workflows', before: 42, after: 82 },
    { label: 'Data & Metrics', before: 58, after: 86 },
    { label: 'Executive Pitch', before: 52, after: 88 },
  ];

  return (
    <div style={{ display: 'grid', gap: '12px' }}>
      <div style={{ display: 'flex', gap: '14px', fontSize: '12px', fontWeight: 600 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#92400E' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '3px', background: '#FDE68A', border: '1px solid #F59E0B' }} />
          Before Framing
        </span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#BE185D' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '3px', background: 'linear-gradient(135deg, #F472B6, #E11D74)' }} />
          SkillBack Translated
        </span>
      </div>

      {defaultItems.map((item) => (
        <div key={item.label} style={{ display: 'grid', gap: '5px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px' }}>
            <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{item.label}</span>
            <span className="tabular-nums" style={{ fontWeight: 700, color: '#BE185D' }}>
              {item.before}% → {item.after}%
            </span>
          </div>
          <div
            style={{
              position: 'relative',
              height: '12px',
              borderRadius: '999px',
              background: '#FFF5F8',
              border: '1px solid rgba(236, 72, 153, 0.14)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: `${item.after}%`,
                background: 'linear-gradient(90deg, #FBBF24 0%, #F472B6 55%, #E11D74 100%)',
                borderRadius: '999px',
                transition: 'width 400ms var(--ease-out)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: `${item.before}%`,
                background: 'rgba(254, 240, 138, 0.85)',
                borderRight: '2px solid #FFFFFF',
                borderRadius: '999px 0 0 999px',
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Pastel Donut Chart: Weekly Return Focus Allocation
 */
export function WeeklyAllocationDonutChart() {
  const segments = [
    { id: 'narrative', label: 'Resume & Narrative', pct: 25, hours: '1.5h', color: '#F472B6' },
    { id: 'skills', label: 'Skill Refresher Sprints', pct: 35, hours: '2.1h', color: '#FBBF24' },
    { id: 'voice', label: 'Voice Interview Prep', pct: 20, hours: '1.2h', color: '#FB923C' },
    { id: 'jobs', label: 'Returnship Outreach', pct: 20, hours: '1.2h', color: '#34D399' },
  ];

  const [activeId, setActiveId] = useState('skills');
  const active = segments.find((s) => s.id === activeId) || segments[1];

  const size = 148;
  const strokeWidth = 22;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const renderedSegments = segments.reduce((acc, seg) => {
    const prevCumulative = acc.length ? acc[acc.length - 1].endPct : 0;
    const endPct = prevCumulative + seg.pct;
    acc.push({
      ...seg,
      startPct: prevCumulative,
      endPct,
    });
    return acc;
  }, []);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '20px' }}>
      <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          {renderedSegments.map((seg) => {
            const dash = (seg.pct / 100) * circumference;
            const offset = -(seg.startPct / 100) * circumference;
            const isSelected = seg.id === activeId;
            return (
              <circle
                key={seg.id}
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke={seg.color}
                strokeWidth={isSelected ? strokeWidth + 4 : strokeWidth}
                strokeDasharray={`${dash} ${circumference}`}
                strokeDashoffset={offset}
                style={{ cursor: 'pointer', transition: 'stroke-width 180ms ease' }}
                onMouseEnter={() => setActiveId(seg.id)}
                onClick={() => setActiveId(seg.id)}
              />
            );
          })}
        </svg>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            pointerEvents: 'none',
          }}
        >
          <span className="tabular-nums" style={{ fontSize: '20px', fontWeight: 800, fontFamily: 'var(--font-display)', color: 'var(--navy-900)' }}>
            {active.hours}
          </span>
          <span style={{ fontSize: '10.5px', fontWeight: 700, color: 'var(--text-muted)' }}>
            {active.pct}% / wk
          </span>
        </div>
      </div>

      <div style={{ flex: 1, minWidth: '170px', display: 'grid', gap: '8px' }}>
        {segments.map((seg) => {
          const isSelected = seg.id === activeId;
          return (
            <button
              key={seg.id}
              type="button"
              onMouseEnter={() => setActiveId(seg.id)}
              onClick={() => setActiveId(seg.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '7px 10px',
                borderRadius: '10px',
                border: isSelected ? '1px solid rgba(236, 72, 153, 0.28)' : '1px solid transparent',
                background: isSelected ? '#FFF5F8' : 'transparent',
                cursor: 'pointer',
                fontSize: '12.5px',
              }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontWeight: 600, color: 'var(--text-primary)' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: seg.color }} />
                {seg.label}
              </span>
              <span className="tabular-nums" style={{ fontWeight: 700, color: 'var(--text-muted)' }}>
                {seg.pct}%
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
