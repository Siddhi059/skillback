import './Button.css';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      className={`sb-btn sb-btn-${variant} sb-btn-${size} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}
