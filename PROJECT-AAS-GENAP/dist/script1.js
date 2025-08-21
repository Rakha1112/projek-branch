const productList = document.getElementById("data-product");
const loadingSpinner = document.getElementById("loading-spinner");
const errorMessage = document.getElementById("error-message");
const cartCountElement = document.getElementById("cart-count");
const cartItemsList = document.getElementById("cart-items");
const cartEmptyMessage = document.getElementById("cart-empty");
const cartTotalSection = document.getElementById("cart-total-section");
const cartTotalElement = document.getElementById("cart-total");
const clearCartButton = document.getElementById("clear-cart-btn");

// Initialize currency formatter for robust currency display
const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

/**
 * Updates the display of the total number of items in the cart.
 */
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  cartCountElement.textContent = totalItems;
}

/**
 * Renders the items currently in the cart in the dedicated cart section.
 */
function renderCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartItemsList.innerHTML = ""; // Clear existing cart items
  let totalCartValue = 0;

  if (cart.length === 0) {
    cartEmptyMessage.classList.remove("hidden");
    cartTotalSection.classList.add("hidden");
    clearCartButton.classList.add("hidden");
  } else {
    cartEmptyMessage.classList.add("hidden");
    cartTotalSection.classList.remove("hidden");
    clearCartButton.classList.remove("hidden");

    cart.forEach((item) => {
      const itemSubtotal = item.price * item.qty;
      totalCartValue += itemSubtotal;

      const li = document.createElement("li");
      li.className =
        "flex justify-between items-center bg-gray-50 p-3 rounded-md shadow-sm";
      li.innerHTML = `
        <div class="flex-grow">
          <div class="font-semibold text-gray-800">${item.title}</div>
          <div class="text-sm text-gray-600">
            ${currencyFormatter.format(item.price)} x ${item.qty}
          </div>
        </div>
        <div class="flex items-center space-x-3">
          <button data-id="${
            item.id
          }" class="decrease-qty-btn bg-blue-100 text-blue-700 px-2 py-1 rounded-full hover:bg-blue-200 transition">
            <i class="fas fa-minus"></i>
          </button>
          <span class="font-bold text-gray-800">${item.qty}</span>
          <button data-id="${
            item.id
          }" class="increase-qty-btn bg-blue-100 text-blue-700 px-2 py-1 rounded-full hover:bg-blue-200 transition">
            <i class="fas fa-plus"></i>
          </button>
          <button data-id="${
            item.id
          }" class="remove-item-btn text-red-500 hover:text-red-700 transition">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      `;
      cartItemsList.appendChild(li);
    });

    cartTotalElement.textContent = currencyFormatter.format(totalCartValue);

    // Attach event listeners for quantity buttons and remove button
    document.querySelectorAll(".increase-qty-btn").forEach((button) => {
      button.addEventListener("click", (e) =>
        updateCartItemQuantity(e.currentTarget.dataset.id, 1)
      );
    });
    document.querySelectorAll(".decrease-qty-btn").forEach((button) => {
      button.addEventListener("click", (e) =>
        updateCartItemQuantity(e.currentTarget.dataset.id, -1)
      );
    });
    document.querySelectorAll(".remove-item-btn").forEach((button) => {
      button.addEventListener("click", (e) =>
        removeCartItem(e.currentTarget.dataset.id)
      );
    });
  }
  updateCartCount(); // Ensure the header cart count is also updated
}

/**
 * Adds a product to the cart or increments its quantity if it already exists.
 * @param {Object} product - The product object to add.
 */
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingItemIndex = cart.findIndex((item) => item.id === product.id);

  if (existingItemIndex > -1) {
    cart[existingItemIndex].qty += 1;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      qty: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.title} telah ditambahkan ke keranjang!`);
  renderCart(); // Re-render the cart display
}

/**
 * Updates the quantity of a specific item in the cart.
 * @param {string} productId - The ID of the product.
 * @param {number} change - The amount to change the quantity by (+1 or -1).
 */
function updateCartItemQuantity(productId, change) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const itemIndex = cart.findIndex(
    (item) => String(item.id) === String(productId)
  );

  if (itemIndex > -1) {
    cart[itemIndex].qty += change;
    if (cart[itemIndex].qty <= 0) {
      // Remove item if quantity drops to 0 or below
      cart.splice(itemIndex, 1);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart(); // Re-render the cart display
  }
}

/**
 * Removes an item completely from the cart.
 * @param {string} productId - The ID of the product to remove.
 */
function removeCartItem(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const initialLength = cart.length;
  cart = cart.filter((item) => String(item.id) !== String(productId));

  if (cart.length < initialLength) {
    // Check if item was actually removed
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart(); // Re-render the cart display
  }
}

/**
 * Clears all items from the cart.
 */
function clearCart() {
  if (confirm("Apakah Anda yakin ingin mengosongkan keranjang?")) {
    localStorage.removeItem("cart");
    renderCart(); // Re-render the cart display
    alert("Keranjang telah dikosongkan.");
  }
}

/**
 * Fetches products from the API and displays them.
 */
async function fetchProducts() {
  loadingSpinner.classList.remove("hidden");
  errorMessage.classList.add("hidden");
  productList.innerHTML = ""; // Clear previous products

  try {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const products = await response.json();

    products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = `
        bg-white rounded-lg shadow-lg overflow-hidden card-hover
        flex flex-col
      `;
      productCard.innerHTML = `
        <img
          src="${product.image}"
          alt="${product.title}"
          class="w-full h-48 object-contain p-4 bg-white"
        />
        <div class="p-5 flex flex-col flex-grow">
          <h2 class="text-xl font-semibold text-gray-800 mb-2 truncate" title="${
            product.title
          }">
            ${product.title}
          </h2>
          <p class="text-sm text-gray-500 mb-2 capitalize">${
            product.category
          }</p>
          <p class="text-gray-700 text-sm scrollable-description mb-3 flex-grow">
            ${product.description}
          </p>
          <div class="mt-auto">
            <p class="text-2xl font-bold text-blue-700 mb-4">
              ${currencyFormatter.format(product.price)}
            </p>
            <button
              data-product='${JSON.stringify(product)}'
              class="add-to-cart-btn w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700
              transition duration-300 flex items-center justify-center text-lg font-medium"
            >
              <i class="fas fa-cart-plus mr-2"></i> Tambahkan ke Keranjang
            </button>
          </div>
        </div>
      `;
      productList.appendChild(productCard);
    });

    // Attach event listeners to newly created "Add to Cart" buttons
    document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
      button.addEventListener("click", (event) => {
        const productData = JSON.parse(event.currentTarget.dataset.product);
        addToCart(productData);
      });
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    errorMessage.classList.remove("hidden");
  } finally {
    loadingSpinner.classList.add("hidden");
  }
}

// Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  fetchProducts(); // Load products when the page loads
  renderCart(); // Render cart items when the page loads
});

clearCartButton.addEventListener("click", clearCart);
