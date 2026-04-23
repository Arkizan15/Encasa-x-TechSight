import ASSETS from '../assets.js';
import '../home.css';

function renderNavbar() {
  return `
    <nav class="navbar" id="navbar">
      <img src="${ASSETS.logoEncasaSquare}" alt="Encasa Logo" class="navbar__logo" />
      <button class="navbar__hamburger" id="hamburger" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
      <ul class="navbar__links" id="nav-links">
        <li><a href="index.html" class="active">Home</a></li>
        <li><a href="#gallery">Galery</a></li>
        <li><a href="management.html">Management</a></li>
        <li><a href="#join">Join us</a></li>
      </ul>
    </nav>
  `;
}

export default renderNavbar;