export default function Logo({ light = false, size = 'md', showTagline = false }) {
  const iconSize = size === 'sm' ? 30 : size === 'lg' ? 42 : 36;
  const textColor = light ? '#FCF8F9' : '#21171C';
  const subColor = light ? '#E5CFD6' : '#7D6B73';

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect
          width="36"
          height="36"
          rx="10"
          fill={light ? 'rgba(229, 194, 204, 0.16)' : '#271B21'}
          stroke={light ? 'rgba(241, 220, 226, 0.36)' : 'none'}
        />
        <path
          d="M10.5 22.5C10.5 18.634 13.634 15.5 17.5 15.5H24.5"
          stroke="#F8ECEF"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M20.8 11.5L25 15.5L20.8 19.5"
          stroke="#D19AA9"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="23.5" r="2.4" fill="#F1DCE2" />
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            fontSize: size === 'sm' ? '17px' : size === 'lg' ? '22px' : '19px',
            letterSpacing: '-0.03em',
            color: textColor,
          }}
        >
          Skill<span style={{ color: light ? '#E5C2CC' : '#A04764' }}>Back</span>
        </span>
        {showTagline && (
          <span
            style={{
              fontSize: '11px',
              fontWeight: 500,
              color: subColor,
              marginTop: '2px',
            }}
          >
            Your Experience Never Goes Out of Style.
          </span>
        )}
      </div>
    </div>
  );
}
