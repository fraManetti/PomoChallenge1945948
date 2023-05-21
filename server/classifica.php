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
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <link rel="icon" type="image/x-icon" href="../style/img/tomato.png">

    <link rel="stylesheet" href="../bootstrap/dist/css/bootstrap.css" >
    <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/flipclock/0.7.8/flipclock.css'>
    <link rel="stylesheet" href="../style/homeStyle/clockStyle.css">
    <link rel="stylesheet" href="../style/homeStyle/style.css">
    <link rel="stylesheet" href="../style/homeStyle/defaultStyle.css">
    <link rel="stylesheet" href="../style/homeStyle/inputStyle.css">
    <link rel="stylesheet" href="../style/homeStyle/tasksStyle.css">
    <link rel="stylesheet" href="../style/amiciStyle/amiciStyle.css">
    <link rel="stylesheet" href="../style/classificaStyle/classificaStyle.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/css/flag-icon.min.css"  crossorigin="anonymous" referrerpolicy="no-referrer" />
    <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js'></script>
    <script src='https://cdnjs.cloudflare.com/ajax/libs/flipclock/0.7.8/flipclock.min.js'></script>
    <script  src="../script/homeScript/TaskScript.js"></script>
    <script  src="../script/classifica/classifica.js"></script>
    <script src="../bootstrap/dist/js/bootstrap.bundle.min.js" ></script>
    
    <script>
        $(function(){
          $("#newNavbar").load("../model/newNavbar.html");
        });

    </script>
        
</head>
<body>    
<div id="newNavbar"></div>
<div class="container">
  <div id="classificaPanel">
    <div id="classifica-title"> Classifica </div>
    <button id="globaleClassButton" onClick ="downloadGlobalClass();">Globale</button>
    <button id="amiciClassButton" onClick="downloadAmiciClass();">Amici</button>
    <div id="classificaBox"> </div>

</div>
</div>
<?php 
      $query ="
      SELECT utente.username as username, sum(endedtask.tim) as points
      FROM utente join endedtask on utente.username = endedtask.username
      group by utente.username
      order by points desc
      limit  15
      ";
  $res = pg_query($db_conn,$query);
  if (!$res) {
      header("HTTP/1.1 500 Internal Server Error");
      //echo '<script> alert ("inserisci amico valido");</script>';
      exit();
    }
    while ($tuple = pg_fetch_array($res, null, PGSQL_ASSOC)) {
      $tuple_json = json_encode($tuple);
      echo '<script>
      downloadClassifica(' . $tuple_json . ') </script>';
  }
?>
</body>
</html>