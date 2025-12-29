# Swiss Design System
## International Typographic Style for Preston Chen Portfolio

---

## 🎨 Design Philosophy

**Swiss Design Principles (International Typographic Style):**

- **Grid-Based Layouts**: Rigorous mathematical grids for structure and order
- **Sans-Serif Typography**: Clean, neutral typefaces (Helvetica, Univers, Akzidenz-Grotesk)
- **Asymmetric Layouts**: Dynamic balance through asymmetry
- **Whitespace as Design Element**: Generous negative space for breathing room
- **Objective Photography**: Factual, documentary-style imagery
- **Flush Left, Ragged Right**: Natural reading rhythm
- **Limited Color Palette**: Primary focus on black, white, red as accent
- **Mathematical Precision**: Everything aligned to grid and baseline
- **Content is King**: Form follows function, clarity over decoration
- **Modular Scale**: Harmonious relationships between elements

---

## 🎨 Color System

### Swiss Design Palette

```css
:root {
  /* Primary Colors - Classic Swiss */
  --swiss-white: #FFFFFF;          /* Pure white */
  --swiss-black: #000000;          /* Pure black */
  --swiss-red: #FF0000;            /* Primary red accent */
  --swiss-gray-100: #F5F5F5;       /* Lightest gray */
  --swiss-gray-200: #E5E5E5;       /* Light gray */
  --swiss-gray-300: #CCCCCC;       /* Medium light gray */
  --swiss-gray-400: #999999;       /* Medium gray */
  --swiss-gray-500: #666666;       /* Dark gray */
  --swiss-gray-600: #333333;       /* Darker gray */

  /* Extended Palette (Optional) */
  --swiss-blue: #0000FF;           /* Primary blue */
  --swiss-yellow: #FFFF00;         /* Primary yellow */

  /* Functional Colors */
  --color-background: var(--swiss-white);
  --color-text: var(--swiss-black);
  --color-accent: var(--swiss-red);
  --color-grid: var(--swiss-gray-200);
  --color-divider: var(--swiss-gray-300);
}

/* Dark Mode (Inverted Swiss) */
[data-theme="dark"] {
  --color-background: var(--swiss-black);
  --color-text: var(--swiss-white);
  --color-grid: var(--swiss-gray-600);
  --color-divider: var(--swiss-gray-500);
}
```

### Color Usage Guidelines

**Red Accent (`#FF0000`):**
- Sparingly used for emphasis
- Interactive elements (links, buttons)
- Section headers or key information
- Navigation active states
- Important callouts
- Maximum 10% of design real estate

**Black & White:**
- 80% of design should be black text on white background
- High contrast for maximum legibility
- No gradients, no shadows (flat design)

**Gray Scale:**
- For secondary information
- Dividers and grid lines
- Disabled states
- Subtle backgrounds

---

## 📝 Typography

### Font System (Swiss Sans-Serif Hierarchy)

```css
:root {
  /* Primary Font - Helvetica Neue (or fallbacks) */
  --font-primary: 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif;

  /* Alternative - Univers-inspired */
  --font-alt: -apple-system, BlinkMacSystemFont, 'Inter', sans-serif;

  /* Monospace - For technical content */
  --font-mono: 'Courier New', 'Courier', monospace;
}
```

### Modular Type Scale (Mathematical Ratio: 1.25 - Major Third)

```css
/* Base: 16px, Scale: 1.25 (Major Third) */
--text-xs: 0.64rem;      /* 10.24px - Fine print */
--text-sm: 0.8rem;       /* 12.8px - Small text */
--text-base: 1rem;       /* 16px - Body text */
--text-md: 1.25rem;      /* 20px - Large body */
--text-lg: 1.563rem;     /* 25px - H4 */
--text-xl: 1.953rem;     /* 31.25px - H3 */
--text-2xl: 2.441rem;    /* 39px - H2 */
--text-3xl: 3.052rem;    /* 48.83px - H1 */
--text-4xl: 3.815rem;    /* 61px - Display */
--text-5xl: 4.768rem;    /* 76.29px - Hero */

/* Font Weights (Limited, Swiss style) */
--weight-light: 300;
--weight-regular: 400;
--weight-medium: 500;
--weight-bold: 700;

/* Line Heights (Modular) */
--leading-tight: 1.2;     /* Headlines */
--leading-normal: 1.5;    /* Body text */
--leading-relaxed: 1.618; /* Golden ratio for emphasis */

/* Letter Spacing */
--tracking-tight: -0.02em;
--tracking-normal: 0;
--tracking-wide: 0.05em;
--tracking-wider: 0.1em;  /* For uppercase */
```

