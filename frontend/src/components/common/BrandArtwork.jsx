const AVATAR_PALETTES = {
  rajesh: {
    bgStart: '#FAF5F3',
    bgEnd: '#F1DCE2',
    hair: '#4A3A42',
    skin: '#DFA984',
    top: '#271B21',
    ring: 'rgba(160, 71, 100, 0.28)',
    style: 'male_senior',
  },
  meera: {
    bgStart: '#F8ECEF',
    bgEnd: '#F6EFE9',
    hair: '#271B21',
    skin: '#E6B494',
    top: '#A04764',
    ring: 'rgba(160, 71, 100, 0.3)',
    style: 'female_long',
  },
  arjun: {
    bgStart: '#F6EFE9',
    bgEnd: '#F1DCE2',
    hair: '#21171C',
    skin: '#D99E78',
    top: '#843650',
    ring: 'rgba(160, 71, 100, 0.28)',
    style: 'male_short',
  },
  vikram: {
    bgStart: '#FAF7F5',
    bgEnd: '#EBD8D0',
    hair: '#271B21',
    skin: '#D79D78',
    top: '#37262E',
    ring: 'rgba(160, 71, 100, 0.25)',
    style: 'male_short',
  },
  aarav: {
    bgStart: '#F8ECEF',
    bgEnd: '#FAF5F3',
    hair: '#21171C',
    skin: '#E4AF8B',
    top: '#B85D79',
    ring: 'rgba(184, 93, 121, 0.3)',
    style: 'male_short',
  },
  chloe: {
    bgStart: '#FCF9F6',
    bgEnd: '#F1DCE2',
    hair: '#5A3D35',
    skin: '#FCE0D0',
    top: '#664957',
    ring: 'rgba(160, 71, 100, 0.26)',
    style: 'female_bob',
  },
  zoya: {
    bgStart: '#FDF8F9',
    bgEnd: '#E5C2CC',
    hair: '#271B21',
    skin: '#EBBFA0',
    top: '#A04764',
    ring: 'rgba(160, 71, 100, 0.28)',
    style: 'female_long',
  },
  priya: {
    bgStart: '#F8ECEF',
    bgEnd: '#F6EFE9',
    hair: '#271B21',
    skin: '#E6B494',
    top: '#843650',
    ring: 'rgba(160, 71, 100, 0.3)',
    style: 'female_long',
  },
  kabir: {
    bgStart: '#FAF5F3',
    bgEnd: '#F1DCE2',
    hair: '#21171C',
    skin: '#D9A07B',
    top: '#A04764',
    ring: 'rgba(160, 71, 100, 0.28)',
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
              <circle cx="21" cy="22.5" r="2.5" stroke="#271B21" strokeWidth="1.2" fill="none" />
              <circle cx="27" cy="22.5" r="2.5" stroke="#271B21" strokeWidth="1.2" fill="none" />
              <path d="M23.5 22.5H24.5" stroke="#271B21" strokeWidth="1.2" />
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
        <rect width="36" height="36" rx="10" fill="#F8ECEF" />
        <path
          d="M10 12.5L18 24.5L26 12.5"
          stroke="#A04764"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="18" cy="12" r="2.1" fill="#4C3540" />
      </svg>
    );
  }

  if (key.includes('lumina')) {
    return (
      <svg width={size} height={size} viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <rect width="36" height="36" rx="10" fill="#F6EFE9" />
        <circle cx="18" cy="18" r="6.5" stroke="#843650" strokeWidth="2.3" />
        <path d="M18 8V11M18 25V28M8 18H11M25 18H28" stroke="#B85D79" strokeWidth="2.1" strokeLinecap="round" />
      </svg>
    );
  }

  if (key.includes('northstar')) {
    return (
      <svg width={size} height={size} viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <rect width="36" height="36" rx="10" fill="#F9EFF2" />
        <path
          d="M18 8L20.7 15.3L28 18L20.7 20.7L18 28L15.3 20.7L8 18L15.3 15.3L18 8Z"
          fill="#A04764"
        />
      </svg>
    );
  }

  if (key.includes('aurelia')) {
    return (
      <svg width={size} height={size} viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <rect width="36" height="36" rx="10" fill="#F5EFEC" />
        <rect x="10" y="10" width="7" height="7" rx="2" fill="#A04764" />
        <rect x="19" y="10" width="7" height="7" rx="2" fill="#E5C2CC" />
        <rect x="10" y="19" width="7" height="7" rx="2" fill="#E5C2CC" />
        <rect x="19" y="19" width="7" height="7" rx="2" fill="#4C3540" />
      </svg>
    );
  }

  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none" aria-hidden="true">
      <rect width="36" height="36" rx="10" fill="#F8ECEF" />
      <path d="M11 22C11 17.5817 14.5817 14 19 14H25" stroke="#A04764" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="24" cy="21" r="2.8" fill="#4C3540" />
    </svg>
  );
}
