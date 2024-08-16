function saveContact() {
    try {
        // Function to get the base64-encoded image from a URL
        function getImageBase64(imageUrl, callback) {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            img.crossOrigin = 'Anonymous'; // Handle CORS for external images

            img.onload = function () {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                const base64 = canvas.toDataURL('image/png').split(',')[1];
                console.log('Image Base64:', base64); // Debugging step
                callback(base64);
            };

            img.onerror = function () {
                console.error('Error loading image:', imageUrl); // Debugging step
            };

            img.src = imageUrl;
        }

        // URL to the image
        const imageUrl = 'assets/images/l0326.png';
        
        getImageBase64(imageUrl, function(imageBase64) {
            if (!imageBase64) {
                console.error('Base64 image data is empty'); // Debugging step
                return;
            }

            // Static vCard data with image included
            const vCardData = `
BEGIN:VCARD
VERSION:3.0
N;CHARSET=UTF-8:Bhandari;Krishna;;;
FN;CHARSET=UTF-8:Krishna Bhandari
TEL;CHARSET=UTF-8:+977-9857053661
EMAIL;CHARSET=UTF-8:krishnabhandari.info@gmail.com
URL;CHARSET=UTF-8:https://www.linkedin.com/in/krishna-bhandari-ab1b60158?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app
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
