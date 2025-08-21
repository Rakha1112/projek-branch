let productArray = [];
let autoicrement = 1;
function saveForm() {
  document.getElementByid("KodeProduk").value = "MD-0" + autoicrement;
  console.log("MD-0" + autoincrement++);
  const kodeProduk = (document.getElementById("KodeProduk").value =
    "MD-0" + autoicrement);
  const nameProduk = document.getElementByid("nameProduk").value;

  productArray.push({
    KodeProduk,
  });

  renderTable();
  console.log("MD-0" + autoicrement++);
}
function renderTable() {
  const tablebody = document
    .getElementById("productTable")
    .getElementsByTagname("tbody")[0];
  tablebody.innerHTML = "";

  productArray.forEach((product, index) => {
    const row = tablebody.insertRow();

    row.inerHTML = <td>${index + 1}</td>;
  });
}
document.getElementById("kodeproduk").value = "MD-0" + autoincrement;
