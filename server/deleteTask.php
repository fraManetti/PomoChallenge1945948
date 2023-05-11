<?php 
  include( 'db_conn.php');  
  session_start();
  if (!isset($_SESSION["username"])) {
      header("HTTP/1.1 401 Unauthorized");
      exit();
    }
    $username = $_SESSION['username'];
    $keyhash = $_POST['keyhash'];
    $query = "delete from endedtask where keyhash = '{$keyhash}' and username = '{$username}'";
    $res = pg_query($db_conn,$query);
    if (!$res) {
        header("HTTP/1.1 500 Internal Server Error");
        exit();
      }
          ?>