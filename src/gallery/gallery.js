import ASSETS from '../assets.js';
import renderNavbar from '../components/navbar.js';
import renderFooter from '../components/footer.js';

import './gallery.css';

// ── Data mockup gambar ──────────────────────────────────────────────
const galleryItems = [
  {
    id: 1,
    src: 'https://placehold.co/800x600/4a90d9/ffffff?text=Gallery+1',
    alt: 'Enadv – Sesi Bersama',
    category: 'Enadv',
  },
  {
    id: 2,
    src: 'https://placehold.co/800x600/3a7abf/ffffff?text=Gallery+2',
    alt: 'English Camp – Outdoor',
    category: 'English Camp',
  },
  {
    id: 3,
    src: 'https://placehold.co/800x600/2c6aa0/ffffff?text=Gallery+3',
    alt: 'Handover – Serah Terima',
    category: 'Handover',
  },
  {
    id: 4,
    src: 'https://placehold.co/800x600/5ba3e8/ffffff?text=Gallery+4',
    alt: 'English Adventure – Poster',
    category: 'Enadv',
  },
  {
    id: 5,
    src: 'https://placehold.co/800x600/4a90d9/ffffff?text=Gallery+5',
    alt: 'Enadv – Kelompok Belajar',
    category: 'Enadv',
  },
  {
    id: 6,
    src: 'https://placehold.co/800x600/3a7abf/ffffff?text=Gallery+6',
    alt: 'English Camp – Kelas',
    category: 'English Camp',
  },
  {
    id: 7,
    src: 'https://placehold.co/800x600/2c6aa0/ffffff?text=Gallery+7',
    alt: 'Handover – Upacara',
    category: 'Handover',
  },
  {
    id: 8,
    src: 'https://placehold.co/800x600/5ba3e8/ffffff?text=Gallery+8',
    alt: 'English Adventure – Kegiatan',
    category: 'Enadv',
  },
  {
    id: 9,
    src: 'https://placehold.co/800x600/4a90d9/ffffff?text=Gallery+9',
    alt: 'Enadv – Diskusi',
    category: 'Enadv',
  },
  {
    id: 10,
    src: 'https://placehold.co/800x600/3a7abf/ffffff?text=Gallery+10',
    alt: 'English Camp – Presentasi',
    category: 'English Camp',
  },
  {
    id: 11,
    src: 'https://placehold.co/800x600/2c6aa0/ffffff?text=Gallery+11',
    alt: 'Handover – Foto Bersama',
    category: 'Handover',
  },
  {
    id: 12,
    src: 'https://placehold.co/800x600/5ba3e8/ffffff?text=Gallery+12',
    alt: 'English Adventure – Closing',
    category: 'Enadv',
  },
];

// ── Card Component ──────────────────────────────────────────────────
/**
 * Membuat elemen card gambar tunggal (rasio 4:3, border radius putih).
 * @param {{ id: number, src: string, alt: string, category: string }} item
 * @returns {HTMLElement}
 */
function createGalleryCard(item) {
  // Wrapper kolom Bootstrap – mobile: 6 kolom (2 per baris), md: 4 kolom (3 per baris), lg: 3 kolom (4 per baris)
  const col = document.createElement('div');
  col.className = 'col-6 col-md-4 col-lg-3 gallery-col';

  col.innerHTML = `
    <div class="gallery-card">
      <div class="gallery-card__ratio">
        <img
          src="${item.src}"
          alt="${item.alt}"
          class="gallery-card__img"
          loading="lazy"
        />
        <div class="gallery-card__overlay">
          <span class="gallery-card__category">${item.category}</span>
        </div>
      </div>
    </div>
  `;

  return col;
}

// ── Hero Section ────────────────────────────────────────────────────
function createHero() {
  const hero = document.createElement('section');
  hero.className = 'gallery-hero';
  hero.innerHTML = `
    <div class="gallery-hero__placeholder">
      <div class="gallery-hero__content">
        <h1 class="gallery-hero__title">Our Gallery</h1>
        <p class="gallery-hero__sub">Momen terbaik bersama Encasa</p>
      </div>
    </div>
  `;
  return hero;
}

// ── Grid Section ────────────────────────────────────────────────────
function createGrid() {
  const section = document.createElement('section');
  section.className = 'gallery-section';

  const container = document.createElement('div');
  container.className = 'container';

  const row = document.createElement('div');
  row.className = 'row g-3';

  // Loop semua item dan tambahkan card ke row
  galleryItems.forEach((item) => {
    const card = createGalleryCard(item);
    row.appendChild(card);
  });

  container.appendChild(row);
  section.appendChild(container);
  return section;
}

// ── Mount ───────────────────────────────────────────────────────────
/**
 * Mount semua konten gallery ke dalam elemen target.
 * Panggil fungsi ini di file utama kamu, contoh:
 *
 *   import { mountGallery } from './Gallery.js';
 *   mountGallery('#app');
 *
 * @param {string} selector – CSS selector elemen target
 */
export function mountGallery(selector = '#app') {
  const root = document.querySelector(selector);
  if (!root) {
    console.error(`[Gallery] Element "${selector}" tidak ditemukan.`);
    return;
  }

  root.appendChild(createHero());
  root.appendChild(createGrid());
}