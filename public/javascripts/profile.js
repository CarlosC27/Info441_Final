document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/user/profile', { credentials: 'include' });
        if (response.ok) {
            const userData = await response.json();
            updateProfilePage(userData);
        } else {
            console.error("Failed to fetch user profile:", await response.text());
        }
    } catch (error) {
        console.error("Error loading user profile:", error);
    }
});

function updateProfilePage(user) {
    const profileTitle = document.querySelector('.profile-page-title');
    if (profileTitle) {
        profileTitle.textContent = `${user.firstName} ${user.lastName}`;
    }
    const profileSubtitle = document.querySelector('.profile-page-subtitle');
    if (profileSubtitle) {
        profileSubtitle.textContent = user.jobTitle || "Job Title";
    }

    const skillsContainer = document.querySelector('.skills-grid-container');
    if (skillsContainer) {
        skillsContainer.innerHTML = ''; 
        user.skills.forEach(skill => {
            const skillItem = document.createElement('div');
            skillItem.className = 'skills-grid-item';
            skillItem.textContent = skill;
            skillsContainer.appendChild(skillItem);
        });
    }
    const jobInterestContainer = document.querySelector('.job-interest-grid-container');
    if (jobInterestContainer) {
        jobInterestContainer.innerHTML = ''; 
        user.jobInterest.forEach(interest => {
            const interestItem = document.createElement('div');
            interestItem.className = 'job-interest-grid-item';
            interestItem.textContent = interest;
            jobInterestContainer.appendChild(interestItem);
        });
    }

    //navigate to the edit profile page for the user can edit their profile
    const editProfileButton = document.querySelector('#editProfileButton');
    if (editProfileButton) {
        editProfileButton.style.cursor = 'pointer';
        editProfileButton.addEventListener('click', () => {
            window.location.href = '/edit-profile.html';
        });
    }
}
