// Toggle mobile nav
const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

// Active link based on current page
const current = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.site-nav a[href]').forEach(a => {
  const href = a.getAttribute('href');
  if (href === current) a.classList.add('active');
});

// IntersectionObserver reveal
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.18 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Back to top visibility
const backTop = document.querySelector('.back-to-top');
const toggleBackTop = () => {
  if (window.scrollY > 400) backTop.classList.add('show');
  else backTop.classList.remove('show');
};
window.addEventListener('scroll', toggleBackTop);

// Counters animation
function animateCounter(el) {
  const target = +el.dataset.target;
  const dur = 1200;
  const start = performance.now();
  const from = 0;
  const step = (now) => {
    const t = Math.min(1, (now - start) / dur);
    const val = Math.floor(from + (target - from) * t);
    el.textContent = val.toString();
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
document.querySelectorAll('.counter').forEach(animateCounter);

// Tilt on hover for service cards
function tilt(e) {
  const card = e.currentTarget;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const rx = ((y / rect.height) - 0.5) * -6;
  const ry = ((x / rect.width) - 0.5) * 6;
  card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
}
function tiltReset(e) {
  e.currentTarget.style.transform = 'rotateX(0) rotateY(0)';
}
document.querySelectorAll('.tilt').forEach(card => {
  card.addEventListener('mousemove', tilt);
  card.addEventListener('mouseleave', tiltReset);
});

// Blog filters
const filters = document.querySelectorAll('.filter');
const posts = document.querySelectorAll('#blog-grid .post');
filters.forEach(btn => {
  btn.addEventListener('click', () => {
    filters.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.filter;
    posts.forEach(p => {
      p.style.display = (cat === 'all' || p.dataset.cat === cat) ? '' : 'none';
    });
  });
});

// Contact form (client-side validation only)
const form = document.getElementById('contact-form');
const msg = document.getElementById('form-msg');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    msg.textContent = '';
    let valid = true;
    form.querySelectorAll('[required]').forEach(input => {
      const small = input.parentElement.querySelector('.error');
      if (!input.value.trim()) {
        small.textContent = 'Este campo es obligatorio';
        valid = false;
      } else {
        small.textContent = '';
      }
      if (input.type === 'email' && input.value) {
        const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
        if (!ok) { small.textContent = 'Ingresa un correo válido'; valid = false; }
      }
    });
    if (!valid) return;
    // Simulate submission
    msg.textContent = '¡Gracias! Te contactaremos en menos de 2 horas hábiles.';
    msg.style.color = 'var(--accent)';
    form.reset();
  });
}
