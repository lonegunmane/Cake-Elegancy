import React from 'react';

interface LogoProps {
  /**
   * Layout format:
   * - 'inline': Icon beside text (for header navigation, drawer header)
   * - 'stacked': Icon above text (for hero, splash, side dashboard, footer)
   * - 'iconOnly': Just the monogram CE tiered cake icon
   */
  variant?: 'inline' | 'stacked' | 'iconOnly';
  /**
   * Sizing presets
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Optional custom class for outer container
   */
  className?: string;
  /**
   * Whether to show the "Hellen's cakery paradise" tagline
   */
  showTagline?: boolean;
  /**
   * Interactive hover effect
   */
  interactive?: boolean;
}

/**
 * The Monogram CE Tiered Cake Icon
 * - An intertwining 'C' on the left and 'E' on the right sculpted into a 3-tiered celebration cake
 * - Topped with an elegant celebratory candle with a glowing flame
 * - Purple-to-pink linear gradient (deep royal purple on the left fading to bright pink on the right)
 */
export function CakeElegancyIcon({
  size = 44,
  className = '',
}: {
  size?: number | string;
  className?: string;
}) {
  const uniqueId = React.useId().replace(/:/g, '');
  const gradId = `ce-grad-${uniqueId}`;
  const flameGradId = `ce-flame-${uniqueId}`;
  const glowFilterId = `ce-glow-${uniqueId}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-label="Cake Elegancy Monogram CE Cake Logo"
      role="img"
    >
      <defs>
        {/* Main Brand Purple-to-Pink Gradient */}
        <linearGradient id={gradId} x1="5%" y1="30%" x2="95%" y2="70%">
          <stop offset="0%" stopColor="#6B21A8" />
          <stop offset="35%" stopColor="#7E22CE" />
          <stop offset="68%" stopColor="#D946EF" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>

        {/* Soft Pink Accent Gradient */}
        <linearGradient id={`${gradId}-soft`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9333EA" />
          <stop offset="100%" stopColor="#F472B6" />
        </linearGradient>

        {/* Golden-Pink Candle Flame Gradient */}
        <linearGradient id={flameGradId} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="45%" stopColor="#F472B6" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>

        {/* Subtle drop shadow/glow */}
        <filter id={glowFilterId} x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#7E22CE" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* BACKGROUND SQUIRCLE / TILE (Subtle backing for contrast on any background) */}
      <rect
        x="2"
        y="2"
        width="96"
        height="96"
        rx="26"
        className="fill-purple-500/10 dark:fill-purple-400/10"
      />
      <rect
        x="2"
        y="2"
        width="96"
        height="96"
        rx="26"
        stroke={`url(#${gradId})`}
        strokeWidth="1.2"
        strokeOpacity="0.4"
      />

      {/* ==================== CANDLE & FLAME (Top) ==================== */}
      <g filter={`url(#${glowFilterId})`}>
        {/* Flame Glow Halo */}
        <circle cx="50" cy="13" r="6" fill={`url(#${flameGradId})`} opacity="0.3" />

        {/* Teardrop Candle Flame */}
        <path
          d="M50 7 C52 11, 53.5 13.5, 53 16 C52.5 18, 51.2 19, 50 19 C48.8 19, 47.5 18, 47 16 C46.5 13.5, 48 11, 50 7 Z"
          fill={`url(#${flameGradId})`}
        />

        {/* Tiny golden wick */}
        <line x1="50" y1="18.5" x2="50" y2="21" stroke="#9333EA" strokeWidth="1.2" strokeLinecap="round" />

        {/* Candle Stick */}
        <rect
          x="48"
          y="20.5"
          width="4"
          height="8.5"
          rx="1.5"
          fill={`url(#${gradId}-soft)`}
        />
        {/* Candle wax drip detail */}
        <path
          d="M48 24 Q46.5 25 48 26"
          stroke="#F472B6"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </g>

      {/* ==================== MONOGRAM "CE" TIERED CAKE ==================== */}
      <g filter={`url(#${glowFilterId})`}>
        {/* --- TIER 1: TOP TIER (Monogram Crown) --- */}
        {/* Tier 1 Cake Body: sculpted with CE upper curve */}
        <path
          d="M38 29 Q50 27 62 29 L61 41 Q50 43 39 41 Z"
          fill={`url(#${gradId})`}
          fillOpacity="0.18"
        />
        {/* Top Tier Icing Drips */}
        <path
          d="M38 29 Q44 32.5 47 30 Q50 33 53 30 Q57 33 62 29"
          stroke={`url(#${gradId})`}
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
        />
        {/* Top Tier Lower Rim */}
        <path
          d="M39 41 Q50 43.5 61 41"
          stroke={`url(#${gradId})`}
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* --- TIER 2: MIDDLE TIER --- */}
        <path
          d="M30 44 Q50 42 70 44 L68 59 Q50 62 32 59 Z"
          fill={`url(#${gradId})`}
          fillOpacity="0.22"
        />
        {/* Middle Tier Decorative Scalloped Drips */}
        <path
          d="M30 44 Q35 48 39 45 Q44 49 50 45 Q56 49 61 45 Q65 48 70 44"
          stroke={`url(#${gradId})`}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Middle Tier Lower Rim */}
        <path
          d="M32 59 Q50 62.5 68 59"
          stroke={`url(#${gradId})`}
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* --- TIER 3: BASE TIER (Grand Foundation) --- */}
        <path
          d="M22 62 Q50 59 78 62 L75 79 Q50 83 25 79 Z"
          fill={`url(#${gradId})`}
          fillOpacity="0.25"
        />
        {/* Base Tier Drips */}
        <path
          d="M22 62 Q27 67 33 63 Q39 68 46 64 Q54 68 61 64 Q68 68 73 63 Q76 66 78 62"
          stroke={`url(#${gradId})`}
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Base Tier Lower Rim */}
        <path
          d="M25 79 Q50 83.5 75 79"
          stroke={`url(#${gradId})`}
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        {/* --- PEDESTAL / CAKE STAND BASE --- */}
        <path
          d="M40 80 Q50 83 60 80 L63 86 Q50 89 37 86 Z"
          fill={`url(#${gradId})`}
          fillOpacity="0.4"
        />
        <path
          d="M34 87 Q50 89.5 66 87"
          stroke={`url(#${gradId})`}
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* ==================== THE EMBEDDED MONOGRAM "C" AND "E" ==================== */}
        {/* 
          Letter 'C': Sweeps along the left side of all 3 tiers with calligraphic flourish.
          Starts as an elegant swirl at the top-left of Tier 1, curves around Tier 2,
          and blossoms into a regal curl under Tier 3.
        */}
        <path
          d="M44 32 C33 34, 25 43, 27 54 C28 60, 31 66, 36 71 C42 76, 45 77, 44 79 C42 81, 35 78, 28 73 C22 67, 19 58, 20 50 C21 38, 29 30, 42 28 C45 27.5, 46 29, 44 32 Z"
          fill={`url(#${gradId})`}
        />
        {/* Ornate terminal pearl on 'C' */}
        <circle cx="43" cy="30" r="1.8" fill="#F472B6" />

        {/* 
          Letter 'E': Forms the right side of the cake.
          Vertical spine connecting Tier 1 to Tier 3, with 3 prominent tier bars extending rightward.
        */}
        {/* 'E' Vertical Stem */}
        <path
          d="M49 31 C51 31, 51.5 78, 49.5 78 C47.5 78, 47 31, 49 31 Z"
          fill={`url(#${gradId})`}
        />
        {/* 'E' Top Bar (matches Tier 1 surface) */}
        <path
          d="M50 31 C56 31, 62 31, 65 33 C66 33.5, 65 35.5, 63 35 C58 34, 52 34, 50 34.5 Z"
          fill={`url(#${gradId})`}
        />
        <circle cx="64" cy="34" r="1.5" fill="#F472B6" />

        {/* 'E' Middle Bar (matches Tier 2 surface with cursive loop) */}
        <path
          d="M50 49 C57 49, 64 50, 68 52 C69 52.8, 67.5 54.5, 65.5 54 C60 53, 53 52.5, 50 53 Z"
          fill={`url(#${gradId})`}
        />
        <circle cx="67" cy="53" r="1.5" fill="#F472B6" />

        {/* 'E' Bottom Bar (matches Tier 3 base flourish) */}
        <path
          d="M50 72 C58 72, 69 73, 74 76 C75.5 77, 74 79, 71 78.5 C64 77, 54 76.5, 50 76 Z"
          fill={`url(#${gradId})`}
        />
        <circle cx="73" cy="77" r="1.8" fill="#EC4899" />

        {/* Sparkle Stars on the Tiers */}
        {/* Left Sparkle */}
        <path
          d="M17 38 Q19 38 19 36 Q19 38 21 38 Q19 38 19 40 Q19 38 17 38 Z"
          fill="#F472B6"
        />
        {/* Right Sparkle */}
        <path
          d="M79 46 Q81 46 81 44 Q81 46 83 46 Q81 46 81 48 Q81 46 79 46 Z"
          fill="#EC4899"
        />
        {/* Top Floating Mini Star */}
        <path
          d="M66 18 Q67.5 18 67.5 16.5 Q67.5 18 69 18 Q67.5 18 67.5 19.5 Q67.5 18 66 18 Z"
          fill="#FDE047"
        />
      </g>
    </svg>
  );
}

