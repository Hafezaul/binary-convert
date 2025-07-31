let decimalResult = 0;
        
function convertToDecimal() {
    const input = document.getElementById('binaryInput');
    const binaryStr = input.value.trim();
    
    // validasi binary input
    if (!binaryStr || !/^[01]+$/.test(binaryStr)) {
        showAlert('Silakan masukkan bilangan biner yang valid (hanya 0 dan 1)', 'warning');
        return;
    }
    
    if (binaryStr.length > 15) {
        showAlert('Maksimal 15 digit binary', 'warning');
        return;
    }
    
    generateTable(binaryStr);
    const conversionSection = document.getElementById('conversionSection');
    conversionSection.classList.remove('hidden');
    conversionSection.classList.add('fade-in');
}

function generateTable(binaryStr) {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';
    
    const maxCols = 15; // A1 to O1
    const columnLabels = ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1', 'I1', 'J1', 'K1', 'L1', 'M1', 'N1', 'O1'];
    
    // Pad binary string to fit in the rightmost columns
    const paddedBinary = binaryStr.padStart(Math.min(maxCols, binaryStr.length), '0');
    const startIndex = maxCols - paddedBinary.length;
    
    // Header  (A1, B1, C1, etc.)
    const headerRow = document.createElement('tr');
    headerRow.className = 'header-row';
    for (let i = 0; i < maxCols; i++) {
        const cell = document.createElement('td');
        cell.textContent = columnLabels[i];
        if (i < startIndex) cell.classList.add('empty-cell');
        headerRow.appendChild(cell);
    }
    tableBody.appendChild(headerRow);
    
    const binaryRow = document.createElement('tr');
    binaryRow.className = 'binary-row';
    for (let i = 0; i < maxCols; i++) {
        const cell = document.createElement('td');
        if (i >= startIndex) {
            cell.textContent = paddedBinary[i - startIndex];
        } else {
            cell.textContent = '';
            cell.classList.add('empty-cell');
        }
        binaryRow.appendChild(cell);
    }
    tableBody.appendChild(binaryRow);
    
    const powerRow = document.createElement('tr');
    powerRow.className = 'power-row';
    for (let i = 0; i < maxCols; i++) {
        const cell = document.createElement('td');
        if (i >= startIndex) {
            const power = paddedBinary.length - 1 - (i - startIndex);
            cell.innerHTML = `2<sup>${power}</sup>`;
        } else {
            cell.textContent = '';
            cell.classList.add('empty-cell');
        }
        powerRow.appendChild(cell);
    }
    tableBody.appendChild(powerRow);
    
    const valueRow = document.createElement('tr');
    valueRow.className = 'value-row';
    let calculation = [];
    decimalResult = 0;
    
    for (let i = 0; i < maxCols; i++) {
        const cell = document.createElement('td');
        if (i >= startIndex) {
            const bitIndex = i - startIndex;
            const bit = parseInt(paddedBinary[bitIndex]);
            const power = paddedBinary.length - 1 - bitIndex;
            const value = bit * Math.pow(2, power);
            
            cell.textContent = value;
            if (value > 0) {
                calculation.push(value);
                cell.classList.add('calculation-highlight');
            }
            decimalResult += value;
        } else {
            cell.textContent = '';
            cell.classList.add('empty-cell');
        }
        valueRow.appendChild(cell);
    }
    tableBody.appendChild(valueRow);
    
    const resultRow = document.createElement('tr');
    resultRow.className = 'result-row';
    for (let i = 0; i < maxCols; i++) {
        const cell = document.createElement('td');
        if (i >= startIndex) {
            const bitIndex = i - startIndex;
            const bit = parseInt(paddedBinary[bitIndex]);
            const power = paddedBinary.length - 1 - bitIndex;
            const value = bit * Math.pow(2, power);
            cell.textContent = value;
        } else {
            cell.textContent = '';
            cell.classList.add('empty-cell');
        }
        resultRow.appendChild(cell);
    }
    tableBody.appendChild(resultRow);
    
    const separatorRow = document.createElement('tr');
    const separatorCell = document.createElement('td');
    separatorCell.colSpan = maxCols;
    separatorCell.className = 'separator-row';
    separatorRow.appendChild(separatorCell);
    tableBody.appendChild(separatorRow);
    
    const calculationStr = calculation.length > 0 ? calculation.join(' + ') : '0';
    setTimeout(() => {
        document.getElementById('calculationText').textContent = `${calculationStr} = ${decimalResult}`;
    }, 500);
}

function copyResult() {
    if (decimalResult !== undefined) {
        navigator.clipboard.writeText(decimalResult.toString()).then(() => {
            showToast();
        }).catch(() => {
            const textArea = document.createElement('textarea');
            textArea.value = decimalResult.toString();
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showToast();
        });
    }
}

function resetConverter() {
    document.getElementById('binaryInput').value = '';
    document.getElementById('conversionSection').classList.add('hidden');
    decimalResult = 0;
    document.getElementById('binaryInput').focus();
}

function showToast() {
    const toast = new bootstrap.Toast(document.getElementById('copyToast'));
    toast.show();
}

function showAlert(message, type) {
// menampilkan alert
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    alertDiv.style.cssText = 'top: 20px; left: 50%; transform: translateX(-50%); z-index: 1051; min-width: 300px;';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.parentNode.removeChild(alertDiv);
        }
    }, 3000);
}

document.getElementById('binaryInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        convertToDecimal();
    }
});
// validasi agar input hanya berisi 0 dan 1
document.getElementById('binaryInput').addEventListener('input', function(e) {
    e.target.value = e.target.value.replace(/[^01]/g, '');
});

window.addEventListener('load', function() {
    document.getElementById('binaryInput').focus();
});