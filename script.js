document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggle-theme');
    const qrForm = document.getElementById('qr-form');
    const qrcodeElement = document.getElementById('qrcode');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    const applyTheme = (darkMode) => {
      document.body.classList.toggle('dark-mode', darkMode);
      toggleButton.textContent = darkMode ? '🌞' : '🌙';
    };
    
    // Initialize theme based on system preference
    applyTheme(prefersDarkScheme.matches);
    
    // Toggle theme on button click
    toggleButton.addEventListener('click', () => {
      applyTheme(!document.body.classList.contains('dark-mode'));
    });
    
    // Handle form submission
    qrForm.addEventListener('submit', (event) => {
      event.preventDefault();  // Prevent form from refreshing the page
      
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
  
      // Combine email and phone into one string to encode in QR Code
      const qrText = `Email: ${email}\nPhone: ${phone}`;
      
      // Clear previous QR code
      qrcodeElement.innerHTML = '';
  
      // Generate new QR code
      new QRCode(qrcodeElement, {
        text: qrText,
        width: 200,
        height: 200,
        colorDark : '#000000',
        colorLight : '#ffffff',
        correctLevel : QRCode.CorrectLevel.H
      });
    });
  });
  