async function init() {
    await loadUserInfo(); // Load existing user info into the form
    setupEditProfileHandlers(); // Attach event listeners for form buttons
}

// Load user info into the form fields
async function loadUserInfo() {
    try {
        const response = await fetch('/api/user/profile', { credentials: 'include' });
        if (response.ok) {
            const { firstName, lastName, jobTitle } = await response.json();

            // Populate form fields with user data
            document.getElementById('fname').value = firstName || '';
            document.getElementById('lname').value = lastName || '';
            document.getElementById('newJobTitle').value = jobTitle || '';
        } else {
            console.error('Failed to load user info:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error loading user info:', error);
    }
}

// Attach event listeners for the buttons
function setupEditProfileHandlers() {
    // Update Name
    document.getElementById('updateNameButton').addEventListener('click', async () => {
        const firstName = document.getElementById('fname').value.trim();
        const lastName = document.getElementById('lname').value.trim();

        if (!firstName || !lastName) {
            alert('Both First and Last Name are required');
            return;
        }

        try {
            const response = await fetch('/api/user/updateName', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstName, lastName }),
                credentials: 'include',
            });

            if (response.ok) {
                alert('Name updated successfully!');
                await loadUserInfo(); // Reload user info to reflect the change
            } else {
                const errorData = await response.json();
                alert(`Failed to update name: ${errorData.error}`);
            }
        } catch (error) {
            console.error('Error updating name:', error);
            alert('An error occurred while updating your name.');
        }
    });
}

// Initialize the script when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);

