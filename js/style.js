let binaryResult = '';
        
function convertToBinary() {
    const input = document.getElementById('decimalInput');
    let decimal = parseInt(input.value);
    
    if (isNaN(decimal) || decimal < 0) {
        Swal.fire("Masukkan Angka Valid yak. Jangan huruf atau bilangan negatif!");
        return;
    }
    
    if (decimal === 0) {
        showResult(0, '0');
        return;
    }
    
    const steps = [];
    const remainders = [];
    let originalDecimal = decimal;
    
    // menghitung desimal ke biner
    while (decimal > 0) {
        const quotient = Math.floor(decimal / 2);
        const remainder = decimal % 2;
        
        steps.push({
            dividend: decimal,
            quotient: quotient,
            remainder: remainder
        });
        
        remainders.unshift(remainder); 
        decimal = quotient;
    }
    
    binaryResult = remainders.join('');
    
    document.getElementById('initialState').style.display = 'none';
    const stepsContainer = document.getElementById('stepsContainer');
    stepsContainer.style.display = 'block';
    stepsContainer.classList.add('fade-in');
    
    // menampilkan langkah hasil
    displaySteps(steps, originalDecimal, binaryResult);
}

function displaySteps(steps, originalDecimal, binary) {
    const stepsDiv = document.getElementById('divisionSteps');
    stepsDiv.innerHTML = '';
    
    steps.forEach((step, index) => {
        const stepDiv = document.createElement('div');
        stepDiv.className = 'division-step';
        stepDiv.innerHTML = `
            <div class="step-number">${step.dividend}</div>
            <span class="label">: 2 = ${step.quotient} Sisanya</span>
            <div class="remainder">${step.remainder}</div>
        `;
        stepsDiv.appendChild(stepDiv);
    });
    
    // hasil dari desimal ke biner
    document.getElementById('resultText').textContent = 
        `Hasil bilangan biner dari ${originalDecimal} ialah = ${binary}`;
}

function showResult(decimal, binary) {
    binaryResult = binary;
    
    document.getElementById('initialState').style.display = 'none';
    const stepsContainer = document.getElementById('stepsContainer');
    stepsContainer.style.display = 'block';
    stepsContainer.classList.add('fade-in');
    
    document.getElementById('divisionSteps').innerHTML = '';
    document.getElementById('resultText').textContent = 
        `Hasil bilangan biner dari ${decimal} ialah = ${binary}`;
}

function copyResult() {
    if (binaryResult) {
        navigator.clipboard.writeText(binaryResult).then(() => {
            showToast();
        }).catch(() => {
            const textArea = document.createElement('textarea');
            textArea.value = binaryResult;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showToast();
        });
    }
}

function showToast() {
    const toast = new bootstrap.Toast(document.getElementById('copyToast'));
    toast.show();
}

function resetConverter() {
    document.getElementById('initialState').style.display = 'block';
    document.getElementById('stepsContainer').style.display = 'none';
    document.getElementById('decimalInput').value = '';
    binaryResult = '';
}

document.getElementById('decimalInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        convertToBinary();
    }
});

// reset
document.getElementById('decimalInput').addEventListener('focus', function() {
    if (document.getElementById('stepsContainer').style.display === 'block') {
        resetConverter();
    }
});