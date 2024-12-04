//global variables
var fName = ""
var lName = ""
var Email = ""
var Job = ""
var skills = [];
var jobInterests = [];


async function init() {
    await loadUserInfo(); 
}

async function loadUserInfo() {
    try {
        const response = await fetch('/api/user/profile', { credentials: 'include' });
        if (response.ok) {
            const userData = await response.json();
            updateEditProfilePage(userData);
        } else {
            console.error('Failed to load user info:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error loading user info:', error);
    }
}

function updateEditProfilePage(user) {
    fName = user.firstName
    lName = user.lastName
    Email = user.email
    Job = user.jobTitle
    skills = user.skills
    jobInterests = user.jobInterest

    updateFirstName(fName)
    updateLastName(lName)
    updateEmail(Email)
    updateJob(Job)
    renderSkills();
    renderJobInterests();
}

//First Name
const updateFNameButton = document.getElementById("updateFirstName")
const fNameInput = document.getElementById("fname")

function updateFirstName(name){
    const firstNameTitle = document.querySelector('.edit-profile-First-Name');
    if (firstNameTitle) {
        firstNameTitle.textContent = `First Name: ${name}`;
    }
}

updateFNameButton.addEventListener('click', () => {
    fName = fNameInput.value.trim();
    if(fName){
        fNameInput.value = '';
        updateFirstName(fName);
    }
} )

//Last Name
const updateLNameButton = document.getElementById("updateLastName")
const lNameInput = document.getElementById("lname")

function updateLastName(name){
    const lastNameTitle = document.querySelector('.edit-profile-Last-Name');
    if (lastNameTitle) {
        lastNameTitle.textContent = `Last Name: ${name}`;
    }
}

updateLNameButton.addEventListener('click', () => {
    lName = lNameInput.value.trim();
    if(lName){
        lNameInput.value = '';
        updateLastName(lName);
    }
} )

//job title
const updateJobButton = document.getElementById("updateJobTitle")
const jobInput = document.getElementById("jobTitle")

function updateJob(job){
    const jobTitle = document.querySelector('.edit-profile-Job-Title');
    if (jobTitle) {
        jobTitle.textContent = `Job Title: ${job}`;
    }
}

updateJobButton.addEventListener('click', () => {
    Job = jobInput.value.trim();
    if(Job){
        jobInput.value = '';
        updateJob(Job);
    }
} )

//email
const updateEmailButton = document.getElementById("updateEmail")
const emailInput = document.getElementById("userEmail")

function updateEmail(email){
    const emailTitle = document.querySelector('.edit-profile-email');
    if (emailTitle) {
        emailTitle.textContent = `Email: ${email}`;
    }
}

updateEmailButton.addEventListener('click', () => {
    Email = emailInput.value.trim();
    if (Email) {
        emailInput.value = '';
        updateEmail(Email);
    }
})

//skills
const newSkillInput = document.getElementById('newSkill');
const addSkillButton = document.getElementById('addSkill');
const currentSkillsContainer = document.querySelector('.edit-skills-grid-container');

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

addSkillButton.addEventListener('click', () => {
    const newSkill = newSkillInput.value.trim();
    if (newSkill) {
        skills.push(newSkill);
        newSkillInput.value = ''; 
        renderSkills(); 
    }
});

//Job Interests
const newJobInterestInput = document.getElementById('jobInterest');
const addJobInterestButton = document.getElementById('addInterest');
const currentInterestsContainer = document.querySelector('.edit-job-interest-grid-container');

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

addJobInterestButton.addEventListener('click', () => {
    const newJobInterest = newJobInterestInput.value.trim();
    if (newJobInterest) {
        jobInterests.push(newJobInterest);
        newJobInterestInput.value = ''; 
        renderJobInterests(); 
    }
});

//save info and navigate back to the profile page 
const saveProfileButton = document.getElementById('saveProfile');

saveProfileButton.addEventListener('click', async () => {
    try {
        var updatedData = {
            firstName: fName, 
            lastName: lName, 
            email: Email, 
            jobTitle: Job, 
            skills: skills, 
            jobInterest: jobInterests
        };
        const response = await fetch('/api/user/update', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData),
        });

        if (response.ok) {
            window.location.href = "/profile-page.html";
        } else {
            alert("Error during update.");
        }
        
    } catch (error) {
        console.error("Fetch error:", error);
    }
});

document.addEventListener('DOMContentLoaded', init);