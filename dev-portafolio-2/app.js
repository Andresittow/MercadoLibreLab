// Navegación responsive
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle del menú hamburguesa
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Scroll navbar
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Activar link según sección visible
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Animación de contadores en la sección "Sobre Mí"
const observerOptions = {
    threshold: 0.5
};

const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const increment = target / 100;
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.ceil(current);
            setTimeout(updateCounter, 20);
        } else {
            element.textContent = target + '+';
        }
    };

    updateCounter();
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.stat-number');
            counters.forEach(counter => {
                if (counter.textContent === '0') {
                    animateCounter(counter);
                }
            });
            counterObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const aboutSection = document.querySelector('.about');
if (aboutSection) {
    counterObserver.observe(aboutSection);
}

// Animación de barras de habilidades
const animateSkillBars = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const progress = bar.getAttribute('data-progress');
                bar.style.width = progress + '%';
            });
            skillObserver.unobserve(entry.target);
        }
    });
};

const skillObserver = new IntersectionObserver(animateSkillBars, observerOptions);
const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    skillObserver.observe(skillsSection);
}

// Scroll to Top Button
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('active');
    } else {
        scrollTopBtn.classList.remove('active');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Formulario de contacto
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Obtener valores del formulario
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Validación básica
    if (!name || !email || !subject || !message) {
        showNotification('Por favor, completa todos los campos', 'error');
        return;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Por favor, ingresa un email válido', 'error');
        return;
    }

    // Aquí normalmente enviarías los datos a un servidor
    // Por ahora, solo mostramos un mensaje de éxito
    showNotification('¡Mensaje enviado con éxito! Te contactaré pronto.', 'success');
    
    // Limpiar formulario
    contactForm.reset();
});

// Función para mostrar notificaciones
function showNotification(message, type) {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    // Estilos inline para la notificación
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-weight: 500;
    `;

    // Agregar animación
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Agregar al DOM
    document.body.appendChild(notification);

    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Animación de entrada para elementos
const fadeInElements = document.querySelectorAll('.project-card, .skill-card, .stat-card');

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            fadeInObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

fadeInElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.6s ease';
    fadeInObserver.observe(element);
});

// Efecto parallax suave en hero
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroContent && heroImage && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Smooth scroll para navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Typing effect en el título hero (opcional)
const typingText = document.querySelector('.hero-title');
if (typingText) {
    const text = typingText.innerHTML;
    typingText.innerHTML = '';
    let index = 0;

    function typeWriter() {
        if (index < text.length) {
            typingText.innerHTML += text.charAt(index);
            index++;
            setTimeout(typeWriter, 100);
        }
    }

    // Iniciar efecto después de cargar la página
    window.addEventListener('load', () => {
        setTimeout(typeWriter, 500);
    });
}

// Cambiar color de fondo de las tarjetas de proyecto al pasar el mouse
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Detección de tema del sistema (dark mode)
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // Aquí podrías agregar lógica para modo oscuro
    console.log('Modo oscuro detectado');
}

// Precarga de imágenes (si tienes imágenes en el proyecto)
window.addEventListener('load', () => {
    console.log('Portafolio cargado completamente');
});

// Lazy loading para imágenes (si las agregas)
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback para navegadores que no soportan lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// Animación de fade in general al hacer scroll
const sections = document.querySelectorAll('section');
const fadeInOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'all 0.6s ease';
    fadeInOnScroll.observe(section);
});

console.log('¡Portafolio iniciado correctamente! 🚀');