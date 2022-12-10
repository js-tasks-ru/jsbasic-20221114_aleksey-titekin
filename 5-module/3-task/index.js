let carousel;
let offset = 0;
let btLeft; 
let btRight;

function initCarousel() {
  btLeft = document.querySelector('.carousel__arrow_left');
  btRight = document.querySelector('.carousel__arrow_right');

  btLeft.addEventListener('click', clickLeft);
  btRight.addEventListener('click', clickRight);

  carousel = document.querySelector('.carousel__inner');

  visibleButton();
}

function clickLeft() {
  offset -= carousel.clientWidth;
  carousel.style.transform = `translateX(${offset}px)`;
  visibleButton();
}

function clickRight() {
  offset += carousel.clientWidth;
  carousel.style.transform = `translateX(${offset}px)`;
  visibleButton();
}

function visibleButton() {
  btRight.style.display =  offset === 0 ? 'none' : '';
  btLeft.style.display =  offset === -carousel.clientWidth * 3 ? 'none' : '';
}