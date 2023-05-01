function showPassword() {
    var x = document.getElementById("passwordInput");
    if (x.type === "password") {
      x.type = "text";
      document.getElementById("visiblePassword").src = "../style/img/eye-solid.png";
    } else {
      x.type = "password";
      document.getElementById("visiblePassword").src = "../style/img/eye-slash-solid.png";
    }
  }

function resetField() {
    document.getElementById("mailInput").value = "";
    document.getElementById("passwordInput").value = "";
}