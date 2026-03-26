/* ============================================================
   M&P Web Studio — JavaScript
   ============================================================ */

(function () {
  'use strict';

  /* ---------- Sticky Header ---------- */
  const header = document.getElementById('site-header');
  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 20);
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Mobile Navigation ---------- */
  const navToggle = document.getElementById('nav-toggle');
  const navLinks  = document.getElementById('nav-links');

  navToggle.addEventListener('click', function () {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close nav when a link is clicked
  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  /* ---------- Footer Year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ---------- Contact Form Validation & Submission ---------- */
  const form       = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const valid = validateForm();
      if (!valid) return;

      // Simulate async submission
      const submitBtn = form.querySelector('[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';
      formStatus.textContent = '';
      formStatus.className = 'form-status';

      setTimeout(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
        formStatus.textContent = '✅ Message sent! We\'ll be in touch shortly.';
        formStatus.className = 'form-status success';
        form.reset();
        clearErrors();
      }, 1400);
    });
  }

  function validateForm() {
    clearErrors();
    let isValid = true;

    const name    = document.getElementById('name');
    const email   = document.getElementById('email');
    const message = document.getElementById('message');

    if (!name.value.trim()) {
      showError('name-error', name, 'Please enter your name.');
      isValid = false;
    }

    if (!email.value.trim()) {
      showError('email-error', email, 'Please enter your email address.');
      isValid = false;
    } else if (!isValidEmail(email.value.trim())) {
      showError('email-error', email, 'Please enter a valid email address.');
      isValid = false;
    }

    if (!message.value.trim()) {
      showError('message-error', message, 'Please enter a message.');
      isValid = false;
    }

    return isValid;
  }

  function showError(errorId, field, message) {
    var errorEl = document.getElementById(errorId);
    if (errorEl) errorEl.textContent = message;
    field.classList.add('is-invalid');
  }

  function clearErrors() {
    form.querySelectorAll('.field-error').forEach(function (el) {
      el.textContent = '';
    });
    form.querySelectorAll('.is-invalid').forEach(function (el) {
      el.classList.remove('is-invalid');
    });
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /* ---------- Intersection Observer — fade-in cards ---------- */
  if ('IntersectionObserver' in window) {
    const observedEls = document.querySelectorAll('.card, .portfolio-item, .testimonial-card, .about-card');

    const style = document.createElement('style');
    style.textContent = [
      '.observe-hidden { opacity: 0; transform: translateY(28px); transition: opacity 0.5s ease, transform 0.5s ease; }',
      '.observe-visible { opacity: 1; transform: none; }'
    ].join('');
    document.head.appendChild(style);

    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('observe-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    observedEls.forEach(function (el) {
      el.classList.add('observe-hidden');
      io.observe(el);
    });
  }

})();
