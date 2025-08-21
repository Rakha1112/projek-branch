let makanan;

function laundrybaju(callback) {
    console.log("Laundry Baju 2");

    setTimeout(() => {
        pakaian = "👕👕";
        callback(pakaian);
    }, 1000);

    console.log("Laundry berhasil, silahkan ambil");
}

function baju(pakaian) {
    console.log(`baju ${pakaian}`);
}

laundrybaju(baju);
console.log("menunggu laundry selesai")