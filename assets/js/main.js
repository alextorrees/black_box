// Black Box Informática - Main JavaScript Simplificado

document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize form handling
    initContactForm();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize simple animations
    initSimpleAnimations();
});

// Mobile menu functionality
function initMobileMenu() {
    window.toggleMobileMenu = function() {
        const mobileMenu = document.getElementById('mobileMenu');
        mobileMenu.classList.toggle('active');
    };
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const mobileMenu = document.getElementById('mobileMenu');
        const hamburgerButton = document.querySelector('[onclick="toggleMobileMenu()"]');
        
        if (mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(event.target) && 
            !hamburgerButton.contains(event.target)) {
            mobileMenu.classList.remove('active');
        }
    });
    
    // Close mobile menu when clicking on links
    const mobileLinks = document.querySelectorAll('#mobileMenu a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            document.getElementById('mobileMenu').classList.remove('active');
        });
    });
}

// Contact form handling
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Simple validation
            if (!data.nombre || data.nombre.trim().length < 2) {
                alert('Por favor, introduce un nombre válido.');
                return;
            }
            
            if (!data.email || !isValidEmail(data.email)) {
                alert('Por favor, introduce un email válido.');
                return;
            }
            
            if (!data.mensaje || data.mensaje.trim().length < 10) {
                alert('Por favor, escribe un mensaje más detallado.');
                return;
            }
            
            // Show loading state
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<span class="flex items-center justify-center space-x-2"><i class="fas fa-spinner fa-spin"></i><span>Enviando...</span></span>';
            submitButton.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                // Reset button
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                
                // Show success message
                alert('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo en menos de 24 horas.');
                
                // Reset form
                form.reset();
            }, 2000);
        });
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
                
                const offsetTop = target.offsetTop - 80; // Account for fixed nav
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Simple animations
function initSimpleAnimations() {
    // Add scroll reveal animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate on scroll
    const animatedElements = document.querySelectorAll('.service-card, .testimonial-card, .process-step');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Service cards hover effect
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Add loading animation
window.addEventListener('load', function() {
    // Animate page entrance
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.8s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add keyboard navigation support
document.addEventListener('keydown', function(event) {
    // ESC key closes mobile menu
    if (event.key === 'Escape') {
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
        }
    }
});n mensaje más detallado.');
    }
    
    if (errors.length > 0) {
        showNotification(errors[0], 'error');
        return false;
    }
    
    return true;
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification fixed top-24 right-6 z-50 max-w-sm p-4 rounded-xl shadow-lg transform translate-x-full transition-transform duration-300 ${
        type === 'success' ? 'bg-green-600' : 
        type === 'error' ? 'bg-red-600' : 'bg-blue-600'
    } text-white`;
    
    notification.innerHTML = `
        <div class="flex items-center">
            <div class="flex-shrink-0">
                <i class="fas ${
                    type === 'success' ? 'fa-check-circle' : 
                    type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'
                }"></i>
            </div>
            <div class="ml-3">
                <p class="text-sm font-medium">${message}</p>
            </div>
            <div class="ml-auto pl-3">
                <button class="text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
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
                
                const offsetTop = target.offsetTop - 80; // Account for fixed nav
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll effects
function initScrollEffects() {
    let ticking = false;
    
    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Parallax effect for hero background
        const hero = document.querySelector('.hero-bg');
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// Stats counter animation
function initStatsCounter() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (counter.getAttribute('data-suffix')) {
                counter.textContent = Math.floor(current) + counter.getAttribute('data-suffix');
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 16);
    });
}

// Intersection Observer for animations
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation class
                entry.target.classList.add('animate-in');
                
                // Trigger stats counter if it's a stats section
                if (entry.target.classList.contains('stats-section')) {
                    initStatsCounter();
                }
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .stats-section');
    animatedElements.forEach(el => observer.observe(el));
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add loading animation
window.addEventListener('load', function() {
    // Hide loader if exists
    const loader = document.querySelector('.loader');
    if (loader) {
        gsap.to(loader, {
            duration: 0.5,
            opacity: 0,
            onComplete: () => loader.remove()
        });
    }
    
    // Animate page entrance
    gsap.from('body', {
        duration: 0.8,
        opacity: 0,
        ease: 'power2.out'
    });
});

// Add error handling
window.addEventListener('error', function(event) {
    console.error('JavaScript error:', event.error);
    // You could send this to an error reporting service
});

// Add unhandled promise rejection handling
window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled promise rejection:', event.reason);
    event.preventDefault();
});

// Export functions for testing if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        validateForm,
        isValidEmail,
        showNotification
    };
}