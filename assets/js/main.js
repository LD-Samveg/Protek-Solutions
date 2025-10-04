// Mobile nav toggle
const navToggleButton = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');
if (navToggleButton && siteNav) {
  navToggleButton.addEventListener('click', () => {
    const expanded = navToggleButton.getAttribute('aria-expanded') === 'true';
    navToggleButton.setAttribute('aria-expanded', String(!expanded));
    siteNav.classList.toggle('open');
  });
}

// Footer year
const yearSpan = document.getElementById('year');
if (yearSpan) yearSpan.textContent = String(new Date().getFullYear());

// Contact form handling (demo only)
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const message = String(formData.get('message') || '').trim();
    if (!name || !email || !message) {
      if (formNote) formNote.textContent = 'Please fill in the required fields.';
      return;
    }
    if (formNote) {
      formNote.textContent = 'Thanks! Your enquiry has been recorded. We will contact you shortly.';
    }
    contactForm.reset();
  });
}

// Hero slideshow
(function initHeroSlideshow(){
  const container = document.querySelector('.hero-slides');
  if (!container) return;
  const slides = Array.from(container.querySelectorAll('.hero-slide'));
  if (slides.length <= 1) return;
  let index = 0;
  setInterval(() => {
    slides[index].classList.remove('active');
    index = (index + 1) % slides.length;
    slides[index].classList.add('active');
  }, 5000);
})();


