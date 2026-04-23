# 🎨 Visual Effects - CSS Reference Guide

## 1️⃣ White Shadow/Highlight Effect (Org Card)

### Konsep
Menciptakan efek kedalaman 3D dengan "cahaya" dari sisi atas-kiri dan "bayangan" dari sisi bawah-kanan menggunakan `box-shadow` murni.

### CSS Code
```css
.org-card {
  box-shadow: 
    -4px -4px 12px rgba(255, 255, 255, 0.8),  /* Light shadow: offset kiri-atas */
    2px 2px 8px rgba(0, 0, 0, 0.08);          /* Dark shadow: offset kanan-bawah */
  
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.org-card:hover {
  box-shadow: 
    -6px -6px 16px rgba(255, 255, 255, 1),    /* Lebih prominent di hover */
    4px 4px 12px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);                 /* Lift effect */
}
```

### Breakdown
| Bagian | Offset | Blur | Color | Efek |
|--------|--------|------|-------|------|
| Light Shadow | `-4px -4px` | `12px` | `rgba(255,255,255,0.8)` | Cahaya dari top-left |
| Dark Shadow | `2px 2px` | `8px` | `rgba(0,0,0,0.08)` | Bayangan subtle bottom-right |

### Hasil Visual
- Kesan "embossed" atau "raised"
- Card terlihat floating di atas background
- Hover membuat efek lebih prominent

---

## 2️⃣ Org Chart Connectors

### Struktur HTML
```html
<div class="org-node-wrap">
  <div class="org-card"><!-- Card Content --></div>
  <div class="org-children">
    <!-- Pseudo-elements ::before (horizontal line) dan ::after (dot) -->
    <div class="org-connector"></div>  <!-- Vertical line -->
    <!-- Child nodes di sini -->
  </div>
</div>
```

### 📊 Komponen 1: Vertical Connector Line

**Purpose**: Garis vertikal yang menghubungkan parent ke horizontal line

```css
.org-connector {
  position: absolute;
  top: -1.5rem;                    /* Distance to parent */
  left: 50%;
  transform: translateX(-50%);
  width: 2px;                      /* Line thickness */
  height: 1.5rem;                  /* Line length */
  background: linear-gradient(to bottom, var(--blue-primary), var(--blue-primary));
}
```

**Visual**:
```
┌─────────────────┐
│  Parent Card    │
└─────────────────┘
        │  ← org-connector (2px vertical line)
        │
────────┼────────
   Children here
```

---

### 📊 Komponen 2: Horizontal Connector Line

**Purpose**: Garis horizontal yang menghubungkan semua children

```css
.org-children {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  position: relative;
  justify-content: center;
}

.org-children::before {
  content: "";
  position: absolute;
  top: -1.5rem;                    /* Align dengan .org-connector */
  left: 0;                         /* Start dari left edge */
  right: 0;                        /* End di right edge */
  height: 2px;                     /* Line thickness */
  background: linear-gradient(
    90deg, 
    transparent 0%,              /* Fade in */
    var(--blue-primary) 50%,     /* Center full opacity */
    transparent 100%             /* Fade out */
  );
}
```

**Visual**:
```
        │ (vertical line)
─────────────────────  ← org-children::before (horizontal line)
│         │         │
Child1   Child2   Child3
```

---

### 📊 Komponen 3: Junction Dots

**Purpose**: Lingkaran kecil di titik persimpangan vertikal-horizontal

```css
.org-children::after {
  content: "";
  position: absolute;
  top: -1.5rem;                    /* Align dengan garis */
  left: 50%;
  transform: translateX(-50%);     /* Center secara horizontal */
  width: 8px;
  height: 8px;
  background: var(--blue-primary); /* Inner circle */
  border-radius: 50%;              /* Make circle */
  border: 3px solid var(--white);  /* Inner white border */
  box-shadow: 0 0 0 2px var(--blue-primary);  /* Outer blue border */
}
```

**Visual**:
```
         ⊙  ← Junction dot (8px circle with double border)
         │
─────────────────────  ← Horizontal line passes through
│         │         │
```

**Breakdown Dot Design**:
- **Inner**: Blue (`var(--blue-primary)`)
- **Middle**: White border (`border: 3px solid white`)
- **Outer**: Blue ring (`box-shadow: 0 0 0 2px`)
- **Result**: Concentric circles effect

---

## 3️⃣ Grid Background Pattern

### Konsep
Menciptakan pattern grid menggunakan CSS gradients (bukan image) untuk performa lebih baik.

### CSS Code
```css
#management-hero {
  background: linear-gradient(135deg, var(--blue-bg) 0%, var(--blue-primary) 100%);
  position: relative;
  overflow: hidden;
}

#management-hero::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  
  /* Grid pattern menggunakan dual gradients */
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),      /* Horizontal lines */
    linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px); /* Vertical lines */
  
  background-size: 40px 40px;  /* Grid cell size: 40x40px */
  pointer-events: none;         /* Don't interfere with interaction */
}

.management-hero {
  position: relative;
  z-index: 1;  /* Content above grid */
}
```

### Breakdown
| Property | Value | Penjelasan |
|----------|-------|-----------|
| `linear-gradient(...1px, transparent 1px)` | Horizontal | Garis horizontal tebal 1px |
| `linear-gradient(90deg, ..1px, transparent 1px)` | Vertical | Garis vertikal tebal 1px |
| `background-size: 40px 40px` | Grid Size | Satu cell = 40x40 pixels |
| `rgba(255, 255, 255, 0.05)` | Opacity | Subtle white lines (5% opacity) |
| `pointer-events: none` | - | Layer dekoratif tidak blok interaction |

