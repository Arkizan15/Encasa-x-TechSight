import './joinUs.css';
import renderNavbar from '../components/navbar.js';
import renderFooter from '../components/footer.js';

// =====================
// DATA
// =====================

const JOIN_LINKS = {
  whatsapp: 'https://wa.me/yourNumber',
  gform: 'https://forms.google.com/yourForm',
};

const members = [
  { name: 'Member 1', role: 'Position', avatar: '/assets/avatar1.jpg', photo: '/assets/member1.jpg' },
  { name: 'Member 2', role: 'Position', avatar: '/assets/avatar2.jpg', photo: '/assets/member2.jpg' },
  { name: 'Member 3', role: 'Position', avatar: '/assets/avatar3.jpg', photo: '/assets/member3.jpg' },
];

// =====================
// RENDER APP
// =====================

document.querySelector('#app').innerHTML = `
  ${renderNavbar()}
  <main>
    ${renderHero()}
    ${renderJoinLinks()}
    ${renderFooter()}
  </main>
`;

// =====================
// COMPONENT FUNCTIONS
// =====================

function renderMemberCard(member) {
  return `
    <div class="join-card">
      <img class="join-card__avatar" src="${member.avatar}" alt="${member.name}" />
      <img class="join-card__photo"  src="${member.photo}"  alt="${member.name}" />
      <p class="join-card__name">${member.name}</p>
      <p class="join-card__role">${member.role}</p>
    </div>
  `;
}

function renderHero() {
  return `
    <section class="join-hero" id="join">
      <div class="join-hero__overlay"></div>
      <h1 class="join-hero__title">JOIN NOW</h1>
      <div class="join-hero__cards">
        ${members.map(renderMemberCard).join('')}
      </div>
      <div class="join-hero__divider"></div>
    </section>
  `;
}

function renderJoinLinks() {
  return `
    <section class="join-links">
      <div class="join-links__inner">
        <h2 class="join-links__title">Join Now</h2>
        <p class="join-links__desc">Pilih cara bergabung yang paling mudah untukmu.</p>
        <div class="join-links__buttons">
          <a class="join-links__btn join-links__btn--wa"
             href="${JOIN_LINKS.whatsapp}" target="_blank" rel="noopener">
            WhatsApp
          </a>
          <a class="join-links__btn join-links__btn--gform"
             href="${JOIN_LINKS.gform}" target="_blank" rel="noopener">
            Google Form
          </a>
        </div>
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

navLinks?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
  });
});

document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
  }
});