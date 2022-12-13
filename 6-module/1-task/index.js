/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  #elem;
  #rows = [];

  constructor(rows) {
    this.#rows = rows;
    this.#createTable();
  }

  #createTable() {
    this.#elem = document.createElement("table");
    this.#elem.insertAdjacentHTML("afterbegin", this.#drawTable());

    for (let btn of this.#elem.querySelectorAll('button')) {
      btn.addEventListener('click', (event) => {
        this.#removeRecord(event)
      });
    }
  }

  #drawTable() {
    return `
      <thead>
        <tr>
            <th>Имя</th>
            <th>Возраст</th>
            <th>Зарплата</th>
            <th>Город</th>
            <th></th>
        </tr>
    </thead>
    <tbody>        
            ${this.#rows
              .map((item, index) => {
                return ` <tr>
                  <td>${item.name}</td>
                  <td>${item.age}</td>
                  <td>${item.salary}</td>
                  <td>${item.city}</td>
                  <td><button data-item-id = ${index} >X</button></td>
                  </tr>`;
              })
              .join('')}
      </tbody>`;
  }

  get elem() {
    return this.#elem;
  }

  #removeRecord(event) {
    let row = event.target.closest('tr');
    row.remove();
    /*
    let itemId = event.target.dataset.itemId;
    this.#rows.splice(itemId,1);
    this.#elem.remove();
    this.#createTable();
    document.body.append(this.#elem);
    */
  }
}


