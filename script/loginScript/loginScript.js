//Funzione per mostrare la psw
function showPassword() {
    var x = document.getElementById("passwordLogInput");
    if (x.type === "password") {
      x.type = "text";
      document.getElementById("visiblePassword").src = "../style/img/eye-solid.png";
    } else {
      x.type = "password";
      document.getElementById("visiblePassword").src = "../style/img/eye-slash-solid.png";
    }
  }

// Funzione per resettare i campi
function resetField() {
    document.getElementById("userLogInput").value = "";
    document.getElementById("passwordLogInput").value = "";
}
//Funzione per inviare all'invio da tastiera
function handleKeyPress(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    document.getElementById("submitBtn").click();
  }
}