import createElement from "../../assets/lib/create-element.js";

export default class Carousel {
  #slides;
  #root;
  constructor(slides) {
    this.#slides = slides;
    this.#createTemplate();
    this.#initCarusel();
  }

  #createTemplate() {
    this.#root = createElement(
      `<div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div> </div>`
    );

    let div = createElement('<div class="carousel__inner"></div>');
    this.#root.append(div);
    for (let slide of this.#slides) {
      div.append(
        createElement(
          `
          <div class="carousel__slide" data-id="${slide.id}">
            <img src="/assets/images/carousel/${
              slide.image
            }" class="carousel__img" alt="slide">
            <div class="carousel__caption">
              <span class="carousel__price">€${slide.price.toFixed(2)}</span>
              <div class="carousel__title">${slide.name}</div>
              <button type="button" class="carousel__button">
                <img src="/assets/images/icons/plus-icon.svg" alt="icon">
              </button>
            </div>
          </div> `
        )
      );
    }
  }

  get elem() {
    return this.#root;
  }

  #initCarusel() {
    let btLeft = this.#root.querySelector(".carousel__arrow_left");
    btLeft.addEventListener("click", () => {
      this.#visibleButton(this.#StepOffset() + 1);
    });
    btLeft.style.display = "none";

    let btRight = this.#root.querySelector(".carousel__arrow_right");
    btRight.addEventListener("click", () => {
      this.#visibleButton(this.#StepOffset() - 1);
    });

    let btPlus = this.#root.querySelectorAll(".carousel__button");
    for (let btn of btPlus) {
      btn.addEventListener("click", this.#onClickCardButton);
    }
  }

  #StepOffset() {
    let carousel = this.#root.querySelector(".carousel__inner");
    let step_offset = Number(carousel.dataset.stepOffset);
    return isNaN(step_offset) ? 0 : step_offset;
  }

  #visibleButton(step_offset) {
    let carousel = this.#root.querySelector(".carousel__inner");
    let size_offset = this.#root.querySelector(".carousel__img").width;

    let btRight = this.#root.querySelector(".carousel__arrow_right");
    let btLeft = this.#root.querySelector(".carousel__arrow_left");
    btRight.style.display =
      step_offset > -(this.#slides.length - 1) ? "" : "none";
    btLeft.style.display = step_offset < 0 ? "" : "none";

    carousel.style.transform = `translateX(${step_offset * size_offset}px)`;
    carousel.dataset.stepOffset = step_offset;
  }

  #onClickCardButton = (event) => {
    console.log(event.target.closest(".carousel__slide").dataset.id);
    event.target.dispatchEvent(
      new CustomEvent("product-add", {
        detail: event.target.closest(".carousel__slide").dataset.id,
        bubbles: true,
      })
    );
  };
}
