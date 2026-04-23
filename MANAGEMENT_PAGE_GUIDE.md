# Management Page - Implementation Guide

## 📋 Daftar Isi
1. [Struktur File](#struktur-file)
2. [Fitur Utama](#fitur-utama)
3. [Responsive Design](#responsive-design)
4. [Variabel CSS](#variabel-css)
5. [Cara Menggunakan](#cara-menggunakan)

---

## 📁 Struktur File

```
src/management/
├── management.js       # Logic & render functions
└── management.css      # Styling (Mobile-First)

management.html        # Entry point HTML
```

---

## ✨ Fitur Utama

### 1. **Hero Section**
- Gradient background (Blue Primary → Blue BG)
- Grid pattern background dengan opacity
- Responsive typography menggunakan `clamp()`
- Animasi slide-in pada load

**Elemen:**
- Title: "Management Encasa"
- Subtitle: "A team that keep encasa running well"

### 2. **Organizational Chart**
- Struktur pohon organisasi dengan parent-child relationship
- **White Shadow/Highlight Effect:**
  - Menggunakan `box-shadow` dengan warna putih `-4px -4px 12px rgba(255, 255, 255, 0.8)`
  - Efek glow di sisi atas dan kiri
  - Hover effect yang lebih prominent

- **Connectors & Dots:**
  - Garis vertikal penghubung (`.org-connector`)
  - Garis horizontal (`.org-children::before`)
  - Dot/lingkaran di titik persimpangan (`.org-children::after`)
  - Dot berdiameter 8px dengan border putih

- **Horizontal Scrolling pada Mobile**
- Responsive pada layar desktop (flex layout normal)

### 3. **Divisions Accordion**
- Grid layout yang responsive
- Mobile: 1 kolom
- Tablet (≥640px): 2 kolom
- Desktop: 2 kolom

**Fitur Accordion:**
- Smooth opening/closing animation
- Icon rotation saat terbuka
- Member list dengan bullet points
- Hanya satu accordion yang bisa terbuka sekaligus

---

## 📱 Responsive Design

### Mobile-First Approach

| Breakpoint | Width | Layout |
|-----------|-------|--------|
| Mobile | < 640px | 1 kolom, padding 1rem |
| Tablet | ≥ 640px | 2 kolom, padding 1rem |
| Desktop | ≥ 1024px | 2 kolom, padding 2rem |
| Large | ≥ 1440px | 2 kolom, padding 4rem |

**Org Chart Responsiveness:**
- Mobile: Horizontal scroll enabled
- Desktop: Full display dengan flex layout

### Responsive Typography
```css
.hero-title {
  font-size: clamp(28px, 6vw, 48px);
}
```

---

## 🎨 Variabel CSS

```css
:root {
  /* Colors */
  --blue-primary: #587bb4;       /* Primary blue */
  --blue-bg: #4f6b98;            /* Background blue */
  --text-white: #eeeeee;         /* Light text */
  --card-bg: #f5f5f5;            /* Card background */
  --text-dark: #333333;          /* Dark text */
  --text-muted: #666666;         /* Muted text */
  
  /* Shadows */
  --shadow-light: 0 2px 8px rgba(0, 0, 0, 0.08);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.12);
  
  /* Radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;
  
  /* Transitions */
  --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## 🚀 Cara Menggunakan

### 1. **Running Development Server**
```bash
npm run dev
# atau
yarn dev
```

### 2. **Build untuk Production**
```bash
npm run build
# atau
yarn build
```

### 3. **Update Data Organisasi**

Edit di `management.js`:
```javascript
const managementData = {
  hero: {
    title: "Your Title",
    subtitle: "Your Subtitle"
  },
  
  orgChart: [
    { 
      id: "unique-id",
      name: "Nama",
      role: "Jabatan",
      parentId: "parent-id" // null untuk root
    }
  ],
  
  divisions: [
    {
      id: "div-id",
      name: "Division Name",
      members: ["Member 1", "Member 2"]
    }
  ]
};
```

### 4. **Kustomisasi Styling**

Edit di `management.css`:
- Ubah warna di `:root` variables
- Modify breakpoints di media queries
- Customize shadows, radius, transitions

---

## 🎯 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## ♿ Accessibility Features

- Semantic HTML (`<main>`, `<section>`, `<footer>`)
- ARIA attributes (`aria-expanded`, `aria-label`)
- Focus styles untuk keyboard navigation
- Support untuk `prefers-reduced-motion`
- Dark mode support dengan `prefers-color-scheme`

---

## 🔧 Teknologi yang Digunakan

- **Vanilla JavaScript** (ES6+)
- **CSS3** (Grid, Flexbox, Custom Properties)
- **Vite** (Module bundler)
- **HTML5 Semantic**

---

## 📝 Notes

1. **Grid Background Pattern:**
   - Menggunakan CSS linear-gradient untuk menciptakan grid
   - Pattern size: 40px × 40px
   - Applied pada hero dan divisions section

2. **Org Chart Connectors:**
   - Vertikal connector: `.org-connector`
   - Horizontal connector: `.org-children::before`
   - Junction dot: `.org-children::after`

3. **Animation Performance:**
   - Menggunakan `cubic-bezier` untuk smooth transition
   - CSS-based animations (tidak JavaScript-based)
   - `prefers-reduced-motion` respected

---

## 📧 Support

Jika ada pertanyaan atau isu, silakan hubungi tim development Encasa.

