import renderNavbar from '../components/navbar.js';
import renderFooter from '../components/footer.js';
import './gallery.css';

// ── KONFIGURASI ITERASI GAMBAR ──────────────────────────────────────
// Tentukan jumlah total foto yang tersimpan di dalam folder public/Image/Galery Anda
// ── KONFIGURASI ITERASI & PAGINATION ──────────────────────────────────────
const TOTAL_FOTO = 23; 
const ITEMS_PER_PAGE = 8; // Jumlah foto per batch pemuatan
let currentVisibleItems = parseInt(sessionStorage.getItem('gallery_visible_count')) || ITEMS_PER_PAGE;

const galleryItems = Array.from({ length: TOTAL_FOTO }, (_, i) => ({
  id: i + 1,
  src: `/Image/Galery/foto${i + 1}.webp`, 
  alt: `Encasa Documentation Momen ${i + 1}`
}));

function renderGridItems(limit) {
  return galleryItems.slice(0, limit).map(item => `
    <div class="gallery-flex-col">
      <div class="gallery-card">
        <img src="${item.src}" alt="${item.alt}" class="gallery-card__img" loading="lazy" />
      </div>
    </div>
  `).join('');
}

// Injeksi Struktur Awal
document.querySelector('#app').innerHTML = `
  ${renderNavbar()}
  <main>
    <section class="gallery-hero">
      <div class="gallery-hero__overlay">
        <div class="gallery-hero__content">
          <h1 class="gallery-hero__title">Our Gallery</h1>
          <p class="gallery-hero__subtitle">Capturing our best moments and shared memories in Encasa</p>
        </div>
      </div>
    </section>

    <section class="gallery-section">
      <div class="gallery-container">
        <div class="gallery-flex-grid" id="gallery-grid">
          ${renderGridItems(currentVisibleItems)}
        </div>
        ${TOTAL_FOTO > ITEMS_PER_PAGE ? `
          <div style="text-align: center; margin-top: 2rem;">
            <button id="load-more-btn" class="hero__btn" style="opacity:1; transform:none; animation:none;">Load More</button>
          </div>
        ` : ''}
      </div>
    </section>
  </main>
  ${renderFooter()}
`;

// Logika klik tombol Load More
document.getElementById('load-more-btn')?.addEventListener('click', (e) => {
  currentVisibleItems += ITEMS_PER_PAGE;
  
  // SIMPAN: Simpan jumlah item terbaru ke dalam sessionStorage browser
  sessionStorage.setItem('gallery_visible_count', currentVisibleItems);
  
  const grid = document.getElementById('gallery-grid');
  if (grid) {
    grid.innerHTML = renderGridItems(currentVisibleItems);
  }
  if (currentVisibleItems >= TOTAL_FOTO) {
    e.target.parentElement.remove(); 
  }
});