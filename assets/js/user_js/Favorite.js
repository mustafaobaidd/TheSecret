document.addEventListener('DOMContentLoaded', function() {
    const favoriteGallery = document.getElementById('favoriteGallery');
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    const urlMap = {
        "Easy Chicken": "Easy_Chicken-login_open.html",
        "Easy Healthy": "Easy_Healthy-login_open.html",
        "Easy Pastas": "Easy_Pastas-login_open.html",
        "Quick Dinners": "Quick_Dinners-login_open.html",
        "Vegetarian": "Quick_Vegetarian-login_open.html",
        "High Protein Diet": "High_Protein_Diet-login_open.html",
        "Keto Diet": "Keto_Diet-login_open.html",
        "Low Carb Diet": "Low_Carb_Diet-login_open.html",
        "Vegan Diet": "Vegan_Diet-login_open.html",
        "Vegetarian Diet": "Vegetarian_Diet-login_open.html"
    };

    if (favorites.length > 0) {
        favorites.forEach((item, index) => {
            const normalizedSubcategory = item.subcategory.replace(/ & /g, ' ').replace(/\s+/g, ' ').trim();
            const pageUrl = urlMap[normalizedSubcategory] || 'default-login_open.html';

            const favoriteElement = document.createElement('div');
            favoriteElement.classList.add('col-md-4', 'mb-4');
            favoriteElement.innerHTML = `
            <div class="row">
                <div class="col">
                    <div class="card Featured__card">
                        <img src="${item.imageSrc}" alt="" class="rounded-img_new" width="100%" height="225">
                        <div class="card-body">
                            <h3 class="mt-2">${item.title}</h3>
                            <p class="card-text" id="description-${index}">
                                ${item.description.length > 20 ? `${item.description.substring(0, 20)}... <a href="/header_pages/login_pages/open/${pageUrl}" onclick="storeDescription(${index})">see more</a>` : item.description}
                            </p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="group">
                                    <p class="fs-6 fw-light">${item.category}</p>
                                    <p class="fs-6 fw-light">${item.subcategory}</p>
                                </div>
                                <h5 class="text-body-secondary">${item.price}</h5>
                            </div>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="icon-container_r">
                                    <i class="bi bi-trash-fill remove-icon remove-icon_hover fs-3" onclick="removeFavorite(this)"></i>
                                </div>
                                <button class="btn btn-sm btn-outline-secondary ms-auto" onclick="openImage(${index})">view</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
            favoriteGallery.appendChild(favoriteElement);
        });
    } else {
        favoriteGallery.innerHTML = '<p>No favorites selected yet.</p>';
    }

    window.storeDescription = function(index) {
        const selectedItem = favorites[index];
        localStorage.setItem('selectedImage', JSON.stringify({
            src: selectedItem.imageSrc,
            title: selectedItem.title,
            description: selectedItem.description,
            price: selectedItem.price,
            category: selectedItem.category,
            subcategory: selectedItem.subcategory
        }));
    };

    window.openImage = function(index) {
        storeDescription(index);
        const selectedItem = favorites[index];
        const normalizedSubcategory = selectedItem.subcategory.replace(/ & /g, ' ').replace(/\s+/g, ' ').trim();
        const page = urlMap[normalizedSubcategory] || 'default-login_open.html';
        window.location.href = `/header_pages/login_pages/open/${page}`;
    };
});

// removeFavorite
function removeFavorite(icon) {
    const card = icon.closest('.card');
    const imageSrc = card.querySelector('img').src;
    card.parentElement.removeChild(card);

    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(item => item.imageSrc !== imageSrc);
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// this

