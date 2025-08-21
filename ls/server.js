var http = require("http");

var server = http.createServer(function (req, res) {
    res.end(`Nama: Rakha Zuhdi Naufal
         Tempat / Tanggal Lahir: Depok,12-11-2008 
         Jenis Kelamin: Laki-Laki
Sekolah: SMK Taruna Bhakti
Kelas: X sepuluh
Jurusan: RPL Rekayasa Perangkat Lunak
Hobi: Main
Cita-cita: menjadi pengusaha sukses`);
});

server.listen(8080);

console.log("server running on http://localhost:8080");
