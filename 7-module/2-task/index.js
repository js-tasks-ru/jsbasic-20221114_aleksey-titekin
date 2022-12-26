import createElement from "../../assets/lib/create-element.js";

export default class Modal {
  #root = null;

  constructor() {
    this.#root = this.#render();

    document.body.addEventListener("keydown", this.#onClose);

  }

  setTitle(value) {
    let h3 = this.#root.querySelector("h3");
    h3.textContent = value;
  }

  setBody(node) {
    let body = this.#root.querySelector(".modal__body");
    body.innerHTML = '';
    body.append(node);
  }

  #render() {
    let elem = createElement(`
    <div class="modal">
    <!--Прозрачная подложка перекрывающая интерфейс-->
      <div class="modal__overlay"></div>

      <div class="modal__inner">
        <div class="modal__header">
          <!--Кнопка закрытия модального окна-->
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>

          <h3 class="modal__title">
            Вот сюда нужно добавлять заголовок
          </h3>
        </div>

        <div class="modal__body">
          A сюда нужно добавлять содержимое тела модального окна
        </div>
      </div>

    </div>`);

    elem
      .querySelector(".modal__close")
      .addEventListener("click", this.#onClose);

    return elem;
  }

  open() {
    document.body.classList.add("is-modal-open");
    document.body.append(this.#root);
  }

  close() {
    document.body.classList.remove("is-modal-open");
    this.#root.remove();
  }

  #onClose = (event) => {
    if (event.type === "click") {
      this.close();
      return;
    }
    if (event.code === "Escape") {
      document.body.removeEventListener("keydown", this.#onClose);
      this.close();
      return;
    }
  };
}
