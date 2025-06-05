function makeDiagonalRed(table) {
  if (!table || !table.rows || table.rows.length === 0) {
    return;
  }

  const rows = table.rows;
  const rowCount = rows.length;

  for (let i = 0; i < rowCount; i++) {
    const cell = rows[i].cells[i];
    if (cell) {
      cell.style.backgroundColor = 'red';
    }
  }
}
