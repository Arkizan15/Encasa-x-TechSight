// ============================================================
// management.js — Feature-based Vanilla JS (Vite)
// Encasa x TechSight | Management Page
// ============================================================

import ASSETS from '../assets.js';
import renderNavbar from '../components/navbar.js';
import renderFooter from '../components/footer.js';
import '../home.css';
import './management.css';

// Inject navbar into #app
document.querySelector('#app').innerHTML = renderNavbar();

// ── DATA ─────────────────────────────────────────────────────
const managementData = {
  hero: {
    title: "Management Encasa",
    subtitle: "A team that keep encasa running well",
  },

  orgChart: [
    { id: "root", name: "Arkan Rifqy Fauzan", role: "Ketua", parentId: null },
    { id: "wk1",  name: "Nama Wakil 1",       role: "Wakil Ketua", parentId: "root" },
    { id: "wk2",  name: "Nama Wakil 2",       role: "Wakil Ketua", parentId: "root" },
    { id: "m1",   name: "Anggota 1",          role: "Sekretaris",  parentId: "wk1" },
    { id: "m2",   name: "Anggota 2",          role: "Bendahara",   parentId: "wk1" },
    { id: "m3",   name: "Anggota 3",          role: "Humas",       parentId: "wk2" },
    { id: "m4",   name: "Anggota 4",          role: "Humas",       parentId: "wk2" },
  ],

  divisions: [
    {
      id: "div-proker",
      name: "Workprogram Division",
      members: ["Muhammad Abdul Rohim", "Dhika Surya Ismawanto"],
    },
    {
      id: "div-humas",
      name: "Humas Division",
      members: ["Nama Anggota", "Nama Anggota"],
    },
    {
      id: "div-medkom",
      name: "Media & Komunikasi Division",
      members: ["Nama Anggota", "Nama Anggota"],
    },
    {
      id: "div-danus",
      name: "Dana & Usaha Division",
      members: ["Nama Anggota", "Nama Anggota"],
    },
  ],
};

// ── FEATURE: HERO ─────────────────────────────────────────────
/**
 * Render hero section dengan title dan subtitle
 * @param {string} containerId - ID dari container element
 * @param {Object} data - Data hero yang berisi title dan subtitle
 */
function renderHero(containerId, data) {
  const el = document.getElementById(containerId);
  if (!el) return;

  el.innerHTML = `
    <div class="management-hero">
      <h1 class="hero-title">${data.title}</h1>
      <p class="hero-subtitle">${data.subtitle}</p>
    </div>
  `;
}

// ── FEATURE: ORG CHART ────────────────────────────────────────
/**
 * Build organization tree structure dari flat array
 * @param {Array} nodes - Array of org nodes dengan parent-child relationship
 * @returns {Array} Tree structure dengan parent nodes sebagai root
 */
function buildOrgTree(nodes) {
  const map = {};
  nodes.forEach((n) => (map[n.id] = { ...n, children: [] }));
  const roots = [];
  nodes.forEach((n) => {
    if (n.parentId) map[n.parentId].children.push(map[n.id]);
    else roots.push(map[n.id]);
  });
  return roots;
}

/**
 * Render single org node dengan children
 * @param {Object} node - Node object dengan id, name, role, children
 * @returns {string} HTML string untuk org node
 */
function renderOrgNode(node) {
  const children = node.children.length
    ? `<div class="org-children">
        <div class="org-connector"></div>
        ${node.children.map(renderOrgNode).join("")}
      </div>`
    : "";

  return `
    <div class="org-node-wrap">
      <div class="org-card">
        <div class="org-avatar">
          <span>${node.name.charAt(0)}</span>
        </div>
        <div class="org-info">
          <span class="org-name">${node.name}</span>
          <span class="org-role">${node.role}</span>
        </div>
      </div>
      ${children}
    </div>
  `;
}

/**
 * Render organizational chart
 * @param {string} containerId - ID dari container element
 * @param {Array} nodes - Array of org data
 */
function renderOrgChart(containerId, nodes) {
  const el = document.getElementById(containerId);
  if (!el) return;

  const tree = buildOrgTree(nodes);
  el.innerHTML = `
    <section class="org-section">
      <h2 class="org-title">Our Organizational Structure</h2>
      <div class="org-tree-wrapper">
        <div class="org-tree">
          ${tree.map(renderOrgNode).join("")}
        </div>
      </div>
    </section>
  `;
}

// ── FEATURE: DIVISIONS ACCORDION ──────────────────────────────
/**
 * Render divisions accordion section
 * @param {string} containerId - ID dari container element
 * @param {Array} divisions - Array of division objects
 */
function renderDivisions(containerId, divisions) {
  const el = document.getElementById(containerId);
  if (!el) return;

  el.innerHTML = `
    <section class="divisions-section">
      <div class="divisions-container">
        <h2 class="divisions-title">The Divisions</h2>
        <div class="divisions-grid">
          ${divisions.map((div) => `
            <div class="accordion-item" id="${div.id}">
              <button class="accordion-header" aria-expanded="false" data-target="${div.id}-body">
                <span class="accordion-title">${div.name}</span>
                <svg class="accordion-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </button>
              <div class="accordion-body" id="${div.id}-body" hidden>
                <ul class="member-list">
                  ${div.members.map((m) => `<li class="member-item">${m}</li>`).join("")}
                </ul>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    </section>
  `;

  initAccordion(containerId);
}

/**
 * Initialize accordion event listeners
 * @param {string} containerId - ID dari container element
 */
function initAccordion(containerId) {
  const el = document.getElementById(containerId);
  el.querySelectorAll(".accordion-header").forEach((btn) => {
    btn.addEventListener("click", () => {
      const bodyId = btn.dataset.target;
      const body = document.getElementById(bodyId);
      const isOpen = btn.getAttribute("aria-expanded") === "true";

      // Close all other accordions
      el.querySelectorAll(".accordion-header").forEach((b) => {
        b.setAttribute("aria-expanded", "false");
        b.closest(".accordion-item").classList.remove("is-open");
      });
      el.querySelectorAll(".accordion-body").forEach((b) => {
        b.hidden = true;
      });

      // Toggle clicked accordion if it was closed
      if (!isOpen) {
        btn.setAttribute("aria-expanded", "true");
        btn.closest(".accordion-item").classList.add("is-open");
        body.hidden = false;
      }
    });
  });
}

// ── INITIALIZE ───────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderHero('management-hero', managementData.hero);
  renderOrgChart('management-org', managementData.orgChart);
  renderDivisions('management-divisions', managementData.divisions);

  // Inject footer
  const footerEl = document.createElement('div');
  footerEl.id = 'footer';
  document.body.appendChild(footerEl);
  document.querySelector('#footer').innerHTML = renderFooter();
});