### Typography Rules

1. **All Caps for Headers**: Use uppercase sparingly for emphasis
2. **Flush Left**: All text aligned left, ragged right
3. **No Centering**: Except for specific cases (logos)
4. **Consistent Leading**: Maintain baseline grid alignment
5. **Paragraph Spacing**: 1.5x line height
6. **Hanging Punctuation**: Optical alignment for quotes
7. **No Widows/Orphans**: Proper text wrapping

```css
/* Swiss Typography Base */
body {
  font-family: var(--font-primary);
  font-size: var(--text-base);
  line-height: var(--leading-normal);
  color: var(--color-text);
  text-align: left;
}

h1, h2, h3, h4, h5, h6 {
  font-weight: var(--weight-bold);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
  margin-bottom: 1.5rem;
}

h1 { font-size: var(--text-3xl); }
h2 { font-size: var(--text-2xl); }
h3 { font-size: var(--text-xl); }
h4 { font-size: var(--text-lg); }

p {
  margin-bottom: 1.5rem;
  max-width: 65ch; /* Optimal reading width */
}

/* Uppercase Headers */
.header-caps {
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
  font-weight: var(--weight-bold);
}
```

---

## 📐 Grid System

### Swiss Grid (Modular Grid System)

```css
/* Base Grid Unit */
--grid-unit: 8px;
--baseline: 24px;  /* 1.5rem baseline grid */

/* Column System (12-column) */
--grid-columns: 12;
--grid-gutter: calc(var(--grid-unit) * 3); /* 24px */
--grid-margin: calc(var(--grid-unit) * 6);  /* 48px */

/* Container Widths */
--container-narrow: 640px;   /* 8 columns */
--container-medium: 960px;   /* 10 columns */
--container-wide: 1280px;    /* 12 columns */
--container-full: 100%;

/* Responsive Breakpoints */
--breakpoint-sm: 640px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
```

### Grid Layout Implementation

```css
/* Swiss Grid Container */
.swiss-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--grid-gutter);
  padding: 0 var(--grid-margin);
  max-width: var(--container-wide);
  margin: 0 auto;
}

/* Column Spans */
.col-1 { grid-column: span 1; }
.col-2 { grid-column: span 2; }
.col-3 { grid-column: span 3; }
.col-4 { grid-column: span 4; }
.col-5 { grid-column: span 5; }
.col-6 { grid-column: span 6; }
.col-7 { grid-column: span 7; }
.col-8 { grid-column: span 8; }
.col-9 { grid-column: span 9; }
.col-10 { grid-column: span 10; }
.col-11 { grid-column: span 11; }
.col-12 { grid-column: span 12; }

/* Asymmetric Layout Example */
.layout-asymmetric {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: var(--grid-gutter);
}

/* Content + Sidebar Layout */
.layout-sidebar {
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: calc(var(--grid-gutter) * 2);
}
```

### Baseline Grid

```css
/* Maintain vertical rhythm */
* {
  box-sizing: border-box;
}

/* All vertical spacing in multiples of baseline */
.spacing-1 { margin-bottom: var(--baseline); }        /* 24px */
.spacing-2 { margin-bottom: calc(var(--baseline) * 2); } /* 48px */
.spacing-3 { margin-bottom: calc(var(--baseline) * 3); } /* 72px */
.spacing-4 { margin-bottom: calc(var(--baseline) * 4); } /* 96px */
```

---

## 📏 Spacing System (8px Base Unit)

