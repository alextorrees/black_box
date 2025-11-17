// Black Box Informática - Main JavaScript (limpio y sin errores)

document.addEventListener('DOMContentLoaded', function() {
  initMobileMenu();
  initSmoothScrolling();
  initSimpleAnimations();
});

// Mobile menu functionality
function initMobileMenu() {
  const menuBtn = document.getElementById('menuBtn');
  const closeBtn = document.getElementById('closeMobileMenu');
  const mobileMenu = document.getElementById('mobileMenu');
  const backdrop = document.getElementById('mobileBackdrop');
  if (!mobileMenu || !menuBtn) return;

  function setMenuState(open) {
    if (open) {
      mobileMenu.classList.add('active');
      if (backdrop) backdrop.classList.add('active');
    } else {
      mobileMenu.classList.remove('active');
      if (backdrop) backdrop.classList.remove('active');
    }
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  // Estado inicial cerrado
  setMenuState(false);

  menuBtn.addEventListener('click', () => setMenuState(true));
  if (closeBtn) closeBtn.addEventListener('click', () => setMenuState(false));
  if (backdrop) backdrop.addEventListener('click', () => setMenuState(false));

  // Cierre por enlace dentro del menú
  const mobileLinks = document.querySelectorAll('#mobileMenu a');
  mobileLinks.forEach(link => link.addEventListener('click', () => setMenuState(false)));

  // Cierre por tecla ESC
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenuState(false); });

  // Cierre al pasar a desktop
  window.addEventListener('resize', () => { if (window.innerWidth >= 768) setMenuState(false); });
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