/**
 * Full Cake Elegancy Logo with Monogram CE Cake & Typography
 */
export function CakeElegancyLogo({
  variant = 'inline',
  size = 'md',
  className = '',
  showTagline = true,
  interactive = true,
}: LogoProps) {
  // Sizing definitions
  const sizeConfig = {
    sm: {
      iconSize: 36,
      titleSize: 'text-lg sm:text-xl',
      taglineSize: 'text-[9px] sm:text-[10px]',
      gap: 'gap-2',
      dotSize: 'w-1.5 h-1.5',
    },
    md: {
      iconSize: 44,
      titleSize: 'text-xl sm:text-2xl',
      taglineSize: 'text-[10px] sm:text-[11px]',
      gap: 'gap-3',
      dotSize: 'w-2 h-2',
    },
    lg: {
      iconSize: 56,
      titleSize: 'text-2xl sm:text-3xl',
      taglineSize: 'text-xs sm:text-sm',
      gap: 'gap-4',
      dotSize: 'w-2.5 h-2.5',
    },
    xl: {
      iconSize: 72,
      titleSize: 'text-3xl sm:text-4xl lg:text-5xl',
      taglineSize: 'text-sm sm:text-base',
      gap: 'gap-5',
      dotSize: 'w-3 h-3',
    },
  }[size];

  if (variant === 'iconOnly') {
    return <CakeElegancyIcon size={sizeConfig.iconSize} className={className} />;
  }

  if (variant === 'stacked') {
    return (
      <div
        className={`flex flex-col items-center text-center ${sizeConfig.gap} ${className} ${
          interactive ? 'group cursor-pointer' : ''
        }`}
      >
        <div
          className={`transition-all duration-300 ${
            interactive ? 'group-hover:scale-105 group-hover:rotate-1' : ''
          }`}
        >
          <CakeElegancyIcon size={sizeConfig.iconSize * 1.25} />
        </div>
        <div className="flex flex-col items-center">
          <span
            className={`font-serif font-bold tracking-tight bg-gradient-to-r from-purple-900 via-purple-700 to-pink-600 dark:from-purple-100 dark:via-pink-200 dark:to-pink-400 bg-clip-text text-transparent leading-tight flex items-center ${sizeConfig.titleSize}`}
          >
            Cake Elegancy
            <span
              className={`${sizeConfig.dotSize} rounded-full bg-pink-500 ml-1.5 inline-block ${
                interactive ? 'group-hover:animate-ping' : ''
              }`}
            />
          </span>
          {showTagline && (
            <span
              className={`font-serif italic font-medium text-pink-600 dark:text-pink-300 mt-0.5 tracking-wide ${sizeConfig.taglineSize}`}
            >
              Hellen's cakery paradise
            </span>
          )}
        </div>
      </div>
    );
  }

  // Default: 'inline' variant
  return (
    <div
      className={`flex items-center ${sizeConfig.gap} ${className} ${
        interactive ? 'group' : ''
      }`}
    >
      <div
        className={`transition-all duration-300 shrink-0 ${
          interactive ? 'group-hover:scale-105 group-hover:-rotate-2' : ''
        }`}
      >
        <CakeElegancyIcon size={sizeConfig.iconSize} />
      </div>

      <div className="flex flex-col text-left">
        <span
          className={`font-serif font-bold tracking-tight bg-gradient-to-r from-purple-950 via-purple-800 to-pink-600 dark:from-white dark:via-purple-100 dark:to-pink-300 bg-clip-text text-transparent flex items-center leading-none ${sizeConfig.titleSize}`}
        >
          Cake Elegancy
          <span
            className={`${sizeConfig.dotSize} rounded-full bg-pink-500 ml-1.5 inline-block ${
              interactive ? 'group-hover:animate-ping' : ''
            }`}
          />
        </span>
        {showTagline && (
          <span
            className={`font-serif italic font-medium text-pink-600 dark:text-pink-400 mt-1 tracking-normal ${sizeConfig.taglineSize}`}
          >
            Hellen's cakery paradise
          </span>
        )}
      </div>
    </div>
  );
}

