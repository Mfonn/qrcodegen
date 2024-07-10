document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('qrForm');
    const qrCodeContainer = document.getElementById('qrCodeContainer');
    const textToCopy = document.getElementById('textToCopy');
    const themeToggleButton = document.getElementById('themeToggle');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const emails = document.getElementById('emails').value.trim();
        const phoneNumbers = document.getElementById('phoneNumbers').value.trim();
        const urls = document.getElementById('urls').value.trim();

        const allInputs = [emails, phoneNumbers, urls].filter(Boolean).join('\n');

        qrCodeContainer.innerHTML = '';
        textToCopy.textContent = '';

        try {
            const qrCode = await QRCode.toDataURL(allInputs, { errorCorrectionLevel: 'H' });
            const qrCodeImage = document.createElement('img');
            qrCodeImage.src = qrCode;
            qrCodeContainer.appendChild(qrCodeImage);
            textToCopy.textContent = allInputs;
        } catch (error) {
            console.error('Error generating QR code:', error);
        }
    });

    // Toggle Dark/Light Mode
    themeToggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        document.body.classList.toggle('light-mode');
        themeToggleButton.textContent = document.body.classList.contains('dark-mode') ? '🌙' : '🌞';
    });

    // Set initial mode based on system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark-mode');
        themeToggleButton.textContent = '🌙';
    } else {
        document.body.classList.add('light-mode');
        themeToggleButton.textContent = '🌞';
    }
});
