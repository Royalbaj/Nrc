function formatDate(date) {
    let day = String(date.getDate()).padStart(2, '0');
    let month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    let year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

document.getElementById('current-date').innerText = formatDate(new Date());

function printQuotation() {
    window.print();
}

function generateQRCode() {
    const url = window.location.href;
    const qrCodeContainer = document.getElementById('qrcode');
    qrCodeContainer.innerHTML = ""; // Clear any previous QR code
    new QRCode(qrCodeContainer, {
        text: url,
        width: 300,
        height: 300
    });
    document.getElementById('qr-modal').style.display = "flex"; // Show the modal
}

function closeModal() {
    document.getElementById('qr-modal').style.display = "none"; // Hide the modal
}
