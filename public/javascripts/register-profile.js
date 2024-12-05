
const skills = [];
const jobInterests = [];


const newSkillInput = document.getElementById('newSkill');
const addSkillButton = document.getElementById('addSkill');
const currentSkillsContainer = document.querySelector('.current-skills');

const newJobInterestInput = document.getElementById('jobInterest');
const addJobInterestButton = document.getElementById('addInterest');
const currentInterestsContainer = document.querySelector('.current-interests');

function renderSkills() {
    currentSkillsContainer.innerHTML = ''; 
    skills.forEach((skill, index) => {
        const skillDiv = document.createElement('div');
        const skillText = document.createElement('a');
        skillText.textContent = skill;
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => {
            skills.splice(index, 1); 
            renderSkills(); 
        });

        skillDiv.appendChild(skillText);
        skillDiv.appendChild(deleteButton);
        currentSkillsContainer.appendChild(skillDiv);
    });
    currentSkillsContainer.classList.remove('hidden'); 
}


function renderJobInterests() {
    currentInterestsContainer.innerHTML = ''; 
    jobInterests.forEach((interest, index) => {
        const interestDiv = document.createElement('div');
        const interestText = document.createElement('a');
        interestText.textContent = interest;
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => {
            jobInterests.splice(index, 1); 
            renderJobInterests(); 
        });

        interestDiv.appendChild(interestText);
        interestDiv.appendChild(deleteButton);
        currentInterestsContainer.appendChild(interestDiv);
    });
    currentInterestsContainer.classList.remove('hidden');
}


addSkillButton.addEventListener('click', () => {
    const newSkill = newSkillInput.value.trim();
    if (newSkill) {
        skills.push(newSkill);
        newSkillInput.value = ''; 
        renderSkills(); 
    }
});

addJobInterestButton.addEventListener('click', () => {
    const newJobInterest = newJobInterestInput.value.trim();
    if (newJobInterest) {
        jobInterests.push(newJobInterest);
        newJobInterestInput.value = ''; 
        renderJobInterests(); 
    }
});


const registerProfileButton = document.getElementById('registerProfile');

registerProfileButton.addEventListener('click', async () => {
    const userData = {
        firstName: document.getElementById('fname').value.trim(),
        lastName: document.getElementById('lname').value.trim(),
        email: document.getElementById('userEmail').value.trim(),
        jobTitle: document.getElementById('jobTitle').value.trim(),
        skills,
        jobInterest: jobInterests,
    };

    console.log("User data to be sent:", userData);

    try {
        const response = await fetch('/api/user/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        });

        console.log("Response status:", response.status); 
        console.log("Response data:", await response.json()); 

        if (response.ok) {
            alert("Profile registered successfully!");
            window.location.href = "/log-in-page.html";
        } else {
            alert("Error during registration. Check logs.");
        }
    } catch (error) {
        console.error("Fetch error:", error);
    }
});


