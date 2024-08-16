function saveContact() {
    try {
        function getImageBase64(imageUrl, callback) {
            fetch(imageUrl)
                .then(response => response.arrayBuffer())
                .then(arrayBuffer => {
                    const base64 = arrayBufferToBase64(arrayBuffer);
                    callback(base64);
                })
                .catch(error => {
                    console.error('Error fetching image:', error);
                    callback(null);
                });
        }

        function arrayBufferToBase64(buffer) {
            const binary = new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), '');
            return window.btoa(binary);
        }

        const imageUrl = 'https://cards.robaj.com/assets/images/l0326.png';
        
        getImageBase64(imageUrl, function(imageBase64) {
            if (imageBase64) {
                const vCardData = `
BEGIN:VCARD
VERSION:3.0
N;CHARSET=UTF-8:Bhandari;Krishna;;;
FN;CHARSET=UTF-8:Krishna Bhandari
TEL;CHARSET=UTF-8:+977-9857053661
EMAIL;CHARSET=UTF-8:krishnabhandari.info@gmail.com
URL;CHARSET=UTF-8:https://cards.robaj.com/l0326
TITLE;CHARSET=UTF-8:Managing Director at Silicon Education Butwal
ORG;CHARSET=UTF-8:Proactive Path Education Network
PHOTO;ENCODING=b;TYPE=PNG:${imageBase64}
END:VCARD
                `.trim();

                const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8' });
                const blobURL = URL.createObjectURL(blob);

                const a = document.createElement('a');
                a.href = blobURL;
                a.setAttribute('download', 'KrishnaBhandari.vcf');

                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(blobURL);
            } else {
                console.error('Failed to encode image as base64.');
            }
        });
    } catch (error) {
        console.error('Error creating vCard:', error);
    }
}

function generateQR() {
    const currentURL = window.location.href;
    const qrCodeURL = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(currentURL)}`;
    document.getElementById('qr-code').src = qrCodeURL;
    document.getElementById('qr-overlay').style.display = 'flex';
}

function downloadQRCode() {
    const qrCodeImage = document.getElementById('qr-code');
    const downloadLink = document.createElement('a');
    downloadLink.href = qrCodeImage.src;
    downloadLink.setAttribute('download', 'QRCode.png');
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}

function closeQR() {
    document.getElementById('qr-overlay').style.display = 'none';
}
