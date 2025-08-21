function ambilData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Data berhasil diambil");
        }, 2000);
    });
}

async function ambilDataAsync() {
    console.log("Mengambil data...");
    const result = await ambilData();
    console.log(result);
    console.log("Data berhasil diambil dengan async/await");
}
ambilDataAsync();