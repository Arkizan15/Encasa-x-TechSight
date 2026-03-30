import './style.css';
import {ASSETS} from './assets.js';

// =====================
// ASSET URLS (from Figma)
// =====================

// =====================
// RENDER APP
// =====================
document.querySelector('#app').innerHTML = `
  ${renderNavbar()}
  <main>
    ${renderHero()}
   
    ${renderActivities()}
   
    ${renderRecords()}
    ${renderFooter()}
  </main>
`;

// =====================
// COMPONENT FUNCTIONS
// =====================

function renderNavbar() {
  return `
    <nav class="navbar" id="navbar">
      <img src="${ASSETS.logoEncasa}" alt="Encasa Logo" class="navbar__logo" />
      <button class="navbar__hamburger" id="hamburger" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
      <ul class="navbar__links" id="nav-links">
        <li><a href="#hero" class="active">Home</a></li>
        <li><a href="#gallery">Galery</a></li>
        <li><a href="#management">Management</a></li>
        <li><a href="#join">Join us</a></li>
      </ul>
    </nav>
  `;
}

function renderHero() {
  return `
    <section class="hero" id="hero">
      <div class="hero__content">
        <p class="hero__tagline">Explore The World With English</p>
        <div class="hero__divider"></div>
        <p class="hero__description">
          Encasa, or English Club Esemkasa, is one of the extracurricular activities at 
          SMKN 1 Banyuwangi that serves as a platform to develop English language skills.
        </p>
        <a href="#join" class="hero__btn" id="join">Join us</a>
      </div>
      <div class="hero__circle">
        <img src="${ASSETS.maskCircle}" alt="" aria-hidden="true" />
      </div>
      <img src="${ASSETS.mascotFull}" alt="Encasa Mascot" class="hero__mascot" />
    </section>
  `;
}

function renderMarquee() {
  const items = ['🌟 English Speaking', '📚 Public Speaking', '🏆 Competitions', '🎭 Storytelling', '🎓 Learning Together', '✨ Grow With English'];
  const doubled = [...items, ...items];
  return `
    <div class="marquee-banner">
      <div class="marquee-track">
        ${doubled.map(i => `<span>${i}</span>`).join('')}
      </div>
    </div>
  `;
}

function renderMarquee2() {
  const items = ['🌟 3 Years Growing', '🏅 10+ Awards', '📅 Founded 2023', '🌏 Explore English', '💬 Speak Confidently', '🤝 Join Our Community'];
  const doubled = [...items, ...items];
  return `
    <div class="marquee-banner-2 marquee-banner">
      <div class="marquee-track" style="animation-direction: reverse;">
        ${doubled.map(i => `<span>${i}</span>`).join('')}
      </div>
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
    { number: '2023', label: "Founded to develop students' English skills" },
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

function renderFooter() {
  return `
    <footer class="footer">
      <div class="footer__collab">
        <p class="footer__collab-label">In collaboration with :</p>
        <div class="footer__logos">
          <img src="${ASSETS.collabLogo}" alt="Collaboration Partner" class="footer__logo-img" />
          <img src="${ASSETS.logoEncasa}" alt="Encasa Logo" class="footer__logo-img" />
        </div>
      </div>
      <nav class="footer__nav">
        <div class="footer__nav-col">
          <h4>Menu</h4>
          <a href="#hero">Home</a>
          <a href="#gallery">Galery</a>
          <a href="#management">Management</a>
          <a href="#join">Join us</a>
        </div>
        <div class="footer__nav-col">
          <h4>Join us</h4>
          <a href="#" target="_blank" rel="noopener">Whatsapp</a>
          <a href="#" target="_blank" rel="noopener">GForm</a>
        </div>
        <div class="footer__nav-col">
          <h4>Social Media</h4>
          <a href="#" target="_blank" rel="noopener">Instagram</a>
          <a href="#" target="_blank" rel="noopener">Linkedin</a>
        </div>
      </nav>
    </footer>
  `;
}

// =====================
// INTERACTIVITY
// =====================

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Active nav link highlight on scroll
const sections = document.querySelectorAll('section[id], footer');
const navAnchors = document.querySelectorAll('.navbar__links a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.navbar__links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(sec => observer.observe(sec));

// Stats count-up animation
const statNumbers = document.querySelectorAll('.stat__number');

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statNumbers.forEach(el => statsObserver.observe(el));

// Close nav on link click (mobile)
navLinks?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});
