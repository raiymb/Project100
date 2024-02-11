document.getElementById('registerForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });
        const data = await response.json();
        if (response.ok) {
            console.log('Redirecting to login page');
            window.location.href = 'login.html';
        } else {
            alert(data.message);
        }
        
    } catch (error) {
        console.error('Registration failed:', error);
    }
});
