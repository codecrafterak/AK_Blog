/**
 * AK Blog - Interactive JavaScript
 * Handles navigation, animations, and user interactions
 */

// DOM Elements
const navbar = document.getElementById('navbar');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const backgroundShapes = document.querySelectorAll('.shape');
const form = document.querySelector('.form');

// Navigation functionality
class Navigation {
  constructor() {
    this.init();
  }

  init() {
    this.handleScroll();
    this.handleMobileMenu();
    this.handleSmoothScroll();
    window.addEventListener('scroll', () => this.handleScroll());
  }

  // Handle navbar scroll effects
  handleScroll() {
    const scrolled = window.scrollY > 50;
    navbar.classList.toggle('scrolled', scrolled);
  }

  // Handle mobile menu toggle
  handleMobileMenu() {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // Handle smooth scrolling for navigation links
  handleSmoothScroll() {
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  }
}

// Background animations
class BackgroundAnimations {
  constructor() {
    this.init();
  }

  init() {
    this.animateShapes();
    window.addEventListener('scroll', () => this.handleScrollAnimations());
  }

  // Animate background shapes based on scroll
  animateShapes() {
    backgroundShapes.forEach((shape, index) => {
      const speed = parseFloat(shape.dataset.speed) || 0.5;
      const initialY = Math.random() * window.innerHeight;
      const initialX = Math.random() * window.innerWidth;
      
      shape.style.top = `${initialY}px`;
      shape.style.left = `${initialX}px`;
      
      // Add random movement
      setInterval(() => {
        const newY = Math.random() * window.innerHeight;
        const newX = Math.random() * window.innerWidth;
        shape.style.transform = `translate(${newX - initialX}px, ${newY - initialY}px) scale(${0.8 + Math.random() * 0.4})`;
      }, 5000 + index * 1000);
    });
  }

  // Handle scroll-based animations
  handleScrollAnimations() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    backgroundShapes.forEach((shape, index) => {
      const speed = parseFloat(shape.dataset.speed) || 0.5;
      const yPos = -(scrolled * speed);
      const rotate = scrolled * 0.1 * (index + 1);
      shape.style.transform = `translateY(${yPos}px) rotate(${rotate}deg)`;
    });
  }
}

// Scroll animations for elements
class ScrollAnimations {
  constructor() {
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    this.init();
  }

  init() {
    this.createObserver();
    this.observeElements();
  }

  createObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          
          // Add staggered animation for grid items
          if (entry.target.classList.contains('grid-item')) {
            const siblings = entry.target.parentElement.children;
            Array.from(siblings).forEach((sibling, index) => {
              setTimeout(() => {
                sibling.classList.add('animate-in');
              }, index * 100);
            });
          }
        }
      });
    }, this.observerOptions);
  }

  observeElements() {
    // Elements to animate on scroll
    const animatedElements = document.querySelectorAll(`
      .aim-card,
      .project-card,
      .blog-card,
      .contact-info,
      .form,
      .section-title
    `);

    animatedElements.forEach(el => {
      el.classList.add('animate-on-scroll');
      this.observer.observe(el);
    });
  }
}

// Form handling
class FormHandler {
  constructor() {
    this.init();
  }

  init() {
    if (form) {
      form.addEventListener('submit', (e) => this.handleSubmit(e));
      this.addInputAnimations();
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission
    this.showSubmissionFeedback();
    
    // Reset form after delay
    setTimeout(() => {
      form.reset();
    }, 2000);
  }

  showSubmissionFeedback() {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Message Sent! ✓';
    submitBtn.style.background = 'linear-gradient(135deg, #4ade80, #22c55e)';
    submitBtn.disabled = true;
    
    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.style.background = '';
      submitBtn.disabled = false;
    }, 3000);
  }

  addInputAnimations() {
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
      input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
      });
      
      input.addEventListener('blur', () => {
        if (!input.value) {
          input.parentElement.classList.remove('focused');
        }
      });
      
      // Check if input has value on load
      if (input.value) {
        input.parentElement.classList.add('focused');
      }
    });
  }
}

