function highlight(table) {
  for (let tbody of table.tBodies) {
    for (let row of tbody.rows) {
      if (!row.cells[3].hasAttribute("data-available")) {
        row.hidden = true;
        continue;
      } 
      row.style.textDecoration = +row.cells[1].textContent <= 18 ? "line-through" : "";
      let cN;
      cN =
        row.cells[3].getAttribute("data-available") === "true"
          ? "available"
          : "unavailable";
      cN += row.cells[2].textContent === "m" ? " male" : " female";
      row.className = cN;
      
    }
  }
}
