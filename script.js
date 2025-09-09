

const urlAllPlants = "https://openapi.programming-hero.com/api/plants";
const UrlAllCategories = "https://openapi.programming-hero.com/api/categories";

let activeCategoryElement = null;
let cart = [];






async function allTreePlantsLoad(categoryName = "All Trees") {
    const container = document.getElementById("tree-products-list");
    const loading = document.getElementById("loading-spinner");

    loading.classList.remove("hidden");
    container.innerHTML = "";

    try {
        const res = await fetch(urlAllPlants);
        const data = await res.json();
        const allPlants = data.plants || [];

        let plantsToDisplay = allPlants;
        if (categoryName !== "All Trees") {
            plantsToDisplay = allPlants.filter(p => p.category === categoryName);
        }

        if (!plantsToDisplay || plantsToDisplay.length === 0) {
            container.innerHTML = `<p class="text-red-500 font-semibold">No plants found for this category.</p>`;
            return;
        }

        // Build cards
        const plantsHTML = plantsToDisplay.map(p => `
            <div class="bg-white rounded-xl shadow p-4 flex flex-col" 
                data-plant-name="${p.name}" 
                data-plant-price="${p.price}" 
                data-plant-desc="${p.description}" 
                data-plant-image="${p.image}"
                data-plant-category="${p.category}">
                <img src="${p.image}" alt="${p.name}" class="h-[180px] w-full object-cover rounded mb-2">
                <h3 class="mt-4 font-semibold text-green-900 cursor-pointer modal-trigger">${p.name}</h3>
                <p class="text-sm text-gray-600">${p.description}</p>
                <div class="flex justify-between items-center mt-2 text-sm">
                    <span class="px-2 py-1 bg-green-100 text-green-700 rounded">${p.category}</span>
                    <span class="font-semibold mt-3">৳${p.price}</span>
                </div>
                <button class="add-to-cart-btn mt-3 bg-green-600 text-white py-2 rounded hover:bg-green-700">Add to Cart</button>
            </div>
        `).join("");

        container.innerHTML = plantsHTML;

        document.querySelectorAll('.modal-trigger').forEach(title => {
            title.addEventListener('click', (e) => {
                const plantElement = e.target.closest('[data-plant-name]');
                openPlantModal(plantElement);
            });
        });

        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const plantElement = event.target.closest('[data-plant-name]');
                const plant = {
                    name: plantElement.dataset.plantName,
                    price: parseFloat(plantElement.dataset.plantPrice)
                };
                handleAddToCart(plant);
            });
        });

    } catch (err) {
        container.innerHTML = `<p class="text-red-500 font-semibold">Failed to load plants. Try again later.</p>`;
        console.error("Error loading plants:", err);
    } finally {
        loading.classList.add("hidden");
    }
}









async function loadCategories() {
    const categoryList = document.getElementById("category-list");
    categoryList.innerHTML = `<p class="text-gray-500">Loading...</p>`;

    try {
        const res = await fetch(UrlAllCategories);
        const data = await res.json();
        const categories = data.categories || [];

        if (categories.length === 0) {
            categoryList.innerHTML = `<p class="text-gray-500">No categories found.</p>`;
            return;
        }

        const allTreesCategory = { category_id: "all", category_name: "All Trees" };
        const allCategories = [allTreesCategory, ...categories];

        const categoryHTML = allCategories.map((cat) => {
            return `
                <li>
                    <a href="#" class="category-link block px-3 py-2 rounded" data-category-name="${cat.category_name}">
                        ${cat.category_name}
                    </a>
                </li>
            `;
        }).join("");

        categoryList.innerHTML = categoryHTML;

        document.querySelectorAll('.category-link').forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const selectedCategory = event.target.dataset.categoryName;
                filterAndSetActive(event.target, selectedCategory);
            });
        });

        const initialActiveLink = document.querySelector('.category-link[data-category-name="All Trees"]');
        if (initialActiveLink) {
            filterAndSetActive(initialActiveLink, "All Trees");
        }

    } catch (err) {
        categoryList.innerHTML = `<p class="text-red-500 font-semibold">Failed to load categories.</p>`;
        console.error("Error loading categories:", err);
    }
}









function filterAndSetActive(clickedElement, categoryName) {
    if (activeCategoryElement) {
        activeCategoryElement.classList.remove('bg-green-700', 'text-white');
        activeCategoryElement.classList.add('hover:bg-green-100');
    }

    clickedElement.classList.remove('hover:bg-green-100');
    clickedElement.classList.add('bg-green-700', 'text-white');

    activeCategoryElement = clickedElement;

    allTreePlantsLoad(categoryName);
}






function updateCartDisplay() {
    const cartList = document.getElementById("cart-items");
    const totalElement = document.querySelector('.mt-4.font-bold');

    cartList.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        total += item.price;
        const li = document.createElement('li');
        li.className = 'flex justify-between items-center p-4 bg-green-50 rounded-md';
        li.innerHTML = `
            <div>
                <p>${item.name}</p>
                <span>৳${item.price} × 1</span>
            </div>
            <button class="remove-btn text-red-600" data-plant-name="${item.name}">Remove</button>
        `;
        cartList.appendChild(li);
    });

    totalElement.textContent = `Total: ৳${total}`;

    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', handleRemoveFromCart);
    });
}

function handleAddToCart(plant) {
    cart.push(plant);
    updateCartDisplay();
}

function handleRemoveFromCart(event) {
    const plantName = event.target.dataset.plantName;
    cart = cart.filter(item => item.name !== plantName);
    updateCartDisplay();
}







//  modal

function openPlantModal(plantElement) {
    const name = plantElement.dataset.plantName;
    const image = plantElement.dataset.plantImage;
    const category = plantElement.dataset.plantCategory;
    const price = plantElement.dataset.plantPrice;
    const desc = plantElement.dataset.plantDesc;

    document.getElementById("modal-title").textContent = name;
    document.getElementById("modal-image").src = image;
    document.getElementById("modal-category").textContent = `Category: ${category}`;
    document.getElementById("modal-price").textContent = `Price: ৳${price}`;
    document.getElementById("modal-desc").textContent = `Description: ${desc}`;
  

    document.getElementById("plant_modal").checked = true;
}




loadCategories();
allTreePlantsLoad();
