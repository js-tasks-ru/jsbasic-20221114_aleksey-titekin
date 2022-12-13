export default class ProductCard {
  #name; // название товара
  #price; // цена товара
  #category; // категория, к которой он относится, нам это понадобится чуть позже
  #image; // название картинки товара
  #id; //идентификатор
  #elem; // указатель на корневой элемент
  constructor(product) {
    this.#name = product.name;
    this.#price = product.price;
    this.#category = product.category;
    this.#image = product.image;
    this.#id = product.id;

    this.#elem = this.#createElem();
  }

  #createElem() {
    let card = document.createElement("div");
    card.classList.add("card");
    let cardTop = document.createElement("div");
    cardTop.classList.add("card__top");
    card.append(cardTop);
    let imgTop = document.createElement("img");
    imgTop.src = `/assets/images/products/${this.#image}`;
    imgTop.alt = "product";
    imgTop.classList.add("card__image");
    cardTop.append(imgTop);

    let span = document.createElement("span");
    span.classList.add("card__price");
    span.innerHTML = '€' + this.#price.toFixed(2);
    cardTop.append(span);

    let cardBody = document.createElement("div");
    cardBody.classList.add("card__body");
    card.append(cardBody);
    let cardTitle = document.createElement("div");
    cardTitle.classList.add("card__title");
    cardTitle.textContent =this.#name;
    cardBody.append(cardTitle);
    let btn = document.createElement("button");
    btn.classList.add("card__button");
    cardBody.append(btn);
    let imgBtn = document.createElement("img");
    imgBtn.src = "/assets/images/icons/plus-icon.svg";
    imgBtn.alt = "icon";
    btn.append(imgBtn);

    return card;
  }

  get elem() {
    return this.#elem;
  }
}
