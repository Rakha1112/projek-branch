document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formdata");
  const productList = document.getElementById("product-list");
  let products = [];
  let productId = 1;

  // Initialize product ID
  document.getElementById("id_produk").value = `MD-${productId
    .toString()
    .padStart(3, "0")}`;

  // Handle form submission
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Collect form data
    const id_produk = document.getElementById("id_produk").value;
    const nama_produk = document.getElementById("nama_produk").value;
    const harga_produk = parseFloat(
      document.getElementById("harga_produk").value
    ).toFixed(2);
    const satuan_produk = document.getElementById("satuan_produk").value;
    const kategori_produk = document.getElementById("kategori_produk").value;
    const stock_produk = document.getElementById("stock_produk").value;
    const gambar_produk = document.getElementById("gambar_produk").value;
    const stock_awal = parseInt(document.getElementById("stock_awal").value);

    // Validation
    if (
      !nama_produk ||
      !harga_produk ||
      !satuan_produk ||
      !kategori_produk ||
      !stock_produk ||
      !gambar_produk ||
      !stock_awal
    ) {
      alert("All fields are required!");
      return;
    }

    // Create new product object
    const newProduct = {
      id_produk,
      nama_produk,
      harga_produk,
      satuan_produk,
      kategori_produk,
      stock_produk,
      gambar_produk,
      stock_awal,
    };

    // Add product to list and increment ID
    products.push(newProduct);
    productId++;

    // Reset form and update product ID
    form.reset();
    document.getElementById("id_produk").value = `MD-${productId
      .toString()
      .padStart(3, "0")}`;

    // Render updated product list
    renderProducts();
  });

  // Render products to table
  function renderProducts() {
    productList.innerHTML = "";

    products.forEach((product, index) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${product.id_produk}</td>
        <td>${product.nama_produk}</td>
        <td>${product.harga_produk}</td>
        <td>${product.satuan_produk}</td>
        <td>${product.kategori_produk}</td>
        <td>${product.stock_produk}</td>
        <td><img src="${product.gambar_produk}" alt="${
        product.nama_produk
      }" style="width: 50px; height: auto;"></td>
        <td class="${product.stock_awal < 5 ? 'red' : ''}">${product.stock_awal}</td>
        <td>
          <button onclick="editProduct(${index})">Edit</button>
          <button onclick="deleteProduct(${index})">Delete</button>
        </td>
      `;
      productList.appendChild(row);
    });
  }

  // Edit product (Not yet implemented)
  window.editProduct = function (index) {
    alert("Edit functionality not implemented yet.");
  };

  // Delete product
  window.deleteProduct = function (index) {
    if (confirm("Are you sure you want to delete this product?")) {
      products.splice(index, 1);
      renderProducts();
    }
  };
});
