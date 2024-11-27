async function init() {
    setupLoginButton(); // Attach event listener to the login button
    setupRegisterButton();
    await loadUserInfo(); // Fetch user info and update the homepage
}

function setupLoginButton() {
    const loginButton = document.getElementById('loginButton');
    if (loginButton) {
        loginButton.addEventListener('click', () => {
            window.location.href = '/signin'; // Redirect to signin route
        });
    }
}
function setupRegisterButton() {
    const registerButton = document.getElementById('registerButton');
    if (registerButton) {
        registerButton.addEventListener('click', () => {
            window.location.href = '/signinNewUser'; // Redirect to signin route
        });
    }
}

async function loadUserInfo() {
    try {
        const response = await fetch('/api/user/profile', { credentials: 'include' }); // Include cookies
        if (response.ok) {
            const { username } = await response.json();
            const homepageTitle = document.querySelector('.homepage-title');
            if (homepageTitle) {
                homepageTitle.textContent = `Hello, ${username}!`;
            }
        } else {
            console.error('Failed to fetch user info:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error fetching user info:', error);
    }
}


// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', init);


