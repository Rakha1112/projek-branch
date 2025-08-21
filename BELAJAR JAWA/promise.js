function prosesAsyn() {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve("Proses Berhasil"), 
         reject("proses gagal"), 3000);
    });
}

prosesAsyn().then(console.log).catch(console.error);