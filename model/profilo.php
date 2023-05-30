<?php
  include( '../server/db_conn.php');  
  session_start(); 
?>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <meta name="description" content="App metodo concentrazione pomodoro">
    <title>PomoChallenge</title>
    <link rel="icon" type="image/x-icon" href="../style/img/tomato.png">
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <link rel="stylesheet" href="../bootstrap/dist/css/bootstrap.css" >
    <link rel="stylesheet" href="../style/homeStyle/defaultStyle.css">
    <link rel = "stylesheet" href = "../style/profileStyle/profile.css">
    <link rel = "stylesheet" href = "../style/profileStyle/responsiveProfileStyle.css">
    <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js'></script>
    <script  src="../script/profileScript/profileScript.js"></script>
    <script  src="../script/defaultScript.js"></script>
    <script src="../bootstrap/dist/js/bootstrap.bundle.min.js" ></script>
    <!-- <script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous" referrerpolicy="no-referrer" ></script>  -->

    <script>
        $(function(){
          $("#mynavbar").load("../model/newNavbar.html");
        });

    </script>

</head>
<body>
<div class="navbar" id="mynavbar"></div>
<div class="cnt">
<div class="boxDati">
  <div class="title">Informazioni personali</div>
  <div id = "innerBoxDati">
  <div class="content">
    <div class="immagine-profilo">
      <div class="image-container"> 
        <img id ="mypic" src="https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg">
        <label for="file-input">✏️</label>
        <input id="file-input" name ="image" type="file" onchange="updateImage(event)" style="display:none"/>
      <div class="imageButton"> <button class="resetImageBtn" onclick="resetImage()">Rimuovi immagine profilo</button></div>


      </div> 
    </div>
    <div class="dati-account">
      <p class = "profileField" id = "firstRow"> 👤 <label class="profileFieldNames"> Username: </label> <input id = "usernameField" type="text"  value="<?php echo $_SESSION["username"]; ?>"  disabled> 
      <button class="editUsername" onclick = "updateUsername()">Edit</button></p>
      <p class = "profileField"> ⏱️ <label class="profileFieldNames"> Totale delle ore: </label> <span id="ore-studio">0</span></p>
      <p class = "profileField"> 👫 <label class="profileFieldNames">Amici totali: </label> <span id="amici-totali">0</span></p>
      <button class="editPasswordBtn" onclick="openPopUpPassword()">Modifica password</button>
      <button class="deleteAccountBtn" onclick="deleteAccount()">Elimina Account</button>


      <div id="popupContainer"></div>
    </div>
  </div>
</div>
</div>
</body>
<?php 
//--------------------------------------------------------------------------------------------------------------->
        $username = $_SESSION['username'];
        $query = "select amiciC.utente, sum(amiciC.contaAmici) as totale
        from (
        select utentea as utente, count(*) as contaAmici
        from amici
        where utentea='{$username}'
        group by utente
        union
        select utenteb as utente, count(*) as contaAmici
        from amici
        where utenteb='{$username}'
        group by utente
        union
        select username, 0
        from utente 
        where username not in (select utentea from amici) and username not in (select utenteb from amici) and username = '{$username}'
        ) as amiciC
        group by amiciC.utente";
        $res = pg_query ($db_conn,$query);
        $tuple = pg_fetch_array($res, null, PGSQL_ASSOC);
        $tuple_json = json_encode($tuple['totale']);
          echo '<script>
          contaAmici(' . $tuple_json . ') </script>';
          $query="select sum(tim) as totale
          from endedtask
          where username='${username}'";
          $res = pg_query ($db_conn,$query);
          $tuple = pg_fetch_array($res, null, PGSQL_ASSOC);
          $tuple_json = json_encode($tuple['totale']);
          echo '<script>
          contaOre(' . $tuple_json . ') </script>';
  ?>

  
 
</html>
<script>
if (document.cookie.indexOf("profilepic") >= 0) {
      var path = document.cookie
      .split('; ')
      .find(row => row.startsWith('profilepic='))
      .split('=')[1];
      var path_decoded=decodeURIComponent(path);
      console.log(path_decoded);
      if(path_decoded !="")
      document.getElementById("mypic").src=path_decoded;
    }
</script>