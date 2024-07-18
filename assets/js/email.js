document.getElementById('subscribeForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(this);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://docs.google.com/forms/d/e/1FAIpQLSdYjsnNi7kLu2usBukqdfgGoAM7xaKdWQIs1pebYjTFaXLB7Q/formResponse', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200 || xhr.status === 0) {
          document.getElementById('subscribeMessage').style.display = 'block';
          document.getElementById('subscribeMessage').scrollIntoView({ behavior: 'smooth' });
          document.getElementById('subscribeForm').reset();  // Clear the form
        } else {
          console.error('Error!', xhr.statusText);
        }
      }
    };

    const urlEncodedData = new URLSearchParams(formData).toString();
    xhr.send(urlEncodedData);
  });