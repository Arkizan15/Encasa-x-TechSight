import ASSETS from '../assets.js';
import '../home.css';

function getCurrentPage() {
  const pathname = window.location.pathname;
  const filename = pathname.split('/').pop() || 'index.html';
  return filename;
}

function isActiveLink(href) {
  const currentPage = getCurrentPage();
  
  // Handle hash links (Gallery, Join us)
  if (href.startsWith('#')) {
    return false;
  }
  
  // For page links
  if (href === 'index.html') {
    return currentPage === 'index.html' || currentPage === '';
  }
  
  if (href === 'management.html') {
    return currentPage === 'management.html';
  }
  
  return false;
}

function renderNavbar() {
  return `
    <nav class="navbar" id="navbar">
      <img src="${ASSETS.logoEncasaSquare}" alt="Encasa Logo" class="navbar__logo" />
      <button class="navbar__hamburger" id="hamburger" aria-label="Toggle menu">
        <span></span><span></span><span></span>
      </button>
      <ul class="navbar__links" id="nav-links">
        <li><a href="index.html" class="${isActiveLink('index.html') ? 'active' : ''}">Home</a></li>
        <li><a href="#gallery">Galery</a></li>
        <li><a href="management.html" class="${isActiveLink('management.html') ? 'active' : ''}">Management</a></li>
        <li><a href="#join">Join us</a></li>
      </ul>
    </nav>
  `;
}

export default renderNavbar;