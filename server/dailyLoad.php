<?php 
  include( 'db_conn.php');  
  session_start();
  if (!isset($_SESSION["username"])) {
      header("HTTP/1.1 401 Unauthorized");
      exit();
    }
    $cookie = $_SESSION["username"]; 
    $data_corrente = date('d-m-Y');

    //$data_corrente = '27-08-2004';
    $query = "select keyhash, title, pomodori, note, dat,tim from endedtask where endedtask.username = '{$cookie}' and endedtask.dat = '{$data_corrente}'";
    $res = pg_query($db_conn, $query);
    
        $result_array = array();
        while ($tuple = pg_fetch_array($res, null, PGSQL_ASSOC)) {
            array_push($result_array, $tuple);
        }
        echo json_encode($result_array);
    
?>