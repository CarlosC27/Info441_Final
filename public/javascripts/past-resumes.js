async function init(){
    await loadResumes();
}

async function loadResumes(){

    try {
        console.log("HELLO");
        const resumeJson = await fetch('api/resumes/past_resumes',  { credentials: 'include' });
        const resumeData = await resumeJson.json();
        console.log("response status is "+ resumeJson.ok);

        const resumeContainer = document.querySelector('.resume-content-container')
        if(resumeContainer){
            resumeData.forEach((resume, index) => {
                const divClass = "div" + index;
                const div = document.createElement('div');
                div.className = divClass;
                div.id = "past-resume-div"
                resumeContainer.appendChild(div);

                const divContainer = document.querySelector('.' + divClass)

                const divStarClass = "div-star-" + index;
                const divStar = document.createElement('div');
                divStar.className = divStarClass;
                divStar.id = "star-resume-title"
                divContainer.appendChild(divStar);

                const divStarContainer = document.querySelector('.' + divStarClass)

                const star = document.createElement('a');
                if(resume.favorited) {
                    star.textContent = "★  ";
                } else{
                    star.textContent = "☆  ";
                }
                
                divStarContainer.appendChild(star);

                const resumeName = document.createElement('a');
                resumeName.textContent = "Resume Title: " + resume.resumeName;
                divStarContainer.appendChild(resumeName);

                const resumeContent = document.createElement('p');
                resumeContent.textContent = "Resume: " + resume.resume;
                divContainer.appendChild(resumeContent);

                const userName = document.createElement('p');
                userName.textContent = "Username: " + resume.username;
                divContainer.appendChild(userName);

                const date = document.createElement('p');
                date.textContent = "Date: " + resume.createdAt;
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