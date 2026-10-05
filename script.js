document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================
     1. Scroll Reveal Animation using Intersection Observer
     ========================================================== */
  // We first add '.reveal' class to sections/elements we want to animate
  const elementsToReveal = [
    document.querySelector('.hero-text-content'),
    document.querySelector('.hero-image-wrapper'),
    document.querySelector('.tagline-banner'),
    document.querySelector('.about-image-card'),
    document.querySelector('.about-content'),
    ...document.querySelectorAll('.feature-card'),
    ...document.querySelectorAll('.product-card'),
    document.querySelector('.cta-card'),
    document.querySelector('.detail-image-wrapper'),
    document.querySelector('.detail-info'),
    document.querySelector('.specs-box'),
    ...document.querySelectorAll('.review-card')
  ].filter(el => el !== null); // Filter out nulls if elements don't exist on page

  // Add the base class and staggered delay
  elementsToReveal.forEach((el, index) => {
    el.classList.add('reveal');
    if (el.classList.contains('feature-card') || el.classList.contains('product-card') || el.classList.contains('review-card')) {
      // Stagger child elements
      const delay = (index % 4) * 100;
      if (delay > 0) el.style.transitionDelay = `${delay}ms`;
    }
  });

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Animate only once
      }
    });
  }, { rootMargin: '0px 0px -50px 0px', threshold: 0.1 });

  elementsToReveal.forEach(el => revealObserver.observe(el));

  /* ==========================================================
     2. 3D Tilt Effect on Product Cards
     ========================================================== */
  const cards = document.querySelectorAll('.product-card');

  cards.forEach(card => {
    card.classList.add('tilt-wrapper');
    const inner = card; // we'll rotate the card itself
    
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within the element
      const y = e.clientY - rect.top;  // y position within the element
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -5; // max rotation 5 deg
      const rotateY = ((x - centerX) / centerX) * 5;

      inner.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      inner.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
      inner.style.transition = 'transform 0.5s ease';
    });

    card.addEventListener('mouseenter', () => {
      inner.style.transition = 'transform 0.1s ease-out';
    });
  });

  /* ==========================================================
     3. Floating animation to Hero Image
     ========================================================== */
  const heroImage = document.querySelector('.hero-image-wrapper img');
  if (heroImage) {
    heroImage.classList.add('floating');
  }

  /* ==========================================================
     4. Interactive Color Picker (Detail Page)
     ========================================================== */
  const colorCircles = document.querySelectorAll('.color-circle');
  const mainImage = document.querySelector('.main-detail-image');
  
  // Dummy colors logic to demonstrate interaction
  colorCircles.forEach((circle, index) => {
    circle.addEventListener('click', () => {
      // Remove active class from all
      colorCircles.forEach(c => c.classList.remove('active'));
      // Add active to clicked
      circle.classList.add('active');
      
      // Flash effect on image to simulate changing color
      if(mainImage) {
        mainImage.style.opacity = '0.5';
        setTimeout(() => {
          mainImage.style.opacity = '1';
        }, 150);
      }
    });
  });

  // Set first color as active by default
  if(colorCircles.length > 0) {
    colorCircles[0].classList.add('active');
  }

  /* ==========================================================
     5. Header Scrolled Shadow Effect
     ========================================================== */
  const header = document.querySelector('.header');
  if(header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)';
      } else {
        header.style.boxShadow = 'none';
      }
    });
  }

});
