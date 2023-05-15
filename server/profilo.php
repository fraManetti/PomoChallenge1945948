<?php
  include( 'db_conn.php');  
  session_start(); 
?>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <meta name="description" content="App metodo concentrazione pomodoro">
    <title>PomoChallenge</title>
    <link rel="icon" type="image/x-icon" href="..//style/img/tomato.png">
    <meta name='viewport' content='width=device-width, initial-scale=1'>

    <link rel="stylesheet" href="../bootstrap/dist/css/bootstrap.css" >
    <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/flipclock/0.7.8/flipclock.css'>
    <link rel="stylesheet" href="../style/homeStyle/clockStyle.css">
    <link rel="stylesheet" href="../style/homeStyle/style.css">
    <link rel="stylesheet" href="../style/homeStyle/defaultStyle.css">
    <link rel="stylesheet" href="../style/homeStyle/inputStyle.css">
    <link rel="stylesheet" href="../style/homeStyle/tasksStyle.css">
    <link rel = "stylesheet" href = "../style/profileStyle/profile.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/css/flag-icon.min.css"  crossorigin="anonymous" referrerpolicy="no-referrer" />    <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js'></script>
    <script src='https://cdnjs.cloudflare.com/ajax/libs/flipclock/0.7.8/flipclock.min.js'></script>
    <script  src="../script/homeScript/clockScript.js"></script>
    <script  src="../script/homeScript/TaskScript.js"></script>
    <script  src="../script/homeScript/serverTaskScript.js"></script>
    <script  src="../script/profileScript/profileScript.js"></script>
    <script src="../bootstrap/dist/js/bootstrap.bundle.min.js" ></script>
    <!-- <script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous" referrerpolicy="no-referrer" ></script>  -->

    <script>
        $(function(){
          $("#mynavbar").load("../model/newNavbar.html");
        });

    </script>

    <script>
function updateImage(event) {
  file = event.target.files[0];
  imageUrl = URL.createObjectURL(file);
  imageElement = document.querySelector('img');
  imageElement.src = imageUrl;
  localStorage.setItem('profileImage', imageUrl);
}

window.addEventListener('load', function() {
  savedImageUrl = localStorage.getItem('profileImage');
  if (savedImageUrl) {
    imageElement = document.querySelector('img');
    imageElement.src = savedImageUrl;
  }
});

function resetImage() {
  localStorage.removeItem('profileImage');
  imageElement = document.querySelector('img');
  imageElement.src = 'https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg';
}
    </script>

</head>
<body>
    

<div class="navbar" id="mynavbar"></div>
<div class="boxDati">
  <div class="title">Informazioni personali</div>
  <div class="content">
    <div class="immagine-profilo">
      <div class="image-container"> 
        <img src="https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg">
        <label for="file-input">✏️</label>
        <input id="file-input" type="file" onchange="updateImage(event)" style="display:none"/>
      <div class="imageButton"> <button class="resetImageBtn" onclick="resetImage()">Rimuovi immagine profilo</button></div>


      </div> 
    </div>
    <div class="dati-account">
      <p class = "profileField"> 👤 <label class="profileFieldNames"> Username: </label> <input id = "usernameField" type="text"  value="<?php echo $_SESSION["username"]; ?>"  disabled> 
      <button class="editUsername" onclick = "updateUsername()">Edit</button></p>
      <p class = "profileField"> ⏱️ <label class="profileFieldNames"> Totale delle ore: </label> <span id="ore-studio">0</span></p>
      <p class = "profileField"> 👫 <label class="profileFieldNames">Amici totali: </label> <span id="amici-totali">0</span></p>
      <button class="editPasswordBtn" onclick="updatePassword()">Modifica password</button>
      

      <div id="popupContainer"></div>
    </div>
  </div>
</div>
    
</body>
