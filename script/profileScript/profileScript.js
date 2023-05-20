MIN_PLEN = 8;
MIN_ULEN = 3;
MAX_LEN = 40;
MAX_PLEN = 32;

const uppercaseRegex = new RegExp('(?=.*[A-Z]).+');
const lowercaseRegex = new RegExp('(?=.*[a-z]).+');
const numRegex = new RegExp('.*[0-9]+.*'); 
const specialRegex = new RegExp('(?=.*[@#$%^&+=]).+');

function checkNewUsername(newUsername) {
    if(newUsername.length < MIN_ULEN) {
      alert("L'username deve contenere almeno " + MIN_ULEN + " caratteri");
      return false  
    }
    else if(newUsername.length > MAX_LEN) {
      alert("L'username deve contenere al massimo " + MAX_LEN + " caratteri");
      return false 
    }
    else if(specialRegex.test(newUsername)) {
      alert("L'username non può contenere caratteri speciali");
      return false;
    }
    else return true;
  }

  function checkNewPass(newPassword) {
    if(newPassword.length < MIN_PLEN) {
      alert("La password deve contenere almeno " + MIN_PLEN + " caratteri");
      return false;
    }
    else if(newPassword.length > MAX_PLEN) {
      alert("La password deve essere massimo di " + MAX_LEN + " caratteri");
      return false;
    }
    else if(!lowercaseRegex.test(newPassword)) {
      alert("La password deve contenetre almeno una lettera minuscola");
      return false;
    }
    else if(!uppercaseRegex.test(newPassword)) {
      alert("La password deve contenetre almeno una lettera maiuscola");
      return false;
    }
    else if(!numRegex.test(newPassword)) {
      alert("La password deve includere almeno un numero");
      return false;
    }
    else if(!specialRegex.test(newPassword)) {
      alert("La password deve contenetre almeno un carattere speciale");
      return false;
    }
    else {
      return true;
    }
  }

  //-------------------------------------------------------------------------------------------------------------------



  var originalValue;

  function updateUsername() {
      var usernameField = document.getElementById('usernameField');
      if (!originalValue) {
          originalValue = usernameField.value;
      }
      var editButton = document.querySelector('.editUsername');
      
      if (editButton.innerHTML === 'Edit') {
          usernameField.disabled = false;
          editButton.innerHTML = 'Save';
      } else {
          if (usernameField.value !== originalValue) {
              if (checkNewUsername(usernameField.value)) {
                  $.ajax({
                      url: "./updateProfile.php",
                      type: "POST",
                      data: {type: "updateUsername", oldUsername: originalValue, newUsername: usernameField.value},
                      success: function(result) {
                          alert(result);
                          if(JSON.stringify(result)!='Username Correttamente Aggiornato'  ) usernameField.value = originalValue;
                          usernameField.disabled = true;
                          editButton.innerHTML = 'Edit';
                      },
                      error: function(xhr, status, error) {
                          console.error(error);
                          /*qui ci metterò l'alert*/
                      }
                  });
              }
          } else {
              usernameField.disabled = true;
              editButton.innerHTML = 'Edit';
          }
      }
  }
  



function handleOutClick(event) {
    popupContainer = document.getElementById("popupContainer");
    if (!popupContainer.contains(event.target)) {
      popupContainer.innerHTML = "";

      //document.getElementById("overlay").style.display = "none";
      document.removeEventListener("mousedown", handleOutClick);
    }
  }
  
  function openPopUpPassword() {
    popupContainer = document.getElementById("popupContainer");
  
    popupContainer.innerHTML = `
      <div class="popupPass">
          <div id="closePopup">&times;</div>
          <label> Password corrente: 
          <input type="password" class="changePass" id="oldPass" required></label><br>
          <label> Nuova password:
          <input type="password" class="changePass" id="newPass" required></label><br>

          <button class="editPasswordBtn" id = "confirmChangePassword" onclick="confirmNewPassword()" >Conferma</button>
      </div>
    `;
    
    //document.getElementById("overlay").style.display = "block";
    
    document.addEventListener("mousedown", handleOutClick);
  
    //CONTINUA QUI
    var i1;
    var i2;

    document.querySelector("#closePopup").addEventListener("click", function() {
    popupContainer.innerHTML = "";
    });
  }

  function confirmNewPassword() {
    var oldPassword = document.getElementById("oldPass").value;
    var newPassword = document.getElementById("newPass").value;

    popupContainer = document.getElementById("popupContainer");
  
    
    if (checkNewPass(newPassword)) {
        $.ajax({
            url: "./updateProfile.php",
            type: "POST",
            data: {type: "confirmNewPassword", oldPass: oldPassword, newPass: newPassword},
            success: function(result) {
                alert(result);
                if(result == "Password correttamente aggiornata") popupContainer.innerHTML = "";
                
            },
            error: function(xhr, status, error) {
                console.error(error);
                /*qui ci metterò l'alert*/
            }
        });
    }
}


  function updateImage(event) {
    file = event.target.files[0];
    imageUrl = URL.createObjectURL(file);
    imageElements = document.querySelectorAll('img');
    imageElements.forEach(function(imageElement) {
    imageElement.src = imageUrl;
    });
    localStorage.setItem('profileImage', imageUrl);
   }
   
   window.addEventListener('load', function() {
    savedImageUrl = localStorage.getItem('profileImage');
    if (savedImageUrl) {
    imageElements = document.querySelectorAll('img');
    imageElements.forEach(function(imageElement) {
    imageElement.src = savedImageUrl;
    });
    }
   });
   
   function resetImage() {
    localStorage.removeItem('profileImage');
    imageElements = document.querySelectorAll('img');
    imageElements.forEach(function(imageElement) {
    imageElement.src = 'https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg';
    });
   }

   function contaAmici(contaAmici) {
    document.getElementById("amici-totali").innerHTML = contaAmici;
}
function contaOre(contaOre) {
  document.getElementById("ore-studio").innerHTML = contaOre;
  
}
