document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const emailInput = document.getElementById('email').value.trim(); // Trim any whitespace
    const passwordInput = document.getElementById('password').value.trim(); // Trim any whitespace
    const message = document.getElementById('message');
    const loginContainer = document.getElementById('loginContainer');
    const backContent = document.getElementById('backContent');

    // List of allowed email-password combinations
    const users = [
        { email: 'govindakc.np@gmail.com', password: '123' },
        { email: 'sunilsuryabanshi8@gmail.com', password: '@sunil##' },
        { email: 'tilakrampaudel@gmail.com', password: '@harekrishna' },
        { email: 'adhikarib2019@gmail.com', password: 'Ab2019#zy' },
        { email: 'krishnabhandari.info@gmail.com', password: 'Bhandarikrishna661#' }

    ];

    const user = users.find(user => user.email === emailInput && user.password === passwordInput);

    if (user) {
        loginContainer.style.display = 'none'; // Hide login container
        backContent.style.display = 'block'; // Show back content
        message.textContent = ''; // Clear any previous error messages
    } else {
        message.textContent = 'Incorrect email or password. Please try again.';
    }
});
