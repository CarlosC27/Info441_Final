document.addEventListener('DOMContentLoaded', () => {
    const finishReviewButton = document.querySelector('.finish-button-container .gold-button');
    const finishReviewPopup = document.getElementById('finish-review-popup');
    const closeFinishPopup = document.getElementById('close-finish-popup');
    const saveReviewButton = document.getElementById('save-review');

    if (finishReviewButton && finishReviewPopup && closeFinishPopup && saveReviewButton) {
        finishReviewButton.addEventListener('click', () => {
            finishReviewPopup.classList.remove('hidden');
            finishReviewPopup.style.display = 'block';
            finishReviewPopup.style.top = '50%';
            finishReviewPopup.style.left = '50%';
            finishReviewPopup.style.transform = 'translate(-50%, -50%)';
        });

        closeFinishPopup.addEventListener('click', () => {
            finishReviewPopup.classList.add('hidden');
            finishReviewPopup.style.display = 'none';
        });

       
        saveReviewButton.addEventListener('click', () => {
            const reviewName = document.getElementById('review-name').value;
            if (reviewName.trim() !== '') {
                console.log(`Review saved as: ${reviewName}`); 
                finishReviewPopup.classList.add('hidden');
                finishReviewPopup.style.display = 'none';
            } else {
                alert('Please enter a name for the review.');
            }
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    
    function showPopup(popupId) {
        const popup = document.getElementById(popupId);
        if (popup) {
            popup.classList.remove("hidden");
            popup.style.display = "block";
        }
    }

    function hidePopup(popupId) {
        const popup = document.getElementById(popupId);
        if (popup) {
            popup.classList.add("hidden");
            popup.style.display = "none";
        }
    }

  
    document.getElementById("upload-job-description-btn").addEventListener("click", () => {
        showPopup("upload-job-popup");
    });
    document.getElementById("close-job-popup").addEventListener("click", () => {
        hidePopup("upload-job-popup");
    });

    document.getElementById("select-resume-btn").addEventListener("click", () => {
        showPopup("select-resume-popup");
    });
    document.getElementById("close-resume-popup").addEventListener("click", () => {
        hidePopup("select-resume-popup");
    });

    document.getElementById("select-job-type-btn").addEventListener("click", () => {
        showPopup("select-job-type-popup");
    });
    document.getElementById("close-job-type-popup").addEventListener("click", () => {
        hidePopup("select-job-type-popup");
    });

    document.getElementById("select-skills-btn").addEventListener("click", () => {
        showPopup("select-skills-popup");
    });
    document.getElementById("close-skills-popup").addEventListener("click", () => {
        hidePopup("select-skills-popup");
    });


    document.getElementById("finish-review-btn").addEventListener("click", () => {
        alert("Review Finished!");
    });
});
