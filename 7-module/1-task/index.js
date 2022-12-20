import createElement from "../../assets/lib/create-element.js";

export default class RibbonMenu {
  #root = null;
  #categories = [];

  constructor(categories) {
    this.#categories = categories;
    this.#root = this.#render();
  }

  get elem() {
    return this.#root;
  }

  #render() {
    let root = createElement(
      `<div class="ribbon">
      <button class="ribbon__arrow ribbon__arrow_left">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
      <nav class="ribbon__inner">` +
        this.#categories
          .map((item, index) => {
            return `<a href="#" class="ribbon__item ${
              index == 0 ? "ribbon__item_active" : ""
            }" data-id="${item.id}">${item.name}</a>`;
          })
          .join("") +
        `</nav>
        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
        </div>`
    );

    let elem;
    elem = root.querySelector(".ribbon__arrow_left");
    elem.addEventListener("click", this.#onClickLeft);

    elem = root.querySelector(".ribbon__arrow_right");
    elem.addEventListener("click", this.#onClickRight);

    elem = root.querySelector(".ribbon__inner");
    elem.addEventListener("scroll", this.#onScrollRibbon);

    elem = root.querySelector(".ribbon__inner");
    elem.addEventListener("click", this.#onClickItem);

    //root.querySelector('.ribbon__inner').addEventListener('scroll', this.#onScrollRibbon);
    //root.querySelector('.ribbon__arrow_left').addEventListener('click', this.#onClickLeft);
    //root.querySelector('.ribbon__arrow_right').addEventListener('click', this.#onClickRight);

    return root;
  }

  #onClickLeft = (event) => {
    let ribbon = this.#root.querySelector(".ribbon__inner");
    ribbon.scrollBy(-350, 0);
  };

  #onClickRight = (event) => {
    let ribbon = this.#root.querySelector(".ribbon__inner");
    ribbon.scrollBy(350, 0);
  };

  #onScrollRibbon = (event) => {
    let ribbon = this.#root.querySelector(".ribbon__inner");
    let scrollLeft = ribbon.scrollLeft;
    let scrollWidth = ribbon.scrollWidth;
    let clientWidth = ribbon.clientWidth;
    let scrollRight = scrollWidth - scrollLeft - clientWidth;

    let r_btn = this.#root.querySelector(".ribbon__arrow_right");
    let l_btn = this.#root.querySelector(".ribbon__arrow_left");
    r_btn.classList.add("ribbon__arrow_visible");
    l_btn.classList.add("ribbon__arrow_visible");

    if (scrollLeft < 1) {
      l_btn.classList.remove("ribbon__arrow_visible");
    }

    if (scrollRight < 1) {
      r_btn.classList.remove("ribbon__arrow_visible");
    }
  };

  #onClickItem = (event) => {
    event.preventDefault();

    let elem = this.#root.querySelector('.ribbon__item_active');
    elem.classList.remove('ribbon__item_active');
    event.target.classList.add('ribbon__item_active');

    event.target.dispatchEvent(
      new CustomEvent("ribbon-select", {
        detail: event.target.dataset.id,
        bubbles: true,
      })
    );
  };
}
