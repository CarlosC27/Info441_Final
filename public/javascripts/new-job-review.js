document.addEventListener('DOMContentLoaded', async () => {
    
    const showJobPopup = document.getElementById('show-job-description-popup');
    const jobDescriptionPopup = document.getElementById('job-description-popup');
    const closeJobPopup = document.getElementById('close-job-popup');
    const saveJobDescriptionButton = document.getElementById('save-job-description');
    const jobNameInput = document.getElementById('job-name');
    const jobTextInput = document.getElementById('job-description-text');
    
    
    try {
        const response = await fetch('/api/user/profile', { credentials: 'include' });
        if (response.ok) {
            const userData = await response.json();
            updateJobRevePage(userData);
        } else {
            console.error("Failed to fetch user profile:", await response.text());
        }
    } catch (error) {
        console.error("Error loading user profile:", error);
    }

    if (showJobPopup && jobDescriptionPopup && closeJobPopup) {
        showJobPopup.addEventListener('click', () => {
            jobDescriptionPopup.classList.remove('hidden'); 
            jobDescriptionPopup.style.display = 'block'; 
            jobDescriptionPopup.style.top = '50%'; 
            jobDescriptionPopup.style.left = '50%'; 
            jobDescriptionPopup.style.transform = 'translate(-50%, -50%)'; 
        });

        closeJobPopup.addEventListener('click', () => {
            jobDescriptionPopup.classList.add('hidden');
            jobDescriptionPopup.style.display = 'none'; 
        });

        saveJobDescriptionButton.addEventListener('click', () => {
            const jobName = jobNameInput.value.trim();
            const description = jobTextInput.value.trim();

            if (!jobName || !description) {
                alert('Please fill out both the resume name and content.');
                return;
            }


            jobDescriptionPopup.classList.add('hidden');
            jobDescriptionPopup.style.display = 'none';
        });
    }
});


useSkills = []

function updateJobRevePage(user) {
    const checkSkillsContainer = document.querySelector('.check-skills-container');
    if (checkSkillsContainer) {
        user.skills.forEach(skill => {

            const skillDiv = document.createElement('div');
            const skillCheckBox = document.createElement('input');
            skillCheckBox.setAttribute("type", "checkbox");
            const skillText = document.createElement('label');
            skillText.textContent = skill;

            checkSkillsContainer.appendChild(skillDiv);
            checkSkillsContainer.appendChild(skillCheckBox);
            checkSkillsContainer.appendChild(skillText);
        
            skillCheckBox.addEventListener('click', () => {
                useSkills.push(skill) 
            });
        });
    }
}


