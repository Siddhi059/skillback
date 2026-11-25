const AVATAR_PALETTES = {
  rajesh: {
    bgStart: '#FEF3C7',
    bgEnd: '#FBCFE8',
    hair: '#4A3A4D',
    skin: '#DFA984',
    top: '#2F1A33',
    ring: 'rgba(245, 158, 11, 0.45)',
    style: 'male_senior',
  },
  meera: {
    bgStart: '#FFEAF2',
    bgEnd: '#FDE68A',
    hair: '#2B182E',
    skin: '#E6B494',
    top: '#E11D74',
    ring: 'rgba(236, 72, 153, 0.4)',
    style: 'female_long',
  },
  arjun: {
    bgStart: '#FFEDD5',
    bgEnd: '#FDE68A',
    hair: '#241726',
    skin: '#D99E78',
    top: '#BE185D',
    ring: 'rgba(245, 158, 11, 0.45)',
    style: 'male_short',
  },
  vikram: {
    bgStart: '#FEF9C3',
    bgEnd: '#FBCFE8',
    hair: '#2B182E',
    skin: '#D79D78',
    top: '#412546',
    ring: 'rgba(236, 72, 153, 0.35)',
    style: 'male_short',
  },
  aarav: {
    bgStart: '#FFEAF2',
    bgEnd: '#FED7AA',
    hair: '#1F1422',
    skin: '#E4AF8B',
    top: '#F43F8E',
    ring: 'rgba(244, 114, 182, 0.45)',
    style: 'male_short',
  },
  chloe: {
    bgStart: '#FEF3C7',
    bgEnd: '#F9A8D4',
    hair: '#5A3825',
    skin: '#FCE0D0',
    top: '#D97706',
    ring: 'rgba(245, 158, 11, 0.4)',
    style: 'female_bob',
  },
  zoya: {
    bgStart: '#FFF1F5',
    bgEnd: '#FDE68A',
    hair: '#2B182E',
    skin: '#EBBFA0',
    top: '#E11D74',
    ring: 'rgba(236, 72, 153, 0.4)',
    style: 'female_long',
  },
  priya: {
    bgStart: '#FFEAF2',
    bgEnd: '#FED7AA',
    hair: '#2B182E',
    skin: '#E6B494',
    top: '#BE185D',
    ring: 'rgba(245, 158, 11, 0.45)',
    style: 'female_long',
  },
  kabir: {
    bgStart: '#FEF3C7',
    bgEnd: '#FBCFE8',
    hair: '#241726',
    skin: '#D9A07B',
    top: '#E11D74',
    ring: 'rgba(236, 72, 153, 0.42)',
    style: 'male_short',
  },
};

export function ReturnerAvatar({ variant = 'meera', size = 44 }) {
  const p = AVATAR_PALETTES[variant] || AVATAR_PALETTES.meera;
  const gradId = `sbAvatarGrad-${variant}-${size}`;
  const isMale = p.style.startsWith('male');
  const isSenior = p.style === 'male_senior';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{
        borderRadius: '50%',
        boxShadow: `0 0 0 2px ${p.ring}`,
        flexShrink: 0,
      }}
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={p.bgStart} />
          <stop offset="100%" stopColor={p.bgEnd} />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="24" fill={`url(#${gradId})`} />

      {!isMale && (
        <path
          d={
            p.style === 'female_bob'
              ? 'M14 23C14 16 18.5 11.5 24 11.5C29.5 11.5 34 16 34 23V27H14V23Z'
              : 'M13.5 24C13.5 16.5 18.2 11.5 24 11.5C29.8 11.5 34.5 16.5 34.5 24V32.5H13.5V24Z'
          }
          fill={p.hair}
        />
      )}

      {/* Shoulders */}
      <path d="M10 45C11.6 37.5 17.1 34 24 34C30.9 34 36.4 37.5 38 45H10Z" fill={p.top} />
      <rect x="21" y="28" width="6" height="7" rx="3" fill={p.skin} />
      <circle cx="24" cy="22.5" r="7.2" fill={p.skin} />

      {isMale ? (
        <>
          <path
            d="M16.6 20.5C16.8 15.8 19.9 13.5 24 13.5C28.1 13.5 31.2 15.8 31.4 20.5C29.6 18.2 27.1 17.4 24 17.4C20.9 17.4 18.4 18.2 16.6 20.5Z"
            fill={p.hair}
          />
          {isSenior && (
            <>
              {/* Subtle glasses for retired senior engineer */}
              <circle cx="21" cy="22.5" r="2.5" stroke="#2B182E" strokeWidth="1.2" fill="none" />
              <circle cx="27" cy="22.5" r="2.5" stroke="#2B182E" strokeWidth="1.2" fill="none" />
              <path d="M23.5 22.5H24.5" stroke="#2B182E" strokeWidth="1.2" />
            </>
          )}
        </>
      ) : (
        <path
          d="M16.8 21.5C17.4 17.2 20.5 14.8 24.4 14.8C28.1 14.8 30.8 17.1 31.2 20.6C28.6 19.6 26.2 18.2 24.2 17.2C22 18.9 19.4 20.4 16.8 21.5Z"
          fill={p.hair}
        />
      )}
    </svg>
  );
}

export function PartnerLogoMark({ company = 'Veridian Pay', size = 34 }) {
  const key = company.toLowerCase();

  if (key.includes('veridian')) {
    return (
      <svg width={size} height={size} viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <rect width="36" height="36" rx="10" fill="#FFEAF2" />
        <path
          d="M10 12.5L18 24.5L26 12.5"
          stroke="#E11D74"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="18" cy="12" r="2.2" fill="#F59E0B" />
      </svg>
    );
  }

  if (key.includes('lumina')) {
    return (
      <svg width={size} height={size} viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <rect width="36" height="36" rx="10" fill="#FEF3C7" />
        <circle cx="18" cy="18" r="6.5" stroke="#D97706" strokeWidth="2.4" />
        <path d="M18 8V11M18 25V28M8 18H11M25 18H28" stroke="#F43F8E" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    );
  }

  if (key.includes('northstar')) {
    return (
      <svg width={size} height={size} viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <rect width="36" height="36" rx="10" fill="#FFF1F5" />
        <path
          d="M18 8L20.7 15.3L28 18L20.7 20.7L18 28L15.3 20.7L8 18L15.3 15.3L18 8Z"
          fill="#EC4899"
        />
      </svg>
    );
  }

  if (key.includes('aurelia')) {
    return (
      <svg width={size} height={size} viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <rect width="36" height="36" rx="10" fill="#FFEDD5" />
        <rect x="10" y="10" width="7" height="7" rx="2" fill="#E11D74" />
        <rect x="19" y="10" width="7" height="7" rx="2" fill="#FBBF24" />
        <rect x="10" y="19" width="7" height="7" rx="2" fill="#FBBF24" />
        <rect x="19" y="19" width="7" height="7" rx="2" fill="#E11D74" />
      </svg>
    );
  }

  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <rect width="36" height="36" rx="10" fill="#FEF9C3" />
      <path d="M11 22C11 17.5817 14.5817 14 19 14H25" stroke="#E11D74" strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="24" cy="21" r="3" fill="#F59E0B" />
    </svg>
  );
}
