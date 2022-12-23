import createElement from "../../assets/lib/create-element.js";

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add("cart-icon_visible");

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart
            .getTotalPrice()
            .toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add("shake");
      this.elem.addEventListener(
        "transitionend",
        () => {
          this.elem.classList.remove("shake");
        },
        { once: true }
      );
    } else {
      this.elem.classList.remove("cart-icon_visible");
    }
  }

  addEventListeners() {
    document.addEventListener("scroll", () => this.updatePosition());
    window.addEventListener("resize", () => this.updatePosition());
  }

  updatePosition() {
    if (
      this.elem.offsetHeight == 0 ||
      document.documentElement.clientWidth <= 767
    ) {
      return;
    }

    if (window.pageYOffset == 0) {
      this.elem.style = "";
      return;
    }

    let rightSize =
      document.documentElement.clientWidth -
      document.body.querySelector(".container").getBoundingClientRect().right -
      this.elem.clientWidth -
      20;

    if (rightSize < 10) rightSize = 10;

    this.elem.style.position = "fixed";
    this.elem.style.zIndex = "999";
    this.elem.style.right = rightSize + "px";
    this.elem.style.top = "50px";
  }
}
