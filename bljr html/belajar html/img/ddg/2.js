/reset feedback/;
var form = document.getElementById("formspree");

async function handleSubmit(event) {
  event.preventDefault();
  var data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        alert("Thanks"); // Menggunakan alert untuk sukses
        form.reset();
      } else {
        response.json().then((data) => {
          if (Object.hasOwn(data, "errors")) {
            alert(data["errors"].map((error) => error["message"]).join(", ")); // Menggunakan alert untuk menampilkan kesalahan
          } else {
            alert("Oops! There was a problem submitting your form"); // Menggunakan alert untuk kesalahan umum
          }
        });
      }
    })
    .catch((error) => {
      alert("Oops! There was a problem submitting your form"); // Menggunakan alert untuk kesalahan jaringan
    });
}

form.addEventListener("submit", handleSubmit);
