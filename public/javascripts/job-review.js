document.addEventListener('DOMContentLoaded', () => {
    let selectedResumeContent = "";
    let selectedResumeName = "";
    let selectedJobType = "";
    let selectedSkills = [];
    let jobDescription = "";
    let reviewName = "";
    let username = "";
    let perplexityResponse = "";

    const resumeListContainer = document.getElementById("resume-list-container");
    const jobTypeListContainer = document.getElementById("job-type-list-container");
    const skillsListContainer = document.getElementById("skills-list-container");

    function showPopup(popupId) {
        const popup = document.getElementById(popupId);
        if (popup) {
            popup.classList.remove("hidden");
            popup.style.display = "block";
            popup.style.top = "50%";
            popup.style.left = "50%";
            popup.style.transform = "translate(-50%, -50%)";
        }
    }

    function hidePopup(popupId) {
        const popup = document.getElementById(popupId);
        if (popup) {
            popup.classList.add("hidden");
            popup.style.display = "none";
        }
    }

    async function fetchUsername() {
        try {
            const response = await fetch('/api/user/profile');
            if (!response.ok) throw new Error('Failed to fetch username');
            const userData = await response.json();
            username = userData.username;
        } catch (error) {
            alert("Unable to fetch user details. Please log in.");
        }
    }

    async function fetchResumes() {
        try {
            const response = await fetch('/api/resumes/resumesList');
            if (!response.ok) throw new Error('Failed to fetch resumes');
            const resumes = await response.json();
            resumeListContainer.innerHTML = "";
            resumes.forEach((resume) => {
                const resumeItem = document.createElement("div");
                resumeItem.className = "resume-item";
                resumeItem.innerHTML = `
                    <label>
                        <input type="radio" name="resume" value="${resume.resumeName}" data-content="${resume.resume}">
                        ${resume.resumeName}
                    </label>
                `;
                resumeListContainer.appendChild(resumeItem);
            });
            document.querySelectorAll('input[name="resume"]').forEach((radioButton) => {
                radioButton.addEventListener('change', (event) => {
                    selectedResumeName = event.target.value;
                    selectedResumeContent = event.target.dataset.content;
                });
            });
        } catch (error) {
            alert('Unable to fetch resumes. Please try again.');
        }
    }

    async function fetchJobTypes() {
        try {
            const response = await fetch('/api/user/jobInterests');
            if (!response.ok) throw new Error('Failed to fetch job interests');
            const jobInterests = await response.json();
            jobTypeListContainer.innerHTML = "";
            jobInterests.forEach((job) => {
                const jobItem = document.createElement("div");
                jobItem.className = "job-item";
                jobItem.innerHTML = `
                    <label>
                        <input type="radio" name="job-type" value="${job}">
                        ${job}
                    </label>
                `;
                jobTypeListContainer.appendChild(jobItem);
            });
            document.querySelectorAll('input[name="job-type"]').forEach((radioButton) => {
                radioButton.addEventListener('change', (event) => {
                    selectedJobType = event.target.value;
                });
            });
        } catch (error) {
            alert('Unable to fetch job types. Please try again.');
        }
    }

    async function fetchSkills() {
        try {
            const response = await fetch('/api/user/profile');
            if (!response.ok) throw new Error('Failed to fetch skills');
            const userData = await response.json();
            skillsListContainer.innerHTML = "";
            userData.skills.forEach((skill) => {
                const skillItem = document.createElement("div");
                skillItem.className = "skill-item";
                skillItem.innerHTML = `
                    <label>
                        <input type="checkbox" name="skill" value="${skill}">
                        ${skill}
                    </label>
                `;
                skillsListContainer.appendChild(skillItem);
            });
            document.querySelectorAll('input[name="skill"]').forEach((checkbox) => {
                checkbox.addEventListener('change', () => {
                    selectedSkills = Array.from(
                        document.querySelectorAll('input[name="skill"]:checked')
                    ).map((checkbox) => checkbox.value);
                });
            });
        } catch (error) {
            alert('Unable to fetch skills. Please try again.');
        }
    }

    document.getElementById("job-description").addEventListener("input", (event) => {
        jobDescription = event.target.value;
    });

    document.getElementById("save-job-btn").addEventListener("click", () => {
        if (!jobDescription.trim()) {
            alert("Please enter a job description.");
            return;
        }
        hidePopup("upload-job-popup-job-page");
    });

    const finishReviewButton = document.querySelector(".finish-button-container .gold-button");
    const closeFinishPopup = document.getElementById("close-finish-popup");
    const saveReviewButton = document.getElementById("save-review");
    const beginButtonJob = document.getElementById('beginButtonJob');
    let jobOutput = document.getElementById('job-review-output').querySelector('textarea');

    beginButtonJob.addEventListener("click", () => {
        const message = `Here is my current resume: ${selectedResumeContent}. Here is the specific job I am looking into: ${selectedJobType}. Here is my skills: ${selectedSkills}`;
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
                        content: "You are an AI assistant that helps to improve and tailor resumes for job applications. Please provide suggestions to enhance the resume based on the provided job description, skills, and current resume."
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
            jobOutput.placeholder = perplexityResponse;
            jobOutput.value = perplexityResponse; 
            adjustTextareaHeight(jobOutput); 

        })
        .catch(err => console.error(err));
    })

    finishReviewButton.addEventListener("click", () => {
        if (!selectedResumeName || !selectedJobType || selectedSkills.length === 0) {
            alert("Please complete all selections before finishing the review.");
            return;
        }
        showPopup("finish-review-popup");
    });

    closeFinishPopup.addEventListener("click", () => {
        hidePopup("finish-review-popup");
    });

    saveReviewButton.addEventListener("click", async () => {
        reviewName = document.getElementById("review-name").value.trim();
        if (!reviewName) {
            alert("Please enter a name for the review.");
            return;
        }
        const reviewData = {
            username,
            selectedResumeName,
            selectedResume: selectedResumeContent,
            selectedJobType,
            selectedSkills,
            jobReviewOutput: perplexityResponse,
            jobReviewName: reviewName,
        };
        try {
            const response = await fetch('/api/resumes/jobReview', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reviewData),
            });
            if (response.ok) {
                const result = await response.json();
                alert("Review saved successfully!");
                selectedResumeContent = "";
                selectedResumeName = "";
                selectedJobType = "";
                selectedSkills = [];
                jobDescription = "";
                reviewName = "";
                document.getElementById("review-name").value = "";
                perplexityResponse = "";
            } else {
                throw new Error("Failed to save review.");
            }
        } catch (error) {
            alert("An error occurred while saving your review. Please try again.");
        }
        hidePopup("finish-review-popup");
    });

    fetchUsername();

    document.getElementById("select-resume-btn").addEventListener("click", () => {
        fetchResumes();
        showPopup("resume-popup-job-page");
    });

    document.getElementById("close-resume-popup").addEventListener("click", () => {
        hidePopup("resume-popup-job-page");
    });

    document.getElementById("select-job-type-btn").addEventListener("click", () => {
        fetchJobTypes();
        showPopup("job-type-popup-job-page");
    });

    document.getElementById("close-job-type-popup").addEventListener("click", () => {
        hidePopup("job-type-popup-job-page");
    });

    document.getElementById("select-skills-btn").addEventListener("click", () => {
        fetchSkills();
        showPopup("skills-popup-job-page");
    });

    document.getElementById("close-skills-popup").addEventListener("click", () => {
        hidePopup("skills-popup-job-page");
    });

    document.getElementById("upload-job-description-btn").addEventListener("click", () => {
        showPopup("upload-job-popup-job-page");
    });

    document.getElementById("close-job-popup").addEventListener("click", () => {
        hidePopup("upload-job-popup-job-page");
    });

    function adjustTextareaHeight(textarea) {
        textarea.style.height = 'auto'; 
        textarea.style.height = textarea.scrollHeight + 'px'; 
    }
    
});
