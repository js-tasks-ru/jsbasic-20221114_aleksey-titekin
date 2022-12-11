function initCarousel() {
  let btLeft = document.querySelector(".carousel__arrow_left");
  btLeft.addEventListener("click", clickLeft);
  btLeft.style.display = "none";

  let btRight = document.querySelector(".carousel__arrow_right");
  btRight.addEventListener("click", clickRight);

  //let carousel = document.querySelector(".carousel__inner");
  //carousel.addEventListener("transitionend", visibleButton);
}

function getStepOffset() {
  let carousel = document.querySelector(".carousel__inner");
  let step_offset = Number(carousel.dataset.stepOffset);
  return isNaN(step_offset) ? 0 : step_offset;
}

function clickLeft() {
  visibleButton(getStepOffset() + 1);
}

function clickRight() {
  visibleButton(getStepOffset() - 1);
}

function visibleButton(step_offset) {
  let carousel = document.querySelector(".carousel__inner");
  let size_offset = document.querySelector(".carousel__img").width;

  let btRight = document.querySelector(".carousel__arrow_right");
  let btLeft = document.querySelector(".carousel__arrow_left");
  btRight.style.display = step_offset > -3 ? "" : "none";
  btLeft.style.display = step_offset < 0 ? "" : "none";

  carousel.style.transform = `translateX(${step_offset * size_offset}px)`;
  carousel.dataset.stepOffset = step_offset;
}
