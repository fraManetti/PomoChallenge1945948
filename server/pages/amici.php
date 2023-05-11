<?php
  include( '../db_conn.php');  
  session_start(); 
?>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <meta name="description" content="App metodo concentrazione pomodoro">
    <title>PomoChallenge</title>
    <link rel="icon" type="image/x-icon" href="../../style/img/tomato.png">
    <meta name='viewport' content='width=device-width, initial-scale=1'>


    <script src="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js" type="text/javascript"></script>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css">
<link rel='stylesheet' href='//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.2.0/css/font-awesome.css'><link rel="stylesheet" href="./style.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/prefixfree/1.0.7/prefixfree.min.js"></script>



    <link rel="stylesheet" href="../../bootstrap/dist/css/bootstrap.css" >
    <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/flipclock/0.7.8/flipclock.css'>
    <link rel="stylesheet" href="../../style/homeStyle/style.css">
    <link rel="stylesheet" href="../../style/amiciStyle/amiciStyle.css">
    <link rel="stylesheet" href="../../style/homeStyle/inputStyle.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/css/flag-icon.min.css"  crossorigin="anonymous" referrerpolicy="no-referrer" />
    <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js'></script>
    <script src="../../bootstrap/dist/js/bootstrap.bundle.min.js" ></script>
    <script src="../../script/amici/amiciScript.js"></script>
    <!-- <script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous" referrerpolicy="no-referrer" ></script>  -->

    <script>
        $(function(){
          $("#mynavbar").load("../../model/newNavbar.html");
        });

    </script>

</head>
<body>
    
    <div id="mynavbar"></div>
    <div class="container">
            <div id = "amiciPanel">
                <div id="titleAmici">
                    <h2> Lista amici </h2>
                </div>
                <div id="amiciBox">
                    <!-- qui verrà codice iniettato dalle query -->
                </div>
        </div>
        <div id="boxdx" > 
            <div id ="searchBox" class="row">
<div class="sample ten">
  <input type="text" name="search" placeholder="search" id="search">
  <button class="btn btn-search" onClick="sendRequest();">
    <i class="fa fa-search"></i>
  </button>
  <button type="reset" class="btn btn-reset fa fa-times"></button>
</div>      </div>
<div id ="amiciRequest" class="row">
    <div id="incoming" class="box">
    <h2>Richieste Entranti</h2>
    <!-- inserisci qui il contenuto delle richieste entranti -->
  </div>
  <div id="outgoing" class="box">
    <h2>Richieste Uscite</h2>
    <!-- inserisci qui il contenuto delle richieste uscenti -->
  </div>
            </div>
        </div>
    </div>
    </body>
    <?php 
$username = $_SESSION['username'];
    $query = "select * from amici where utentea = '${username}' or utenteb = '${username}' ";
    $res = pg_query ($db_conn,$query);
    while ($tuple = pg_fetch_array($res, null, PGSQL_ASSOC)) {
        if ($tuple['utentea'] == $username){
            $tuple_json = json_encode($tuple['utenteb']);
        }
        else{ 
            $tuple_json = json_encode($tuple['utentea']);
        }
        echo '<script>
        downloadAmici(' . $tuple_json . ') </script>';
    }
?>
<?php 
    $query = "select * from richieste where accettante = '${username}'";
    $res = pg_query ($db_conn,$query);
    while ($tuple = pg_fetch_array($res, null, PGSQL_ASSOC)) {
        $tuple_json = json_encode($tuple['richiedente']);
        echo '<script>
        downloadIncomingRequest(' . $tuple_json . ') </script>';
    }
?>
</html>