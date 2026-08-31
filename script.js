// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');

navToggle.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

// Close mobile nav after clicking a link
siteNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Highlight the nav link for the section currently in view
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const highlightNav = () => {
  let currentId = '';
  const scrollPos = window.scrollY + 120;

  sections.forEach(section => {
    if (scrollPos >= section.offsetTop) {
      currentId = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
  });
};

window.addEventListener('scroll', highlightNav, { passive: true });
highlightNav();

// Subtle parallax on the hero contour lines, responding to mouse movement
const contour = document.getElementById('contour');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (contour && !prefersReducedMotion) {
  const hero = document.querySelector('.hero');
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    contour.style.transform = `translate(${x * 14}px, ${y * 10}px)`;
  });
  hero.addEventListener('mouseleave', () => {
    contour.style.transform = 'translate(0, 0)';
  });
}
