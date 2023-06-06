//MACRO utilizzate
MIN_PLEN = 8;
MIN_ULEN = 3;
MAX_LEN = 20;
MAX_PLEN = 32;

//Espressioni regolari utilizzate per i controlli su Username e Password
const uppercaseRegex = new RegExp('(?=.*[A-Z]).+');
const lowercaseRegex = new RegExp('(?=.*[a-z]).+');
const numRegex = new RegExp('.*[0-9]+.*'); 
const specialRegex = new RegExp('(?=.*[@#$%\\^&+=!"£/()=?\\^ì\\\\]).+');

//Funzione di controllo del nuovo username inserito
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

  //Funzione di controllo della nuova password inserita
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

  var originalValue;

  /*Funzione di aggiornamento degli Username*/
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
                      url: "../server/updateProfile.php",
                      type: "POST",
                      data: {type: "updateUsername", oldUsername: originalValue, newUsername: usernameField.value},
                      success: function(result) {   
                        if(result.trim()!="Username Correttamente Aggiornato") usernameField.value = originalValue;
                          alert(result);
                          usernameField.disabled = true;
                          editButton.innerHTML = 'Edit';
                      },
                      error: function(xhr, status, error) {
                          console.error(error);
                      }
                  });
              } else {
                usernameField.disabled = true;
                usernameField.value = originalValue;
                editButton.innerHTML = 'Edit';
                            }
          } else {
              usernameField.disabled = true;
              usernameField.value = originalValue;
              editButton.innerHTML = 'Edit';
          }
      }
  }
  



  
  //Funzione di apertura del Pop Up per cambiare la password
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
    
    
    document.addEventListener("mousedown", handleOutClick);
  
    var i1;
    var i2;

    document.querySelector("#closePopup").addEventListener("click", function() {
    popupContainer.innerHTML = "";
    });
  }

  /*Funzione per aggiornare la password sul server*/
  function confirmNewPassword() {
    var oldPassword = document.getElementById("oldPass").value;
    var newPassword = document.getElementById("newPass").value;

    popupContainer = document.getElementById("popupContainer");
  
    
    if (checkNewPass(newPassword)) {
        $.ajax({
            url: "../server/updateProfile.php",
            type: "POST",
            data: {type: "confirmNewPassword", oldPass: oldPassword, newPass: newPassword},
            success: function(result) {
                alert(result);
                if(result.trim() == "Password correttamente aggiornata") popupContainer.innerHTML = "";
                
            },
            error: function(xhr, status, error) {
                console.error(error);
            }
        });
    }
}

  // Funzione di aggiornamento dell'immagine profilo
  function updateImage(event) {
    file = event.target.files[0];

    var form_data = new FormData();
    form_data.append("image",file);
    $.ajax({
      url: "../server/uploadImg.php",
      type: "POST",
      dataType: 'text',
      cache: false,
      contentType: false,
      processData: false,
      data: form_data,
      success: function(result) {
          console.log(result);
          document.getElementById("top-picture").src=result.trim();
          document.getElementById("mypic").src=result.trim();      
          var date = new Date();
          date.setMonth(date.getMonth() + 1);
          document.cookie = "profilepic=" + result.trim() + "; expires=" + date.toUTCString() + "; path=/";
          
      },
      error: function(jqXHR, textStatus, errorThrown) {
        alert(jqXHR.responseText);
      }
  });   }
   
    //Funzione per reimpostare l'immagine profilo predefinita
   function resetImage() {

    document.getElementById("mypic").src="https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg";
    document.getElementById("top-picture").src="https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg";
    $.ajax({
      url: "../server/resetImage.php",
      type: "POST",
      data: {path: path_decoded},
      success: function(result) {
          console.log(path_decoded);
          document.cookie="profilepic="+"; Thu, 01 Jan 1970 00:00:00 GMT;"+ 'path=/';    

      },
      error: function(xhr, status, error) {
          console.error(error);
      }
  });
   }

//Funzione per impostare la conta degli amici totali
function contaAmici(contaAmici) {
    document.getElementById("amici-totali").innerHTML = contaAmici;
}

//Funzione per impostare la conta delle ore totali
function contaOre(contaOre) {
  var cnt = convertMinHour(contaOre);
  document.getElementById("ore-studio").innerHTML = cnt;
  
}

//Funzione di eliminazione dell'account sul server
function deleteAccount() {
  if (confirm("Sicuro di voler eliminare il profilo? Questa operazione non è annullabile"))
  $.ajax({
    url: "../server/updateProfile.php",
    type: "POST",
    data: {type: "deleteAccount"},
    success: function(result) {
        if(result.trim() == "Cancellazione Riuscita!"){
          alert(result);
           location.href = '../server/logOut.php';
          }
        else{
          alert("Qualcosa è andato storto, riprovare!");
        }
    },
    error: function(jqXHR, textStatus, errorThrown) {
        console.error(errorThrown);
    }
});
  else  
    return;
}

