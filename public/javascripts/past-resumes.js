// document.addEventListener('DOMContentLoaded', async () => {
//     try {
//         const response = await fetch('/api/v1/resumes/past_resumes', { credentials: 'include' });
//         if (response.ok) {
//             const resumeData = await response.json();
//             console.log(resumeData);
//             updateResumesPage(resumeData);
//         } else {
//             console.error("Failed to fetch resume:", await response.text());
//         }
//     } catch (error) {
//         console.error("Error loading resume:", error);
//     }
// });


// function updateResumesPage(resumeData){
//     //Username, Resume name, date created, favorited, resume content
//     const resumeContainer = document.querySelector('.resume-content-container')
//     if(resumeContainer){
//         resumeData.forEach(resume => {
//             const userName = document.createElement('p');
//             userName.textContent = "name";
//             resumeContainer.appendChild(userName);

//             const resumeName = document.createElement('p');
//             resumeName.textContent = "name";
//             resumeContainer.appendChild(resumeName);

//             const date = document.createElement('p');
//             date.textContent = "date";
//             resumeContainer.appendChild(date);

//             const resumeContent = document.createElement('p');
//             resumeContent.textContent = "content";
//             resumeContainer.appendChild(resumeContent);

//             // const favorited = document.createElement('button');
//             // favorited.setAttribute("id", "star-icon")
//             // if(resume.resume){
//             //     favorited.textContent = "★"
//             //     favorited.setAttribute("value", "true")
//             // } else{
//             //     favorited.textContent = "☆"
//             //     favorited.setAttribute("value", "false")
//             // }
//             // resumeContainer.appendChild(favorited);
//         });
//     }
// }

// const starIcon = document.getElementById('star-icon');
// starIcon.addEventListener('click', () => {
//     value = !starIcon.value;
//     starIcon.textContent = value ? '★' : '☆';
// });

async function init(){
    
    await loadResumes();
}

async function loadResumes(){

    try {
        console.log("HELLO");
        const resumeJson = await fetch('api/resumes/past_resumes',  { credentials: 'include' });
        const resumeData = await resumeJson.json();
        console.log("response status is "+ resumeJson.ok);

        resumeData.forEach(skill => {
            console.log("skill " + skill.username);
        });
        
        let reumeHtml = (Array.isArray(resumeJson) ? resumeJson : []).map(resumeJson => {
            return `
            <div class="resume">
                <div>Username: ${escapeHTML(resumeInfo.username)}</div>
                <div>Resume Name: ${escapeHTML(resumeInfo.resumeName)}</div>
                <div>Resume: ${escapeHTML(resumeInfo.resume)}</div>
                <div>Favorited: ${resumeInfo.favorited ? 'Yes' : 'No'}</div>
                <div>
                    <a href="/userInfo.html?user=${encodeURIComponent(resumeInfo.username)}">
                        View ${escapeHTML(resumeInfo.username)}'s Profile
                    </a>
                </div>
                <div>Created At: ${new Date(resumeInfo.createdAt).toLocaleString()}</div>
            </div>`;
        }).join("\n");
        
        console.log("resume html is " + reumeHtml);
        document.getElementById("resume-content-container").innerHTML = reumeHtml;
    }

    catch (error) {
        console.error('Error loading user info:', error);
    }
}

document.addEventListener('DOMContentLoaded', init);