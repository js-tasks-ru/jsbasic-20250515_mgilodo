function highlight(table) {
  const rows = table.querySelectorAll('tbody tr');

  rows.forEach(row => {
    const cells = row.children;

    const statusCell = cells[3];
    const isAvailable = statusCell.hasAttribute('data-available');

    if (isAvailable) {
      const available = statusCell.dataset.available === 'true';
      row.classList.add(available ? 'available' : 'unavailable');
    } else {
      row.hidden = true;
    }

    const gender = cells[2].textContent.trim();
    if (gender === 'm') {
      row.classList.add('male');
    } else if (gender === 'f') {
      row.classList.add('female');
    }

    const age = parseInt(cells[1].textContent, 10);
    if (age < 18) {
      row.style.textDecoration = 'line-through';
    }
  });
}
