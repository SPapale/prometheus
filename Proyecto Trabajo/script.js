// aparicion de cajas al hacer scroll
const boxes = document.querySelectorAll('.info-box');
window.addEventListener('scroll', () => {
  const trigger = window.innerHeight * 0.8; // punto donde se activan las cajas
  boxes.forEach(box => {
    const boxTop = box.getBoundingClientRect().top; // distancia del elemento al tope
    if (boxTop < trigger) box.classList.add('show'); // muestra la caja cuando se alcanza el punto
  });
});

// efecto de brillo en botones
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mouseenter', () => btn.classList.add('hovering')); // activa el brillo al pasar el mouse
  btn.addEventListener('mouseleave', () => btn.classList.remove('hovering')); // desactiva el brillo al salir
});

// dron flotante
const drone = document.querySelector('.drone-assemble');
if (drone) {
  let y = 0, dir = 1, rot = 0;
  function floatDrone() {
    y += dir * 0.2; // movimiento vertical suave
    rot = Math.sin(y / 5) * 2; // rotacion leve
    if (y > 15 || y < 0) dir *= -1; // cambia direccion al llegar a limites
    drone.style.transform = `translateY(${-y}px) rotateZ(${rot}deg)`; // aplica movimiento y rotacion
    requestAnimationFrame(floatDrone); // actualiza el movimiento constantemente
  }
  setTimeout(() => {
    drone.style.opacity = 1; // hace visible el dron
    drone.style.clipPath = 'inset(0 0 0 0)'; // elimina el recorte
    floatDrone(); // inicia el movimiento
  }, 1000);
}

// esferas flotantes
const spheres = document.querySelectorAll('.sphere');

spheres.forEach(s => {
  s.posX = Math.random() * 90; // posicion inicial aleatoria en x
  s.posY = Math.random() * 90; // posicion inicial aleatoria en y
  s.velX = (Math.random() * 0.1 + 0.05) * (Math.random() > 0.5 ? 1 : -1); // velocidad en x
  s.velY = (Math.random() * 0.15 + 0.05) * (Math.random() > 0.5 ? 1 : -1); // velocidad en y
  s.opacityDir = Math.random() > 0.5 ? 1 : -1;
  s.opacity = Math.random() * 0.3 + 0.2; // opacidad inicial
  s.style.top = `${s.posY}%`;
  s.style.left = `${s.posX}%`;
  s.style.opacity = s.opacity;
});

function floatSpheres() {
  spheres.forEach(s => {
    s.posX += s.velX; // movimiento horizontal
    s.posY += s.velY; // movimiento vertical
    s.opacity += 0.005 * s.opacityDir; // cambio de opacidad

    if (s.posX > 95 || s.posX < 0) s.velX *= -1; // rebote horizontal
    if (s.posY > 95 || s.posY < 0) s.velY *= -1; // rebote vertical
    if (s.opacity > 0.4 || s.opacity < 0.15) s.opacityDir *= -1; // mantiene opacidad en rango

    s.style.left = `${s.posX}%`;
    s.style.top = `${s.posY}%`;
    s.style.opacity = s.opacity;
  });

  requestAnimationFrame(floatSpheres); // repite la animacion
}

floatSpheres(); // inicia el movimiento de las esferas



// manejo del formulario de contacto
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  const messageDiv = document.getElementById('form-message');

  contactForm.addEventListener('submit', function(event) {
    event.preventDefault(); // evita que se recargue la pagina

    console.log("formulario enviado simulado"); // muestra en consola la accion

    if (messageDiv) {
        messageDiv.textContent = 'gracias por tu mensaje nos pondremos en contacto pronto'; // mensaje al usuario
    }

    setTimeout(() => {
      contactForm.reset(); // limpia los campos del formulario
      if (messageDiv) {
        messageDiv.textContent = ''; // borra el mensaje despues de un tiempo
      }
    }, 4000);
  });
}