```css
/* Modular Spacing Scale */
--space-0: 0;
--space-1: calc(var(--grid-unit) * 1);    /* 8px */
--space-2: calc(var(--grid-unit) * 2);    /* 16px */
--space-3: calc(var(--grid-unit) * 3);    /* 24px */
--space-4: calc(var(--grid-unit) * 4);    /* 32px */
--space-5: calc(var(--grid-unit) * 5);    /* 40px */
--space-6: calc(var(--grid-unit) * 6);    /* 48px */
--space-8: calc(var(--grid-unit) * 8);    /* 64px */
--space-10: calc(var(--grid-unit) * 10);  /* 80px */
--space-12: calc(var(--grid-unit) * 12);  /* 96px */
--space-16: calc(var(--grid-unit) * 16);  /* 128px */

/* Section Spacing */
--section-padding: var(--space-12);
--element-spacing: var(--space-3);
```

---

## 🧩 Component Patterns

### Buttons (Swiss Style)

```css
/* Primary Button - Red Accent */
.btn-swiss-primary {
  background: var(--swiss-red);
  color: var(--swiss-white);
  border: none;
  padding: var(--space-2) var(--space-4);
  font-family: var(--font-primary);
  font-size: var(--text-base);
  font-weight: var(--weight-bold);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
  cursor: pointer;
  transition: none; /* No animations in pure Swiss */
}

.btn-swiss-primary:hover {
  background: var(--swiss-black);
}

/* Outline Button */
.btn-swiss-outline {
  background: transparent;
  color: var(--swiss-black);
  border: 2px solid var(--swiss-black);
  padding: var(--space-2) var(--space-4);
  font-weight: var(--weight-bold);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
}

.btn-swiss-outline:hover {
  background: var(--swiss-black);
  color: var(--swiss-white);
}

/* Text Button */
.btn-swiss-text {
  background: none;
  border: none;
  color: var(--swiss-red);
  text-decoration: underline;
  font-weight: var(--weight-bold);
  cursor: pointer;
}
```

### Cards (Minimal Swiss Containers)

```css
.card-swiss {
  background: var(--swiss-white);
  border: 1px solid var(--swiss-black);
  padding: var(--space-4);
}

/* No rounded corners - sharp edges */
.card-swiss,
.btn-swiss-primary,
.btn-swiss-outline {
  border-radius: 0;
}

/* Grid of Cards */
.card-grid-swiss {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--grid-gutter);
}
```

### Navigation (Swiss Style)

```css
/* Horizontal Navigation */
.nav-swiss {
  display: flex;
  gap: var(--space-4);
  padding: var(--space-3) 0;
  border-bottom: 1px solid var(--swiss-black);
}

.nav-swiss-link {
  color: var(--swiss-black);
  text-decoration: none;
  font-weight: var(--weight-regular);
  text-transform: uppercase;
  font-size: var(--text-sm);
  letter-spacing: var(--tracking-wide);
}

.nav-swiss-link:hover {
  color: var(--swiss-red);
}

.nav-swiss-link-active {
  color: var(--swiss-red);
  font-weight: var(--weight-bold);
}

/* Vertical Navigation (Sidebar) */
.nav-swiss-vertical {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.nav-swiss-vertical .nav-swiss-link {
  padding: var(--space-1) 0;
  border-bottom: 1px solid var(--swiss-gray-200);
}
```

### Typography Lockup

```css
/* Swiss Style Hero */
.hero-swiss {
  padding: var(--space-12) 0;
}

.hero-swiss h1 {
  font-size: var(--text-5xl);
  font-weight: var(--weight-bold);
  line-height: 1;
  margin-bottom: var(--space-2);
}

.hero-swiss .subtitle {
  font-size: var(--text-xl);
  font-weight: var(--weight-regular);
  color: var(--swiss-red);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
}

/* Section Header with Rule */
.section-header-swiss {
  margin-bottom: var(--space-6);
  padding-bottom: var(--space-2);
  border-bottom: 2px solid var(--swiss-black);
}

.section-header-swiss h2 {
  font-size: var(--text-2xl);
  font-weight: var(--weight-bold);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
  margin: 0;
}
```

### Lists (Structured Information)

