let step_offset;
let size_offset;

function initCarousel() {
  step_offset = 0;
  size_offset = document.querySelector(".carousel__img").width;

  let btLeft = document.querySelector(".carousel__arrow_left");
  btLeft.addEventListener("click", clickLeft);
  btLeft.style.display = "none";

  let btRight = document.querySelector(".carousel__arrow_right");
  btRight.addEventListener("click", clickRight);

  //let carousel = document.querySelector(".carousel__inner");
  //carousel.addEventListener("transitionend", visibleButton);
}

function clickLeft() {
  step_offset++;
  visibleButton();
  let carousel = document.querySelector(".carousel__inner");
  carousel.style.transform = `translateX(${step_offset*size_offset}px)`;
}

function clickRight() {
  step_offset--;
  visibleButton();
  let carousel = document.querySelector(".carousel__inner");
  carousel.style.transform = `translateX(${step_offset*size_offset}px)`;

}

function visibleButton() {
  let btRight = document.querySelector(".carousel__arrow_right");
  let btLeft = document.querySelector(".carousel__arrow_left");
  btRight.style.display = step_offset > -3 ? "" : "none";
  btLeft.style.display = step_offset < 0 ? "" : "none";
}
