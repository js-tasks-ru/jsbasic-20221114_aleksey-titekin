function highlight(table) {
  for (let tbody of table.tBodies) {
    for (let row of tbody.rows) {
      row.classList.add(
        row.cells[3].getAttribute("data-available") === "true"
          ? "available"
          : "unavailable"
      );
      row.classList.add(row.cells[2].textContent === "m" ? "male" : "female");

      row.style.textDecoration = +row.cells[1].textContent <= 18 ? "line-through" : "";
      
      if (!row.cells[3].hasAttribute("data-available")) row.hidden = true;
    }
  }
}
