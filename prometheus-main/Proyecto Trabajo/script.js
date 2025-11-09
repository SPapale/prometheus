// ==== APARICIÓN DE CAJAS AL SCROLL ====
const boxes = document.querySelectorAll('.info-box');
window.addEventListener('scroll', () => {
  const trigger = window.innerHeight * 0.8;
  boxes.forEach(box => {
    const boxTop = box.getBoundingClientRect().top;
    if (boxTop < trigger) box.classList.add('show');
  });
});

// ==== EFECTO DE BRILLO EN BOTONES ====
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mouseenter', () => btn.classList.add('hovering'));
  btn.addEventListener('mouseleave', () => btn.classList.remove('hovering'));
});

// ==== DRON FLOTANTE ====
const drone = document.querySelector('.drone-assemble');
if (drone) {
  let y = 0, dir = 1, rot = 0;
  function floatDrone() {
    y += dir * 0.2;
    rot = Math.sin(y / 5) * 2;
    if (y > 15 || y < 0) dir *= -1;
    drone.style.transform = `translateY(${-y}px) rotateZ(${rot}deg)`;
    requestAnimationFrame(floatDrone);
  }
  setTimeout(() => {
    drone.style.opacity = 1;
    drone.style.clipPath = 'inset(0 0 0 0)';
    floatDrone();
  }, 1000);
}

// ==== ESFERAS FLOTANTES ====
const spheres = document.querySelectorAll('.sphere');

spheres.forEach(s => {
  s.posX = Math.random() * 90;
  s.posY = Math.random() * 90;
  s.velX = (Math.random() * 0.1 + 0.05) * (Math.random() > 0.5 ? 1 : -1);
  s.velY = (Math.random() * 0.15 + 0.05) * (Math.random() > 0.5 ? 1 : -1);
  s.opacityDir = Math.random() > 0.5 ? 1 : -1;
  s.opacity = Math.random() * 0.3 + 0.2;
  s.style.top = `${s.posY}%`;
  s.style.left = `${s.posX}%`;
  s.style.opacity = s.opacity;
});

function floatSpheres() {
  spheres.forEach(s => {
    s.posX += s.velX;
    s.posY += s.velY;
    s.opacity += 0.005 * s.opacityDir;

    if (s.posX > 95 || s.posX < 0) s.velX *= -1;
    if (s.posY > 95 || s.posY < 0) s.velY *= -1;
    if (s.opacity > 0.4 || s.opacity < 0.15) s.opacityDir *= -1;

    s.style.left = `${s.posX}%`;
    s.style.top = `${s.posY}%`;
    s.style.opacity = s.opacity;
  });

  requestAnimationFrame(floatSpheres);
}

floatSpheres();


const slide = document.querySelector('.carousel-slide');
const images = document.querySelectorAll('.carousel-slide img');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

// Estos event listeners deben comprobar si los botones existen
// para no dar error en páginas que no tienen carrusel
let counter = 0;
if (next && prev && slide) {
  next.addEventListener('click', () => {
    counter++;
    if(counter >= images.length) counter = 0;
    updateCarousel();
  });

  prev.addEventListener('click', () => {
    counter--;
    if(counter < 0) counter = images.length - 1;
    updateCarousel();
  });
}

function updateCarousel() {
  if (slide) {
    slide.style.transform = `translateX(-${counter * 100}%)`;
  }
}

// ==== MANEJO DEL FORMULARIO DE CONTACTO ====
// Esta función simula un envío exitoso para cumplir el requisito de "funcionalidad"
// sin necesidad de un backend.

// Seleccionamos el formulario por el ID que agregamos en contacto.html
const contactForm = document.getElementById('contact-form');

// Verificamos si el formulario existe en la página actual
// (para no causar errores en index.html, quienes.html, etc.)
if (contactForm) {
  // Seleccionamos el div que usaremos para los mensajes
  const messageDiv = document.getElementById('form-message');

  contactForm.addEventListener('submit', function(event) {
    // 1. Prevenir el envío real del formulario (que recarga la página)
    event.preventDefault();

    // 2. Simular un 'envío'
    // En un proyecto real, aquí iría la llamada a un API (fetch)
    // o el formulario apuntaría a un servicio (Formspree, Netlify, etc.)
    console.log("Formulario enviado (simulado)");

    // 3. Mostrar mensaje de éxito al usuario
    if (messageDiv) {
        messageDiv.textContent = '¡Gracias por tu mensaje! Nos pondremos en contacto pronto.';
    }

    // 4. Limpiar el formulario después de unos segundos
    setTimeout(() => {
      contactForm.reset(); // Limpia los campos
      if (messageDiv) {
        messageDiv.textContent = ''; // Limpia el mensaje de éxito
      }
    }, 4000); // 4 segundos
  });
}