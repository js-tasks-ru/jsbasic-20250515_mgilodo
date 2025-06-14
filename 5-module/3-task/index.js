function initCarousel() {
  const carousel = document.querySelector('.carousel');
  const inner = carousel.querySelector('.carousel__inner');
  const btnRight = carousel.querySelector('.carousel__arrow_right');
  const btnLeft = carousel.querySelector('.carousel__arrow_left');

  let position = 0;
  const slideWidth = inner.offsetWidth;
  const totalSlides = 4;

  btnLeft.style.display = 'none';

  btnRight.addEventListener('click', () => {
    position++;
    updateCarousel();
  });

  btnLeft.addEventListener('click', () => {
    position--;
    updateCarousel();
  });

  function updateCarousel() {
    inner.style.transform = `translateX(-${slideWidth * position}px)`;

    btnLeft.style.display = position === 0 ? 'none' : '';
    btnRight.style.display = position === totalSlides - 1 ? 'none' : '';
  }
}