/**
 * Simplified square SVG string for use as favicon data URI or apple-touch-icon
 */
export const CAKE_ELEGANCY_FAVICON_SVG = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0%25' stop-color='%236B21A8'/><stop offset='50%25' stop-color='%23A855F7'/><stop offset='100%25' stop-color='%23EC4899'/></linearGradient><linearGradient id='flame' x1='0' y1='0' x2='0' y2='1'><stop offset='0%25' stop-color='%23FDE047'/><stop offset='100%25' stop-color='%23EC4899'/></linearGradient></defs><rect width='100' height='100' rx='24' fill='url(%23g)'/><path d='M50 7 C52 11, 54 13.5, 53 16 C52.5 18, 51.2 19, 50 19 C48.8 19, 47.5 18, 47 16 C46 13.5, 48 11, 50 7 Z' fill='url(%23flame)'/><rect x='48.5' y='19.5' width='3' height='6.5' rx='1' fill='%23FFFFFF'/><path d='M39 28 Q50 26 61 28 L60 38 Q50 40 40 38 Z' fill='%23FFFFFF' opacity='0.9'/><path d='M31 42 Q50 40 69 42 L67 55 Q50 58 33 55 Z' fill='%23FFFFFF' opacity='0.92'/><path d='M23 59 Q50 56 77 59 L74 75 Q50 79 26 75 Z' fill='%23FFFFFF' opacity='0.95'/><path d='M44 32 C33 34, 25 43, 27 54 C28 60, 31 66, 36 71 C42 76, 45 77, 44 79 C42 81, 35 78, 28 73 C22 67, 19 58, 20 50 C21 38, 29 30, 42 28 Z' fill='%23F472B6'/><path d='M49 31 L52 31 L52 76 L49 76 Z' fill='%236B21A8'/><path d='M50 31 L64 31 L64 34 L50 34 Z' fill='%236B21A8'/><path d='M50 48 L66 48 L66 51 L50 51 Z' fill='%236B21A8'/><path d='M50 72 L72 72 L72 75 L50 75 Z' fill='%236B21A8'/><circle cx='64' cy='32.5' r='2' fill='%23FDE047'/><circle cx='66' cy='49.5' r='2' fill='%23FDE047'/><circle cx='72' cy='73.5' r='2.5' fill='%23FDE047'/><path d='M36 82 Q50 85 64 82' stroke='%23FFFFFF' stroke-width='3' stroke-linecap='round'/></svg>`;
