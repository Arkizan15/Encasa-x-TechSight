import ASSETS from '../assets.js';

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

export default renderFooter;