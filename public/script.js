document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('qrForm');
    const qrCodeContainer = document.getElementById('qrCodeContainer');
    const textToCopy = document.getElementById('textToCopy');
    const themeToggleButton = document.getElementById('themeToggle');

    // Make sure you include the QRCode library in your HTML
    // <script src="https://cdn.jsdelivr.net/npm/qrcode@latest/build/qrcode.min.js"></script>

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();  // Get the name
        const emails = document.getElementById('emails').value.trim();
        const phoneNumbers = document.getElementById('phoneNumbers').value.trim();
        const urls = document.getElementById('urls').value.trim();

        // Prepare vCard data
        const vCardData = `
BEGIN:VCARD
VERSION:3.0
FN:${name}
${emails.split('\n').map(email => `EMAIL:${email}`).join('\n')}
${phoneNumbers.split('\n').map(phone => `TEL:${phone}`).join('\n')}
${urls.split('\n').map(url => `URL:${url}`).join('\n')}
END:VCARD
        `.trim();

        qrCodeContainer.innerHTML = '';
        textToCopy.textContent = '';

        try {
            // Generate QR code with vCard data
            const qrCode = await QRCode.toDataURL(vCardData, { errorCorrectionLevel: 'H' });
            const qrCodeImage = document.createElement('img');
            qrCodeImage.src = qrCode;
            qrCodeContainer.appendChild(qrCodeImage);
            textToCopy.textContent = vCardData;  // Display the vCard data
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
