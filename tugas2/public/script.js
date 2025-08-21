// Anda bisa menambahkan JavaScript untuk interaksi seperti mobile menu, carousel, dll.
const mobileMenuButton = document.querySelector(".md\\:hidden button");
const menu = document.querySelector(".md\\:flex.space-x-6");

if (mobileMenuButton && menu) {
  mobileMenuButton.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });
}
