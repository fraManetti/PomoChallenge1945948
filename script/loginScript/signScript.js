function showPassword() {
    var x = document.getElementById("passwordSignInput");
    if (x.type === "password") {
      x.type = "text";
      document.getElementById("visiblePassword").src = "../style/img/eye-solid.png";
    } else {
      x.type = "password";
      document.getElementById("visiblePassword").src = "../style/img/eye-slash-solid.png";
    }
   }

function resetField() {
    document.getElementById("userSignInput").value = "";
    document.getElementById("passwordSignInput").value = "";
}

function handleKeyPress(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    document.getElementById("submitSignBtn").click();
  }
}