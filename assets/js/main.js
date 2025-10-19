// Minimal, framework-free interactions for the landing page
(function () {
  const qs = (s, el = document) => el.querySelector(s);
  const qsa = (s, el = document) => Array.from(el.querySelectorAll(s));

  // Mobile nav toggle
  const toggle = qs('.nav-toggle');
  const nav = qs('#site-nav');
  if (toggle && nav) {
    const closeNav = () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    };
    const openNav = () => {
      nav.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
    };
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = nav.classList.contains('is-open');
      isOpen ? closeNav() : openNav();
    });

    // Close when clicking outside nav
    document.addEventListener('click', (e) => {
      const target = e.target;
      const clickInsideNav = nav.contains(target) || toggle.contains(target);
      if (!clickInsideNav) {
        closeNav();
      }
    });

    // Close when choosing a menu item
    qsa('.nav__link', nav).forEach((link) => {
      link.addEventListener('click', () => closeNav());
    });
  }

  // Hero slider
  const slider = qs('.hero__slides');
  if (slider) {
    const track = qs('.hero__track', slider);
    const slides = qsa('.hero__slide', slider);
    const prev = qs('.hero__control--prev', slider);
    const next = qs('.hero__control--next', slider);
    const dotsEl = qs('.hero__dots', slider);
    let index = 0;
    let timer;

    const select = (i) => {
      index = (i + slides.length) % slides.length;
      slides.forEach((s, idx) => s.classList.toggle('is-active', idx === index));
      if (track) {
        const offset = -index * slider.clientWidth;
        track.style.transform = `translate3d(${offset}px,0,0)`;
      }
      if (dotsEl) {
        qsa('button', dotsEl).forEach((b, idx) => b.setAttribute('aria-selected', idx === index ? 'true' : 'false'));
      }
    };

    // dots
    if (dotsEl) {
      dotsEl.innerHTML = slides.map((_, i) => `<button role="tab" aria-label="Go to slide ${i + 1}"></button>`).join('');
      qsa('button', dotsEl).forEach((b, i) => b.addEventListener('click', () => select(i)));
    }

    const nextSlide = () => select(index + 1);
    const prevSlide = () => select(index - 1);

    next && next.addEventListener('click', nextSlide);
    prev && prev.addEventListener('click', prevSlide);

    const autorotateMs = parseInt(slider.getAttribute('data-autorotate') || '0', 10);
    const pauseOnHover = slider.getAttribute('data-pause-on-hover') === 'true';

    const start = () => { if (autorotateMs > 0) { stop(); timer = setInterval(nextSlide, autorotateMs); } };
    const stop = () => { if (timer) clearInterval(timer); };

    if (pauseOnHover) {
      slider.addEventListener('mouseenter', stop);
      slider.addEventListener('mouseleave', start);
    }

    // Ensure correct width on resize (e.g., orientation changes)
    const onResize = () => select(index);
    window.addEventListener('resize', onResize);

    // Initialize
    select(0);
    start();
  }

  // Testimonials rotate
  const testi = qs('.testimonials');
  if (testi) {
    const items = qsa('.testimonial', testi);
    let i = 0;
    const ms = parseInt(testi.getAttribute('data-autorotate') || '0', 10);
    if (items.length > 1 && ms > 0) {
      setInterval(() => {
        items[i].classList.remove('is-active');
        i = (i + 1) % items.length;
        items[i].classList.add('is-active');
      }, ms);
    }
  }

  // Year in footer
  const y = qs('#year');
  if (y) { y.textContent = new Date().getFullYear(); }
})();