### Visual
```
┌──────────────────────┐
│ ┌┬┬┬┬┬┬┬┬┬┬┬┬┬┬┬┬┬┬┐
│ ├┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┤  Content
│ ├┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┼┤  di atas
│ └┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┴┘
└──────────────────────┘
```

### Customization
```css
/* Ubah ukuran grid */
background-size: 60px 60px;  /* Lebih besar */

/* Ubah warna/opacity */
linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px)  /* Darker grid */

/* Ubah tebal garis */
linear-gradient(rgba(255, 255, 255, 0.05) 2px, transparent 2px)  /* Tebal 2px */
```

---

## 4️⃣ Accordion Animations

### Opening/Closing Animation
```css
.accordion-body {
  max-height: 1000px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.accordion-body[hidden] {
  max-height: 0;
  overflow: hidden;
}
```

**How it works**:
- Default: `max-height: 1000px` (terbuka penuh)
- Hidden: `max-height: 0` (tertutup rapat)
- Transition memberikan efek "slide down/up"
- Cubic-bezier: `(0.4, 0, 0.2, 1)` = easing yang smooth

### Icon Rotation
```css
.accordion-icon {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.accordion-header[aria-expanded="true"] .accordion-icon {
  transform: rotate(180deg);
}
```

**Trigger**: Saat `aria-expanded="true"`, icon dirotasi 180°

### Item Stagger Effect
```css
.accordion-item {
  animation: fadeInUp 0.5s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

Setiap accordion item di-render dengan animasi masuk yang smooth.

---

## 5️⃣ Responsive Typography with clamp()

### Formula
```css
font-size: clamp(MIN, PREFERRED, MAX);
```

### Examples dalam Management Page
```css
/* Hero Title */
.hero-title {
  font-size: clamp(28px, 6vw, 48px);
  /* Mobile (small): 28px
     Tablet (medium): 6% dari viewport width
     Desktop (large): max 48px */
}

/* Hero Subtitle */
.hero-subtitle {
  font-size: clamp(16px, 4vw, 24px);
}

/* Section Titles */
.org-title {
  font-size: clamp(24px, 5vw, 32px);
}

.divisions-title {
  font-size: clamp(24px, 5vw, 32px);
}
```

### Advantage
- ✅ No media queries needed
- ✅ Smooth scaling across all sizes
- ✅ Fewer CSS rules
- ✅ Better performance

### Visual Demo
```
Viewport Width → Font Size
320px (mobile)        → 28px (min)
640px                 → ~38px (6% × 640)
800px                 → 48px (max, capped)
1200px                → 48px (stays max)
```

---

## 6️⃣ Advanced Color Effects

### Gradient Backgrounds
```css
/* Linear gradient untuk sections */
#management-hero {
  background: linear-gradient(135deg, var(--blue-bg) 0%, var(--blue-primary) 100%);
}

#management-divisions {
  background: linear-gradient(135deg, var(--blue-bg) 0%, var(--blue-primary) 100%);
}

/* Gradient dalam avatar */
.org-avatar {
  background: linear-gradient(135deg, var(--blue-primary), var(--blue-bg));
}
```

### Hover State Changes
```css
.org-card:hover {
  box-shadow: 
    -6px -6px 16px rgba(255, 255, 255, 1),  /* More prominent */
    4px 4px 12px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);  /* Lift up */
}

.accordion-header:hover {
  background: linear-gradient(135deg, rgba(88, 123, 180, 0.1), rgba(79, 107, 152, 0.1));
}
```

---

## 7️⃣ Performance Tips

### CSS Optimization
```css
/* ❌ Avoid: Expensive operations on hover */
.org-card:hover {
  box-shadow: /* 3 shadows */;
  transform: /* GPU accelerated */;  /* ✅ This is OK */
  width: /* reflow */;               /* ❌ Avoid this */
}

/* ✅ Use transforms instead of position changes */
transform: translateY(-2px);         /* Fast */
top: -2px;                            /* Slow */

/* ✅ Use will-change sparingly */
.org-card {
  will-change: transform;
}
```

### Animation Performance
```css
/* ✅ Good: CSS animations (GPU accelerated) */
.accordion-body {
  transition: max-height 0.4s ease;
}

/* ❌ Avoid: Too many simultaneous animations */
/* Limit to 3-4 concurrent animations */
```

---

## 🎯 Customization Guide

### Change Primary Colors
Edit `:root` variables:
```css
:root {
  --blue-primary: #587bb4;  /* Change this */
  --blue-bg: #4f6b98;       /* and this */
  --text-white: #eeeeee;    /* and this */
  --card-bg: #f5f5f5;       /* and this */
}
```

### Adjust Shadow Depth
```css
/* Subtle shadows */
--shadow-light: 0 1px 3px rgba(0, 0, 0, 0.05);
--shadow-md: 0 2px 8px rgba(0, 0, 0, 0.08);

/* Deep shadows */
--shadow-light: 0 4px 12px rgba(0, 0, 0, 0.15);
--shadow-md: 0 8px 24px rgba(0, 0, 0, 0.20);
```

### Adjust Border Radius
```css
--radius-lg: 20px;  /* More rounded */
--radius-lg: 8px;   /* More sharp */
```

### Change Animation Speed
```css
--transition: all 0.3s cubic-bezier(...);  /* Change 0.3s */
--transition: all 0.6s cubic-bezier(...);  /* Slower */
--transition: all 0.15s cubic-bezier(...); /* Faster */
```

---

✨ **Semua visual effects menggunakan CSS murni untuk performa optimal!**
