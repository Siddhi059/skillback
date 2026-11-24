/**
 * Hand-drawn style cute SVG drawings, doodles, and animated accents
 * tailored to SkillBack's sunny yellow, rose pink, and pastel palette.
 */

export function DoodleUnderline({ width = 260 }) {
  return (
    <svg
      width={width}
      height="16"
      viewBox="0 0 260 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ display: 'block', maxWidth: '100%', marginTop: '2px' }}
    >
      <path
        d="M3 10.5C48 3.5 118 2.2 184 6.5C216 8.6 242 6.8 257 4.5"
        stroke="#FBBF24"
        strokeWidth="4.5"
        strokeLinecap="round"
        className="sb-doodle-draw"
      />
      <path
        d="M14 13.5C68 8.2 140 7.5 236 10.2"
        stroke="#F472B6"
        strokeWidth="2.4"
        strokeLinecap="round"
        className="sb-doodle-draw"
      />
    </svg>
  );
}

export function DoodleSparkle({ size = 28, color = '#FBBF24', style = {} }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className="sb-doodle-twinkle"
      style={style}
    >
      <path
        d="M16 3C16.9 10.2 21.8 15.1 29 16C21.8 16.9 16.9 21.8 16 29C15.1 21.8 10.2 16.9 3 16C10.2 15.1 15.1 10.2 16 3Z"
        fill={color}
        stroke="#2B182E"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DoodlePaperPlane({ size = 44, style = {} }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 56 56"
      fill="none"
      aria-hidden="true"
      className="sb-doodle-plane"
      style={style}
    >
      <path
        d="M6 39C12 43 20 43 25 38"
        stroke="#F472B6"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="4 4"
      />
      <path
        d="M10 24L47 11L35 44L27 31L10 24Z"
        fill="#FEF3C7"
        stroke="#2B182E"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <path d="M47 11L27 31L27 41L32 35" stroke="#E11D74" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function DoodleSunnyBuddy({ size = 56, style = {} }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      className="sb-doodle-float sb-doodle-hover"
      style={style}
    >
      {/* Rays */}
      <path
        d="M32 5V10M32 54V59M5 32H10M54 32H59M13 13L16.5 16.5M47.5 47.5L51 51M51 13L47.5 16.5M16.5 47.5L13 51"
        stroke="#F59E0B"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <circle cx="32" cy="32" r="16" fill="#FDE68A" stroke="#2B182E" strokeWidth="2.2" />
      {/* Rosy cheeks */}
      <circle cx="24.5" cy="34" r="2.6" fill="#F472B6" opacity="0.7" />
      <circle cx="39.5" cy="34" r="2.6" fill="#F472B6" opacity="0.7" />
      {/* Cute eyes & smile */}
      <circle cx="26.5" cy="30" r="1.8" fill="#2B182E" />
      <circle cx="37.5" cy="30" r="1.8" fill="#2B182E" />
      <path d="M28.5 35.5C30 37.8 34 37.8 35.5 35.5" stroke="#2B182E" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function DoodleCoffeeNotebook({ size = 76, style = {} }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 84 84"
      fill="none"
      aria-hidden="true"
      className="sb-doodle-hover"
      style={style}
    >
      {/* Notebook */}
      <rect x="10" y="22" width="44" height="52" rx="9" fill="#FFEAF2" stroke="#2B182E" strokeWidth="2.2" />
      <path d="M18 35H44M18 44H40M18 53H35" stroke="#E11D74" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="10" cy="32" r="2.5" fill="#FBBF24" stroke="#2B182E" strokeWidth="1.6" />
      <circle cx="10" cy="46" r="2.5" fill="#FBBF24" stroke="#2B182E" strokeWidth="1.6" />
      <circle cx="10" cy="60" r="2.5" fill="#FBBF24" stroke="#2B182E" strokeWidth="1.6" />

      {/* Cute Coffee Mug */}
      <g className="sb-doodle-steam">
        <path d="M58 28C57 25 60 23 59 19" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
        <path d="M66 28C65 25 68 23 67 19" stroke="#F472B6" strokeWidth="2" strokeLinecap="round" />
      </g>
      <path
        d="M50 37H73V55C73 61.0751 68.0751 66 62 66H61C54.9249 66 50 61.0751 50 55V37Z"
        fill="#FEF3C7"
        stroke="#2B182E"
        strokeWidth="2.2"
      />
      <path d="M73 42H76.5C78.9853 42 81 44.0147 81 46.5V48.5C81 50.9853 78.9853 53 76.5 53H73" stroke="#2B182E" strokeWidth="2.2" />
      {/* Mug smiley */}
      <circle cx="58" cy="49" r="1.4" fill="#2B182E" />
      <circle cx="65.5" cy="49" r="1.4" fill="#2B182E" />
      <path d="M59.5 53.5C60.8 55 62.7 55 64 53.5" stroke="#2B182E" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function HeroComebackDrawing() {
  return (
    <svg
      viewBox="0 0 420 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Illustration of a woman restarting her career with floating doodles and blooming stars"
      style={{ width: '100%', maxWidth: '420px', height: 'auto', display: 'block' }}
    >
      {/* Soft Pastel Backdrop Blob */}
      <path
        d="M42 152C20 112 46 46 112 34C178 22 222 44 282 32C342 20 396 68 386 128C376 188 302 198 214 194C126 190 64 192 42 152Z"
        fill="#FFEAF2"
      />
      <path
        d="M84 166C66 130 92 78 158 68C224 58 286 78 334 62C368 50 384 114 358 154C332 194 252 192 184 190C116 188 102 202 84 166Z"
        fill="#FEF9C3"
        opacity="0.72"
      />

      {/* Floating Doodle Sparkles & Stars */}
      <g className="sb-doodle-twinkle">
        <path
          d="M66 56C67 62 71 66 77 67C71 68 67 72 66 78C65 72 61 68 55 67C61 66 65 62 66 56Z"
          fill="#FBBF24"
          stroke="#2B182E"
          strokeWidth="1.6"
        />
      </g>
      <g className="sb-doodle-twinkle" style={{ animationDelay: '0.8s' }}>
        <path
          d="M352 44C353 49 356 52 361 53C356 54 353 57 352 62C351 57 348 54 343 53C348 52 351 49 352 44Z"
          fill="#F472B6"
          stroke="#2B182E"
          strokeWidth="1.6"
        />
      </g>

      {/* Flying Paper Plane */}
      <g className="sb-doodle-plane">
        <path
          d="M276 66C296 72 314 66 328 54"
          stroke="#E11D74"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="4 4"
        />
        <path
          d="M322 36L354 28L340 56L333 44L322 36Z"
          fill="#FFFFFF"
          stroke="#2B182E"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </g>

      {/* Cute Blooming Flower Doodle */}
      <g className="sb-doodle-float">
        <path d="M98 168C98 152 100 138 100 128" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M100 148C90 144 86 136 92 132C98 128 100 138 100 148Z" fill="#A7F3D0" stroke="#2B182E" strokeWidth="1.6" />
        <circle cx="100" cy="116" r="6" fill="#F472B6" stroke="#2B182E" strokeWidth="1.6" />
        <circle cx="109" cy="123" r="6" fill="#F472B6" stroke="#2B182E" strokeWidth="1.6" />
        <circle cx="91" cy="123" r="6" fill="#F472B6" stroke="#2B182E" strokeWidth="1.6" />
        <circle cx="100" cy="122" r="5" fill="#FDE68A" stroke="#2B182E" strokeWidth="1.6" />
      </g>

      {/* Central Illustrated Woman With Laptop */}
      <g className="sb-doodle-float" style={{ animationDuration: '5.5s' }}>
        {/* Hair Back */}
        <path
          d="M174 88C174 63 192 48 214 48C236 48 254 63 254 88V116H174V88Z"
          fill="#2B182E"
        />
        {/* Shoulders / Sweater */}
        <path
          d="M158 172C164 134 184 122 214 122C244 122 264 134 270 172H158Z"
          fill="#F472B6"
          stroke="#2B182E"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        {/* Collar */}
        <path d="M201 122L214 134L227 122" fill="#FEF3C7" stroke="#2B182E" strokeWidth="2" strokeLinejoin="round" />
        {/* Neck & Head */}
        <rect x="206" y="108" width="16" height="18" rx="7" fill="#F6D5C4" stroke="#2B182E" strokeWidth="2" />
        <circle cx="214" cy="88" r="24" fill="#F6D5C4" stroke="#2B182E" strokeWidth="2.4" />
        {/* Bangs */}
        <path
          d="M190 83C194 67 206 60 219 61C231 62 238 70 238 82C228 77 220 71 213 68C205 74 198 79 190 83Z"
          fill="#2B182E"
        />
        {/* Smiling Face */}
        <circle cx="205.5" cy="89" r="2.2" fill="#2B182E" />
        <circle cx="222.5" cy="89" r="2.2" fill="#2B182E" />
        <circle cx="199.5" cy="94" r="3.4" fill="#F472B6" opacity="0.55" />
        <circle cx="228.5" cy="94" r="3.4" fill="#F472B6" opacity="0.55" />
        <path d="M208 97C211 101 217 101 220 97" stroke="#2B182E" strokeWidth="2.2" strokeLinecap="round" />

        {/* Cute Pastel Laptop */}
        <rect x="172" y="142" width="84" height="48" rx="8" fill="#FFFDF7" stroke="#2B182E" strokeWidth="2.4" />
        {/* Heart / Star sticker on laptop */}
        <path
          d="M214 160C214 157.5 217.5 156 219.5 158.2C221.5 156 225 157.5 225 160C225 163.5 219.5 167.2 219.5 167.2C219.5 167.2 214 163.5 214 160Z"
          fill="#E11D74"
        />
        <circle cx="203" cy="162" r="4" fill="#FDE68A" stroke="#2B182E" strokeWidth="1.5" />
      </g>

      {/* Cute Coffee Cup on Desk */}
      <g>
        <g className="sb-doodle-steam">
          <path d="M292 146C291 141 295 138 293 133" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
          <path d="M302 146C301 141 305 138 303 133" stroke="#F472B6" strokeWidth="2" strokeLinecap="round" />
        </g>
        <rect x="282" y="152" width="30" height="28" rx="7" fill="#FEF3C7" stroke="#2B182E" strokeWidth="2.2" />
        <path d="M312 158H316C318.8 158 321 160.2 321 163V166C321 168.8 318.8 171 316 171H312" stroke="#2B182E" strokeWidth="2.2" />
        <circle cx="292" cy="165" r="1.5" fill="#2B182E" />
        <circle cx="302" cy="165" r="1.5" fill="#2B182E" />
        <path d="M294.5 170C296 172 298 172 299.5 170" stroke="#2B182E" strokeWidth="1.8" strokeLinecap="round" />
      </g>

      {/* Desk Ground Doodle Line */}
      <path d="M52 190H368" stroke="#2B182E" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M126 196H296" stroke="#F472B6" strokeWidth="2" strokeLinecap="round" strokeDasharray="6 6" />
    </svg>
  );
}

export function DoodleHeartNote({ size = 44, style = {} }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 52 52"
      fill="none"
      aria-hidden="true"
      className="sb-doodle-float sb-doodle-hover"
      style={style}
    >
      <rect x="8" y="8" width="36" height="36" rx="9" transform="rotate(-5 8 8)" fill="#FEF9C3" stroke="#2B182E" strokeWidth="2" />
      <path
        d="M26 22.5C26 19.6 30 18 32.2 20.6C34.4 18 38.4 19.6 38.4 22.5C38.4 26.8 32.2 31.2 32.2 31.2C32.2 31.2 26 26.8 26 22.5Z"
        transform="translate(-6 1)"
        fill="#F472B6"
        stroke="#2B182E"
        strokeWidth="1.8"
      />
    </svg>
  );
}
