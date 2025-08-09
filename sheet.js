const columnCountInput = document.getElementById('columnCount');
const columnNamesDiv = document.getElementById('columnNames');
const createSheetBtn = document.getElementById('createSheetBtn');

// Generate column name inputs dynamically
if (columnCountInput) {
  columnCountInput.addEventListener('input', () => {
    const count = parseInt(columnCountInput.value);
    columnNamesDiv.innerHTML = '';
    if (isNaN(count) || count < 1) return;

    for (let i = 0; i < count; i++) {
      const input = document.createElement('input');
      input.type = 'text';
      input.placeholder = `Column ${i + 1} Name`;
      input.className = 'colName';
      columnNamesDiv.appendChild(input);
    }
  });
}

// On create sheet button click
if (createSheetBtn) {
  createSheetBtn.addEventListener('click', () => {
    const sheetName = document.getElementById('sheetName').value.trim();
    const rowCount = parseInt(document.getElementById('rowCount').value);
    const colInputs = document.querySelectorAll('.colName');

    if (!sheetName || isNaN(rowCount) || rowCount < 1 || colInputs.length === 0) {
      alert('Please fill out all fields.');
      return;
    }

    const columnNames = Array.from(colInputs).map(input => input.value || 'Untitled');

    const sheetData = {
      sheetName,
      columns: columnNames,
      rowCount
    };

    // Save sheet to sheet_<name>
    localStorage.setItem(`sheet_${sheetName}`, JSON.stringify(sheetData));

    // Update master list
    let list = JSON.parse(localStorage.getItem("sheetList")) || [];
    if (!list.includes(sheetName)) {
      list.push(sheetName);
      localStorage.setItem("sheetList", JSON.stringify(list));
    }

    // Also pass to sheet.html
    localStorage.setItem('sheetData', JSON.stringify(sheetData));
    window.location.href = 'sheet.html';
  });
}
