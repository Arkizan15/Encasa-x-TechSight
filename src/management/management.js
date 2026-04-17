// ============================================================
// management.js — Feature-based Vanilla JS (Vite)
// Encasa x TechSight | Management Page
// ============================================================

import ASSETS from '../assets.js';
import renderNavbar from '../components/navbar.js';
import renderFooter from '../components/footer.js';

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

function renderOrgNode(node) {
  const children = node.children.length
    ? `<div class="org-children">
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

function renderOrgChart(containerId, nodes) {
  const el = document.getElementById(containerId);
  if (!el) return;

  const tree = buildOrgTree(nodes);
  el.innerHTML = `
    <section class="org-section">
      <div class="org-tree">
        ${tree.map(renderOrgNode).join("")}
      </div>
    </section>
  `;
}

// ── FEATURE: DIVISIONS ACCORDION ──────────────────────────────
function renderDivisions(containerId, divisions) {
  const el = document.getElementById(containerId);
  if (!el) return;

  el.innerHTML = `
    <section class="divisions-section">
      <h2 class="divisions-title">The Divisions</h2>
      <div class="divisions-grid">
        ${divisions.map((div) => `
          <div class="accordion-item" id="${div.id}">
            <button class="accordion-header" aria-expanded="false" data-target="${div.id}-body">
              <span>${div.name}</span>
              <svg class="accordion-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </button>
            <div class="accordion-body" id="${div.id}-body" hidden>
              <ul class="member-list">
                ${div.members.map((m) => `<li>${m}</li>`).join("")}
              </ul>
            </div>
          </div>
        `).join("")}
      </div>
    </section>
  `;

  initAccordion(containerId);
}

function initAccordion(containerId) {
  const el = document.getElementById(containerId);
  el.querySelectorAll(".accordion-header").forEach((btn) => {
    btn.addEventListener("click", () => {
      const bodyId = btn.dataset.target;
      const body = document.getElementById(bodyId);
      const isOpen = btn.getAttribute("aria-expanded") === "true";

      // close all
      el.querySelectorAll(".accordion-header").forEach((b) => {
        b.setAttribute("aria-expanded", "false");
        b.closest(".accordion-item").classList.remove("is-open");
      });
      el.querySelectorAll(".accordion-body").forEach((b) => {
        b.hidden = true;
      });

      // open clicked if was closed
      if (!isOpen) {
        btn.setAttribute("aria-expanded", "true");
        btn.closest(".accordion-item").classList.add("is-open");
        body.hidden = false;
      }
    });
  });
}

// ── STYLES ───────────────────────────────────────────────────
function injectStyles() {
  const style = document.createElement("style");
  style.textContent = `
    /* ── Variables ── */
    :root {
      --blue-primary: #587bb4;
      --blue-dark: #4f6b98;
      --blue-light: #eef2f9;
      --text-light: #eeeeee;
      --card-bg: #f5f5f5;
      --radius: 15px;
      --font: 'Inter', sans-serif;
    }

    /* ── Hero ── */
    .management-hero {
      padding: 48px 120px 32px;
    }
    .hero-title {
      font-size: 40px;
      font-weight: 700;
      color: var(--text-light);
      letter-spacing: -1.2px;
      margin: 0 0 8px;
    }
    .hero-subtitle {
      font-size: 24px;
      font-weight: 700;
      color: var(--text-light);
      margin: 0;
    }

    /* ── Org Chart ── */
    .org-section {
      padding: 0 120px 48px;
    }
    .org-tree {
      background: #f1f1f1;
      border: 1px solid #000;
      border-radius: 20px;
      padding: 40px;
      display: flex;
      justify-content: center;
      overflow-x: auto;
    }
    .org-node-wrap {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0;
    }
    .org-children {
      display: flex;
      gap: 24px;
      position: relative;
      padding-top: 32px;
    }
    .org-children::before {
      content: '';
      position: absolute;
      top: 0;
      left: 50%;
      width: 2px;
      height: 32px;
      background: #aaa;
    }
    .org-children > .org-node-wrap::before {
      content: '';
      position: absolute;
      top: -32px;
      left: 50%;
      width: 2px;
      height: 32px;
      background: #aaa;
    }
    .org-card {
      background: var(--card-bg);
      border-radius: 18px;
      box-shadow: 0 4px 4px rgba(0,0,0,.15);
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 16px 10px 10px;
      min-width: 220px;
      position: relative;
    }
    .org-avatar {
      width: 52px;
      height: 52px;
      border-radius: 50%;
      background: var(--blue-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      font-size: 22px;
      font-weight: 700;
      color: #fff;
    }
    .org-info {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .org-name {
      font-size: 15px;
      font-weight: 600;
      color: #3d3d3d;
    }
    .org-role {
      font-size: 13px;
      color: #636363;
    }

    /* ── Divisions ── */
    .divisions-section {
      padding: 0 86px 80px;
    }
    .divisions-title {
      font-size: 40px;
      font-weight: 700;
      color: var(--text-light);
      letter-spacing: -1.2px;
      margin: 0 0 32px;
    }
    .divisions-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }
    .accordion-item {
      background: var(--card-bg);
      border-radius: var(--radius);
      overflow: hidden;
      transition: box-shadow .2s;
    }
    .accordion-item.is-open {
      box-shadow: 0 8px 24px rgba(0,0,0,.1);
    }
    .accordion-header {
      width: 100%;
      background: none;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 34px 32px;
      font-size: 22px;
      font-weight: 600;
      font-family: var(--font);
      color: #1a1a1a;
    }
    .accordion-icon {
      transition: transform .25s;
      flex-shrink: 0;
    }
    .accordion-item.is-open .accordion-icon {
      transform: rotate(180deg);
    }
    .accordion-body {
      padding: 0 32px 28px 48px;
    }
    .member-list {
      margin: 0;
      padding-left: 20px;
      list-style: disc;
    }
    .member-list li {
      font-size: 20px;
      font-weight: 600;
      color: #1a1a1a;
      line-height: 1.8;
    }
  `;
  document.head.appendChild(style);
}

// ── INIT ──────────────────────────────────────────────────────
function initManagementPage() {
  injectStyles();
  renderHero("management-hero", managementData.hero);
  renderOrgChart("management-org", managementData.orgChart);
  renderDivisions("management-divisions", managementData.divisions);

  // Append footer at end of body
  const footerEl = document.createElement('div');
  footerEl.innerHTML = renderFooter();
  document.body.appendChild(footerEl);
}

// Run after all declarations
initManagementPage();