```css
/* Clean List Style */
.list-swiss {
  list-style: none;
  padding: 0;
  margin: 0;
}

.list-swiss li {
  padding: var(--space-2) 0;
  border-bottom: 1px solid var(--swiss-gray-200);
}

.list-swiss li:last-child {
  border-bottom: none;
}

/* Numbered List (Swiss Style) */
.list-swiss-numbered {
  counter-reset: swiss-counter;
  list-style: none;
  padding: 0;
}

.list-swiss-numbered li {
  counter-increment: swiss-counter;
  position: relative;
  padding-left: var(--space-6);
  margin-bottom: var(--space-2);
}

.list-swiss-numbered li::before {
  content: counter(swiss-counter, decimal-leading-zero);
  position: absolute;
  left: 0;
  font-weight: var(--weight-bold);
  color: var(--swiss-red);
}
```

### Tables (Information Design)

```css
.table-swiss {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--text-sm);
}

.table-swiss th {
  text-align: left;
  font-weight: var(--weight-bold);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
  padding: var(--space-2);
  border-bottom: 2px solid var(--swiss-black);
}

.table-swiss td {
  padding: var(--space-2);
  border-bottom: 1px solid var(--swiss-gray-200);
}

.table-swiss tr:hover {
  background: var(--swiss-gray-100);
}
```

---

## 🎭 Visual Principles

### No Decorative Elements

```css
/* NO rounded corners */
* {
  border-radius: 0 !important;
}

/* NO shadows */
* {
  box-shadow: none !important;
}

/* NO gradients */
/* Only solid colors allowed */

/* NO textures or patterns */
/* Clean, flat surfaces only */
```

### Borders & Lines

```css
/* Use lines for structure */
.divider-swiss {
  height: 1px;
  background: var(--swiss-black);
  margin: var(--space-6) 0;
}

.divider-swiss-thick {
  height: 2px;
  background: var(--swiss-black);
}

.divider-swiss-red {
  height: 2px;
  background: var(--swiss-red);
}

/* Horizontal Rules */
hr {
  border: none;
  height: 1px;
  background: var(--swiss-black);
  margin: var(--space-6) 0;
}
```

### Red Accent Blocks

```css
/* Red Rectangle Accent */
.accent-block-red {
  width: 100%;
  height: var(--space-2);
  background: var(--swiss-red);
  margin: var(--space-4) 0;
}

/* Small Red Square */
.accent-square {
  width: var(--space-3);
  height: var(--space-3);
  background: var(--swiss-red);
  display: inline-block;
  margin-right: var(--space-2);
}

/* Red Border Highlight */
.highlight-red {
  border-left: 4px solid var(--swiss-red);
  padding-left: var(--space-3);
}
```

---

## ⚡ Animation & Motion

### Swiss Design = No Animation

Pure Swiss design traditionally avoids animation. However, for web:

```css
/* Minimal, functional transitions only */
:root {
  --transition-fast: 150ms;
  --transition-medium: 200ms;
}

/* Only for interactive feedback */
a, button {
  transition: color var(--transition-fast) linear;
}

/* NO:
- Fades
- Slides
- Bounces
- Rotations
- Complex easings
*/

/* If animation is necessary, use linear timing */
.functional-transition {
  transition: all 150ms linear;
}
```

---

## 📱 Responsive Design (Grid-Based)

```css
/* Mobile First Approach */
.swiss-grid {
  grid-template-columns: repeat(4, 1fr); /* 4 cols mobile */
}

@media (min-width: 640px) {
  .swiss-grid {
    grid-template-columns: repeat(8, 1fr); /* 8 cols tablet */
  }
}

@media (min-width: 1024px) {
  .swiss-grid {
    grid-template-columns: repeat(12, 1fr); /* 12 cols desktop */
  }
}

/* Stack Columns on Mobile */
.col-md-6 {
  grid-column: span 12;
}

@media (min-width: 768px) {
  .col-md-6 {
    grid-column: span 6;
  }
}
```

---

## 🎯 Implementation for Preston Chen Portfolio

### Swiss-Style Hero Section

