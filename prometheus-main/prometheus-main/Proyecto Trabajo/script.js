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

let counter = 0;

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

function updateCarousel() {
  slide.style.transform = `translateX(-${counter * 100}%)`;
}
