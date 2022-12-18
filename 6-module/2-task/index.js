import createElement from "../../assets/lib/create-element.js";

export default class ProductCard {
  #product; //данные по товару
  #elem; // указатель на корневой элемент
  constructor(product) {
    this.#product = product;
    this.#elem = this.#createElemHTML();
  }

  #createElemHTML() {
    let elem = createElement(
      `      
      <div class="card">
        <div class="card__top">
          <img src="/assets/images/products/${
            this.#product.image
          }" class="card__image" alt="product">
          <span class="card__price">€${this.#product.price.toFixed(2)}</span>
        </div>
        <div class="card__body">
          <div class="card__title">${this.#product.name}</div>
          <button type="button" class="card__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
     `
    );

    let btn = elem.querySelector("button");
    btn.addEventListener("click", this.#onClickCardButton);
    /*
    btn.addEventListener("click", (event) => {
      this.#onClickCardButton(event);
    });
    */
    return elem;
  }

  get elem() {
    return this.#elem;
  }

  #onClickCardButton = (event) => {
    event.target.dispatchEvent(
      new CustomEvent("product-add", {
        detail: this.#product.id,
        bubbles: true,
      })
    );
  };
  /*
  #onClickCardButton(event) {
    event.target.dispatchEvent(
      new CustomEvent("product-add", {
        detail: this.#product.id, 
        bubbles: true, 
      })
    );
  }
  */
}
