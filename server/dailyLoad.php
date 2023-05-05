<?php 
    $connessione="host=localhost port=5432 dbname=pomochallenge 
    user=postgres password=pomodoro";
    $db_conn = pg_connect($connessione) or die ('Connection error-impossibile connettersi al server' . pg_last_error());
            
    session_start(); 
    $cookie = $_SESSION["username"]; 
    //$data_corrente = date('d-m-Y');
    //echo $data_corrente;
    $data_corrente = '27-08-2004';
    $query = "select keyhash, title, pomodori, note, dat from endedtask where endedtask.username = '{$cookie}' and endedtask.dat = '{$data_corrente}'";
    $res = pg_query($db_conn, $query);
    if (pg_num_rows($res) == 0) {
        echo '<h1>Nessun risultato trovato</h1>';}
    
        
        while ($tuple = pg_fetch_array($res, null, PGSQL_ASSOC)) {

            $tuple_json = json_encode($tuple);
           echo '<script> 
           downloadEnded(' . $tuple_json . ')
           </script>';
           }

    ?>