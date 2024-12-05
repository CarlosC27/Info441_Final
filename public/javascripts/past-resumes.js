document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/v1/resumes/past_resumes', { credentials: 'include' });
        if (response.ok) {
            const resumeData = await response.json();
            console.log(resumeData);
            updateResumesPage(resumeData);
        } else {
            console.error("Failed to fetch resume:", await response.text());
        }
    } catch (error) {
        console.error("Error loading resume:", error);
    }
});


function updateResumesPage(resumeData){
    //Username, Resume name, date created, favorited, resume content
    const resumeContainer = document.querySelector('.resume-content-container')
    if(resumeContainer){
        resumeData.forEach(resume => {
            const userName = document.createElement('p');
            userName.textContent = "name";
            resumeContainer.appendChild(userName);

            const resumeName = document.createElement('p');
            resumeName.textContent = "name";
            resumeContainer.appendChild(resumeName);

            const date = document.createElement('p');
            date.textContent = "date";
            resumeContainer.appendChild(date);

            const resumeContent = document.createElement('p');
            resumeContent.textContent = "content";
            resumeContainer.appendChild(resumeContent);

            // const favorited = document.createElement('button');
            // favorited.setAttribute("id", "star-icon")
            // if(resume.resume){
            //     favorited.textContent = "★"
            //     favorited.setAttribute("value", "true")
            // } else{
            //     favorited.textContent = "☆"
            //     favorited.setAttribute("value", "false")
            // }
            // resumeContainer.appendChild(favorited);
        });
    }
}

// const starIcon = document.getElementById('star-icon');
// starIcon.addEventListener('click', () => {
//     value = !starIcon.value;
//     starIcon.textContent = value ? '★' : '☆';
// });

// async function init(){
    
//     loadResumes();
// }

// async function loadResumes(){
//     let resumeJson = await fetchJSON(`api/v1/resumes/past_resumes`)
//     console.log(resumeJson);

//     let reumeHtml = resumeJson.map(resumeInfo => {
//         return `
//         <div class="resume">
//             ${escapeHTML(resumeInfo.username)}
//             ${resumeInfo.resumeName}
//             ${resumeInfo.resume}
//              <div><a href="/userInfo.html?user=${encodeURIComponent(resumeInfo.username)}">${escapeHTML(resumeInfo.username)}</a>, ${escapeHTML(resumeInfo.createdAt)}</div>

//         </div>`
//     }).join("\n");

//     document.getElementById("resume-content-container").innerHTML = reumeHtml;
//}