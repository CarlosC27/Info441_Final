document.addEventListener('DOMContentLoaded', () => {
    const specificReviewRadio = document.querySelector('input[value="specific"]');
    const popup = document.getElementById('specific-review-popup');
    const closePopupButton = document.getElementById('close-popup');

    specificReviewRadio.addEventListener('change', () => {
        if (specificReviewRadio.checked) {
            popup.classList.remove('hidden');
        }
    });

    closePopupButton.addEventListener('click', () => {
        popup.classList.add('hidden');
    });
});
