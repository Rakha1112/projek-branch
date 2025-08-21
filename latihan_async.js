async function ambilData() {
    try {
        const data = await fetch("https://jsonplaceholder.typicode.com/posts/1");
        const result = await data.json();

        console.log("Hasil data API :", result);
    } catch (error) {
        console.error("terjadi error", error);
      }
   }
ambilData();
    