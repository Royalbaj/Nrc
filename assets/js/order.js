document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(this);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://docs.google.com/forms/d/e/1FAIpQLSdnPp4QYNYygZZfvS15NUZP8KHB8NlwROgwGzVH7qvG4q63Mw/formResponse', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200 || xhr.status === 0) {
          document.getElementById('thankYouMessage').style.display = 'block';
          document.getElementById('thankYouMessage').scrollIntoView({ behavior: 'smooth' });
        } else {
          console.error('Error!', xhr.statusText);
        }
      }
    };

    const urlEncodedData = new URLSearchParams(formData).toString();
    xhr.send(urlEncodedData);
  });