function saveContact() {
    const profileHeader = document.querySelector('.profile-header');
    const profileName = profileHeader.querySelector('.profile-name').textContent.trim();
    const profilePost = profileHeader.querySelector('.profile-post').textContent.trim();
    const profileInstitution = profileHeader.querySelector('.profile-institution').textContent.trim();

    const profileContact = document.querySelector('.profile-contact');
    const profilePhone = profileContact.querySelector('a[href^="tel:"]').getAttribute('href').replace('tel:', '');
    const profileEmail = document.querySelector('.profile-contact-info i.fas.fa-envelope').nextSibling.textContent.trim();
    const profileURL = document.querySelector('.profile-social-media a[href^="https://www.govindabahadurkhatri.com.np"]').getAttribute('href');
    
    const imageBase64 = getImageBase64();

    let vCardData = `
BEGIN:VCARD
VERSION:3.0
N:${profileName.split(' ').slice(-1)[0]};${profileName.split(' ').slice(0, -1).join(' ')};;;
FN:${profileName}
TEL:${profilePhone}
EMAIL:${profileEmail}
URL:${profileURL}`;

    if (profilePost) {
        vCardData += `
TITLE:${profilePost}`;
    }

    if (profileInstitution) {
        vCardData += `
ORG:${profileInstitution}`;
    }

    if (imageBase64) {
        vCardData += `
PHOTO;ENCODING=b;TYPE=JPEG:${imageBase64}`;
    }

    vCardData += `
END:VCARD`;

    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8' });
    const blobURL = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = blobURL;
    a.setAttribute('download', 'contact.vcf');

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(blobURL);
}


function getImageBase64() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = document.querySelector('.profile-img');

    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    return canvas.toDataURL('image/jpeg').split(',')[1];
}



        function sendEmail() {
            const email = document.querySelector('.profile-card').getAttribute('data-email');
            window.location.href = 'mailto:' + email;
        }

        function makeCall() {
            const phone = document.querySelector('.profile-card').getAttribute('data-phone');
            window.location.href = 'tel:' + phone;
        }

        function generateQR() {
            const currentURL = window.location.href;
            const qrCode = qrcode(0, 'M');
            qrCode.addData(currentURL);
            qrCode.make();
            const qrElement = document.getElementById('qrcode');
            qrElement.innerHTML = qrCode.createSvgTag({ scalable: true });
            document.getElementById('qrModal').style.display = 'flex';
        }

        function downloadQR() {
            const profileName = document.querySelector('.profile-card').getAttribute('data-name');
            const svg = document.getElementById('qrcode').querySelector('svg');
            const svgData = new XMLSerializer().serializeToString(svg);
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');

            const img = new Image();
            img.onload = function () {
                context.clearRect(0, 0, canvas.width, canvas.height);
                canvas.width = img.width;
                canvas.height = img.height;
                context.drawImage(img, 0, 0);

                canvas.toBlob(function (blob) {
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${profileName}-QR.png`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                });
            };
            img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
        }

        function closeQRModal() {
            document.getElementById('qrModal').style.display = 'none';
        }

        function showReportForm() {
            document.getElementById('reportModal').style.display = 'flex';
        }

        function closeReportForm() {
            document.getElementById('reportModal').style.display = 'none';
        }

        function submitReportForm(event) {
            event.preventDefault();
            const form = document.getElementById('reportForm');
            const formData = new FormData(form);

            fetch('https://docs.google.com/forms/d/e/1FAIpQLSf7G9vH9PRZsJPO4SK2ru1aOHBvfRQgFQCp6ok8CRJk2hVlgA/formResponse', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json',
                },
            })
            .then(response => {
                if (response.ok) {
                    document.getElementById('successMessage').style.display = 'block';
                    form.reset();
                } else {
                    alert('Failed to submit the form.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to submit the form.');
            });
        }