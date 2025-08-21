
/**
 * Update cart display
 */
function updateCartDisplay() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  const cartTotal = document.getElementById("cart-total");
  const cartEmpty = document.getElementById("cart-empty");
  const cartTotalSection = document.getElementById("cart-total-section");

  // Update cart count
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  cartCount.textContent = totalItems;

  // Clear cart items
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartEmpty.style.display = "block";
    cartTotalSection.classList.add("hidden");
  } else {
    cartEmpty.style.display = "none";
    cartTotalSection.classList.remove("hidden");

    let total = 0;

    cart.forEach((item) => {
      const itemTotal = item.price * item.qty;
      total += itemTotal;

      const listItem = document.createElement("li");
      listItem.className =
        "flex items-center justify-between bg-gray-50 p-4 rounded-lg";
      listItem.innerHTML = `
          <div class="flex items-center space-x-3">
            <div class="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
              <i class="${item.image} text-white"></i>
            </div>
            <div>
              <h4 class="font-semibold text-gray-800">${item.title}</h4>
              <p class="text-gray-600 text-sm">${currencyFormatter.format(
                item.price
              )} x ${item.qty}</p>
            </div>
          </div>
          
          <div class="flex items-center space-x-3">
            <div class="flex items-center space-x-2">
              <button onclick="updateQuantity(${
                item.id
              }, -1)" class="w-8 h-8 bg-gray-300 rounded-full text-sm hover:bg-gray-400 transition-colors">-</button>
              <span class="font-semibold w-8 text-center">${item.qty}</span>
              <button onclick="updateQuantity(${
                item.id
              }, 1)" class="w-8 h-8 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600 transition-colors">+</button>
            </div>
            
            <div class="text-right">
              <div class="font-bold text-blue-600">${currencyFormatter.format(
                itemTotal
              )}</div>
              <button onclick="removeFromCart(${
                item.id
              })" class="text-red-500 hover:text-red-700 text-sm">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        `;
      cartItemsContainer.appendChild(listItem);
    });

    cartTotal.textContent = currencyFormatter.format(total);
  }
}

// Initialize app
document.addEventListener("DOMContentLoaded", function () {
  loadProducts();
  updateCartDisplay();
});
// Global variables
let cart = [];
let isProcessingPayment = false;

// Initialize a currency formatter for robust currency display
const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

// Hide loading screen when page is loaded
window.addEventListener("load", function () {
  setTimeout(() => {
    document.getElementById("loading-screen").style.display = "none";
  }, 1000);
});

/**
 * Creates sample cart data for demonstration
 */
function createSampleData() {
  const sampleCart = [
    { title: "Smartphone Samsung Galaxy", price: 599.99, qty: 1 },
    { title: "Laptop ASUS VivoBook", price: 899.99, qty: 1 },
    { title: "Headphone Sony WH-1000XM4", price: 349.99, qty: 2 },
  ];
  return sampleCart;
}

/**
 * Loads items and displays them on the checkout page.
 */
function loadCheckout() {
  // Use sample data since localStorage is not available
  cart = createSampleData();

  const checkoutList = document.getElementById("checkout-items");
  const checkoutTotalElement = document.getElementById("checkout-total");
  const subtotalElement = document.getElementById("subtotal");
  const taxAmountElement = document.getElementById("tax-amount");
  const itemCountElement = document.getElementById("item-count");

  let subtotal = 0;

  // Clear any existing items before loading new ones
  checkoutList.innerHTML = "";

  // Update item count
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  itemCountElement.textContent = `${totalItems} item${
    totalItems !== 1 ? "s" : ""
  }`;

  // Iterate over each item in the cart to display it
  if (cart.length === 0) {
    checkoutList.innerHTML = `
            <li class="text-center text-gray-500 text-lg py-8 bg-gray-50 rounded-lg">
              <i class="fas fa-shopping-cart text-4xl mb-4 text-gray-300"></i>
              <div>Keranjang Anda kosong</div>
              <div class="text-sm mt-2">Silakan tambahkan item ke keranjang terlebih dahulu</div>
            </li>
          `;
  } else {
    cart.forEach((item, index) => {
      const itemSubtotal = item.price * item.qty;
      subtotal += itemSubtotal;

      const listItem = document.createElement("li");
      listItem.className =
        "flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-50 p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow animate-fade-in";
      listItem.style.animationDelay = `${index * 0.1}s`;

      listItem.innerHTML = `
              <div class="flex-1 mb-3 sm:mb-0">
                <div class="font-bold text-gray-800 text-lg mb-1">${
                  item.title
                }</div>
                <div class="text-gray-600 text-sm">
                  <span class="inline-flex items-center mr-4">
                    <i class="fas fa-cube mr-1"></i>
                    Jumlah: ${item.qty}
                  </span>
                  <span class="inline-flex items-center">
                    <i class="fas fa-tag mr-1"></i>
                    Harga: ${currencyFormatter.format(item.price)}
                  </span>
                </div>
              </div>
              <div class="flex items-center space-x-3">
                <div class="text-right">
                  <div class="font-bold text-lg text-blue-600">
                    ${currencyFormatter.format(itemSubtotal)}
                  </div>
                </div>
                <button onclick="removeItem(${index})" class="text-red-500 hover:text-red-700 transition-colors p-2">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </div>
            `;
      checkoutList.appendChild(listItem);
    });
  }

  // Calculate tax (10%)
  const taxAmount = subtotal * 0.1;
  const totalAmount = subtotal + taxAmount;

  // Update the amounts displayed
  subtotalElement.textContent = currencyFormatter.format(subtotal);
  taxAmountElement.textContent = currencyFormatter.format(taxAmount);
  checkoutTotalElement.textContent = currencyFormatter.format(totalAmount);

  // Enable/disable pay button based on cart contents
  const payButton = document.getElementById("pay-button");
  if (cart.length === 0) {
    payButton.disabled = true;
    payButton.classList.add("opacity-50", "cursor-not-allowed");
    payButton.classList.remove("hover:scale-105");
  } else {
    payButton.disabled = false;
    payButton.classList.remove("opacity-50", "cursor-not-allowed");
    payButton.classList.add("hover:scale-105");
  }
}

