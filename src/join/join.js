import './join.css';
import ASSETS  from '../assets.js';
import renderNavbar from '../components/navbar.js';
import renderFooter from '../components/footer.js';

const JOIN_LINKS = {
  whatsapp: 'https://wa.me/6287857911279',
  gform: 'https://forms.gle/KFHr2Nu58FSo83Vb7',
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
    <section class="join-section style="background: linear-gradient(rgba(46, 57, 73, 0.5), rgba(63, 103, 152, 0.5)), url('${ASSETS.heroJoin}') center/cover no-repeat;"">
      <div class="join-section__content">
        <h1>Join us in Encasa</h1>

        <p>
          and become part of an active, creative, and passionate community.
         Develop your skills, build new relationships, and
         contribute to various organizational activities.
        </p>

        <div class="join-section__buttons">
          <a
            href="${JOIN_LINKS.whatsapp}"
            target="_blank"
            class="btn btn-wa"
          >
            Contact us
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