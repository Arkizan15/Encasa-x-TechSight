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

// ── MOCK DATA MULTI-GENERATION ──────────────────────────────
const managementData = {
  hero: {
    title: "Management Encasa",
    subtitle: "A team that keep encasa running well",
  },

  // Organizing data by generations
  orgChartByGen: {
    "Gen 3": [
      // Level 1: Pembina
      { id: "pembina", name: "SITI HALUMA SADA", role: "Facilitator", parentId: null },
      
      // Level 2: Leaders (Terhubung ke Pembina)
      { id: "leader1", name: "ARKAN RIFQY FAUZAN", role: "Leader 1", parentId: "pembina" },
      { id: "leader2", name: "ARVATIA PUTRI RAMADHANI", role: "Leader 2", parentId: "pembina" },
      
      // Level 3: Children dari Leader 1
      { id: "tr1", name: "EKA PUTRI FEBRIYANTI", role: "Treasurer 1", parentId: "leader1" },
      { id: "sec1", name: "ZORA AYU SEPSA KIRARA", role: "Secretary 1", parentId: "leader1" },
      
      // Level 3: Children dari Leader 2
      { id: "tr2", name: "AKHISYA ELMA ZAKIYA", role: "Treasurer 2", parentId: "leader2" },
      { id: "sec2", name: "CIKA ZAHRATUS SYITA", role: "Secretary 2", parentId: "leader2" },
    ],
    "Gen 1": [
      { id: "root", name: "Rifqy Arkan Fauzan", role: "Ketua", parentId: null },
      { id: "wk1",  name: "Wakil Satu", role: "Wakil Ketua", parentId: "root" },
      { id: "m1",   name: "Anggota Tim", role: "Sekretaris",  parentId: "wk1" },
      { id: "m2",   name: "Anggota Tim2", role: "Bendahara",  parentId: "wk1" },
    ]
  },

  // Organizing divisions by generation
  divisionsByGen: {
    "Gen 3": [
      {
        id: "sie-public-relation",
        name: "SIE PUBLIC RELATION",
        members: [
          "AISHAA FADHIYA LUNA (Coordinator)",
          "MUHAMMAD IRSYAD ERMAN",
        ],
      },
      {
        id: "sie-creative",
        name: "SIE CREATIVE",
        members: [
          "NASHWA ARINDYA SEKAR AYU JASMINE KINANTHI (Coordinator)",
          "TYAS ALVITA MULYANI",
          "DWI DELI NOVITASARI",
        ],
      },
      {
        id: "sie-work-program",
        name: "SIE WORK PROGRAM",
        members: [
          "BERLIANA SASCA SYAHIRA (Coordinator)",
          "DAVINA MAIZA WILLY PUTRI",
        ],
      },
      {
        id: "sie-content",
        name: 'CONTENT DIVISION',
        members : [
          "NADIA FAUSTINA WIDYADHANA (Coordinator)",
          "HAWASIVA DEWI SANJAYA"
        ]
      },
      {
        id: "sie-competition",
        name: "SIE COMPETITION",
        members: [
          "KENZIE DZAKY WAHYUDI (Coordinator)",
          "FILBERT LIEM",
        ],
      },
    ],
    "Gen 1": [
      {
        id: "div-proker-2023",
        name: "Program Division",
        members: ["Rifqy Arkan Fauzan", "Wakil Satu"],
      },
      {
        id: "div-internal-2023",
        name: "Internal Affairs",
        members: ["Anggota Tim", "Anggota Tim2"],
      },
      {
        id: "div-external-2023",
        name: "External Relations",
        members: ["Member Alpha", "Member Beta"],
      },
    ],
  },
};

// State
let currentGen = "Gen 3";

// ── FEATURE: HERO ─────────────────────────────────────────────
function renderHero(containerId, data) {
  const el = document.getElementById(containerId);
  if (!el) return;``

  el.innerHTML = `
    <div class="management-hero">
      <div class="hero-text">
        <h1 class="hero-title">${data.title}</h1>
        <p class="hero-subtitle">${data.subtitle}</p>
      </div>
      <img src="${ASSETS.mascotHead}" alt="Mascot" class="hero-mascot" />
    </div>
  `;
}

// ── FEATURE: ORG CHART ────────────────────────────────────────
function buildOrgTree(nodes) {
  const map = {};
  nodes.forEach((n) => (map[n.id] = { ...n, children: [] }));
  const roots = [];
  nodes.forEach((n) => {
    if (n.parentId) {
      if(map[n.parentId]) {
        map[n.parentId].children.push(map[n.id]);
      }
    } else {
      roots.push(map[n.id]);
    }
  });
  return roots;
}

function renderOrgNode(node) {
  const hasParent = node.parentId !== null;
  const arrowHtml = hasParent ? '<div class="arrow"></div>' : '';

  const children = node.children.length
    ? `<div class="org-children">
        ${node.children.map(renderOrgNode).join("")}
      </div>`
    : "";

  const siblingAttr = node.siblingConnector ? `data-sibling-id="${node.siblingConnector}"` : '';

  return `
    <div class="org-node-wrap" data-node-id="${node.id}" ${siblingAttr}>
      ${arrowHtml}
      <div class="org-card">
        <div class="org-info">
          <span class="org-name">${node.name}</span>
          <span class="org-role">${node.role}</span>
        </div>
      </div>
      ${children}
    </div>
  `;
}