/**
 * Removes an item from the cart
 */
function removeItem(index) {
  if (confirm("Apakah Anda yakin ingin menghapus item ini?")) {
    cart.splice(index, 1);
    loadCheckout();
  }
}

/**
 * Handles the payment process with enhanced UX
 */
function handlePayment() {
  if (isProcessingPayment || cart.length === 0) return;

  const payButton = document.getElementById("pay-button");
  const payButtonText = document.getElementById("pay-button-text");

  // Show processing state
  isProcessingPayment = true;
  payButton.disabled = true;
  payButton.classList.add("opacity-75");
  payButtonText.innerHTML =
    '<i class="fas fa-spinner fa-spin mr-2"></i>Memproses...';

  // Simulate payment processing
  setTimeout(() => {
    // Show success modal
    document.getElementById("success-modal").classList.remove("hidden");

    // Reset button state
    isProcessingPayment = false;
    payButton.disabled = false;
    payButton.classList.remove("opacity-75");
    payButtonText.innerHTML = '<i class="fas fa-lock mr-3"></i>Bayar Sekarang';
  }, 2000);
}

/**
 * Handles back to shopping
 */
function handleBackToShopping() {
  // Simulate navigation back to shopping page
  alert("Mengarahkan kembali ke halaman belanja...");
}

/**
 * Closes success modal and simulates redirect
 */
function closeSuccessModal() {
  document.getElementById("success-modal").classList.add("hidden");
  cart = []; // Clear cart
  loadCheckout(); // Refresh display
  alert("Mengarahkan ke halaman utama...");
}

// Event listeners
document.addEventListener("DOMContentLoaded", function () {
  loadCheckout();

  document
    .getElementById("pay-button")
    .addEventListener("click", handlePayment);
  document
    .getElementById("back-button")
    .addEventListener("click", handleBackToShopping);
  document
    .getElementById("close-modal")
    .addEventListener("click", closeSuccessModal);

  // Add hover effects to payment method options
  const paymentOptions = document.querySelectorAll('input[name="payment"]');
  paymentOptions.forEach((option) => {
    option.addEventListener("change", function () {
      // Remove selected class from all labels
      document.querySelectorAll("label").forEach((label) => {
        label.classList.remove("border-blue-400", "bg-blue-50");
      });

      // Add selected class to chosen option
      if (this.checked) {
        this.closest("label").classList.add("border-blue-400", "bg-blue-50");
      }
    });
  });

  // Set initial selected state
  const selectedPayment = document.querySelector(
    'input[name="payment"]:checked'
  );
  if (selectedPayment) {
    selectedPayment
      .closest("label")
      .classList.add("border-blue-400", "bg-blue-50");
  }
});

// Add some interactive animations
document.addEventListener("mouseover", function (e) {
  if (e.target.closest("button") && !e.target.closest("button").disabled) {
    e.target.closest("button").style.transform = "translateY(-2px)";
  }
});

document.addEventListener("mouseout", function (e) {
  if (e.target.closest("button")) {
    e.target.closest("button").style.transform = "translateY(0)";
  }
});
