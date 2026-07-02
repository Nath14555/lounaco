/**
 * ScrapbookItems
 *
 * Hand-illustrated SVG stickers for the scrapbook hero:
 * the studio bag and everything that pops out of it —
 * lipstick, matcha, mat accessories, pilates ring, phone.
 *
 * Palette matches the baroque design tokens (warm browns, gold, jewel tones).
 */

interface ItemProps {
  className?: string;
}

/* Studio tote bag — the star of the show */
export function BagIllustration({ className }: ItemProps) {
  return (
    <svg viewBox="0 0 260 220" fill="none" className={className} aria-hidden="true">
      {/* Handles */}
      <path
        d="M85 78 C85 30, 175 30, 175 78"
        stroke="#5c3720"
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M85 78 C85 36, 175 36, 175 78"
        stroke="#8b5a3c"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Rolled mat peeking from the side pocket */}
      <g transform="rotate(-8 40 120)">
        <rect x="14" y="96" width="34" height="78" rx="16" fill="#6b4e71" />
        <rect x="14" y="96" width="34" height="78" rx="16" stroke="#4d3752" strokeWidth="3" />
        <ellipse cx="31" cy="100" rx="16" ry="8" fill="#8a6b90" />
        <ellipse cx="31" cy="100" rx="7" ry="3.5" fill="#4d3752" />
      </g>
      {/* Bag body */}
      <path
        d="M48 82 L212 82 C218 82, 222 87, 221 93 L208 196 C207 204, 200 210, 192 210 L68 210 C60 210, 53 204, 52 196 L39 93 C38 87, 42 82, 48 82 Z"
        fill="#a67c52"
      />
      <path
        d="M48 82 L212 82 C218 82, 222 87, 221 93 L208 196 C207 204, 200 210, 192 210 L68 210 C60 210, 53 204, 52 196 L39 93 C38 87, 42 82, 48 82 Z"
        stroke="#5c3720"
        strokeWidth="5"
      />
      {/* Front pocket */}
      <path
        d="M78 128 L182 128 C186 128, 189 131, 189 135 L184 182 C183 188, 178 192, 172 192 L88 192 C82 192, 77 188, 76 182 L71 135 C71 131, 74 128, 78 128 Z"
        fill="#c19a6b"
        stroke="#5c3720"
        strokeWidth="4"
      />
      {/* Stitching */}
      <path
        d="M46 100 L214 100"
        stroke="#5c3720"
        strokeWidth="3"
        strokeDasharray="7 6"
        strokeLinecap="round"
      />
      {/* Zip pull */}
      <circle cx="130" cy="114" r="6" fill="#d4af37" stroke="#5c3720" strokeWidth="3" />
      <path d="M130 120 L130 132" stroke="#5c3720" strokeWidth="3" strokeLinecap="round" />
      {/* Brand tag */}
      <rect x="106" y="146" width="48" height="26" rx="6" fill="#f5ede4" stroke="#5c3720" strokeWidth="3" />
      <text
        x="130"
        y="164"
        textAnchor="middle"
        fontSize="13"
        fontWeight="bold"
        fill="#5c3720"
        fontFamily="Georgia, serif"
      >
        L&amp;Co
      </text>
      {/* Gold charm */}
      <path d="M196 86 L204 70" stroke="#b8941f" strokeWidth="3" strokeLinecap="round" />
      <path
        d="M204 62 L206.5 67.5 L212 70 L206.5 72.5 L204 78 L201.5 72.5 L196 70 L201.5 67.5 Z"
        fill="#d4af37"
      />
    </svg>
  );
}

/* Lipstick — open tube, ruby bullet */
export function LipstickIllustration({ className }: ItemProps) {
  return (
    <svg viewBox="0 0 120 120" fill="none" className={className} aria-hidden="true">
      {/* Cap lying beside */}
      <g transform="rotate(24 92 88)">
        <rect x="80" y="62" width="24" height="52" rx="5" fill="#3d2415" stroke="#1a0f0a" strokeWidth="3" />
        <rect x="80" y="62" width="24" height="12" rx="5" fill="#d4af37" />
      </g>
      {/* Base */}
      <rect x="38" y="66" width="30" height="44" rx="5" fill="#d4af37" stroke="#8b6e3c" strokeWidth="3" />
      <rect x="44" y="66" width="7" height="44" fill="#f0d886" opacity="0.8" />
      {/* Inner tube */}
      <rect x="43" y="52" width="20" height="16" rx="3" fill="#3d2415" />
      {/* Bullet */}
      <path d="M45 52 L45 26 C45 22, 48 18, 53 18 C58 18, 61 24, 61 30 L61 52 Z" fill="#8b2e3b" />
      <path d="M45 52 L45 26 C45 22, 48 18, 53 18 C58 18, 61 24, 61 30 L61 52 Z" stroke="#5e1e28" strokeWidth="3" />
      <path d="M50 48 L50 26" stroke="#b5495a" strokeWidth="3" strokeLinecap="round" />
      {/* Kiss mark */}
      <g transform="translate(84 24) rotate(-14)" fill="#8b2e3b" opacity="0.9">
        <path d="M0 6 C-2 2, -8 2, -8 7 C-8 11, -3 14, 0 16 C3 14, 8 11, 8 7 C8 2, 2 2, 0 6 Z" />
      </g>
    </svg>
  );
}

