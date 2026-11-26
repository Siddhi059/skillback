/**
 * Refined editorial line-art & pastel illustrations in dusty blush pink,
 * warm off-white, and charcoal-rosewood ink.
 */

export function DoodleUnderline({ width = 260 }) {
  return (
    <svg
      width={width}
      height="14"
      viewBox="0 0 260 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ display: 'block', maxWidth: '100%', marginTop: '3px' }}
    >
      <path
        d="M3 9.5C52 3.8 126 2.8 196 6.2C222 7.5 244 6.2 257 4.5"
        stroke="#E5C2CC"
        strokeWidth="4"
        strokeLinecap="round"
        className="sb-doodle-draw"
      />
      <path
        d="M16 11.8C74 7.5 148 7 238 9.2"
        stroke="#B85D79"
        strokeWidth="1.8"
        strokeLinecap="round"
        className="sb-doodle-draw"
      />
    </svg>
  );
}

export function DoodleSparkle({ size = 24, color = '#E5C2CC', style = {} }) {
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
        stroke="#4C3540"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DoodlePaperPlane({ size = 38, style = {} }) {
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
        stroke="#D19AA9"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeDasharray="4 4"
      />
      <path
        d="M10 24L47 11L35 44L27 31L10 24Z"
        fill="#FAF5F3"
        stroke="#37262E"
        strokeWidth="1.9"
        strokeLinejoin="round"
      />
      <path d="M47 11L27 31L27 41L32 35" stroke="#A04764" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function DoodleSunnyBuddy({ size = 46, style = {} }) {
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
      <circle cx="32" cy="32" r="22" fill="#F8ECEF" stroke="#E5C2CC" strokeWidth="1.5" />
      <path
        d="M32 14C33.4 24.2 39.8 30.6 50 32C39.8 33.4 33.4 39.8 32 50C30.6 39.8 24.2 33.4 14 32C24.2 30.6 30.6 24.2 32 14Z"
        fill="#FAF7F5"
        stroke="#A04764"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DoodleCoffeeNotebook({ size = 68, style = {} }) {
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
      <rect x="10" y="22" width="44" height="52" rx="9" fill="#F8ECEF" stroke="#37262E" strokeWidth="1.9" />
      <path d="M18 35H44M18 44H40M18 53H35" stroke="#A04764" strokeWidth="1.9" strokeLinecap="round" />
      <circle cx="10" cy="32" r="2.3" fill="#E5C2CC" stroke="#37262E" strokeWidth="1.4" />
      <circle cx="10" cy="46" r="2.3" fill="#E5C2CC" stroke="#37262E" strokeWidth="1.4" />
      <circle cx="10" cy="60" r="2.3" fill="#E5C2CC" stroke="#37262E" strokeWidth="1.4" />

      <g className="sb-doodle-steam">
        <path d="M58 28C57 25 60 23 59 19" stroke="#D19AA9" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M66 28C65 25 68 23 67 19" stroke="#B85D79" strokeWidth="1.8" strokeLinecap="round" />
      </g>
      <path
        d="M50 37H73V55C73 61.0751 68.0751 66 62 66H61C54.9249 66 50 61.0751 50 55V37Z"
        fill="#FAF5F3"
        stroke="#37262E"
        strokeWidth="1.9"
      />
      <path d="M73 42H76.5C78.9853 42 81 44.0147 81 46.5V48.5C81 50.9853 78.9853 53 76.5 53H73" stroke="#37262E" strokeWidth="1.9" />
    </svg>
  );
}

export function HeroComebackDrawing() {
  return (
    <svg
      viewBox="0 0 420 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Editorial illustration of professionals collaborating in a calm pastel workspace"
      style={{ width: '100%', maxWidth: '420px', height: 'auto', display: 'block' }}
    >
      {/* Soft Off-White & Blush Backdrop */}
      <path
        d="M42 152C20 112 46 46 112 34C178 22 222 44 282 32C342 20 396 68 386 128C376 188 302 198 214 194C126 190 64 192 42 152Z"
        fill="#F8ECEF"
      />
      <path
        d="M84 166C66 130 92 78 158 68C224 58 286 78 334 62C368 50 384 114 358 154C332 194 252 192 184 190C116 188 102 202 84 166Z"
        fill="#FAF5F3"
        opacity="0.88"
      />

      {/* Minimal Editorial Sparkles */}
      <g className="sb-doodle-twinkle">
        <path
          d="M66 58C67 63 70 66 75 67C70 68 67 71 66 76C65 71 62 68 57 67C62 66 65 63 66 58Z"
          fill="#E5C2CC"
          stroke="#4C3540"
          strokeWidth="1.4"
        />
      </g>
      <g className="sb-doodle-twinkle" style={{ animationDelay: '0.8s' }}>
        <path
          d="M352 46C353 50 355 52 359 53C355 54 353 56 352 60C351 56 349 54 345 53C349 52 351 50 352 46Z"
          fill="#D19AA9"
          stroke="#4C3540"
          strokeWidth="1.4"
        />
      </g>

      {/* Gliding Paper Plane */}
      <g className="sb-doodle-plane">
        <path
          d="M276 66C296 72 314 66 328 54"
          stroke="#B85D79"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeDasharray="4 4"
        />
        <path
          d="M322 36L354 28L340 56L333 44L322 36Z"
          fill="#FFFFFF"
          stroke="#37262E"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </g>

      {/* Botanical Accent */}
      <g className="sb-doodle-float">
        <path d="M100 168C100 152 101 138 101 128" stroke="#4C6B5C" strokeWidth="2.1" strokeLinecap="round" />
        <path d="M101 148C92 144 88 136 94 132C99 129 101 138 101 148Z" fill="#DCEAE3" stroke="#37262E" strokeWidth="1.5" />
        <circle cx="101" cy="117" r="5.5" fill="#E5C2CC" stroke="#37262E" strokeWidth="1.5" />
        <circle cx="109" cy="123" r="5.5" fill="#F1DCE2" stroke="#37262E" strokeWidth="1.5" />
        <circle cx="93" cy="123" r="5.5" fill="#F1DCE2" stroke="#37262E" strokeWidth="1.5" />
        <circle cx="101" cy="122" r="4.2" fill="#FAF5F3" stroke="#37262E" strokeWidth="1.5" />
      </g>

      {/* Central Illustrated Professional With Laptop */}
      <g className="sb-doodle-float" style={{ animationDuration: '5.5s' }}>
        <path d="M174 88C174 63 192 48 214 48C236 48 254 63 254 88V116H174V88Z" fill="#271B21" />
        <path
          d="M158 172C164 134 184 122 214 122C244 122 264 134 270 172H158Z"
          fill="#B85D79"
          stroke="#271B21"
          strokeWidth="2.1"
          strokeLinejoin="round"
        />
        <path d="M201 122L214 134L227 122" fill="#FAF5F3" stroke="#271B21" strokeWidth="1.8" strokeLinejoin="round" />
        <rect x="206" y="108" width="16" height="18" rx="7" fill="#F0D0BF" stroke="#271B21" strokeWidth="1.8" />
        <circle cx="214" cy="88" r="24" fill="#F0D0BF" stroke="#271B21" strokeWidth="2.1" />
        <path
          d="M190 83C194 67 206 60 219 61C231 62 238 70 238 82C228 77 220 71 213 68C205 74 198 79 190 83Z"
          fill="#271B21"
        />
        <circle cx="205.5" cy="89" r="2" fill="#271B21" />
        <circle cx="222.5" cy="89" r="2" fill="#271B21" />
        <path d="M208 97C211 100.5 217 100.5 220 97" stroke="#271B21" strokeWidth="2" strokeLinecap="round" />

        <rect x="172" y="142" width="84" height="48" rx="8" fill="#FFFFFF" stroke="#271B21" strokeWidth="2.1" />
        <circle cx="214" cy="166" r="5" fill="#F1DCE2" stroke="#A04764" strokeWidth="1.5" />
      </g>

      {/* Ceramic Mug */}
      <g>
        <g className="sb-doodle-steam">
          <path d="M292 146C291 141 295 138 293 133" stroke="#D19AA9" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M302 146C301 141 305 138 303 133" stroke="#B85D79" strokeWidth="1.8" strokeLinecap="round" />
        </g>
        <rect x="282" y="152" width="30" height="28" rx="7" fill="#FAF5F3" stroke="#37262E" strokeWidth="1.9" />
        <path d="M312 158H316C318.8 158 321 160.2 321 163V166C321 168.8 318.8 171 316 171H312" stroke="#37262E" strokeWidth="1.9" />
      </g>

      {/* Desk Line */}
      <path d="M52 190H368" stroke="#37262E" strokeWidth="2" strokeLinecap="round" />
      <path d="M126 196H296" stroke="#D19AA9" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="6 6" />
    </svg>
  );
}

export function DoodleHeartNote({ size = 38, style = {} }) {
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
      <rect x="8" y="8" width="36" height="36" rx="9" transform="rotate(-4 8 8)" fill="#FAF5F3" stroke="#37262E" strokeWidth="1.8" />
      <path
        d="M26 22.5C26 19.6 30 18 32.2 20.6C34.4 18 38.4 19.6 38.4 22.5C38.4 26.8 32.2 31.2 32.2 31.2C32.2 31.2 26 26.8 26 22.5Z"
        transform="translate(-6 1)"
        fill="#E5C2CC"
        stroke="#A04764"
        strokeWidth="1.6"
      />
    </svg>
  );
}
