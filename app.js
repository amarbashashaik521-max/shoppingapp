const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        category: "Electronics",
        price: 1499,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
    },
    {
        id: 2,
        name: "Smart Watch",
        category: "Electronics",
        price: 2499,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
    },
    {
        id: 3,
        name: "Casual T-Shirt",
        category: "Fashion",
        price: 799,
        image: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_750,h_750/global/687093/01/mod01/fnd/IND/fmt/png/Men's-Slim-Fit-Polo-T-shirt"
    },
    {
        id: 4,
        name: "Running Shoes",
        category: "Fashion",
        price: 1999,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
    },
    {
        id: 5,
        name: "Table Lamp",
        category: "Home",
        price: 949,
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c"
    },
    {
        id: 6,
        name: "Coffee Mug",
        category: "Home",
        price: 399,
        image: "https://static-assets-prod.fnp.com/images/pr/l/v20250122234634/aquarius-magic-mug_1.jpg"
    },
    {
        id: 7,
        name: "Backpack",
        category: "Accessories",
        price: 1249,
        image: "https://koala.sh/api/image/v2-7l0kz-t2vwn.jpg?width=1216&height=832&dream"
    },
    {
        id: 8,
        name: "Sunglasses",
        category: "Accessories",
        price: 699,
        image: "https://sunglassbd.com/wp-content/uploads/2025/01/sunglasses-dhaka.jpg"
    }
];


let cart = JSON.parse(localStorage.getItem("shopEaseCart")) || [];

const productContainer = document.getElementById("product-container");
const searchInput = document.getElementById("search-input");
const categoryButtons = document.querySelectorAll(".category-button");

const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const checkoutButton = document.getElementById("checkout-button");



function displayProducts(productList) {

    productContainer.innerHTML = "";

    if (productList.length === 0) {
        productContainer.innerHTML = "<p>No products found.</p>";
        return;
    }

    productList.forEach(product => {

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `
            <img src="${product.image}"
                 alt="${product.name}"
                 loading="lazy">

            <div class="product-info">

                <h3>${product.name}</h3>

                <p class="product-category">
                    ${product.category}
                </p>

                <p class="product-price">
                    ₹${product.price}
                </p>

                <button class="add-cart"
                        onclick="addToCart(${product.id})">
                    Add to Cart
                </button>

            </div>
        `;

        productContainer.appendChild(card);
    });
}



function addToCart(productId) {

    const product = products.find(item => item.id === productId);

    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }

    saveCart();

    displayCart();

    alert(`${product.name} added to cart!`);
}



function displayCart() {

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p id="empty-cart">
                Your cart is empty.
            </p>
        `;

        cartCount.textContent = "0";
        cartTotal.textContent = "₹0";

        return;
    }


    let total = 0;
    let count = 0;


    cart.forEach(item => {

        total += item.price * item.quantity;

        count += item.quantity;


        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";

        cartItem.innerHTML = `

            <div>
                <strong>${item.name}</strong>
                <p>₹${item.price}</p>
            </div>

            <div class="cart-controls">

                <button onclick="changeQuantity(${item.id}, -1)">
                    −
                </button>

                <span>${item.quantity}</span>

                <button onclick="changeQuantity(${item.id}, 1)">
                    +
                </button>

            </div>

            <button class="remove-item"
                    onclick="removeFromCart(${item.id})">
                Remove
            </button>
        `;

        cartItems.appendChild(cartItem);

    });


    cartCount.textContent = count;

    cartTotal.textContent = `₹${total}`;
}



function changeQuantity(productId, change) {

    const item = cart.find(item => item.id === productId);

    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {

        cart = cart.filter(item => item.id !== productId);

    }

    saveCart();

    displayCart();
}



function removeFromCart(productId) {

    cart = cart.filter(item => item.id !== productId);

    saveCart();

    displayCart();
}


function saveCart() {

    localStorage.setItem(
        "shopEaseCart",
        JSON.stringify(cart)
    );
}

searchInput.addEventListener("input", () => {

    const searchValue = searchInput.value.toLowerCase();

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchValue)
    );

    displayProducts(filteredProducts);
});


categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        categoryButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        const category = button.dataset.category;

        if (category === "All") {

            displayProducts(products);

        } else {

            const filteredProducts = products.filter(
                product => product.category === category
            );

            displayProducts(filteredProducts);
        }

    });

});


document.getElementById("cart-button").addEventListener("click", () => {

    document.getElementById("cart").scrollIntoView({
        behavior: "smooth"
    });

});


checkoutButton.addEventListener("click", () => {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }

    alert("Thank you for shopping with ShopEase!");

    cart = [];

    saveCart();

    displayCart();

});


displayProducts(products);

displayCart();