/* Matcha latte with bamboo whisk */
export function MatchaIllustration({ className }: ItemProps) {
  return (
    <svg viewBox="0 0 130 130" fill="none" className={className} aria-hidden="true">
      {/* Whisk (chasen) behind */}
      <g transform="rotate(18 100 70)">
        <rect x="94" y="28" width="12" height="26" rx="5" fill="#c19a6b" stroke="#7a4a2b" strokeWidth="3" />
        <path
          d="M92 54 C86 70, 86 82, 90 92 M96 54 C93 72, 93 84, 96 94 M100 54 C100 72, 100 84, 100 95 M104 54 C107 72, 107 84, 104 94 M108 54 C114 70, 114 82, 110 92"
          stroke="#a67c52"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <path d="M91 56 L109 56" stroke="#7a4a2b" strokeWidth="3" strokeLinecap="round" />
      </g>
      {/* Glass */}
      <path
        d="M28 38 L86 38 L80 112 C80 117, 76 120, 71 120 L43 120 C38 120, 34 117, 34 112 Z"
        fill="#f5f2ef"
        stroke="#5c4f45"
        strokeWidth="4"
      />
      {/* Milk layer */}
      <path d="M31 66 L83 66 L80 112 C80 117, 76 120, 71 120 L43 120 C38 120, 34 117, 34 112 Z" fill="#f0e9dd" />
      {/* Matcha layer */}
      <path d="M32 78 L82 78 L80 112 C80 117, 76 120, 71 120 L43 120 C38 120, 34 117, 34 112 Z" fill="#7fa05a" />
      <path d="M33 90 L81 90 L80 112 C80 117, 76 120, 71 120 L43 120 C38 120, 34 117, 34 112 Z" fill="#5d7f3e" />
      {/* Foam swirl on top */}
      <ellipse cx="57" cy="44" rx="26" ry="8" fill="#9dba74" />
      <path d="M40 43 C46 40, 52 46, 58 43 C64 40, 70 46, 75 43" stroke="#5d7f3e" strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* Straw */}
      <rect x="60" y="10" width="9" height="46" rx="4" transform="rotate(12 64 33)" fill="#d4a574" stroke="#7a4a2b" strokeWidth="3" />
      {/* Steam doodle */}
      <path d="M22 28 C18 22, 24 18, 20 12" stroke="#998c82" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  );
}

/* Mat accessories — grip socks, resistance band, scrunchie */
export function MatKitIllustration({ className }: ItemProps) {
  return (
    <svg viewBox="0 0 140 130" fill="none" className={className} aria-hidden="true">
      {/* Resistance band, loosely looped */}
      <path
        d="M20 96 C10 76, 26 62, 48 66 C74 70, 100 58, 112 72 C124 86, 106 102, 84 98 C60 94, 32 110, 20 96 Z"
        fill="none"
        stroke="#2c5f2d"
        strokeWidth="9"
        strokeLinecap="round"
      />
      <path
        d="M20 96 C10 76, 26 62, 48 66 C74 70, 100 58, 112 72"
        fill="none"
        stroke="#4a8a4b"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Grip socks pair */}
      <g transform="rotate(-10 58 46)">
        <path
          d="M42 14 L64 14 L64 46 C64 54, 58 58, 50 58 L38 58 C31 58, 28 50, 34 46 L42 42 Z"
          fill="#e8d7c3"
          stroke="#7a4a2b"
          strokeWidth="3.5"
        />
        <path d="M42 14 L64 14 L64 24 L42 24 Z" fill="#8b2e3b" />
        <circle cx="44" cy="50" r="2.4" fill="#7a4a2b" />
        <circle cx="52" cy="52" r="2.4" fill="#7a4a2b" />
        <circle cx="58" cy="48" r="2.4" fill="#7a4a2b" />
      </g>
      <g transform="rotate(12 92 40)">
        <path
          d="M78 10 L100 10 L100 42 C100 50, 94 54, 86 54 L74 54 C67 54, 64 46, 70 42 L78 38 Z"
          fill="#e8d7c3"
          stroke="#7a4a2b"
          strokeWidth="3.5"
        />
        <path d="M78 10 L100 10 L100 20 L78 20 Z" fill="#8b2e3b" />
        <circle cx="80" cy="46" r="2.4" fill="#7a4a2b" />
        <circle cx="88" cy="48" r="2.4" fill="#7a4a2b" />
        <circle cx="94" cy="44" r="2.4" fill="#7a4a2b" />
      </g>
      {/* Scrunchie */}
      <ellipse cx="118" cy="108" rx="16" ry="12" fill="none" stroke="#6b4e71" strokeWidth="8" strokeLinecap="round" strokeDasharray="2 7" />
    </svg>
  );
}

