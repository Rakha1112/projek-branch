// homepage.js — fitur keranjang dan checkout sudah lengkap

document.addEventListener("DOMContentLoaded", () => {
    const userData = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!userData || !userData.username) {
      window.location.href = "landingpage.html";
      return;
    }
  
    document.getElementById("profile").innerText = userData.username;
  
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((products) => {
        window.products = products;
        displayProducts(products);
      })
      .catch((error) => console.error("Gagal mengambil produk:", error));
  
    document.getElementById("searchBar").addEventListener("input", (e) => {
      const keyword = e.target.value.toLowerCase();
      const filtered = window.products.filter((p) =>
        p.title.toLowerCase().includes(keyword)
      );
      displayProducts(filtered);
    });
  
    document.getElementById("closeModal")?.addEventListener("click", () => {
      document.getElementById("productModal").classList.add("hidden");
    });
  
    document.getElementById("closeCartModal")?.addEventListener("click", () => {
      document.getElementById("cartModal").classList.add("hidden");
    });
  
    document.getElementById("cartBtn")?.addEventListener("click", showCart);
  
    document.getElementById("checkoutBtn")?.addEventListener("click", () => {
      localStorage.removeItem("cart");
      alert("Checkout berhasil! Terima kasih sudah berbelanja.");
      document.getElementById("cartModal").classList.add("hidden");
    });
  });
  
  function displayProducts(products) {
    const container = document.getElementById("productGrid");
    container.innerHTML = "";
  
    products.forEach((product) => {
      const card = document.createElement("div");
      card.className =
        "bg-white p-4 shadow hover:shadow-lg rounded cursor-pointer transition";
      card.innerHTML = `
        <img src="${product.image}" class="h-32 w-full object-contain mb-2" />
        <h4 class="font-semibold text-sm truncate mb-1">${product.title}</h4>
        <p class="text-green-600 font-bold">$${product.price}</p>
      `;
      card.addEventListener("click", () => showModal(product));
      container.appendChild(card);
    });
  }
  
  function showModal(product) {
    document.getElementById("modalImage").src = product.image;
    document.getElementById("modalTitle").innerText = product.title;
    document.getElementById("modalDescription").innerText = product.description;
    document.getElementById("modalPrice").innerText = $${product.price};
    document.getElementById("productModal").classList.remove("hidden");
  
    let btn = document.getElementById("addToCartBtn");
    if (!btn) {
      btn = document.createElement("button");
      btn.id = "addToCartBtn";
      btn.textContent = "Tambah ke Keranjang";
      btn.className = "mt-4 bg-green-500 text-white px-4 py-2 rounded w-full";
      document.getElementById("productModal").appendChild(btn);
    }
  
    btn.onclick = () => addToCart(product);
  }
  
  function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      existing.quantity++;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Produk ditambahkan ke keranjang!");
    document.getElementById("productModal").classList.add("hidden");
  }
  
  function showCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const container =
      document.getElementById("cartItems") || createCartElements();
    const totalSpan =
      document.getElementById("cartTotal") || createTotalElements();
  
    container.innerHTML = "";
    let total = 0;
  
    cart.forEach((item, index) => {
      total += item.price * item.quantity;
      const div = document.createElement("div");
      div.className = "flex justify-between items-center mb-2 border-b pb-2";
      div.innerHTML = `
        <div>
          <p class="font-semibold">${item.title}</p>
          <p class="text-sm">$${item.price} x ${item.quantity}</p>
        </div>
        <div class="flex gap-2">
          <button onclick="updateQty(${index}, -1)" class="px-2 bg-gray-200">-</button>
          <button onclick="updateQty(${index}, 1)" class="px-2 bg-gray-200">+</button>
          <button onclick="removeItem(${index})" class="px-2 bg-red-500 text-white">x</button>
        </div>
      `;
      container.appendChild(div);
    });
  
    totalSpan.innerText = $${total.toFixed(2)};
    document.getElementById("cartModal").classList.remove("hidden");
  }
  
  function updateQty(index, change) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    showCart();
  }
  
  function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    showCart();
  }
  
  // Fallback HTML jika elemen belum ada (untuk debugging/testing)
  function createCartElements() {
    const cartModal = document.createElement("div");
    cartModal.id = "cartModal";
    cartModal.className =
      "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";
    cartModal.innerHTML = `
      <div class="bg-white p-6 rounded-lg w-full max-w-2xl relative">
        <button id="closeCartModal" class="absolute top-2 right-2 text-red-500 text-xl">×</button>
        <h2 class="text-xl font-bold mb-4">Keranjang Belanja</h2>
        <div id="cartItems" class="mb-4"></div>
        <div class="flex justify-between items-center">
          <span class="font-semibold text-lg">Total: <span id="cartTotal">$0</span></span>
          <button id="checkoutBtn" class="bg-blue-500 text-white px-4 py-2 rounded">Checkout</button>
        </div>
      </div>
    `;
    document.body.appendChild(cartModal);
    document.getElementById("closeCartModal").onclick = () =>
      cartModal.classList.add("hidden");
    document.getElementById("checkoutBtn").onclick = () => {
      localStorage.removeItem("cart");
      alert("Checkout berhasil! Terima kasih sudah berbelanja.");
      cartModal.classList.add("hidden");
    };
    return document.getElementById("cartItems");
  }
  
  function createTotalElements() {
    return document.getElementById("cartTotal") || document.createElement("span");
  }
  
  
  homepage.js