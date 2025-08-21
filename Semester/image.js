
// data object berpasangan, value make kutip ( ` ), key titik dua ( : )
// cara akses object make console log, didalam console log dipanggil objectny masukan nama

//dbawah literal object
//  let mobil = {
//     merek: "Toyota",
//      tahun: 2010,
//    warna: "Merah",
//      model: "rush",
//   status: "tersedia",
//   }
//  console.log(`merek mobil : ${mobil.merek}`);
//  console.log(`tahun mobil : ${mobil.tahun}`);
//  console.log(`warna mobil : ${mobil.warna}`);
//  console.log(`model mobil : ${mobil.model}`);
//  console.log(`status mobil : ${mobil.status}`);

//  console.log(mobil.merek);
//  console.log(mobil.tahun);
//  console.log(mobil.warna);
//  console.log(mobil.model);
//  console.log(mobil.status);

// cara kedua membuat object
let car = new Object();
car.brand = "Toyota"    
car.model = "Rush"
car.year = 2021;

console.log("nama brand mobil : ", car.brand);
console.log("nama model mobil : ", car.model);
console.log("tahun mobil : ", car.year);


//constraktor
// function Person(name, age, address) {
//     this.name = name;
//     this.age = age;
//     this.address = address;
//     this.greet = function() {
//         console.log("Hello, " + this.name);
//     };
// }

// let john = new personalbar("joko", 45, "tasikmalaya");
// john.greet();
//constraktor diluar

// function Person(nama, age, address) {
//     this.nama = nama;
//     this.age = age;
//     this.address = address;
//     this.greet = function() {
//         console.log(`Halo, nama saya ${this.nama},
//                      umur saya ${this.age}, 
//                      dan saya tinggal di  ${this.address}`);
//     }
// }
// let field = new Person('raka', 16, 'depok');
// field.greet();

