document.addEventListener('DOMContentLoaded', function() {
    const selectedImageContainer = document.getElementById('selectedImageContainer');
    const selectedImage = JSON.parse(localStorage.getItem('selectedImage'));

    if (selectedImage) {
        selectedImageContainer.innerHTML = `

            <div class="col-md-12">
                <div class="card Featured__card">
                    <img src="${selectedImage.src}" alt="" class="rounded-img_new" width="100%" height="auto">
                    <div class="card-body">
                        <h3 class="mt-2">${selectedImage.title}</h3>
                        <p class="card-text">${selectedImage.description}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="group">
                                <p class="fs-6 fw-light">${selectedImage.category}</p>
                                <p class="fs-6 fw-light">${selectedImage.subcategory}</p>
                            </div>
                            <h5 class="text-body-secondary">$${selectedImage.price}</h5>
                        </div>
                    </div>
                </div>
            </div>
            
        `;
    } else {
        selectedImageContainer.innerHTML = '<p>No image selected.</p>';
    }

    // Load existing feedback
    loadFeedback();
});


// feedback
function submitFeedback() {
    const userName = document.getElementById('userName').value;
    const feedbackText = document.getElementById('feedbackText').value;
    if (userName && feedbackText) {
        let feedbacks = JSON.parse(localStorage.getItem('imageFeedback')) || [];
        const selectedImage = JSON.parse(localStorage.getItem('selectedImage'));

        feedbacks.push({
            imageSrc: selectedImage.src,
            userName: userName,
            feedback: feedbackText
        });

        localStorage.setItem('imageFeedback', JSON.stringify(feedbacks));

        // Clear the feedback form
        document.getElementById('userName').value = '';
        document.getElementById('feedbackText').value = '';

        // Reload feedback
        loadFeedback();
    } else {
        alert('Please enter your name and feedback before submitting.');
    }
}


// feedbackContainer
function loadFeedback() {
    const feedbackContainer = document.getElementById('feedbackContainer');
    const feedbacks = JSON.parse(localStorage.getItem('imageFeedback')) || [];
    const selectedImage = JSON.parse(localStorage.getItem('selectedImage'));

    feedbackContainer.innerHTML = '';
    feedbacks.filter(feedback => feedback.imageSrc === selectedImage.src).forEach(feedback => {
        const feedbackItem = document.createElement('div');
        feedbackItem.classList.add('feedback-item', 'mb-3');
        feedbackItem.innerHTML = `
            <span class="badge badge-color">${feedback.userName}</span>
            <span>${feedback.feedback}</span>`;
        feedbackContainer.appendChild(feedbackItem);
    });
}
// this