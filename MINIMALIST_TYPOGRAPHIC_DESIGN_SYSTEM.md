# Minimalist Typographic Design System
## Frame & Form Inspired — Preston Chen Portfolio

---

## 🎯 Design Philosophy

**Modern Minimalism Principles:**

- **Typography First**: Large, bold type as the primary design element
- **Whitespace Mastery**: Generous negative space creates sophistication
- **High Contrast**: Pure black on white for maximum clarity
- **Restrained Color**: Monochromatic with subtle gray accents
- **Smooth Interactions**: Gentle transitions enhance UX
- **Content Focus**: Design serves content, not the reverse
- **Vertical Rhythm**: Consistent spacing creates visual cadence
- **Centered Alignment**: Symmetry and balance on desktop
- **Responsive Fluidity**: Graceful scaling across devices

---

## 📝 Typography System

### Font Stack

```css
:root {
  /* Primary Font - Instrument Sans */
  --font-primary: 'Instrument Sans', -apple-system, BlinkMacSystemFont,
                  'Segoe UI', 'Helvetica Neue', 'Arial', sans-serif;

  /* Secondary Font - Figtree */
  --font-secondary: 'Figtree', 'Inter', ui-sans-serif, system-ui, sans-serif;
}
```

**Font Weights:**
- Regular: 400
- Medium: 500
- SemiBold: 600

### Type Scale

```css
/* Display Sizes - Large, impactful typography */
--text-display-xl: 6.5625rem;    /* 105px - Hero display */
--text-display-lg: 5.5rem;       /* 88px - Tablet display */
--text-display-md: 4rem;         /* 64px - Large heading */
--text-display-sm: 2.75rem;      /* 44px - Mobile heading */

/* Heading Sizes */
--text-h1: 2.3125rem;            /* 37px - Desktop H1 */
--text-h1-mobile: 1.5rem;        /* 24px - Mobile H1 */

/* Body Sizes */
--text-body-lg: 1.25rem;         /* 20px - Large body */
--text-body: 1rem;               /* 16px - Base body */
--text-body-sm: 0.9375rem;       /* 15px - Small body */

/* Letter Spacing - Tight tracking for display */
--tracking-display-xl: -5.5125px;  /* Ultra tight for 105px */
--tracking-display-md: -2.048px;   /* Tight for 64px */
--tracking-h1: -0.968px;           /* Subtle for 37px */
--tracking-body: -0.2px;           /* Minimal for body */

/* Line Heights */
--leading-display: 0;              /* Zero for display (use padding) */
--leading-tight: 1.1;              /* Headlines */
--leading-normal: 1.5;             /* Body text */
```

### Typography Classes

```css
/* Display Typography */
.text-display-hero {
  font-size: var(--text-display-xl);
  font-weight: 600;
  letter-spacing: var(--tracking-display-xl);
  line-height: var(--leading-display);
}

.text-display-large {
  font-size: var(--text-display-md);
  font-weight: 600;
  letter-spacing: var(--tracking-display-md);
  line-height: var(--leading-tight);
}

/* Heading Typography */
.text-heading-primary {
  font-size: var(--text-h1);
  font-weight: 500;
  letter-spacing: var(--tracking-h1);
  line-height: var(--leading-tight);
}

/* Body Typography */
.text-body-large {
  font-size: var(--text-body-lg);
  font-weight: 400;
  letter-spacing: var(--tracking-body);
  line-height: var(--leading-normal);
}

.text-body-base {
  font-size: var(--text-body);
  font-weight: 400;
  letter-spacing: var(--tracking-body);
  line-height: var(--leading-normal);
}
```

---

## 🎨 Color System

### Monochromatic Palette

```css
:root {
  /* Base Colors - Ultra Minimal */
  --color-bg: #FFFFFF;           /* Pure white background */
  --color-text: #000000;         /* Pure black text */
  --color-text-muted: #767676;  /* Medium gray for secondary text */

  /* Functional Colors */
  --color-border: #E5E5E5;       /* Subtle borders */
  --color-hover: #F5F5F5;        /* Subtle hover state */
}
```

**Color Usage:**
- **90% Black & White**: Primary palette
- **10% Gray**: Subtle accents and secondary information
- **No bright colors**: Maintains elegant restraint
- **High contrast**: Ensures accessibility (AAA standard)

---

## 📐 Spacing System

### Consistent Spacing Scale

```css
:root {
  /* Base unit: 4px */
  --space-0: 0;
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */
  --space-32: 8rem;     /* 128px */
  --space-40: 10rem;    /* 160px */
}
```

### Vertical Rhythm

**Section Spacing:**
- **Small gap**: 50px (3.125rem) - Between related elements
- **Medium gap**: 80px (5rem) - Between sections
- **Large gap**: 127px (7.9375rem) - Major section breaks
- **Extra large gap**: 150px (9.375rem) - Hero to content

**Content Spacing:**
- **Paragraph margin**: 20px (1.25rem)
- **Element gap**: 16px (1rem)
- **Inline spacing**: 8px (0.5rem)

---

## 🏗️ Layout System

### Responsive Grid

```css
/* Container Widths */
--container-sm: 640px;    /* Mobile landscape */
--container-md: 800px;    /* Tablet */
--container-lg: 1280px;   /* Desktop */
--container-xl: 2048px;   /* Max width */

/* Breakpoints */
--breakpoint-sm: 640px;
--breakpoint-md: 800px;
--breakpoint-lg: 1280px;

/* Padding */
--page-padding-mobile: 15px;
--page-padding-tablet: 30px;
--page-padding-desktop: 60px;
```

