async function init() {
    setupLoginButton();
    await loadUserInfo();
}

function setupLoginButton() {
    const loginButton = document.getElementById('loginButton');
    if (loginButton) {
        loginButton.addEventListener('click', () => {
            window.location.href = '/signin';
        });
    }
}

async function loadUserInfo() {
    try {
        const response = await fetch('/api/v1/user/profile');
        if (response.ok) {
            const { username } = await response.json();
            const homepageTitle = document.querySelector('.homepage-title');
            if (homepageTitle) {
                homepageTitle.textContent = `Hello, ${username}!`;
            }
        } else {
            console.error('Failed to fetch user info');
        }
    } catch (error) {
        console.error('Error fetching user info:', error);
    }
}


// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', init);


