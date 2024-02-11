document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('jwt', data.accessToken);
            window.location.href = '/dashboard';
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Login failed:', error);
    }
});
