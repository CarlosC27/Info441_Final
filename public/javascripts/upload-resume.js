document.addEventListener('DOMContentLoaded', async () => {
    let isFavorited = false; 
    let selectedSchema = 'simple';
    let specificJobs = []; 
    let username = ''; 

    const showResumePopup = document.getElementById('show-resume-upload-popup');
    const resumePopup = document.getElementById('resume-upload-popup');
    const closeResumePopup = document.getElementById('close-resume-popup');
    const starIcon = document.getElementById('star-icon');
    const saveResumeButton = document.getElementById('save-resume');
    const finishReviewButton = document.querySelector('.finish-button-container .gold-button');
    const saveReviewButton = document.getElementById('save-review');
    const specificReviewRadio = document.querySelector('input[value="specific"]');
    const specificReviewPopup = document.getElementById('specific-review-popup');
    const closeSpecificPopup = document.getElementById('close-specific-popup');
    const simpleReviewRadio = document.querySelector('input[value="simple"]');
    const jobInterestsContainer = document.getElementById('job-interests-container');

    const resumeNameInput = document.getElementById('resume-name');
    const resumeTextInput = document.getElementById('resume-text');
    const reviewNameInput = document.getElementById('review-name');
    const finishReviewPopup = document.getElementById('finish-review-popup');
    const beginButton = document.getElementById('beginButton');
    let perplexityResponse;
    let reivewOutput = document.getElementById('resume-review-output').querySelector('textarea');
    let userData;
   
    try {
        const response = await fetch('/api/user/profile'); 
        if (!response.ok) throw new Error('Failed to fetch user profile');
        userData = await response.json();
        username = userData.username; 
        console.log('Logged-in username:', username);
    } catch (error) {
        console.error('Error fetching username:', error);
        alert('Unable to fetch user details. Please log in.');
        return;
    }

  
    if (showResumePopup && resumePopup && closeResumePopup) {
        showResumePopup.addEventListener('click', () => {
            resumePopup.classList.remove('hidden'); 
            resumePopup.style.display = 'block'; 
            resumePopup.style.top = '50%'; 
            resumePopup.style.left = '50%'; 
            resumePopup.style.transform = 'translate(-50%, -50%)'; 
        });

        closeResumePopup.addEventListener('click', () => {
            resumePopup.classList.add('hidden');
            resumePopup.style.display = 'none'; 
        });

        saveResumeButton.addEventListener('click', () => {
            const resumeName = resumeNameInput.value.trim();
            const resume = resumeTextInput.value.trim();

            if (!resumeName || !resume) {
                alert('Please fill out both the resume name and content.');
                return;
            }

            console.log('Resume data saved locally:', { resumeName, resume });

            resumePopup.classList.add('hidden');
            resumePopup.style.display = 'none';
        });
    }

    starIcon.addEventListener('click', () => {
        isFavorited = !isFavorited;
        starIcon.textContent = isFavorited ? '★' : '☆';
    });

    if (specificReviewRadio && specificReviewPopup && closeSpecificPopup) {
        
        specificReviewRadio.addEventListener('click', async () => {
            selectedSchema = 'specific'; // Switch to specific schema
            specificReviewPopup.classList.remove('hidden');
            specificReviewPopup.style.display = 'block';
            specificReviewPopup.style.top = '50%';
            specificReviewPopup.style.left = '50%';
            specificReviewPopup.style.transform = 'translate(-50%, -50%)';

            
            try {
                const response = await fetch('/api/user/jobInterests');
                if (!response.ok) throw new Error('Failed to fetch job interests');

                const jobInterests = await response.json();
                jobInterestsContainer.innerHTML = ''; 
                jobInterests.forEach((job) => {
                    const label = document.createElement('label');
                    label.innerHTML = `<input type="checkbox" name="specific-job" value="${job}"> ${job}`;
                    jobInterestsContainer.appendChild(label);
                });
            } catch (error) {
                console.error('Error fetching job interests:', error);
            }
        });

        closeSpecificPopup.addEventListener('click', () => {
            specificJobs = Array.from(document.querySelectorAll('input[name="specific-job"]:checked')).map((input) => input.value);
            specificReviewPopup.classList.add('hidden');
            specificReviewPopup.style.display = 'none';
        });
    }


    simpleReviewRadio.addEventListener('click', () => {
        selectedSchema = 'simple'; 
    });


    finishReviewButton.addEventListener('click', () => {
        finishReviewPopup.classList.remove('hidden');
        finishReviewPopup.style.display = 'block';
    });

    beginButton.addEventListener('click', () => {
        const resume = resumeTextInput.value.trim();
        const skills = userData.skills;
        let message = `Here is the resume content: ${resume}. And here is the skills: ${skills}`
        if (specificJobs.length > 0) {
            message += `. The jobs: ${specificJobs}`
        }
        const options = {
            method: 'POST',
            headers: {
              Authorization: 'Bearer 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',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "llama-3.1-sonar-large-128k-online",
                messages: [
                    {
                        role: "system",
                        content: "You are an AI assistant that helps to improve and tailor resumes for job applications. Please provide suggestions to enhance the resume based on the provided job type and and selected skills."
                    },
                    {
                        role: "user",
                        content: message
                    }
                ]
            })
          };
        fetch('https://api.perplexity.ai/chat/completions', options)
        .then(response => response.json())
        .then(response => {console.log(response);
            perplexityResponse = response.choices[0].message.content;
            reivewOutput.placeholder = perplexityResponse;
            reivewOutput.value = perplexityResponse; 
            adjustTextareaHeight(reivewOutput); 
        })
        .catch(err => console.error(err));
    })

   
    saveReviewButton.addEventListener('click', async () => {
        const reviewName = reviewNameInput.value.trim();
        const resumeName = resumeNameInput.value.trim();
        const resume = resumeTextInput.value.trim();
    
        if (!reviewName || !resumeName || !resume) {
            alert('Please fill out all fields (review name, resume name, and content).');
            return;
        }
    
        const dataToSave = {
            username, 
            resumeName,
            resume,
            resumeReviewName: reviewName,
            favorited: isFavorited,
            output: perplexityResponse,
        };
    
        if (selectedSchema === 'specific') {
            dataToSave.specificJobs = specificJobs;
        }
    
        try {
            const response = await fetch(`/api/resumes/${selectedSchema}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSave),
            });
    
            if (response.ok) {
                const result = await response.json();
                alert(`Review and resume saved successfully! Review ID: ${result.id}`);
    
                resumeNameInput.value = '';
                resumeTextInput.value = '';
                reviewNameInput.value = '';
                isFavorited = false;
                starIcon.textContent = '☆';
                specificJobs = [];
                reivewOutput = '';
                console.log('Local data cleared.');
            } else {
                throw new Error('Failed to save review and resume.');
            }
        } catch (error) {
            console.error('Error saving review and resume:', error);
            alert('An error occurred while saving your review and resume. Please try again.');
        }
    
        finishReviewPopup.classList.add('hidden');
        finishReviewPopup.style.display = 'none';
    });    

    const profilePicture = document.querySelector('#profileDiv');
    if (profilePicture) {
        profilePicture.style.cursor = 'pointer';
        profilePicture.addEventListener('click', () => {
            window.location.href = '/homepage.html';
        });
    }

    function adjustTextareaHeight(textarea) {
        textarea.style.height = 'auto'; 
        textarea.style.height = textarea.scrollHeight + 'px'; 
    }
});
