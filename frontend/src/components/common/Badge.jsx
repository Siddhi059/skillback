const TONE_STYLES = {
  lavender: {
    background: 'linear-gradient(135deg, #FDF8F9 0%, #F8ECEF 100%)',
    color: '#843650',
    border: '1px solid rgba(160, 71, 100, 0.2)',
  },
  yellow: {
    background: '#FAF5F3',
    color: '#53444B',
    border: '1px solid rgba(184, 139, 130, 0.28)',
  },
  navy: {
    background: 'var(--navy-900)',
    color: '#FCF8F9',
    border: '1px solid rgba(229, 194, 204, 0.28)',
  },
  success: {
    background: '#EEF7F4',
    color: '#1F6F5B',
    border: '1px solid rgba(31, 111, 91, 0.18)',
  },
  warning: {
    background: '#FBF3EF',
    color: '#9F5842',
    border: '1px solid rgba(159, 88, 66, 0.22)',
  },
  neutral: {
    background: '#F7F1EF',
    color: 'var(--text-secondary)',
    border: '1px solid var(--border-light)',
  },
};

export default function Badge({ children, tone = 'lavender', style = {} }) {
  const palette = TONE_STYLES[tone] || TONE_STYLES.lavender;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '4px 10px',
        borderRadius: 'var(--radius-full)',
        fontSize: '12px',
        fontWeight: 600,
        lineHeight: 1.3,
        ...palette,
        ...style,
      }}
    >
      {children}
    </span>
  );
}
