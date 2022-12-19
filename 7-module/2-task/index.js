import createElement from "../../assets/lib/create-element.js";

export default class Modal {
  #root = null;
  //#closeButton;
  constructor() {
    this.#root = this.#render();

    document.addEventListener("keyup", this.#onClose,{once: true});

    /*
    document.addEventListener(
      "keyup",
      (event) => {
        if (event.code === "Escape") this.close();
      },
      { once: true }
    );
    */
  }

  setTitle(value) {
    let h3 = this.#root.querySelector("h3");
    h3.textContent = value;
  }

  setBody(node) {
    let body = this.#root.querySelector(".modal__body");
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
/*
    this.#closeButton =  elem.querySelector(".modal__close");
    this.#closeButton.addEventListener("click", this.#onClose);
*/
    
    elem
      .querySelector(".modal__close")
      .addEventListener("click", this.#onClose);
    

    return elem;
  }

  open() {
    document.body.append(this.#root);
    document.body.classList.add("is-modal-open");
  }

  close() {
    this.#root.remove();
    document.body.classList.remove("is-modal-open"); 

    //this.#onClose(new MouseEvent('click', { bubbles: true }));
    //this.#closeButton.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  }

  #onClose = (event) => {
    if (event.code === "Escape") this.close();
    //this.close();
  };
}
