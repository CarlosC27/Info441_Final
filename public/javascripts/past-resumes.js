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

                const userName = document.createElement('p');
                userName.textContent = "Username: " + resume.username;
                divContainer.appendChild(userName);

                const resumeName = document.createElement('p');
                resumeName.textContent = "Resume Title: " + resume.resumeName;
                divContainer.appendChild(resumeName);

                const date = document.createElement('p');
                date.textContent = "Date: " + resume.createdAt;
                divContainer.appendChild(date);

                const resumeContent = document.createElement('p');
                resumeContent.textContent = "Resume: " + resume.resume;
                divContainer.appendChild(resumeContent);
    
            });
        }
    }
    catch (error) {
        console.error('Error loading user info:', error);
    }
}

document.addEventListener('DOMContentLoaded', init);