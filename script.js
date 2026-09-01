document.addEventListener('DOMContentLoaded', () => {

  /* ---- Photo fallback (shows initials if the image file is missing) ---- */
  const photoImg = document.getElementById('photoImg');
  const photoFrame = document.getElementById('photoFrame');
  if (photoImg && photoFrame) {
    photoImg.addEventListener('error', () => {
      photoImg.style.display = 'none';
      const initials = document.createElement('span');
      initials.className = 'initials';
      initials.textContent = 'SS';
      photoFrame.appendChild(initials);
    }, { once: true });
  }

  /* ---- 3D tilt on project visuals ---- */
  const visuals = document.querySelectorAll('.project-visual');
  visuals.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `translateY(-4px) rotateX(${(-y * 10).toFixed(2)}deg) rotateY(${(x * 10).toFixed(2)}deg)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });

  /* ---- Animated stat counters ---- */
  const statEls = document.querySelectorAll('.stat-num[data-count]');
  const staticEls = document.querySelectorAll('.stat-num[data-static]');
  staticEls.forEach(el => { el.textContent = el.dataset.static; });

  const statIo = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const duration = 900;
      const start = performance.now();
      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      statIo.unobserve(el);
    });
  }, { threshold: 0.6 });
  statEls.forEach(el => statIo.observe(el));

  /* ---- Mobile nav toggle ---- */
  const navToggle = document.getElementById('navToggle');
  const siteNav = document.getElementById('siteNav');
  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = siteNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    siteNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        siteNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- Scroll progress rail ---- */
  const progressFill = document.getElementById('progressFill');
  const backToTop = document.getElementById('backToTop');

  function onScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressFill) progressFill.style.width = pct + '%';
    if (backToTop) backToTop.classList.toggle('is-visible', scrollTop > 480);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Reveal on scroll ---- */
  const revealTargets = document.querySelectorAll(
    '.timeline-item, .project-card, .skill-group, .stat, .contact-item, .about-copy, .about-photo'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealTargets.forEach(el => io.observe(el));

  /* ---- Contact form -> mailto ---- */
  const contactForm = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('cf-name').value.trim();
      const email = document.getElementById('cf-email').value.trim();
      const message = document.getElementById('cf-message').value.trim();

      if (!name || !email || !message) {
        formNote.textContent = 'Please fill in your name, email and a message first.';
        formNote.classList.remove('is-success');
        return;
      }

      const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href = `mailto:souravvatsyan374@gmail.com?subject=${subject}&body=${body}`;

      formNote.textContent = 'Opening your email app with this message pre-filled…';
      formNote.classList.add('is-success');
    });
  }

});
