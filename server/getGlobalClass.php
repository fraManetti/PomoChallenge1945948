<?php
  include( 'db_conn.php');  
  session_start(); 
?>
<?php 
      $query ="
      SELECT utente.username as username, sum(endedtask.tim) as points
      FROM utente join endedtask on utente.username = endedtask.username
      group by utente.username
      order by points desc
      limit  15
      ";
  $res = pg_query($db_conn,$query);
  $result_array = array();
  while ($tuple = pg_fetch_array($res, null, PGSQL_ASSOC)) {
      array_push($result_array, $tuple);
  }
  echo json_encode($result_array);

?>