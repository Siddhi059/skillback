import { useId } from 'react';

export default function ProgressRing({
  value = 78,
  size = 88,
  strokeWidth = 8,
  label = 'Ready',
  dark = false,
}) {
  const gradId = useId();
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, value));
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={dark ? 'rgba(255,255,255,0.16)' : '#FFE4EC'}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 500ms var(--ease-out)' }}
        />
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="55%" stopColor="#F472B6" />
            <stop offset="100%" stopColor="#E11D74" />
          </linearGradient>
        </defs>
      </svg>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          className="tabular-nums"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: size >= 84 ? '20px' : '15px',
            color: dark ? '#FFFFFF' : 'var(--text-primary)',
            lineHeight: 1,
          }}
        >
          {clamped}%
        </span>
        {label && (
          <span
            style={{
              fontSize: '10px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              color: dark ? '#FDE68A' : 'var(--text-muted)',
              marginTop: '3px',
            }}
          >
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
