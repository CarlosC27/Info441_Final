async function init() {
    setupLoginButton(); // Attach event listener to the login button
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

async function loadUserInfo() {
    try {
        const response = await fetch('/api/user/profile', { credentials: 'include' }); // Include cookies
        if (response.ok) {
            const { username, firstName } = await response.json();
            const homepageTitle = document.querySelector('.homepage-title');
            if (homepageTitle) {
                homepageTitle.textContent = `Hello, ${firstName}!`;
            }
        } else {
            console.error('Failed to fetch user info:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error fetching user info:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const specificReviewRadio = document.querySelector('input[value="specific"]');
    const popup = document.getElementById('specific-review-popup');
    const closePopupButton = document.getElementById('close-popup');

    specificReviewRadio.addEventListener('change', () => {
        if (specificReviewRadio.checked) {
            popup.classList.remove('hidden');
        }
    });

    closePopupButton.addEventListener('click', () => {
        popup.classList.add('hidden');
    });
});

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', init);


