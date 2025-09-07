// =============================================
// FUNCIONALIDADES GENERALES - Para todas las páginas
// =============================================

document.addEventListener('DOMContentLoaded', function() {
  
  // NAVEGACIÓN MÓVIL: Controla la visualización del menú en dispositivos pequeños
  const navToggle = document.querySelector('.nav-toggle');
  const primaryNav = document.querySelector('#primary-nav');
  
  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isExpanded);
      primaryNav.classList.toggle('active');
    });
  }
  
  // CONTADORES ANIMADOS: Animación para números que cuentan hacia arriba
  const counters = document.querySelectorAll('.counter');
  
  if (counters.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
      observer.observe(counter);
    });
    
    function animateCounter(element) {
      const target = parseInt(element.getAttribute('data-target'));
      const duration = 2000; // 2 seconds
      const increment = target / (duration / 16); // 60fps
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          element.textContent = target + (element.getAttribute('data-suffix') || '');
          clearInterval(timer);
        } else {
          element.textContent = Math.floor(current) + (element.getAttribute('data-suffix') || '');
        }
      }, 16);
    }
  }
  
  // REVEAL ANIMATIONS: Animación de elementos al hacer scroll
  const revealElements = document.querySelectorAll('.reveal');
  
  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });
    
    revealElements.forEach(element => {
      revealObserver.observe(element);
    });
  }
  
  // BACK TO TOP: Muestra/oculta el botón para volver arriba
  const backToTop = document.querySelector('.back-to-top');
  
  if (backToTop) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTop.style.display = 'flex';
      } else {
        backToTop.style.display = 'none';
      }
    });
  }
  
  // =============================================
  // PÁGINA CONTACTO - Validación de formulario
  // =============================================
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      let isValid = true;
      
      // Validar campos requeridos
      const requiredFields = this.querySelectorAll('[required]');
      requiredFields.forEach(field => {
        const errorElement = field.nextElementSibling;
        if (field.value.trim() === '') {
          errorElement.textContent = 'Este campo es obligatorio';
          isValid = false;
        } else {
          errorElement.textContent = '';
        }
      });
      
      // Validar email
      const emailField = document.getElementById('email');
      if (emailField) {
        const emailError = emailField.nextElementSibling;
        if (emailField.value && !isValidEmail(emailField.value)) {
          emailError.textContent = 'Por favor ingresa un email válido';
          isValid = false;
        }
      }
      
      // Si es válido, mostrar mensaje de éxito
      if (isValid) {
        const formMsg = document.getElementById('form-msg');
        formMsg.textContent = '¡Gracias por tu mensaje! Te contactaremos en menos de 2 horas.';
        formMsg.style.color = 'green';
        this.reset();
        
        // Limpiar mensaje después de 5 segundos
        setTimeout(() => {
          formMsg.textContent = '';
        }, 5000);
      }
    });
  }
  
  // =============================================
  // PÁGINA BLOG - Filtrado de artículos por categoría
  // =============================================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const blogCards = document.querySelectorAll('.blog-card');
  
  if (filterButtons.length > 0 && blogCards.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remover clase active de todos los botones
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Agregar clase active al botón clickeado
        this.classList.add('active');
        
        const filter = this.getAttribute('data-filter');
        
        // Mostrar/ocultar artículos según el filtro
        blogCards.forEach(card => {
          if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
  
  // =============================================
  // PÁGINA SERVICIOS - Efecto de inclinación en tarjetas
  // =============================================
  const serviceCards = document.querySelectorAll('.service.tilt');
  
  if (serviceCards.length > 0) {
    serviceCards.forEach(card => {
      card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const angleY = (x - centerX) / 25;
        const angleX = (centerY - y) / 25;
        
        this.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.02, 1.02, 1.02)`;
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
      });
    });
  }
  
  // =============================================
  // FUNCIONES UTilitarias
  // =============================================
  
  // Validar email
  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

// Configuración del canvas de partículas
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const particles = [];
    
    // Ajustar tamaño del canvas
function resizeCanvas() {
    // Usa el ancho/alto del contenedor padre (.hero)
    const heroSection = canvas.parentElement;
    canvas.width = heroSection.offsetWidth;
    canvas.height = heroSection.offsetHeight;
}
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Configuración de las partículas
    const config = {
        particleCount: 100,
        particleRadius: 4,
        connectionDistance: 150,
        repulsionRadius: 100,
        maxSpeed: 0.7,
        particleColor: 'rgba(255, 255, 255, 0.7)',
        lineColor: 'rgba(255, 255, 255, 0.2)'
    };
    
    // Posición del mouse
    const mouse = { 
        x: null, 
        y: null, 
        radius: config.repulsionRadius 
    };
    
    // Clase Partícula
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = config.particleRadius;
        }
        
        update() {
            // Rebotes en los bordes
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
            
            // Interacción con el mouse
            this.repelFromMouse();
            
            // Movimiento
            this.x += this.vx;
            this.y += this.vy;
            
            // Fricción
            this.vx *= 0.99;
            this.vy *= 0.99;
        }
        
        repelFromMouse() {
            if (mouse.x === null || mouse.y === null) return;
            
            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < mouse.radius) {
                const angle = Math.atan2(dy, dx);
                const force = (mouse.radius - distance) / mouse.radius;
                
                this.vx += Math.cos(angle) * force * config.maxSpeed;
                this.vy += Math.sin(angle) * force * config.maxSpeed;
            }
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = config.particleColor;
            ctx.fill();
        }
    }
    
    // Crear partículas
    function createParticles() {
        for (let i = 0; i < config.particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    // Dibujar conexiones entre partículas
    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < config.connectionDistance) {
                    const opacity = 1 - (distance / config.connectionDistance);
                    ctx.beginPath();
                    ctx.strokeStyle = `${config.lineColor.replace('0.2', opacity * 0.3)}`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    // Animación
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        drawConnections();
        
        requestAnimationFrame(animate);
    }
    
    // Event listeners para el mouse
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });
    
    canvas.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
    });
    
    // Inicializar y comenzar animación
    createParticles();
    animate();

    const services = document.querySelectorAll('.service');
  const body = document.body;
  
  // Agregar evento de clic a cada servicio
  services.forEach(service => {
    service.addEventListener('click', function() {
      const modalId = this.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      
      // Activar el modal y el desenfoque
      modal.classList.add('active');
      body.classList.add('modal-open');
    });
  });
  
  // Cerrar modales
  const closeButtons = document.querySelectorAll('.modal-close');
  closeButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.stopPropagation();
      const modal = this.closest('.modal-overlay');
      
      // Desactivar el modal y el desenfoque
      modal.classList.remove('active');
      body.classList.remove('modal-open');
    });
  });
  
  // Cerrar modal al hacer clic fuera del contenido
  const modals = document.querySelectorAll('.modal-overlay');
  modals.forEach(modal => {
    modal.addEventListener('click', function(e) {
      if (e.target === this) {
        this.classList.remove('active');
        body.classList.remove('modal-open');
      }
    });
  });
  
  // Cerrar modal con la tecla Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      modals.forEach(modal => {
        if (modal.classList.contains('active')) {
          modal.classList.remove('active');
          body.classList.remove('modal-open');
        }
      });
    }
  });
  
});
