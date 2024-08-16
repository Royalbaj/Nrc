function saveContact() {
    try {
        // Function to get the base64-encoded image from a URL
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

        // Convert ArrayBuffer to Base64
        function arrayBufferToBase64(buffer) {
            const binary = new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), '');
            return window.btoa(binary);
        }

        // URL to the image
        const imageUrl = 'https://cards.robaj.com/assets/images/l0326.png';
        
        getImageBase64(imageUrl, function(imageBase64) {
            if (imageBase64) {
                // Static vCard data with image included
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

                // Create a Blob with the vCard data
                const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8' });
                const blobURL = URL.createObjectURL(blob);

                // Create a download link and trigger the download
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

function closeQR() {
    document.getElementById('qr-overlay').style.display = 'none';
}

function openReportModal() {
    document.getElementById('report-modal').style.display = 'flex';
}

function closeReportModal() {
    document.getElementById('report-modal').style.display = 'none';
}

function submitReport(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    fetch('https://docs.google.com/forms/d/e/1FAIpQLScYnQKM8mFPOFSy6U8XmE6hAEWKxFY9NxCZb7eaASB_MgqNuA/formResponse', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            document.getElementById('report-form').reset();
            document.getElementById('report-message').textContent = 'Thank you for your report! We will get back to you shortly.';
            document.getElementById('report-message').style.display = 'block';
            setTimeout(() => closeReportModal(), 3000); // Close the modal after 3 seconds
        } else {
            document.getElementById('report-message').textContent = 'There was an issue with your report.';
            document.getElementById('report-message').style.display = 'block';
        }
    })
    .catch(error => {
        document.getElementById('report-message').textContent = 'There was an issue with your report.';
        document.getElementById('report-message').style.display = 'block';
    });
}