function renderOrgChart(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;

  const validGens = Object.keys(managementData.orgChartByGen);
  const nodes = managementData.orgChartByGen[currentGen] || [];
  const tree = buildOrgTree(nodes);

  el.innerHTML = `
    <section class="org-section">
      <div class="org-header">
        <select class="gen-select" id="generation-select">
          ${validGens.map(gen => `<option value="${gen}" ${gen === currentGen ? 'selected' : ''}>${gen}</option>`).join('')}
        </select>
      </div>
      <div class="org-tree-wrapper">
        <div class="org-tree">
          ${tree.map(renderOrgNode).join("")}
        </div>
      </div>
    </section>
  `;

  // Create sibling connectors after rendering
  drawSiblingConnectors();

  // Attach listener to select
  document.getElementById("generation-select").addEventListener("change", (e) => {
    currentGen = e.target.value;
    renderOrgChart(containerId); // re-render chart on change
    renderDivisions('management-divisions', currentGen); // re-render divisions on change
  });
}

function drawSiblingConnectors() {
  const treeWrapper = document.querySelector('.org-tree-wrapper');
  const tree = document.querySelector('.org-tree');
  if (!tree || !treeWrapper) return;

  const nodes = managementData.orgChartByGen[currentGen] || [];
  
  // Find leader pairs that should be connected
  const leaderPairs = nodes.filter(n => n.siblingConnector && n.id < n.siblingConnector && n.parentId === 'pembina');
  
  if (leaderPairs.length === 0) return;

  // Create SVG for connectors
  const svgNS = "http://www.w3.org/2000/svg";
  let svg = treeWrapper.querySelector('svg.sibling-connectors-svg');
  
  if (!svg) {
    svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('class', 'sibling-connectors-svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';
    svg.style.pointerEvents = 'none';
    treeWrapper.style.position = 'relative';
    treeWrapper.insertBefore(svg, tree);
  } else {
    // Clear existing paths
    svg.innerHTML = '';
  }

  // Draw connector for each pair
  leaderPairs.forEach(node1 => {
    const node2Id = node1.siblingConnector;
    const node1El = tree.querySelector(`[data-node-id="${node1.id}"]`);
    const node2El = tree.querySelector(`[data-node-id="${node2Id}"]`);
    
    if (node1El && node2El) {
      const card1 = node1El.querySelector('.org-card');
      const card2 = node2El.querySelector('.org-card');
      
      if (card1 && card2) {
        const rect1 = card1.getBoundingClientRect();
        const rect2 = card2.getBoundingClientRect();
        const wrapperRect = treeWrapper.getBoundingClientRect();
        const svgRect = svg.getBoundingClientRect();

        // Calculate coordinates relative to SVG
        const x1 = rect1.right - svgRect.left;
        const y1 = rect1.top - svgRect.top + rect1.height / 2;
        const x2 = rect2.left - svgRect.left;
        const y2 = rect2.top - svgRect.top + rect2.height / 2;

        // Create path with curve
        const midX = (x1 + x2) / 2;
        const curveOffset = Math.abs(y1 - y2) * 0.3;
        
        const path = document.createElementNS(svgNS, 'path');
        path.setAttribute('d', `M ${x1} ${y1} Q ${midX} ${Math.min(y1, y2) - curveOffset} ${x2} ${y2}`);
        path.setAttribute('stroke', '#ffffff');
        path.setAttribute('stroke-width', '2');
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke-linecap', 'round');
        
        svg.appendChild(path);
      }
    }
  });
}

// ── FEATURE: DIVISIONS ACCORDION ──────────────────────────────
function renderDivisions(containerId, generation) {
  const el = document.getElementById(containerId);
  if (!el) return;

  const divisions = managementData.divisionsByGen[generation] || [];

  el.innerHTML = `
    <section class="divisions-section">
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
            <div class="accordion-body" id="${div.id}-body">
              <div class="accordion-body-inner">
                <ul class="member-list">
                  ${div.members.map((m) => `<li class="member-item">${m}</li>`).join("")}
                </ul>
              </div>
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
  if (!el) return;
  
  const headers = el.querySelectorAll(".accordion-header");

  headers.forEach((btn) => {
    btn.addEventListener("click", () => {
      const parentItem = btn.closest(".accordion-item");
      const isOpen = parentItem.classList.contains("is-open");

      // Tutup SEMUA accordion items terlebih dahulu
      el.querySelectorAll(".accordion-item").forEach(item => {
        const itemHeader = item.querySelector(".accordion-header");
        itemHeader.setAttribute("aria-expanded", "false");
        item.classList.remove("is-open");
      });

      // Jika accordion yang diklik sebelumnya tertutup, buka sekarang
      if (!isOpen) {
        btn.setAttribute("aria-expanded", "true");
        parentItem.classList.add("is-open");
      }
    });
  });
}

// ── INITIALIZE ───────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderHero('management-hero', managementData.hero);
  renderOrgChart('management-org');
  renderDivisions('management-divisions', currentGen);

  // Inject footer
  const footerEl = document.createElement('div');
  footerEl.id = 'footer';
  document.body.appendChild(footerEl);
  document.querySelector('#footer').innerHTML = renderFooter();

  // Redraw connectors after a small delay to ensure DOM is ready
  setTimeout(() => {
    drawSiblingConnectors();
  }, 100);

  // Redraw connectors on window resize
  window.addEventListener('resize', () => {
    drawSiblingConnectors();
  });
});