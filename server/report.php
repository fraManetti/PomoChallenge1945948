
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <meta name="description" content="App metodo concentrazione pomodoro">
    <title>PomoChallenge</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>

    <link rel="stylesheet" href="../bootstrap/dist/css/bootstrap.css" >
    <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/flipclock/0.7.8/flipclock.css'>
    <link rel="stylesheet" href="../style/homeStyle/clockStyle.css">
    <link rel="stylesheet" href="../style/homeStyle/style.css">
    <link rel="stylesheet" href="../style/homeStyle/defaultStyle.css">
    <link rel="stylesheet" href="../style/reportStyle/reportStyle.css">
    <link rel="stylesheet" href="../style/homeStyle/inputStyle.css">
    <link rel="stylesheet" href="../style/homeStyle/tasksStyle.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/css/flag-icon.min.css"  crossorigin="anonymous" referrerpolicy="no-referrer" />
    <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js'></script>
    <script src='https://cdnjs.cloudflare.com/ajax/libs/flipclock/0.7.8/flipclock.min.js'></script>
    <script  src="../script/homeScript/clockScript.js"></script>
    <script  src="../script/homeScript/TaskScript.js"></script>
    <script  src="../script/homeScript/serverTaskScript.js"></script>
    <script  src="../script/reportScript/reportScript.js"></script>
    <script src="../bootstrap/dist/js/bootstrap.bundle.min.js" ></script>
    <script>
        $(function(){
            $("#mynavbar").load("../model/newNavbar.html");
        });
    </script>
        
</head>
<body>

<?php 
    $connessione="host=localhost port=5432 dbname=pomochallenge 
    user=postgres password=pomodoro";
    $db_conn = pg_connect($connessione) or die ('Connection error-impossibile connettersi al server' . pg_last_error());
            
    session_start(); 
    $cookie = $_SESSION["username"]; 
    $query = "select keyhash, title, pomodori, note, dat from endedtask where endedtask.username = '{$cookie}'";
    $res = pg_query($db_conn, $query);
    if (pg_num_rows($res) == 0) {
        echo '<h1>Nessun risultato trovato</h1>';}
    
 ;?>
    
    <div class="navbar" id="mynavbar"></div>
    <div class="container">
        <div id = "selectDatePanel">
        </div>
        <div id = "reportPanel">
        </div>


    </div>
    
<?php 
print_r($res);
    while ($tuple = pg_fetch_array($res, null, PGSQL_ASSOC)) {

     $tuple_json = json_encode($tuple);
    echo '<script> 
    downloadEnded(' . $tuple_json . ')
    </script>';
    }

?>
</body>
</html>

