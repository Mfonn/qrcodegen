const express = require('express');
const bodyParser = require('body-parser');
const QRCode = require('qrcode');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/generate-qrcode', async (req, res) => {
    const { emails, phoneNumbers, urls } = req.body;
    const textToEncode = `
        Emails:
        ${emails}
        
        Phone Numbers:
        ${phoneNumbers}
        
        URLs:
        ${urls}
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
