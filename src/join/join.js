import './join.css';
import renderNavbar from '../components/navbar.js';
import renderFooter from '../components/footer.js';

const JOIN_LINKS = {
  whatsapp: 'https://wa.me/yourNumber',
  gform: 'https://forms.google.com/yourForm',
};

document.querySelector('#app').innerHTML = `
  ${renderNavbar()}
  <main>
    ${renderJoinSection()}
    ${renderFooter()}
  </main>
`;

function renderJoinSection() {
  return `
    <section class="join-section">

      <div class="join-section__image">
        <img src="/assets/encasa.jpg" alt="ENCASA">
      </div>

      <div class="join-section__content">
        <h1>Join ENCASA</h1>

        <p>
          Bergabunglah bersama ENCASA dan jadilah bagian dari
          komunitas yang aktif, kreatif, dan penuh semangat.
          Kembangkan kemampuanmu, bangun relasi baru, dan
          berkontribusi dalam berbagai kegiatan organisasi.
        </p>

        <div class="join-section__buttons">
          <a
            href="${JOIN_LINKS.whatsapp}"
            target="_blank"
            class="btn btn-wa"
          >
            WhatsApp
          </a>

          <a
            href="${JOIN_LINKS.gform}"
            target="_blank"
            class="btn btn-form"
          >
            Google Form
          </a>
        </div>
      </div>

    </section>
  `;
}

// Navbar scroll effect
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar?.classList.toggle('scrolled', window.scrollY > 10);
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger?.addEventListener('click', () => {
  navLinks?.classList.toggle('open');
  hamburger.classList.toggle('open');
});

navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
  });
});