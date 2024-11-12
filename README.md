RÉVISEMÉ
Group 5: Carlos Carrillo-Sandoval, Renusree Chittella, Ayaan Rahim, and Olivia Sapp
Figma: https://www.figma.com/board/X93Bdr4Ct5KA1xi94V2tCj/Resume-Builder?node-id=0-1&t=hn7Vf T08u4kX7XnE-1
Project Description
Our product will be an AI-powered Resume Reviewer. We will create a website where users can upload their resumes and have them reviewed and tailored for the job they seek. This will require us to use a large-language-model API so that the output will be generated immediately when users request feedback.
We aim for this site to be used by people needing assistance with their resumes in the job market. This can be recent college students, people looking to tailor their current experience to a different job, or people looking to start working again after a while outside of the job market. Most jobs have specific requirements and look for specific keywords on resumes that fit the job description. Many applicants struggle with getting their resumes past the application tracking system many companies use due to their resumes lacking these specific keywords or not displaying enough skills required for the job. The goal of our website is to assist in creating a resume that will cater to those specific keywords and qualifications that jobs are looking for in their applicants.
As college seniors, we understand the struggle firsthand of the difficulties of getting our resumes passed the first stage of the hiring process. Many times, our applications get denied for jobs or internships without getting the opportunity to speak with a recruiter or hiring manager. We aim to reduce the number of these occurrences by assisting in getting past the application tracking system and into the interview process. We believe that having this assistance will allow users to cater their resumes to a specific job swiftly and efficiently.
  
 Architectural diagram mapping
 Summary of user stores: Olivia
 Priority
User
Description
Technical Implementation
P0
As a user who is early in my career
I want to receive feedback on my resume, such as improving the structure, making it ATS format compliant, and improving the wording of my bullet points.
User uploads their resume, and the server will use the POST api/upload-resume endpoint. An AI model will read it and generate feedback. Then it will save this feedback in the Resume Database (using api/save-review). The server will use a GET api/review-results/ endpoint to send the feedback back to the user.
P1
As a user who is a college student
I want to be able to create separate resumes geared towards specific roles/jobs.
The user clicks a button to look at different job categories. The server api/job-categories endpoint will return the list of
        
       job categories.
P2
As a user who is switching careers
I want to be able to input the job description from a specific role, and receive a tailored version of my resume to fit that role.
The user uploads their current resume with as much detail of their current experience(api/upload-resum). They additionally upload the job description of where they are applying to. The server endpoint will analyze the two sets of data to cater to the user's experience to fit the job description(api/submit-review).
P3
As a user that doesn’t have access to in-person career resources
I want to be able to talk to a chatbot that can answer my questions about my resume and its suggested improvements.
User asks the chatbot a question on our website. The browser opens a websocket with the server to allow for continuous communication with the server. The server makes a request to an LLM, and the LLM responds with feedback that the server sends back to the user.
P4
All users
I want to be able to save different versions of my resume and resume feedback in my user account, so I can look back at them later.
User logs in and the User Database authenticates the user’s credentials, the server uses POST api/auth/login. The user uploads their resume to our website, the server uses POST api/upload-resume. Then the user’s resume and resume feedback gets saved to the Resume Database. When saving to Resume Database, each resume will hold a unique ID that points to the user who uploaded that document.
    API Endpoints: Ayaan
Upload Resume: Allow users to upload resume for review Endpoint: ‘api/upload-resume’
Method: POST
Get Job Categories: Retrieve list of job categories to choose from Endpoint: ‘api/job-categories’
Method: GET

Submit Review Request: Submit review request with uploaded resume and selected job category
Endpoint: ‘api/submit-review’
Method: POST
Get Review Results: Retrieve generated review results Endpoint: ‘api/review-results/{id}’
Method: GET
Save Review: Allow users to save results for future use Endpoint: ‘api/save-review’
Method: POST
Get Saved Reviews: Retrieve list of saved reviews Endpoint: ‘api/saved-reviews’
Method: GET
Delete Saved Review: Delete specific saved review Endpoint: ‘api/delete-review/{id}’
Method: DELETE
User Authentication Login: Authenticate user account Endpoint: ‘api/auth/login’
Method: POST
User Authentication Register: Register new account Endpoint: ‘api/auth/register’
Method: POST
User Authentication Logout: Logout user account Endpoint: ‘api/auth/logout’
Method: POST
User Profile: Retrieve user profile information Endpoint: ‘api/user/profile’
Method: GET