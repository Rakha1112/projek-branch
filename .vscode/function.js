document
.getElementById("biodataform")
.addEventListener("submit", function(event) { 
 event.preventDefault

 const name = document.getElementById("name").value;
 const alamat = document.getElementById("alamat").value;
 const sekolah = document.getElementById("sekolah").value;
 const password = document.getElementById("password").value;
 const nameOutput = document.getElementById("name-Output");
 const alamatOutput = document.getElementById("alamat-Output");


 const fotmData = {
  name = name,
  alamat = alamat,
  sekolah = sekolah,
  password = password,
 };
console.log("Data Diri ", formData);
alert("berhasil input daata");

} );