// Performance optimizations
class PerformanceOptimizer {
  constructor() {
    this.init();
  }

  init() {
    this.lazyLoadImages();
    this.optimizeScrollEvents();
  }

  lazyLoadImages() {
    const images = document.querySelectorAll('img[src]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach(img => {
        img.classList.add('lazy');
        imageObserver.observe(img);
      });
    }
  }

  optimizeScrollEvents() {
    let ticking = false;
    
    const optimizedScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Scroll-dependent operations here
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', optimizedScroll, { passive: true });
  }
}

// Theme and accessibility
class AccessibilityEnhancer {
  constructor() {
    this.init();
  }

  init() {
    this.handleKeyboardNavigation();
    this.addSkipLinks();
    this.enhanceFocusVisibility();
  }

  handleKeyboardNavigation() {
    // Handle escape key for mobile menu
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });

    // Trap focus in mobile menu when open
    navMenu.addEventListener('keydown', (e) => {
      if (e.key === 'Tab' && navMenu.classList.contains('active')) {
        const focusableElements = navMenu.querySelectorAll('a[href]');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    });
  }

  addSkipLinks() {
    const skipLink = document.createElement('a');
    skipLink.href = '#intro';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
      position: absolute;
      top: -40px;
      left: 6px;
      background: var(--primary-gold);
      color: var(--bg-primary);
      padding: 8px;
      text-decoration: none;
      border-radius: 4px;
      z-index: 10000;
      transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', () => {
      skipLink.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', () => {
      skipLink.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
  }

  enhanceFocusVisibility() {
    // Add focus-visible polyfill behavior
    document.addEventListener('keydown', () => {
      document.body.classList.add('keyboard-navigation');
    });
    
    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-navigation');
    });
  }
}

// Initialize all modules when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all components
  new Navigation();
  new BackgroundAnimations();
  new ScrollAnimations();
  new FormHandler();
  new PerformanceOptimizer();
  new AccessibilityEnhancer();
  
  // Add loading animation
  document.body.classList.add('loaded');
  
  // Console message for developers
  console.log(`
    🚀 AK Blog - Built with passion for technology
    
    Features:
    ✓ Responsive design
    ✓ Smooth animations
    ✓ Accessibility optimized
    ✓ Performance optimized
    ✓ Modern JavaScript
    
    Feel free to explore the code!
  `);
  
  const toggleBtn = document.getElementById('dark-mode-toggle');
  // Set initial theme based on localStorage or system preference
  function setTheme(mode) {
    if (mode === 'dark') {
      document.body.classList.add('dark-mode');
      toggleBtn.textContent = '☀️';
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      toggleBtn.textContent = '🌙';
      localStorage.setItem('theme', 'light');
    }
  }
  const savedMode = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  setTheme(savedMode ? savedMode : (prefersDark ? 'dark' : 'light'));

  // Toggle theme on button click
  toggleBtn.addEventListener('click', function () {
    const isDark = document.body.classList.contains('dark-mode');
    setTheme(isDark ? 'light' : 'dark');
  });
});

// Add CSS for animations
const animationStyles = `
  .animate-on-scroll {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .animate-on-scroll.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
  
  .lazy {
    opacity: 0;
    transition: opacity 0.3s;
  }
  
  .lazy.loaded {
    opacity: 1;
  }
  
  body.loaded {
    opacity: 1;
  }
  
  body {
    opacity: 0;
    transition: opacity 0.3s;
  }
  
  .form-group.focused label {
    color: var(--primary-gold);
    transform: translateY(-2px);
  }
  
  .keyboard-navigation *:focus {
    outline: 2px solid var(--primary-gold) !important;
    outline-offset: 2px !important;
  }
`;

// Inject animation styles
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    Navigation,
    BackgroundAnimations,
    ScrollAnimations,
    FormHandler,
    PerformanceOptimizer,
    AccessibilityEnhancer
  };
}
