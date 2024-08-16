function saveContact() {
    try {
        
        const vCardData = `
BEGIN:VCARD
VERSION:3.0
N:;Krishna;Bhandari;;;
FN:Krishna Bhandari
TEL:+977-9857053661
EMAIL:krishnabhandari.info@gmail.com
URL:https://www.linkedin.com/in/krishna-bhandari-ab1b60158?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app
TITLE:Managing Director at Silicon Education Butwal
ORG:Proactive Path Education Network
END:VCARD
        `;

        // Create a Blob with the vCard data
        const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8' });
        
        // Create a URL for the Blob
        const url = URL.createObjectURL(blob);

        // Create an anchor element and trigger a download
        const a = document.createElement('a');
        a.href = url;
        a.download = 'KrishnaBhandari.vcf'; 
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        // Clean up the Blob URL
        URL.revokeObjectURL(url);
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
