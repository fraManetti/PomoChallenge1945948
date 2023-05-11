<?php 
    $myvarValue = $_POST['currentString'];
    $connessione="host=localhost port=5432 dbname=pomochallenge 
    user=postgres password=pomodoro";
    $db_conn = pg_connect($connessione) or die ('Connection error-impossibile connettersi al server' . pg_last_error());
            
    session_start(); 
    $cookie = $_SESSION["username"]; 
    $query = "select keyhash, title, pomodori, note, dat from endedtask where endedtask.username = '{$cookie}' and date_trunc('month', to_date(dat, 'DD-MM-YYYY')) = date_trunc('month', to_date('{$myvarValue}', 'DD-MM-YYYY'))::date";
    $res = pg_query($db_conn, $query);
    
        $result_array = array();
        while ($tuple = pg_fetch_array($res, null, PGSQL_ASSOC)) {
            array_push($result_array, $tuple);
        }
        echo json_encode($result_array);
    
?>