// landing_page.js

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const loginMessage = document.getElementById("loginMessage");
  const registerMessage = document.getElementById("registerMessage");
  const shopNowBtn = document.getElementById("shopNowBtn");

  // Mengarahkan ke homepage jika tombol "Belanja Sekarang" diklik
  shopNowBtn.addEventListener("click", () => {
    window.location.href = "login.html";
  });

  // Menangani pendaftaran pengguna baru
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Mencegah pengiriman formulir default

    const username = document.getElementById("registerUsername").value;
    const password = document.getElementById("registerPassword").value;

    // Mendapatkan pengguna yang ada dari Local Storage
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Memeriksa apakah nama pengguna sudah ada
    if (users.some((user) => user.username === username)) {
      registerMessage.textContent = "Nama pengguna sudah terdaftar!";
      registerMessage.classList.remove("text-green-500");
      registerMessage.classList.add("text-red-500");
      return;
    }

    // Menambahkan pengguna baru ke array
    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users)); // Menyimpan pengguna di Local Storage

    registerMessage.textContent = "Pendaftaran berhasil! Silakan masuk.";
    registerMessage.classList.remove("text-red-500");
    registerMessage.classList.add("text-green-500");

    // Opsional: Langsung arahkan ke homepage setelah pendaftaran
    // localStorage.setItem('loggedInUser', JSON.stringify({ username }));
    // window.location.href = 'homepage.html';
  });

  // Menangani proses masuk pengguna
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Mencegah pengiriman formulir default

    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Mencari pengguna dengan kredensial yang cocok
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      localStorage.setItem("loggedInUser", JSON.stringify({ username })); // Menyimpan status masuk
      loginMessage.textContent = "Masuk berhasil! Mengarahkan ke beranda...";
      loginMessage.classList.remove("text-red-500");
      loginMessage.classList.add("text-green-500");
      setTimeout(() => {
        window.location.href = "homepage.html"; // Mengarahkan ke homepage
      }, 1000);
    } else {
      loginMessage.textContent = "Nama pengguna atau kata sandi salah.";
      loginMessage.classList.remove("text-green-500");
      loginMessage.classList.add("text-red-500");
    }
  });
});

landingpage.js;
