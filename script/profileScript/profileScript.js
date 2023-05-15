
function updateUsername() {
    var usernameField = document.getElementById('usernameField');
    var originalValue = usernameField.value;
    usernameField.disabled = false;

    usernameField.addEventListener('blur', function() {
        if (usernameField.value == originalValue) {
            usernameField.disabled = true;
        } else {
            $.ajax({
                url: "./updateProfile.php",
                type: "POST",
                data: {type: "updateUsername", oldUsername: originalValue, newUsername: usernameField.value},
                success: function(result) {
                    console.log(result);
                    usernameField.disabled = true;
                },
                error: function(xhr, status, error) {
                    console.error(error);
                    /*qui ci metterò l'alert*/
                }
            });
        }
    });
}

function handleOutClick(event) {
    popupContainer = document.getElementById("popupContainer");
    if (!popupContainer.contains(event.target)) {
      popupContainer.innerHTML = "";

      //document.getElementById("overlay").style.display = "none";
      document.removeEventListener("mousedown", handleOutClick);
    }
  }
  
  function updatePassword() {
    popupContainer = document.getElementById("popupContainer");
  
    popupContainer.innerHTML = `
      <div class="popupPass">
          <div id="closePopup">&times;</div>
          <label> Password corrente: 
          <input type="password" id="oldPass" required></label><br>
          <label> Nuova password:
          <input type="password" id="newPass" required></label><br>

          <button id = "confirmChangePassword" >Conferma</button>
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
