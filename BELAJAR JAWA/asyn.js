let makanan;

function orderkebab(callback) {
    console.log("Order Kebab 2");

    setTimeout(() => {
        makanan = "🌯🌯";
        callback(makanan);
    }, 5000);
  
    console.log("Order Berhasil, silahkan menunggu");
}

function makan(makanan) {
    console.log(`makan ${makanan}`);
}
orderkebab(makan);
console.log("membaca koran sambil menunggu")
