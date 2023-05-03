MIN_LEN = 8;
MAX_ULEN = 40;
MAX_PLEN = 32;

var specialC = [
  "`" , "!" , "?" , "$" , "?" , "%" , "^" ,  "&" , "*" , "(" , ")" , "_" , "-" , "+" , "=" , "{" , "[" ,
  "}" , "]" , ":" , ";" , "@" , "'" , "~" , "#" , "|" , "\\" , "<" , "," , ">" , "." , "?" ,  "/"];

var numbers = [
  0,1,2,3,4,5,6,7,8,9,0
];

var lowercase = [
  "a" , "b" , "c" , "d" , "e" , "f" ,  "g" , "h" , "i" , "j" , "k" , "l" , "m" , "n" ,
   "o" , "p" , "q" , "r" , "s" , "t" , "u" , "v" , "w" , "x" , "y" , "z"
];

var uppercase = [
  "A" , "B" , "C" , "D" , "E" , "F" , "G" ,  "H" , "I" , "J" , "K" , "L" , "M" , "N" ,
   "O" , "P" , "Q" , "R" , "S" , "T" , "U" , "V" , "W" , "X" , "Y" , "Z"
];

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

  if(pass == ""  || conf == "" || username == "") {
    alert("Inserire dati nei campi");
    e.preventDefault;
  }
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
  else if(pass.value.length < MIN_LEN) {
    alert("La password deve contenere almeno " + MIN_LEN + " caratteri");
    return false;
  }
  else if(pass.value.length > MAX_PLEN) {
    alert("La password deve essere massimo di " + MAX_LEN + " caratteri");
    return false;
  }
  else if(!numIncludes(pass.value)) {
    alert("La password deve includere almeno un numero");
    return false
  }
  else if(!specialChar(pass.value)) {
    alert("La password deve contenetre almeno un carattere speciale");
    return false;
  }
  else if(!lowerChar(pass.value)) {
    alert("La password deve contenetre almeno una lettera minuscola");
    return false;
  }
  else if(!upperChar(pass.value)) {
    alert("La password deve contenetre almeno una lettera maiuscola");
    return false;
  }
  else return true;
}

function checkUsername() {
  var user = document.getElementById("userSignInput");
  if(user.value.length < MIN_LEN) {
    alert("L'username deve contenere almeno " + MIN_LEN + " caratteri");
    return false  
  }
  else if(user.value.length > MAX_ULEN) {
    alert("L'username deve contenere almeno " + MIN_LEN + " caratteri");
    return false 
  }
  else if(specialChar(user.value)) {
    alert("L'username non può contenere caratteri speciali");
    return false;
  }
  else return true;
}

function numIncludes(value) {
  for (let i = 0; i < numbers.length; i++) {
    const element = numbers[i];
    if(value.includes(element))
      return true;
  }
  return false;
}

function specialChar(value) {
  for (let i = 0; i < specialC.length; i++) {
    const element = specialC[i];
    if(value.includes(element))
      return true;
  }
  return false;
}

function lowerChar(value) {
  for (let i = 0; i < lowercase.length; i++) {
    const element = lowercase[i];
    if(value.includes(element))
      return true;
  }
  return false;
}

function upperChar(value) {
  for (let i = 0; i < uppercase.length; i++) {
    const element = uppercase[i];
    if(value.includes(element))
      return true;
  }
  return false;
}

