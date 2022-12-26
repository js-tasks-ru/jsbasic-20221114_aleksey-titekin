import Carousel from "../../6-module/3-task/index.js";
import slides from "../../6-module/3-task/slides.js";

import RibbonMenu from "../../7-module/1-task/index.js";
import categories from "../../7-module/1-task/categories.js";

import StepSlider from "../../7-module/4-task/index.js";
import ProductsGrid from "../../8-module/2-task/index.js";

import CartIcon from "../../8-module/1-task/index.js";
import Cart from "../../8-module/4-task/index.js";

export default class Main {
  #carousel = null;
  #ribbonMenu = null;
  #stepSlider = null;
  #cartIcon = null;
  #cart = null;
  #productGrid = null;

  constructor() {}

  async render() {
    // ... ваш код
    let div;
    this.#carousel = new Carousel(slides);
    div = document.querySelector("[data-carousel-holder]");
    div.append(this.#carousel.elem);

    this.#ribbonMenu = new RibbonMenu(categories);
    div = document.querySelector("[data-ribbon-holder]");
    div.append(this.#ribbonMenu.elem);

    this.#stepSlider = new StepSlider({ steps: 5, value: 3 });
    div = document.querySelector("[data-slider-holder]");
    div.append(this.#stepSlider.elem);

    this.#cartIcon = new CartIcon();
    div = document.querySelector("[data-cart-icon-holder]");
    div.append(this.#cartIcon.elem);

    this.#cart = new Cart(this.#cartIcon);

    await fetch("products.json")
      .then((response) => response.json())
      .then((result) => {
        this.#productGrid = new ProductsGrid(result);
        div = document.querySelector("[data-products-grid-holder]");
        div.innerHTML = "";
        div.append(this.#productGrid.elem);
      })
      .catch(() => alert("ALARM!!!"));

    this.#productGrid.updateFilter({
      noNuts: document.getElementById("nuts-checkbox").checked,
      vegeterianOnly: document.getElementById("vegeterian-checkbox").checked,
      maxSpiciness: this.#stepSlider.value,
      category: this.#ribbonMenu.value,
    });
  }
}
