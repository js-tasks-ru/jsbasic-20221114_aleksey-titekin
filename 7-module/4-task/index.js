import createElement from "../../assets/lib/create-element.js";

export default class StepSlider {
  #config = {};
  #root;
  constructor({ steps, value = 0 }) {
    this.#config.steps = steps;
    this.#config.value = value;
    this.#root = this.#render();
    this.#remove();
  }

  #render() {
    let node = createElement(
      `  
      <div class="slider">
        <!--Ползунок слайдера с активным значением-->
        <div class="slider__thumb">
          <span class="slider__value"></span>
        </div>

        <!--Заполненная часть слайдера-->
        <div class="slider__progress"></div>

        <!--Шаги слайдера-->
        <div class="slider__steps"></div>
      </div>`
    );

    let steps = node.querySelector(".slider__steps");
    for (let i = 0; i < this.#config.steps; i++) {
      steps.append(document.createElement("span"));
    }

    node.addEventListener("click", this.#onClick);

    let thumb = node.querySelector(".slider__thumb");
    thumb.ondragstart = () => false;
    //thumb.onpointerdown = () => false;
    //thumb.onpointermove = () => false;

    thumb.addEventListener("pointerdown", this.#onPointerDown);

    return node;
  }

  get elem() {
    return this.#root;
  }

  #onClick = (event) => {
    let rect = this.#root.getBoundingClientRect();
    let stepSize = this.#root.clientWidth / (this.#config.steps - 1);
    this.#config.value = Math.round((event.clientX - rect.x) / stepSize);
    this.#remove();

    event.target.dispatchEvent(
      new CustomEvent("slider-change", {
        detail: this.#config.value,
        bubbles: true,
      })
    );
  };

  #setProgress(percents) {
    let thumb = this.#root.querySelector(".slider__thumb");
    let progress = this.#root.querySelector(".slider__progress");
    
    thumb.style.left = `${percents}%`;
    progress.style.width = `${percents}%`;    
  }

  #remove() {
    this.#root.querySelector(".slider__value").textContent = this.#config.value;

    let span = this.#root.querySelector(".slider__step-active");
    if (span) span.classList.remove("slider__step-active");

    span = this.#root.querySelector(".slider__steps").firstElementChild;
    for (let i = 1; i <= this.#config.value; i++) {
      span = span.nextElementSibling;
    }
    span.classList.add("slider__step-active");

    let percent = Math.round((100 / (this.#config.steps - 1)) * this.#config.value);
    this.#setProgress(percent);

  }

  #onPointerDown = (event) => {
    this.#root.classList.add("slider_dragging");

    document.addEventListener("pointermove", this.#onPointerMove);
    document.addEventListener("pointerup", this.#onPointerUp, { once: true });
  };

  #onPointerMove = (event) => {
    let rect =  this.#root.getBoundingClientRect();
    if (event.pageX < rect.left || event.pageX > rect.right) return;
 
    let percent = Math.round((event.pageX - rect.left) / rect.width * 100);
    this.#setProgress(percent);
  };

  #onPointerUp = (event) => {
    this.#root.classList.remove("slider_dragging");
    let rect =  this.#root.getBoundingClientRect();
    let newClientX = rect.left + parseInt(this.#root.querySelector(".slider__thumb").style.left) * rect.width / 100;

    let clickEvent = new MouseEvent('click', { clientX: newClientX, bubbles: true });
    this.#root.dispatchEvent(clickEvent);

    document.removeEventListener("pointermove", this.#onPointerMove);
  };
}
