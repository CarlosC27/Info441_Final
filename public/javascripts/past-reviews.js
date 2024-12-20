async function init(){
    await loadReviews();
}

async function loadReviews(){

    try {
        const simpleReviewJson = await fetch('api/resumes/past_simple_reviews',  { credentials: 'include' });
        const simpleReviewData = await simpleReviewJson.json();

        const specificeReviewJson = await fetch('api/resumes/past_specific_reviews',  { credentials: 'include' });
        const specificeReviewData = await specificeReviewJson.json();

        const jobReviewJson = await fetch('api/resumes/past_job_reviews',  { credentials: 'include' });
        const jobReviewData = await jobReviewJson.json();

        const reviewContainer = document.querySelector('.review-content-container')
        const simpleReviewContainer = document.querySelector('.simple-review-container')
        const specificReviewContainer = document.querySelector('.specific-review-container')
        const jobReviewContainer = document.querySelector('.job-review-container')

        if(reviewContainer){
            simpleReviewData.forEach((review, index) => {
                //simple: id, username, resumeName, resume, output, favorited, resumeReviewName, createdAt

                const divClass = "div-simple" + index;
                const div = document.createElement('div');
                div.className = divClass;
                div.id = "past-resume-div"
                simpleReviewContainer.appendChild(div);

                const divContainer = document.querySelector('.' + divClass)

                const resumeName = document.createElement('p');
                resumeName.textContent = "Review: " + review.resumeName;
                divContainer.appendChild(resumeName);

                const divStarClass = "div-star-simple-" + index;
                const divStar = document.createElement('div');
                divStar.className = divStarClass;
                divStar.id = "star-resume-title"
                divContainer.appendChild(divStar);

                const divStarContainer = document.querySelector('.' + divStarClass)
                
                const star = document.createElement('a');
                if(review.favorited) {
                    star.textContent = "★  ";
                } else{
                    star.textContent = "☆  ";
                }
                
                divStarContainer.appendChild(star);

                const resumeReviewName = document.createElement('a');
                resumeReviewName.textContent = "Resume Title: " + review.resumeReviewName;
                divStarContainer.appendChild(resumeReviewName);

                const resumeContent = document.createElement('p');
                resumeContent.textContent = "Resume: " + review.resume;
                divContainer.appendChild(resumeContent);

                const output = document.createElement('p');
                output.textContent = "Feedback: " + review.output;
                divContainer.appendChild(output);

                const userName = document.createElement('p');
                userName.textContent = "Username: " + review.username;
                divContainer.appendChild(userName);

                const date = document.createElement('p');
                date.textContent = "Date: " + review.createdAt;
                divContainer.appendChild(date);
            });

            specificeReviewData.forEach((review, index) => {
                //specific: id, username, resumeName, resume, specificJobs, output, favorited, resumeReviewName, createdAt

                const divClass = "div-specic" + index;
                const div = document.createElement('div');
                div.className = divClass;
                div.id = "past-resume-div"
                specificReviewContainer.appendChild(div);

                const divContainer = document.querySelector('.' + divClass)

                const resumeReviewName = document.createElement('p');
                resumeReviewName.textContent = "Review: " + review.resumeReviewName;
                divContainer.appendChild(resumeReviewName);

                const divStarClass = "div-star-specific-" + index;
                const divStar = document.createElement('div');
                divStar.className = divStarClass;
                divStar.id = "star-resume-title"
                divContainer.appendChild(divStar);

                const divStarContainer = document.querySelector('.' + divStarClass)
                
                const star = document.createElement('a');
                if(review.favorited) {
                    star.textContent = "★  ";
                } else{
                    star.textContent = "☆  ";
                }
                
                divStarContainer.appendChild(star);

                const resumeName = document.createElement('a');
                resumeName.textContent = "Resume Title: " + review.resumeName;
                divStarContainer.appendChild(resumeName);

                const specificJobs = document.createElement('p');
                specificJobs.textContent = "Job: " + review.specificJobs;
                divContainer.appendChild(specificJobs);

                const resumeContent = document.createElement('p');
                resumeContent.textContent = "Resume: " + review.resume;
                divContainer.appendChild(resumeContent);

                const output = document.createElement('p');
                output.textContent = "Feedback: " + review.output;
                divContainer.appendChild(output);

                const userName = document.createElement('p');
                userName.textContent = "Username: " + review.username;
                divContainer.appendChild(userName);

                const date = document.createElement('p');
                date.textContent = "Date: " + review.createdAt;
                divContainer.appendChild(date);
            });

            jobReviewData.forEach((review, index) => {
                //jobs: id, username, selectedResume, selectedJobType, selectedSkills, jobReviewOutput, jobReviewName, createdAt

                const divClass = "div-job" + index;
                const div = document.createElement('div');
                div.className = divClass;
                div.id = "past-resume-div"
                jobReviewContainer.appendChild(div);

                const divContainer = document.querySelector('.' + divClass)

                const jobReviewName = document.createElement('p');
                jobReviewName.textContent = "Review Title: " + review.jobReviewName;
                divContainer.appendChild(jobReviewName);

                const selectedResumeName = document.createElement('p');
                jobReviewName.textContent = "Resume Title: " + review.selectedResumeName;
                divContainer.appendChild(selectedResumeName);

                const selectedResume = document.createElement('p');
                selectedResume.textContent = "Resume: " + review.selectedResume;
                divContainer.appendChild(selectedResume);

                const selectedJobType = document.createElement('p');
                selectedJobType.textContent = "Job: " + review.selectedJobType;
                divContainer.appendChild(selectedJobType);

                const selectedSkills = document.createElement('p');
                selectedSkills.textContent = "Skills: " + review.selectedSkills;
                divContainer.appendChild(selectedSkills);

                const jobReviewOutput = document.createElement('p');
                jobReviewOutput.textContent = "Feedback: " + review.jobReviewOutput;
                divContainer.appendChild(jobReviewOutput);

                const userName = document.createElement('p');
                userName.textContent = "Username: " + review.username;
                divContainer.appendChild(userName);

                const date = document.createElement('p');
                date.textContent = "Date: " + review.createdAt;
                divContainer.appendChild(date);
            });
        }
        const profilePicture = document.querySelector('#profileDiv');
        if (profilePicture) {
            profilePicture.style.cursor = 'pointer';
            profilePicture.addEventListener('click', () => {
                window.location.href = '/homepage.html';
            });
        }
    }
    catch (error) {
        console.error('Error loading user info:', error);
    }
}

document.addEventListener('DOMContentLoaded', init);