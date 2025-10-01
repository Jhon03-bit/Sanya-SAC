const carousel = document.querySelector(".carousel-slide"); // Selecciona el contenedor correcto
const slides = Array.from(carousel.children);
const totalSlides = slides.length;

if (totalSlides === 0) {
  console.error("El carrusel no tiene slides.");
} else {
  let currentIndex = 1;
  let autoSlideInterval;

  // Clonar slides para loop infinito
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);

  carousel.appendChild(firstClone);
  carousel.insertBefore(lastClone, carousel.children[0]);

  carousel.style.transition = 'none';
  carousel.style.transform = `translateX(${-currentIndex * 100}%)`;

  // Función mover slide
  function moveSlide(step) {
    currentIndex += step;
    carousel.style.transition = 'transform 0.6s ease-in-out';
    carousel.style.transform = `translateX(${-currentIndex * 100}%)`;
  }

  // Ajuste loop infinito
  carousel.addEventListener('transitionend', () => {
    const allSlides = carousel.children;
    if (allSlides[currentIndex] === firstClone) {
      carousel.style.transition = 'none';
      currentIndex = 1;
      carousel.style.transform = `translateX(${-currentIndex * 100}%)`;
    }
    if (allSlides[currentIndex] === lastClone) {
      carousel.style.transition = 'none';
      currentIndex = totalSlides;
      carousel.style.transform = `translateX(${-currentIndex * 100}%)`;
    }
  });

  // Auto-slide
  function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
      moveSlide(1);
    }, 3000);
  }

  function stopAutoSlide() {
    clearInterval(autoSlideInterval);
  }

  carousel.addEventListener('mouseenter', stopAutoSlide);
  carousel.addEventListener('mouseleave', startAutoSlide);

  // Botones
  document.querySelector(".prev").addEventListener("click", () => {
    stopAutoSlide();
    moveSlide(-1);
    startAutoSlide();
  });

  document.querySelector(".next").addEventListener("click", () => {
    stopAutoSlide();
    moveSlide(1);
    startAutoSlide();
  });

  // Iniciar
  startAutoSlide();
}
