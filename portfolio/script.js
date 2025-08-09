const root = document.documentElement;
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
const savedTheme = localStorage.getItem('theme');

function applyTheme(theme) {
  if (theme === 'dark') document.body.setAttribute('data-theme', 'dark');
  else document.body.removeAttribute('data-theme');
}

applyTheme(savedTheme || (prefersDark.matches ? 'dark' : 'light'));

const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const next = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('theme', next);
  });
}

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.getElementById('nav-menu');
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navMenu.style.display = expanded ? 'none' : 'flex';
    navMenu.style.flexWrap = 'wrap';
  });
}

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// Animated stats
function animateCount(el) {
  const to = Number(el.dataset.countTo || '0');
  let n = 0;
  const step = Math.max(1, Math.round(to / 50));
  const i = setInterval(() => {
    n += step;
    if (n >= to) { n = to; clearInterval(i); }
    el.textContent = String(n);
  }, 20);
}

for (const el of document.querySelectorAll('.stat-value')) animateCount(el);

// Project data
const projects = [
  {
    id: 'unity-arcade-shooter',
    title: 'Unity Arcade Shooter',
    description: 'Fast-paced top-down shooter prototype with enemy waves, power-ups, and screen shake.',
    tags: ['Unity', 'C#', 'Game Dev'],
    year: 2024,
    link: 'https://micaelolaoye.wixsite.com/gameportfolio',
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'procedural-terrain',
    title: 'Procedural Terrain Generator',
    description: 'Noise-based terrain with LOD and GPU instancing for performant rendering.',
    tags: ['Unity', 'Shaders', 'Graphics'],
    year: 2024,
    link: 'https://micaelolaoye.wixsite.com/gameportfolio',
    image: 'https://images.unsplash.com/photo-1524553183753-c22bda4e0f71?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'pathfinding-visualizer',
    title: 'Pathfinding Visualizer',
    description: 'Interactive A*, Dijkstra, and BFS visualizer with maze generation and step speed control.',
    tags: ['Algorithms', 'Visualization', 'JavaScript'],
    year: 2023,
    link: '#',
    image: 'https://images.unsplash.com/photo-1506423915480-11b865d526c1?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'portfolio-site',
    title: 'Portfolio Website',
    description: 'This site—clean, accessible, responsive, and easily extensible without frameworks.',
    tags: ['HTML', 'CSS', 'Vanilla JS'],
    year: 2025,
    link: '#',
    image: 'https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?q=80&w=1200&auto=format&fit=crop'
  }
];

// Render tags list from projects
function getAllTags(items) {
  const set = new Set();
  for (const p of items) for (const t of p.tags) set.add(t);
  return Array.from(set).sort();
}

const searchInput = document.getElementById('project-search');
const tagFiltersEl = document.getElementById('tag-filters');
const grid = document.getElementById('projects-grid');

let activeTags = new Set();
let searchQuery = '';

function renderTagFilters() {
  if (!tagFiltersEl) return;
  tagFiltersEl.innerHTML = '';
  for (const tag of getAllTags(projects)) {
    const b = document.createElement('button');
    b.className = 'tag';
    b.type = 'button';
    b.textContent = tag;
    b.setAttribute('aria-pressed', String(activeTags.has(tag)));
    b.addEventListener('click', () => {
      if (activeTags.has(tag)) activeTags.delete(tag); else activeTags.add(tag);
      b.setAttribute('aria-pressed', String(activeTags.has(tag)));
      renderProjects();
    });
    tagFiltersEl.appendChild(b);
  }
}

function matchesFilters(p) {
  const q = searchQuery.trim().toLowerCase();
  const text = (p.title + ' ' + p.description + ' ' + p.tags.join(' ')).toLowerCase();
  const passesQuery = !q || text.includes(q);
  const passesTags = activeTags.size === 0 || Array.from(activeTags).every(t => p.tags.includes(t));
  return passesQuery && passesTags;
}

function projectCard(p) {
  const el = document.createElement('article');
  el.className = 'project';
  el.innerHTML = `
    <div class="project-cover" style="background-image:url('${p.image}'); background-size: cover; background-position: center;"></div>
    <div class="project-body">
      <h3>${p.title}</h3>
      <p>${p.description}</p>
      <div class="meta">
        <span class="chip">${p.year}</span>
        ${p.tags.map(t => `<span class="chip">${t}</span>`).join('')}
      </div>
    </div>
    <div class="actions">
      <a class="button" href="${p.link}" target="_blank" rel="noopener">Open</a>
    </div>
  `;
  return el;
}

function renderProjects() {
  if (!grid) return;
  grid.innerHTML = '';
  const filtered = projects.filter(matchesFilters).sort((a, b) => b.year - a.year);
  if (filtered.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'muted';
    empty.textContent = 'No projects match your filters.';
    grid.appendChild(empty);
    return;
  }
  for (const p of filtered) grid.appendChild(projectCard(p));
}

if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    const t = e.target;
    searchQuery = t.value || '';
    renderProjects();
  });
}

renderTagFilters();
renderProjects();