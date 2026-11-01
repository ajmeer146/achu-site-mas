/*!
 * Birthday Gift Page - script.js
 * Functional vanilla JavaScript for interactions
 */

document.addEventListener('DOMContentLoaded', function() {
  // Theme toggle functionality
  const html = document.documentElement;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // Set initial theme
  if (prefersDark) {
    html.setAttribute('data-theme', 'dark');
  } else {
    html.setAttribute('data-theme', 'light');
  }

  // Theme toggle button
  const themeToggle = document.createElement('button');
  themeToggle.className = 'btn btn-secondary';
  themeToggle.style.marginLeft = '1rem';
  themeToggle.style.padding = '0.5rem 1rem';
  themeToggle.style.fontSize = '0.75rem';
  themeToggle.innerHTML = prefersDark ? '🌙' : '☀️';
  themeToggle.title = 'Toggle theme';

  themeToggle.addEventListener('click', function() {
    if (html.getAttribute('data-theme') === 'dark') {
      html.setAttribute('data-theme', 'light');
      themeToggle.innerHTML = '☀️';
    } else {
      html.setAttribute('data-theme', 'dark');
      themeToggle.innerHTML = '🌙';
    }
  });

  // Insert theme toggle after navigation
  const nav = document.querySelector('nav');
  if (nav) {
    nav.appendChild(themeToggle);
  }

  // Scroll reveal observations
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

  // Reveal animations for sections
  document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Counter animation for birthday wish
  const wishCount = document.querySelector('.wish-count');
  if (wishCount) {
    let count = 0;
    const target = 100;
    const duration = 2000;
    const start = performance.now();

    function animateCounter(currentTime) {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      count = Math.floor(progress * target);
      wishCount.textContent = count;

      if (progress < 1) {
        requestAnimationFrame(animateCounter);
      }
    }

    requestAnimationFrame(animateCounter);
  }
});