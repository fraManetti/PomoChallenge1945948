MIN_PLEN = 8;
MIN_ULEN = 3;
MAX_LEN = 40;
MAX_PLEN = 32;

const uppercaseRegex = new RegExp('(?=.*[A-Z]).+');
const lowercaseRegex = new RegExp('(?=.*[a-z]).+');
const numRegex = new RegExp('.*[0-9]+.*'); 
const specialRegex = new RegExp('(?=.*[@#$%^&+=]).+');


function showPassword() {
    var x = document.getElementById("passwordSignInput");
    var y = document.getElementById("confirmPasswordSignInput");
    if (x.type === "password") {
      x.type = "text";
      y.type = "text";
      document.getElementById("visibleSignPassword").src = "../style/img/eye-solid.png";
    } else {
      x.type = "password";
      y.type = "password";
      document.getElementById("visibleSignPassword").src = "../style/img/eye-slash-solid.png";
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

function handleSubmit(e) {
  var pass = document.getElementById("passwordSignInput").value;
  var conf = document.getElementById("confirmPasswordSignInput").value;
  var username = document.getElementById("userSignInput").value;

  /* if(pass == ""  || conf == "" || username == "") {
    alert("Inserire dati nei campi");
    e.preventDefault;
  } */
   if(checkPass() && checkUsername()) {
    console.log("connessione");
  }
  else {
    e.preventDefault();
  } 

  
}


function checkPass() {
  var pass = document.getElementById("passwordSignInput");
  var conf = document.getElementById("confirmPasswordSignInput");
   if(pass.value != conf.value) {
    alert("Le password non coincidono");
    return false
  }
  else if(pass.value.length < MIN_PLEN) {
    alert("La password deve contenere almeno " + MIN_PLEN + " caratteri");
    return false;
  }
  else if(pass.value.length > MAX_PLEN) {
    alert("La password deve essere massimo di " + MAX_LEN + " caratteri");
    return false;
  }
  else if(!lowercaseRegex.test(pass.value)) {
    alert("La password deve contenetre almeno una lettera minuscola");
    return false;
  }
  else if(!uppercaseRegex.test(pass.value)) {
    alert("La password deve contenetre almeno una lettera maiuscola");
    return false;
  }
  else if(!numRegex.test(pass.value)) {
    alert("La password deve includere almeno un numero");
    return false;
  }
  else if(!specialRegex.test(pass.value)) {
    alert("La password deve contenetre almeno un carattere speciale");
    return false;
  }
  else {
    return true;
  }
}

function checkUsername() {
  var user = document.getElementById("userSignInput");
  if(user.value.length < MIN_ULEN) {
    alert("L'username deve contenere almeno " + MIN_ULEN + " caratteri");
    return false  
  }
  else if(user.value.length > MAX_LEN) {
    alert("L'username deve contenere al massimo " + MAX_LEN + " caratteri");
    return false 
  }
  else if(specialRegex.test(user.value)) {
    alert("L'username non può contenere caratteri speciali");
    return false;
  }
  else return true;
}