### Layout Principles

1. **Mobile-First**: Design starts at 320px
2. **Centered Content**: Desktop content centered with max-width
3. **Generous Padding**: Breathing room on all sides
4. **Vertical Flow**: Stacked sections with clear hierarchy
5. **Symmetry**: Balanced, centered alignment on large screens

---

## 🎬 Animation & Transitions

### Transition System

```css
:root {
  /* Easing Functions */
  --ease-gentle: cubic-bezier(0.4, 0.0, 0.2, 1);
  --ease-standard: ease-in-out;

  /* Durations */
  --duration-instant: 0ms;
  --duration-fast: 150ms;
  --duration-base: 200ms;
  --duration-slow: 300ms;
}

/* Standard Transition */
.transition-standard {
  transition: all var(--duration-base) var(--ease-standard);
}

/* Transform Transition (for hover) */
.transition-transform {
  transition: transform var(--duration-base) var(--ease-standard);
}

/* Opacity Fade */
.transition-opacity {
  transition: opacity var(--duration-base) var(--ease-standard);
}
```

### Hover States

```css
/* Subtle scale on hover */
.hover-lift:hover {
  transform: translateY(-2px);
}

/* Opacity change */
.hover-fade:hover {
  opacity: 0.7;
}

/* Underline reveal */
.hover-underline {
  position: relative;
}

.hover-underline::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--color-text);
  transition: width var(--duration-base) var(--ease-standard);
}

.hover-underline:hover::after {
  width: 100%;
}
```

---

## 🖼️ Component Patterns

### Typographic Hero

```tsx
// Large, centered typographic header
<section className="hero">
  <div className="container">
    <h1 className="text-display-hero text-center">
      Preston Chen
    </h1>
    <p className="text-body-large text-center text-muted mt-6">
      Frontend Design Engineer
    </p>
    <p className="text-body-base text-center text-muted mt-4 max-w-2xl mx-auto">
      Bridging design and development with 8+ years of experience building
      design systems, component libraries, and thoughtful user interfaces.
    </p>
  </div>
</section>
```

**Characteristics:**
- Ultra-large display type (105px on desktop)
- Centered alignment
- Generous line spacing
- Muted secondary text
- Max-width for readability (2xl = ~672px)

### Slow-Scrolling Gallery

**Horizontal Auto-Scroll Component:**

```tsx
// Infinite horizontal scroll of project cards
<section className="gallery-section">
  <div className="gallery-track">
    {projects.concat(projects).map((project, i) => (
      <article key={i} className="gallery-card">
        <img src={project.image} alt={project.title} />
        <h3 className="text-heading-primary mt-4">{project.title}</h3>
        <p className="text-body-base text-muted mt-2">{project.company}</p>
      </article>
    ))}
  </div>
</section>
```

**Animation:**
```css
@keyframes scroll-horizontal {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

.gallery-track {
  display: flex;
  gap: 2rem;
  animation: scroll-horizontal 60s linear infinite;
  will-change: transform;
}

.gallery-track:hover {
  animation-play-state: paused;
}
```

**Features:**
- Slow, continuous horizontal scroll (60s duration)
- Pause on hover for interaction
- Duplicated items for seamless loop
- Cards with images and minimal text
- Smooth, infinite animation

---

## 📱 Responsive Behavior

### Typography Scaling

```css
/* Hero Display - Responsive */
.text-display-hero {
  font-size: 2.75rem;  /* 44px mobile */

  @media (min-width: 800px) {
    font-size: 5.5rem;  /* 88px tablet */
  }

  @media (min-width: 1280px) {
    font-size: 6.5625rem;  /* 105px desktop */
  }
}

/* Heading - Responsive */
.text-heading-primary {
  font-size: 1.5rem;  /* 24px mobile */

  @media (min-width: 1280px) {
    font-size: 2.3125rem;  /* 37px desktop */
  }
}
```

### Layout Adjustments

```css
/* Padding scales with viewport */
.container {
  padding-left: var(--page-padding-mobile);
  padding-right: var(--page-padding-mobile);

  @media (min-width: 800px) {
    padding-left: var(--page-padding-tablet);
    padding-right: var(--page-padding-tablet);
  }

  @media (min-width: 1280px) {
    padding-left: var(--page-padding-desktop);
    padding-right: var(--page-padding-desktop);
  }
}
```

---

## ✨ Design Principles Summary

1. **Typography Hierarchy**: Use extreme size contrast (105px vs 16px)
2. **Generous Whitespace**: 80-150px gaps between sections
3. **Minimal Color**: Black, white, one gray (#767676)
4. **Smooth Motion**: 200ms ease-in-out for all transitions
5. **Centered Focus**: Symmetrical layouts on desktop
6. **Mobile-First**: Scale up gracefully from 320px
7. **Content-Driven**: Let work speak through imagery
8. **Accessible**: AAA contrast, readable line lengths
9. **Performance**: Will-change for animations, GPU acceleration
10. **Elegance**: Less is more — every element earns its place

---

This minimalist typographic system emphasizes **clarity, elegance, and focus**—perfect for a Frontend Design Engineer who values both aesthetic refinement and technical precision. The large typography makes a bold statement while generous whitespace creates breathing room for your work to shine.
