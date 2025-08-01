class footerId extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
      <!-- link icons-->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet">
    
      <div class="bg-dark text-white p-3 pb-5 classDiv">
        <div class="container d-flex flex-column flex-md-row justify-content-between align-items-center">
          <!-- Kiri -->
          <div class="mb-3 mb-md-0">
            <a href="../index.html" class="text-white text-decoration-none me-3">Beranda</a>
            <a href="../decimalconvert.html" class="text-white text-decoration-none me-3">Decimal to Binary</a>
            <a href="../binaryconvert.html" class="text-white text-decoration-none">Binary to Decimal</a>
          </div>
      
          <!-- Kanan -->
          <div>
            <a href="https://github.com/hafezaul" target="_blank" class="text-white text-decoration-none me-3">
              <i class="bi bi-github"></i> GitHub
            </a>
            <a href="https://saweria.co/halia" target="_blank" class="text-white text-decoration-none me-3">
              <i class="bi bi-cup-hot-fill"></i> Buy Me a Coffee
            </a>
            <a href="https://instagram.com/al_hafidz_295" target="_blank" class="text-white text-decoration-none">
              <i class="bi bi-instagram"></i> Instagram
            </a>
          </div>
        </div>
      </div>
      `;
    }
  }
  customElements.define('footer-section', footerId );
  