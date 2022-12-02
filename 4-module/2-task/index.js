function makeDiagonalRed(table) {
  let i = 0;
  for(let row of table.rows) {
    row.cells[i++].style.backgroundColor = 'red';

  //for (let i = 0 ; i < table.rows.length; i++) {
  //  table.rows[i].cells[i].style.backgroundColor = 'red' ;
  }
}
