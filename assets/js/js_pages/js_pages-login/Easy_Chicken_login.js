document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.getElementById('gallery');
    const sharedImages = JSON.parse(localStorage.getItem('sharedImagesQuickEasy_Easy Chicken')) || []; // Change the key as needed

    if (sharedImages.length > 0) {
        sharedImages.forEach((image, index) => {
            const newImage = document.createElement('div');
            newImage.classList.add('col-md-4', 'mb-4');
            newImage.innerHTML = `
            <div class="row">
                <div class="col">
                    <div class="card Featured__card">
                        <div class="icon-container_l ">
                        <i class="bi bi-heart-fill love-icon fs-3 Featured__love" onclick="toggleFavorite(this)"></i>
                        </div>
                        <img src="${image.src}" alt="" class="rounded-img_new" width="100%" height="225">
                        <div class="card-body">
                            <h3 class="mt-2">${image.title}</h3>
                            <p class="card-text" id="description-${index}">
                                ${image.description.length > 20 ? image.description.substring(0, 20) + '... <a href="open/Easy_Chicken-login_open.html" onclick="showMore(${index})">see more</a>' : image.description}
                            </p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="group">
                                    <p class="fs-6 fw-light">${image.category}</p>
                                    <p class="fs-6 fw-light">${image.subcategory}</p>
                                </div>
                                <h5 class="text-body-secondary">$${image.price}</h5>
                            </div>
                            <button class="btn btn-sm btn-outline-secondary" onclick="openImage(${index})">view</button>
                        </div>
                    </div>
                </div>
            </div>
           `;
            gallery.appendChild(newImage);

            window.showMore = function(index) {
                const descriptionElement = document.getElementById(`description-${index}`);
                descriptionElement.innerHTML = sharedImages[index].description;
            }

            window.openImage = function(index) {
                localStorage.setItem('selectedImage', JSON.stringify(sharedImages[index]));
                window.location.href = 'open/Easy_Chicken-login_open.html';
            }
        });
    } else {
        gallery.innerHTML = '<p>No Recipes shared yet.</p>';
    }
});