/* Pilates ring (magic circle) */
export function RingIllustration({ className }: ItemProps) {
  return (
    <svg viewBox="0 0 140 140" fill="none" className={className} aria-hidden="true">
      <g transform="rotate(-18 70 70)">
        {/* Ring */}
        <circle cx="70" cy="70" r="46" stroke="#3d2415" strokeWidth="11" fill="none" />
        <circle cx="70" cy="70" r="46" stroke="#8b5a3c" strokeWidth="4" fill="none" />
        {/* Side handles */}
        <rect x="8" y="56" width="18" height="28" rx="9" fill="#d4a574" stroke="#3d2415" strokeWidth="3.5" />
        <rect x="114" y="56" width="18" height="28" rx="9" fill="#d4a574" stroke="#3d2415" strokeWidth="3.5" />
      </g>
      {/* Sparkle doodles */}
      <path d="M118 18 L120.5 24 L126 26.5 L120.5 29 L118 35 L115.5 29 L110 26.5 L115.5 24 Z" fill="#d4af37" />
      <path d="M16 112 L18 116.5 L22.5 118.5 L18 120.5 L16 125 L14 120.5 L9.5 118.5 L14 116.5 Z" fill="#d4af37" />
    </svg>
  );
}

/* Phone with the booking app open */
export function PhoneIllustration({ className }: ItemProps) {
  return (
    <svg viewBox="0 0 110 150" fill="none" className={className} aria-hidden="true">
      <g transform="rotate(8 55 75)">
        {/* Body */}
        <rect x="24" y="10" width="64" height="126" rx="14" fill="#3d2415" />
        <rect x="29" y="16" width="54" height="114" rx="9" fill="#faf7f3" />
        {/* Notch */}
        <rect x="46" y="19" width="20" height="5" rx="2.5" fill="#3d2415" />
        {/* App: header */}
        <text x="56" y="40" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#5c3720" fontFamily="Georgia, serif">
          Louna&amp;Co
        </text>
        <path d="M36 46 L76 46" stroke="#e8d7c3" strokeWidth="2" strokeLinecap="round" />
        {/* Class cards */}
        <rect x="35" y="52" width="42" height="16" rx="4" fill="#e8d7c3" />
        <rect x="38" y="56" width="22" height="3" rx="1.5" fill="#8b5a3c" />
        <rect x="38" y="61" width="14" height="3" rx="1.5" fill="#c19a6b" />
        <rect x="35" y="72" width="42" height="16" rx="4" fill="#f0d886" />
        <rect x="38" y="76" width="24" height="3" rx="1.5" fill="#8b6e3c" />
        <rect x="38" y="81" width="12" height="3" rx="1.5" fill="#c19a6b" />
        {/* Book button */}
        <rect x="35" y="96" width="42" height="14" rx="7" fill="#8b2e3b" />
        <circle cx="56" cy="103" r="3" fill="#faf7f3" />
        {/* Heart notification */}
        <circle cx="84" cy="22" r="10" fill="#8b2e3b" stroke="#faf7f3" strokeWidth="2.5" />
        <path
          d="M84 26 C82 24, 79 22.5, 79 20 C79 18, 81.5 17, 84 19.5 C86.5 17, 89 18, 89 20 C89 22.5, 86 24, 84 26 Z"
          fill="#faf7f3"
        />
      </g>
    </svg>
  );
}

/* Little doodles sprinkled across the page */
export function StarDoodle({ className }: ItemProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
      <path
        d="M20 4 L23.5 15.5 L36 16.5 L26 24 L29.5 36 L20 28.5 L10.5 36 L14 24 L4 16.5 L16.5 15.5 Z"
        fill="#d4af37"
        stroke="#8b6e3c"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HeartDoodle({ className }: ItemProps) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
      <path
        d="M20 34 C14 28, 5 23, 5 14 C5 7, 13 4, 20 12 C27 4, 35 7, 35 14 C35 23, 26 28, 20 34 Z"
        fill="#8b2e3b"
        stroke="#5e1e28"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SwirlDoodle({ className }: ItemProps) {
  return (
    <svg viewBox="0 0 60 60" fill="none" className={className} aria-hidden="true">
      <path
        d="M8 44 C18 44, 14 20, 30 20 C46 20, 40 40, 30 38 C24 37, 28 28, 36 28 C48 28, 52 14, 52 10"
        stroke="#6b4e71"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        strokeDasharray="1 7"
      />
    </svg>
  );
}
