document.getElementById("biodata-form").addEventListener("submit", function(event) {
    event.preventDefault();


    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const password1 = document.getElementById("password1").value;

    const usernameOutput = document.getElementById("username-output");
    const passwordOutput = document.getElementById("password-output");

    usernameOutput.innerHTML = username;
    passwordOutput.innerHTML = password;

    const formData = {
        username: username,
        email: email,
        password: password,
        password1: password1
    };
    console.log("Data Diri ", formData);
    alert("berhasil input data");
} )