// tailwind.config.mjs — Safe Build Engineering
// Full design token configuration extracted from about-raw.html prototype.
// Tailwind CSS v3 format — used with @astrojs/tailwind integration.

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      // ================================================================
      // COLOR PALETTE
      // All colors sourced from the prototype tailwind config.
      // Primary action color: #F97316 (primary-container / orange)
      // ================================================================
      colors: {
        'image-placeholder':          '#F1F5F9',
        'primary-container':          '#F97316',  // ← Brand orange (main CTA/accent)
        'primary':                    '#9D4300',
        'on-background':              '#171C1F',  // ← Dark charcoal (footer bg)
        'on-surface':                 '#171C1F',
        'on-surface-variant':         '#584237',
        'surface-white':              '#FFFFFF',
        'surface':                    '#F6FAFE',
        'surface-bright':             '#F6FAFE',
        'background':                 '#F6FAFE',
        'border-subtle':              '#E5E7EB',
        'surface-variant':            '#DFE3E7',
        'inverse-surface':            '#2C3134',
        'inverse-on-surface':         '#EDF1F5',
        'inverse-primary':            '#FFB690',
        'primary-fixed':              '#FFDBCA',
        'primary-fixed-dim':          '#FFB690',
        'surface-tint':               '#9D4300',
        'on-primary':                 '#FFFFFF',
        'on-primary-container':       '#582200',
        'on-primary-fixed':           '#341100',
        'on-primary-fixed-variant':   '#783200',
        'secondary':                  '#5B5E66',
        'secondary-container':        '#DFE2EB',
        'secondary-fixed':            '#DFE2EB',
        'secondary-fixed-dim':        '#C3C6CF',
        'on-secondary':               '#FFFFFF',
        'on-secondary-container':     '#61646C',
        'on-secondary-fixed':         '#181C22',
        'on-secondary-fixed-variant': '#43474E',
        'tertiary':                   '#555F6D',
        'tertiary-container':         '#919BAB',
        'tertiary-fixed':             '#D9E3F4',
        'tertiary-fixed-dim':         '#BDC7D8',
        'on-tertiary':                '#FFFFFF',
        'on-tertiary-container':      '#293340',
        'on-tertiary-fixed':          '#121C28',
        'on-tertiary-fixed-variant':  '#3E4755',
        'surface-container-lowest':   '#FFFFFF',
        'surface-container-low':      '#F0F4F8',
        'surface-container':          '#EAEEF2',
        'surface-container-high':     '#E4E9ED',
        'surface-container-highest':  '#DFE3E7',
        'surface-dim':                '#D6DADE',
        'outline':                    '#8C7164',
        'outline-variant':            '#E0C0B1',
        'error':                      '#BA1A1A',
        'error-container':            '#FFDAD6',
        'on-error':                   '#FFFFFF',
        'on-error-container':         '#93000A',
      },

      // ================================================================
      // BORDER RADIUS — ALL ZERO (hard design constraint)
      // ================================================================
      borderRadius: {
        'DEFAULT': '0px',
        'none':    '0px',
        'sm':      '0px',
        'md':      '0px',
        'lg':      '0px',
        'xl':      '0px',
        '2xl':     '0px',
        '3xl':     '0px',
        'full':    '9999px',   // Only for pill shapes if ever explicitly needed
      },

      // ================================================================
      // SPACING TOKENS
      // ================================================================
      spacing: {
        'stack-sm':       '0.5rem',   //  8px — tight stacking
        'stack-md':       '1rem',     // 16px — standard element gap
        'stack-lg':       '2rem',     // 32px — section element gap
        'gutter':         '1.5rem',   // 24px — horizontal page padding
        'card-padding':   '2rem',     // 32px — card internal padding
        'section-padding':'5rem',     // 80px — vertical section padding
        'container-max':  '1200px',   // max page width
      },

      // ================================================================
      // FONT FAMILIES
      // ================================================================
      fontFamily: {
        'display-xl':         ['Rajdhani', 'sans-serif'],
        'headline-lg':        ['Rajdhani', 'sans-serif'],
        'headline-lg-mobile': ['Rajdhani', 'sans-serif'],
        'headline-md':        ['Rajdhani', 'sans-serif'],
        'headline-sm':        ['Rajdhani', 'sans-serif'],
        'body-lg':            ['Inter', 'sans-serif'],
        'body-md':            ['Inter', 'sans-serif'],
        'technical-data':     ['Inter', 'sans-serif'],
        'label-caps':         ['Barlow Condensed', 'sans-serif'],
      },

      // ================================================================
      // FONT SIZES (size + line-height + font-weight)
      // Apply both font class AND text class:
      //   e.g. class="font-headline-lg text-headline-lg"
      // ================================================================
      fontSize: {
        'display-xl': [
          '72px',
          { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' },
        ],
        'headline-lg': [
          '48px',
          { lineHeight: '1.2', fontWeight: '700' },
        ],
        'headline-lg-mobile': [
          '32px',
          { lineHeight: '1.2', fontWeight: '700' },
        ],
        'headline-md': [
          '32px',
          { lineHeight: '1.3', fontWeight: '600' },
        ],
        'headline-sm': [
          '24px',
          { lineHeight: '1.4', fontWeight: '600' },
        ],
        'body-lg': [
          '18px',
          { lineHeight: '1.6', fontWeight: '400' },
        ],
        'body-md': [
          '16px',
          { lineHeight: '1.6', fontWeight: '400' },
        ],
        'label-caps': [
          '14px',
          { lineHeight: '1.0', letterSpacing: '0.15em', fontWeight: '600' },
        ],
        'technical-data': [
          '13px',
          { lineHeight: '1.0', letterSpacing: '0.05em', fontWeight: '500' },
        ],
      },

      // ================================================================
      // MAX WIDTH EXTENSION
      // ================================================================
      maxWidth: {
        'container-max': '1200px',
      },
    },
  },
  plugins: [],
};
