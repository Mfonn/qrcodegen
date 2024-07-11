const express = require('express');
const bodyParser = require('body-parser');
const QRCode = require('qrcode');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/generate-qrcode', async (req, res) => {
    const { name, address, emails, phoneNumbers, urls, linkedin, facebook, instagram } = req.body;

    // Construct the text to encode in the QR code
    const textToEncode = `
        Name: ${name}
        Address: ${address}

        Emails:
        ${emails}

        Phone Numbers:
        ${phoneNumbers}

        URLs:
        ${urls}

        LinkedIn: ${linkedin}

        Facebook: ${facebook}

        Instagram: ${instagram}
    `;

    try {
        const qrCode = await QRCode.toDataURL(textToEncode);
        res.json({ qrCode });
    } catch (error) {
        res.status(500).send('Error generating QR code');
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