```tsx
<section className="hero-swiss">
  <div className="swiss-grid">
    <div className="col-8">
      <div className="accent-square"></div>
      <h1>PRESTON CHEN</h1>
      <p className="subtitle">Frontend Design Engineer</p>
      <div className="divider-swiss-red"></div>
      <p className="text-lg">
        Bridging design and development with 8+ years of experience.
        BA in Graphic Design + deep expertise in React, TypeScript,
        and modern animation libraries.
      </p>
    </div>
  </div>
</section>
```

### Project Grid (Asymmetric Layout)

```tsx
<section className="swiss-grid">
  <div className="col-4">
    <h2 className="header-caps">Selected Work</h2>
    <p>Showcasing design systems and component libraries</p>
  </div>
  <div className="col-8">
    <div className="card-grid-swiss">
      {projects.map((project, i) => (
        <article key={i} className="card-swiss">
          <span className="text-xs">{String(i + 1).padStart(2, '0')}</span>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <a href={project.url} className="btn-swiss-text">
            View Project →
          </a>
        </article>
      ))}
    </div>
  </div>
</section>
```

### Skills Section (Structured List)

```tsx
<section className="swiss-grid">
  <div className="col-6">
    <div className="section-header-swiss">
      <h2>Design</h2>
    </div>
    <ul className="list-swiss">
      <li>Figma / Adobe Creative Suite</li>
      <li>UI/UX Design</li>
      <li>Design Systems</li>
      <li>Prototyping</li>
    </ul>
  </div>
  <div className="col-6">
    <div className="section-header-swiss">
      <h2>Engineering</h2>
    </div>
    <ul className="list-swiss">
      <li>React / TypeScript</li>
      <li>Next.js / Node.js</li>
      <li>Framer Motion / Three.js</li>
      <li>GraphQL / REST APIs</li>
    </ul>
  </div>
</section>
```

### Contact Section (Clean Layout)

```tsx
<section className="swiss-grid">
  <div className="col-12">
    <div className="divider-swiss-thick"></div>
  </div>
  <div className="col-4">
    <h2 className="header-caps">Get in Touch</h2>
  </div>
  <div className="col-8">
    <p className="text-lg">
      Available for frontend design engineering roles
    </p>
    <button className="btn-swiss-primary">
      pchen415@gmail.com
    </button>
  </div>
</section>
```

---

## 📐 Tailwind Config (Swiss Design)

```javascript
module.exports = {
  theme: {
    colors: {
      white: '#FFFFFF',
      black: '#000000',
      red: '#FF0000',
      gray: {
        100: '#F5F5F5',
        200: '#E5E5E5',
        300: '#CCCCCC',
        400: '#999999',
        500: '#666666',
        600: '#333333',
      }
    },
    fontFamily: {
      sans: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
    },
    fontSize: {
      xs: '0.64rem',
      sm: '0.8rem',
      base: '1rem',
      md: '1.25rem',
      lg: '1.563rem',
      xl: '1.953rem',
      '2xl': '2.441rem',
      '3xl': '3.052rem',
      '4xl': '3.815rem',
      '5xl': '4.768rem',
    },
    borderRadius: {
      none: '0',
    },
    boxShadow: {
      none: 'none',
    },
  }
}
```

---

## 🎯 Key Swiss Design Rules

1. ✅ **Grid is Law**: Everything aligns to 8px grid and baseline
2. ✅ **Sans-Serif Only**: Helvetica or similar neutral typeface
3. ✅ **Flush Left**: All text aligned left, never centered
4. ✅ **Red for Accent**: Use sparingly (max 10% of design)
5. ✅ **No Rounded Corners**: Sharp, clean edges always
6. ✅ **No Shadows**: Flat design, no depth tricks
7. ✅ **Asymmetric Balance**: Dynamic layouts through mathematical grids
8. ✅ **Whitespace**: Generous margins and breathing room
9. ✅ **Objective Photography**: Factual, documentary-style images
10. ✅ **Typography as Hero**: Let the type speak

---

## 📚 Swiss Design References

**Influential Designers:**
- Josef Müller-Brockmann
- Max Bill
- Armin Hofmann
- Emil Ruder
- Massimo Vignelli

