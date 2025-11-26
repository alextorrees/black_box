// Black Box Informática - Main JavaScript (limpio y sin errores)

document.addEventListener('DOMContentLoaded', function() {
  initMobileMenu();
  initSmoothScrolling();
  initSimpleAnimations();
  initProcessInteractions();
  initProcessProgress();
});

// Mobile menu functionality
function initMobileMenu() {
  const menuBtn = document.getElementById('menuBtn');
  const closeBtn = document.getElementById('closeMobileMenu');
  const mobileMenu = document.getElementById('mobileMenu');
  const backdrop = document.getElementById('mobileBackdrop');
  const menuIcon = menuBtn ? menuBtn.querySelector('i') : null;
  if (!mobileMenu || !menuBtn) return;

  function setMenuState(open) {
    if (open) {
      mobileMenu.classList.add('active');
      if (backdrop) backdrop.classList.add('active');
      menuBtn.setAttribute('aria-label', 'Cerrar menú');
      if (menuIcon) menuIcon.className = 'fas fa-times text-xl';
    } else {
      mobileMenu.classList.remove('active');
      if (backdrop) backdrop.classList.remove('active');
      menuBtn.setAttribute('aria-label', 'Abrir menú');
      if (menuIcon) menuIcon.className = 'fas fa-bars text-xl';
    }
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  // Estado inicial cerrado
  setMenuState(false);

  // Toggle en el mismo botón (hamburguesa <-> X)
  menuBtn.addEventListener('click', () => setMenuState(!mobileMenu.classList.contains('active')));
  if (closeBtn) closeBtn.addEventListener('click', () => setMenuState(false));
  if (backdrop) backdrop.addEventListener('click', () => setMenuState(false));

  // Cierre por enlace dentro del menú
  const mobileLinks = document.querySelectorAll('#mobileMenu a');
  mobileLinks.forEach(link => link.addEventListener('click', () => setMenuState(false)));

  // Cierre por tecla ESC
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenuState(false); });

  // Cierre al pasar a desktop
  window.addEventListener('resize', () => { if (window.innerWidth >= 1024) setMenuState(false); });
}

// Smooth scrolling
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', function(event) {
      const href = this.getAttribute('href');
      const target = document.querySelector(href);
      if (target) {
        event.preventDefault();
        const offsetTop = target.offsetTop - 80; // navbar fija
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    });
  });
}

// Simple reveal animations (no cambia el diseño)
function initSimpleAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  const animated = document.querySelectorAll('.service-card, .testimonial-card, .process-step');
  animated.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// Interactions for process steps (hover/focus active state)
function initProcessInteractions() {
  const steps = document.querySelectorAll('#proceso .process-step');
  if (!steps.length) return;
  steps.forEach(step => {
    step.addEventListener('mouseenter', () => step.classList.add('active'));
    step.addEventListener('mouseleave', () => step.classList.remove('active'));
    step.addEventListener('focus', () => step.classList.add('active'));
    step.addEventListener('blur', () => step.classList.remove('active'));
  });
}

// Thin progress bar filling as you scroll through the process section
function initProcessProgress() {
  const section = document.getElementById('proceso');
  const bar = document.getElementById('processProgress');
  if (!section || !bar) return;

  function update() {
    const scrollY = window.scrollY || window.pageYOffset;
    const vh = window.innerHeight;
    const rect = section.getBoundingClientRect();
    const sectionTop = scrollY + rect.top;
    const sectionHeight = section.offsetHeight;

    const start = sectionTop - vh * 0.8; // start filling when section approaches
    const end = sectionTop + sectionHeight - vh * 0.2; // finished before leaving
    const progress = Math.min(1, Math.max(0, (scrollY - start) / (end - start)));
    bar.style.width = (progress * 100).toFixed(2) + '%';
  }

  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', () => requestAnimationFrame(update));
}