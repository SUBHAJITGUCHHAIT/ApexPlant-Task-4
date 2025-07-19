document.addEventListener('DOMContentLoaded', () => {

    const products = [
        { id: 1, name: 'Wireless Headphones', category: 'electronics', price: 999, rating: 4.5, image: 'https://tse3.mm.bing.net/th/id/OIP.eJ2rx1tL9H4tNPlT9ber4gHaHa?rs=1&pid=ImgDetMain&o=7&rm=3' },
        { id: 2, name: 'The Great Novel', category: 'books', price: 450, rating: 4.8, image: 'https://m.media-amazon.com/images/I/51ufb-Zdm1L.jpg' },
        { id: 3, name: 'Casual T-Shirt', category: 'clothing', price: 250, rating: 4.2, image: 'https://th.bing.com/th/id/OIP.e_aZUvvDYFhznWqdQYmdlwHaHa?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3' },
        { id: 4, name: 'Smartwatch', category: 'electronics', price: 1499, rating: 4.7, image: 'https://tse2.mm.bing.net/th/id/OIP.V3-X70O2B4DdbiMNZPKLRAHaE5?w=1800&h=1190&rs=1&pid=ImgDetMain&o=7&rm=3' },
        { id: 5, name: 'Cookbook', category: 'books', price: 275, rating: 4.1, image: 'https://m.media-amazon.com/images/I/91NI5c3nsRL._SL1500_.jpg' },
        { id: 6, name: 'Denim Jeans', category: 'clothing', price: 650, rating: 4.6, image: 'https://tse3.mm.bing.net/th/id/OIP.m_IhabFMCEA-N_MCQt5RfAHaLH?rs=1&pid=ImgDetMain&o=7&rm=3' },
        { id: 7, name: 'Bluetooth Speaker', category: 'electronics', price: 750, rating: 4.3, image: 'https://tse2.mm.bing.net/th/id/OIP.B2z4-YZBRzPdW2Gr_7oBPwHaEg?rs=1&pid=ImgDetMain&o=7&rm=3' },
        { id: 8, name: 'Science Fiction Epic', category: 'books', price: 185, rating: 4.9, image: 'https://th.bing.com/th/id/OIP.hvGHw2fnZ3UP8X4otNl7FwHaEK?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3' },
        { id: 9, name: 'Winter Jacket', category: 'clothing', price: 899, rating: 4.0, image: 'https://thursdayboots.com/cdn/shop/files/1024x1024-Mens-Jackets-Bomber-Black-091423-1_1200x1200_crop_center.jpg?v=1695059193' },
        { id: 10, name: 'Gaming Mouse', category: 'electronics', price: 550, rating: 4.4, image: 'https://tse2.mm.bing.net/th/id/OIP.-2Mxz9NHTd7n1BSn9C4qYQHaHa?w=640&h=640&rs=1&pid=ImgDetMain&o=7&rm=3' },
    ];

    const productGrid = document.getElementById('productGrid');
    const categoryFilter = document.getElementById('categoryFilter');
    const priceSort = document.getElementById('priceSort');
    const priceRangeInput = document.getElementById('priceRange');
    const applyFiltersBtn = document.getElementById('applyFiltersBtn');

    function renderProducts(filteredProducts) {
        productGrid.innerHTML = ''; // Clear current grid
        if (filteredProducts.length === 0) {
            productGrid.innerHTML = '<p style="text-align: center; grid-column: 1 / -1; color: #666;">No products found matching your criteria.</p>';
            return;
        }
        filteredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="price">₹${product.price.toFixed(2)}</p>
                <p class="rating">Rating: ${product.rating} / 5</p>
            `;
            productGrid.appendChild(productCard);
        });
    }

    function applyFiltersAndSort() {
        let currentProducts = [...products]; 

        const selectedCategory = categoryFilter.value;
        if (selectedCategory !== 'all') {
            currentProducts = currentProducts.filter(product => product.category === selectedCategory);
        }

        const maxPrice = parseFloat(priceRangeInput.value);
        if (!isNaN(maxPrice)) {
            currentProducts = currentProducts.filter(product => product.price <= maxPrice);
        }

        const sortCriteria = priceSort.value;
        if (sortCriteria === 'price-asc') {
            currentProducts.sort((a, b) => a.price - b.price);
        } else if (sortCriteria === 'price-desc') {
            currentProducts.sort((a, b) => b.price - a.price);
        } else if (sortCriteria === 'rating-desc') {
            currentProducts.sort((a, b) => b.rating - a.rating);
        }

        renderProducts(currentProducts);
    }

    applyFiltersBtn.addEventListener('click', applyFiltersAndSort);
    categoryFilter.addEventListener('change', applyFiltersAndSort);
    priceSort.addEventListener('change', applyFiltersAndSort);
    let typingTimer;
    const doneTypingInterval = 500; 
    priceRangeInput.addEventListener('keyup', () => {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(applyFiltersAndSort, doneTypingInterval);
    });
    priceRangeInput.addEventListener('keydown', () => {
        clearTimeout(typingTimer);
    });
    applyFiltersAndSort(); 
});