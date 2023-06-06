<?php
  include( 'db_conn.php');  
    session_start();
    if (!isset($_SESSION["username"])) {
        header("HTTP/1.1 401 Unauthorized");
        exit();
      }
      $username = $_SESSION['username'];
      $key = $_POST["key"];
      $title = $_POST["title"];
      $pomodori = $_POST["pomodori"];
      $note = $_POST["note"];
      $donepomodori = $_POST["donepomodori"];
      $ind = $_POST["ind"];
      $type = $_POST['type'];
      $tim =$_POST['tim'];
      $ind = $_POST['ind'];

    
      switch ($type) {
        case 'ADD':
            $query = "insert into task values ('{$username}','{$key}','{$title}',{$pomodori},'{$note}',{$donepomodori}, {$ind},{$tim})";
            break;
        case 'UP':
                $query = "update  task set title='{$title}', pomodori={$pomodori}, note='{$note}', donepomodori={$donepomodori},ind={$ind}, tim={$tim}  where keyhash='{$key}' and username='{$username}'";
            break;
        case 'DEL':
            $query = "delete from task where keyhash='{$key}' and username='{$username}'"; 
            $res = pg_query($db_conn,$query);
            $query = "update task set ind=ind-1 where ind>{$ind} and username='{$username}'";
            break;
        case 'ALL_DEL':
          $query="delete from task where username='{$username}'";
          break;
        case 'FYN':
          $dat  =$_POST['dat'];
          $ora = $_POST['ora'];
          $query = "delete from task where keyhash='{$key}' and username='{$username}'"; 
          $res = pg_query($db_conn,$query);
          $query = "update task set ind=ind-1 where ind>{$ind} and username='{$username}'";
          $res = pg_query($db_conn,$query);
          $query = "insert into endedtask values ('{$username}','{$key}','{$title}',{$pomodori},'{$note}','{$dat}',{$tim},'{$ora}')";
          break;
        default:
            break;
      } 
      $res = pg_query($db_conn,$query);
      if (!$res) {
        header("HTTP/1.1 500 Internal Server Error");
        exit();
      }
      
?>
