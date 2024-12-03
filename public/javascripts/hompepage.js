document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/user/profile', { credentials: 'include' });
        if (response.ok) {
            const userData = await response.json();
            updateHomepage(userData);
        } else {
            console.error("Failed to fetch user profile:", await response.text());
        }
    } catch (error) {
        console.error("Error loading user profile:", error);
    }
});

function updateHomepage(user) {
    const homepageTitle = document.querySelector('.homepage-title');
    if (homepageTitle) {
        homepageTitle.textContent = `Hello, ${user.firstName} ${user.lastName}!`;
    }

    const profilePicture = document.querySelector('#profileDiv');
    if (profilePicture) {
        profilePicture.style.cursor = 'pointer';
        profilePicture.addEventListener('click', () => {
            window.location.href = '/profile-page.html';
        });
    }
}
