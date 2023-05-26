<?php
    $host = "localhost";
    $username ="postgres";
    $password = "pomodoro";
    $database = "pomochallenge";
    global $db_conn;
    $db_conn=pg_connect("host=localhost port=5432 dbname=postgres 
     user=postgres password=pomodoro") or die ('Connection error-impossibile connettersi al server' . pg_last_error());
?>