**Classic Examples:**
- Swiss International Airlines branding
- New York City Subway signage (Vignelli)
- Braun product design (Dieter Rams)
- International Typographic Style posters

**Modern Digital Examples:**
- Stripe's documentation
- Linear app interface
- Swiss Style in Web Design movement

---

## 💡 Why Swiss Design for a Design Engineer Portfolio?

1. **Shows Design Literacy**: Understanding of foundational design principles
2. **Highlights Systems Thinking**: Grid systems = component systems
3. **Mathematical Precision**: Appeals to engineering mindset
4. **Timeless Aesthetic**: Never goes out of style
5. **Content Focus**: Work speaks for itself without decoration
6. **Professional**: Serious, authoritative, trustworthy
7. **Demonstrates Restraint**: Knowing what NOT to design

---

## 🎨 Modern Swiss Influence: Rauno Freiberg Approach

**Inspired by: [Rauno.me](https://rauno.me/)**

### Key Design Decisions from Rauno's Portfolio:

1. **Philosophy-First Design**
```tsx
// Manifesto/Philosophy Section
<section className="manifesto-swiss">
  <h2 className="text-2xl font-bold">Design Philosophy</h2>
  <ul className="list-swiss-numbered">
    <li>Make it fast</li>
    <li>Make it beautiful</li>
    <li>Make it accessible</li>
    <li>Make it carefully</li>
  </ul>
</section>
```

2. **Geometric Accent Elements**
```css
/* Colored circles as visual rhythm (Rauno style) */
.accent-circle-yellow {
  width: 40px;
  height: 40px;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  background: #FFD700; /* Yellow */
  display: inline-block;
}

.accent-circle-orange {
  width: 40px;
  height: 40px;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  background: #FF6B35; /* Orange */
  display: inline-block;
}

/* Break Swiss "no rounded corners" rule intentionally for accents */
```

3. **Modern Easing Curve**
```css
/* Rauno's snappy easing */
--ease-rauno: cubic-bezier(0.2, 0.8, 0.2, 1);

.modern-swiss-transition {
  transition: all 200ms cubic-bezier(0.2, 0.8, 0.2, 1);
}
```

4. **System Font Stack (Modern Swiss)**
```css
--font-modern-swiss: -apple-system, BlinkMacSystemFont,
                     'Segoe UI', 'Helvetica Neue',
                     'Arial', sans-serif;
--font-mono-modern: 'JetBrains Mono', 'Courier New', monospace;
```

5. **Gray Scale System (12-step)**
```css
/* More nuanced than pure Swiss B&W */
--gray-1: #FCFCFC;
--gray-2: #F9F9F9;
--gray-3: #F0F0F0;
--gray-4: #E8E8E8;
--gray-5: #E0E0E0;
--gray-6: #D1D1D1;
--gray-7: #B4B4B4;
--gray-8: #8E8E8E;
--gray-9: #6B6B6B;
--gray-10: #4A4A4A;
--gray-11: #2E2E2E;
--gray-12: #1A1A1A;
```

6. **Content-First Navigation Hub**
```tsx
<nav className="nav-hub-swiss">
  <h2 className="header-caps">Navigate</h2>
  <ul className="list-swiss">
    <li>
      <a href="#work" className="nav-link-modern">
        <span className="accent-circle-yellow"></span>
        Selected Work
      </a>
    </li>
    <li>
      <a href="#craft" className="nav-link-modern">
        <span className="accent-circle-orange"></span>
        Craft & Process
      </a>
    </li>
    <li>
      <a href="#about" className="nav-link-modern">
        <span className="accent-square"></span>
        About & Contact
      </a>
    </li>
  </ul>
</nav>
```

7. **Micro-interactions with Feedback**
```tsx
// Copy-to-clipboard with feedback
const [copied, setCopied] = useState(false);

<button
  onClick={handleCopy}
  className="btn-swiss-text"
>
  {copied ? 'Copied!' : 'pchen415@gmail.com'}
</button>
```

8. **Carefully Crafted Details**
```css
/* Intentional spacing for breathing room */
.section-modern-swiss {
  padding: calc(var(--space-12) * 2) 0; /* Extra generous */
  max-width: 680px; /* Optimal reading width */
  margin: 0 auto;
}

/* Precise alignment */
.content-aligned {
  display: flex;
  align-items: baseline;
  gap: var(--space-2);
}
```

### Modern Swiss Portfolio Hero (Rauno-inspired)

```tsx
<section className="hero-modern-swiss">
  <div className="swiss-grid">
    <div className="col-8">
      {/* Geometric accent */}
      <div className="flex items-center gap-4 mb-6">
        <div className="accent-circle-yellow"></div>
        <div className="accent-circle-orange"></div>
      </div>

      {/* Name */}
      <h1 className="text-5xl font-bold mb-2">
        Preston Chen
      </h1>

      {/* Role */}
      <p className="text-2xl text-gray-9 mb-8">
        Frontend Design Engineer
      </p>

      {/* Philosophy */}
      <div className="manifesto-modern">
        <p className="text-lg">
          I bridge design and development.
          <br />
          I build systems, not just features.
          <br />
          I make it fast. I make it beautiful.
          <br />
          <strong>I make it carefully.</strong>
        </p>
      </div>
    </div>
  </div>
</section>
```

### Work Grid (Modern Swiss + Rauno)

```tsx
<section className="work-section-modern">
  <div className="swiss-grid">
    {/* Section header with accent */}
    <div className="col-12 mb-12">
      <div className="flex items-center gap-3">
        <div className="accent-square"></div>
        <h2 className="header-caps">Selected Work</h2>
      </div>
    </div>

    {/* Project cards */}
    {projects.map((project, i) => (
      <div key={i} className="col-4">
        <article className="card-modern-swiss">
          {/* Number indicator */}
          <span className="project-number">
            {String(i + 1).padStart(2, '0')}
          </span>

          {/* Content */}
          <h3 className="text-xl font-bold mb-2">
            {project.title}
          </h3>
          <p className="text-gray-9 mb-4">
            {project.description}
          </p>

          {/* Tags */}
          <div className="tags-swiss">
            {project.tags.map(tag => (
              <span key={tag} className="tag-swiss">
                {tag}
              </span>
            ))}
          </div>
        </article>
      </div>
    ))}
  </div>
</section>
```

### Additional Modern Swiss Components

```css
/* Tag system */
.tag-swiss {
  display: inline-block;
  padding: var(--space-1) var(--space-2);
  background: var(--gray-2);
  border: 1px solid var(--gray-4);
  font-size: var(--text-xs);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wide);
  margin-right: var(--space-1);
  margin-bottom: var(--space-1);
}

/* Modern card with subtle hover */
.card-modern-swiss {
  padding: var(--space-4);
  border: 1px solid var(--gray-3);
  background: var(--swiss-white);
  transition: border-color 200ms var(--ease-rauno);
}

.card-modern-swiss:hover {
  border-color: var(--swiss-red);
}

/* Project number */
.project-number {
  display: block;
  font-size: var(--text-xs);
  color: var(--gray-7);
  font-weight: var(--weight-bold);
  margin-bottom: var(--space-2);
}
```

---

## 🎯 Modern Swiss Design Principles (2025)

**Traditional Swiss + Modern Web:**

1. ✅ Grid System → Component System
2. ✅ Helvetica → System Font Stack
3. ✅ Pure B&W → 12-step Gray Scale
4. ✅ No Animation → Intentional, Fast Transitions
5. ✅ No Rounded Corners → Except Geometric Accents
6. ✅ Red Accent → Red + Geometric Shapes (Yellow/Orange)
7. ✅ Asymmetry → Flex/Grid Balance
8. ✅ Typography First → + Micro-interactions
9. ✅ No Decoration → Except Meaningful Geometry
10. ✅ "Make it carefully" → Design Philosophy as Content

---

This modern interpretation maintains Swiss rigor while embracing contemporary web patterns, inspired by Rauno's carefully crafted approach to minimalist portfolio design.

---

This Swiss Design system emphasizes clarity, precision, and systematic thinking—perfect for a Frontend Design Engineer who bridges design and code. The grid-based approach mirrors component-based thinking, and the minimal aesthetic lets your work take center stage.
