async function init() {
    await loadUserInfo(); 
}

async function loadUserInfo() {
    try {
        const response = await fetch('/api/user/profile', { credentials: 'include' });
        if (response.ok) {
            const { firstName = '', lastName = '', jobTitle = '' } = await response.json();

            document.getElementById('fname').value = firstName;
            document.getElementById('lname').value = lastName;
            document.getElementById('newJobTitle').value = jobTitle;
        } else {
            console.error('Failed to load user info:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error loading user info:', error);
    }
}



document.addEventListener('DOMContentLoaded', init);