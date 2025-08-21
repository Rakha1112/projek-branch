async function ambilData() {
  try {
    const response = await fetch("https://api.escuelajs.co/api/v1/products");
    const data = await response.json();
    const html = document.getElementById("data-product");
    data.forEach((post) => {
      const postElement = document.createElement(`div`);
      postElement.innerHTML = `<h1>${post.title}</h1>
                                      <h2>${post.price}</h2>
                                      <h2>${post.description}</h2>`;
      html.appendChild(postElement); // Ganti 'displayhtml' dengan 'html'
    });
  } catch (error) {
    console.error("Terjadi error", error);
  }
}
ambilData();
