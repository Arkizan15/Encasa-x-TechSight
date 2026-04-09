import './home.css';
import ASSETS from './assets.js';
import renderNavbar from './components/navbar.js';
import renderFooter from './components/footer.js';


// =====================
// RENDER APP
// =====================
document.querySelector('#app').innerHTML = `
  ${renderNavbar()}
  <main>
    ${renderHero()}
    ${renderSquareDivider()}
    ${renderActivities()}
    ${renderRecords()}
    ${renderFooter()}
  </main>
`;

// =====================
// COMPONENT FUNCTIONS
// =====================

function renderHero() {
  return `
    <section  class="hero" id="hero" style="body-background-color">
      <div class="hero__content">
        <p class="hero__tagline">Explore The World With English</p>
        <div class="hero__divider"></div>
        <p class="hero__description">
          Encasa, or English Club Esemkasa, is one of the extracurricular activities at 
          SMKN 1 Banyuwangi that serves as a platform to develop English language skills.
        </p>
        <a href="#join" class="hero__btn">Join us</a>
      </div>
      <div class="hero__mascot-wrap">
        <div class="hero__circle"></div>
        <img src="${ASSETS.mascotFull}" alt="Encasa Mascot" class="hero__mascot" />
      </div>
    </section>
    
  `; 
}

function renderSquareDivider() {
   return `
    <div class="square-divider">
    
    </div>
  `;
}

function renderActivities() {
  return `
    <section class="activities" id="gallery">
      <div class="activities__inner">
        <div class="activities__img-wrap">
          <img src="${ASSETS.activityImg}" alt="Encasa Activity" />
        </div>
        <div class="activities__card">
          <h2 class="activities__card-title">Our Activities</h2>
          <div class="activities__card-divider"></div>
          <p class="activities__card-text">
            At ENCASA, we believe that learning English should be fun, engaging, and meaningful. 
            Our activities are designed to help members build confidence in speaking, listening, 
            reading, and writing in English. From weekly discussion sessions and public speaking 
            practice to English games and storytelling, every activity is crafted to make learning 
            an enjoyable experience for everyone.
          </p>
          <br />
          <p class="activities__card-text">
            We also provide opportunities for members to showcase their skills through English 
            competitions, speech contests, and creative performances. With a warm and supportive 
            community, ENCASA is the perfect place to grow, connect, and discover the joy of 
            learning English together.
          </p>
          <button class="activities_button">
            Take a Look
          </button>
          <img src="${ASSETS.mascotHead}" alt="Mascot" class="activities__mascot-small" />
        </div>
      </div>
    </section>
  `;
}

function renderRecords() {
  const stats = [
    { number: '3',    label: 'Years Growing Together' },
    { number: '10+',  label: 'English competition awards earned' },
    { number: '2023', label: 'Founded to develop students English skills' },
  ];

  return `
    <section class="records" id="management">
      <h2 class="records__title">Encasa Records</h2>
      <div class="records__card">
        ${stats.map((s, i) => `
          ${i > 0 ? '<div class="stat__divider"></div>' : ''}
          <div class="stat">
            <div class="stat__number" data-target="${s.number}">${s.number}</div>
            <p class="stat__label">${s.label}</p>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}

// =====================
// INTERACTIVITY
// =====================

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 10);
});

// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('open');
});

// Close nav on link click (mobile)
navLinks?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
  });
});

// Close nav on outside click
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
  }
});

// Stats fade-in animation
const statNumbers = document.querySelectorAll('.stat__number');
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

statNumbers.forEach(el => statsObserver.observe(el));