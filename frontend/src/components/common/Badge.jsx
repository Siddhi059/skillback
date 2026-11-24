const TONE_STYLES = {
  lavender: {
    background: 'linear-gradient(135deg, #FFF1F5 0%, #FEF9C3 100%)',
    color: '#BE185D',
    border: '1px solid rgba(236, 72, 153, 0.24)',
  },
  yellow: {
    background: '#FEF3C7',
    color: '#92400E',
    border: '1px solid rgba(245, 158, 11, 0.3)',
  },
  navy: {
    background: 'var(--navy-900)',
    color: '#FFF9FB',
    border: '1px solid rgba(255, 179, 207, 0.3)',
  },
  success: {
    background: '#ECFDF5',
    color: '#047857',
    border: '1px solid rgba(5, 150, 105, 0.2)',
  },
  warning: {
    background: '#FEFCE8',
    color: '#B45309',
    border: '1px solid rgba(245, 158, 11, 0.28)',
  },
  neutral: {
    background: '#FFF8EB',
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
