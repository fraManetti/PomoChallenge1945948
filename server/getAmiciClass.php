<?php
  include( 'db_conn.php');  
  session_start(); 
?>
<?php 
$username = $_SESSION['username'];
      $query ="
      WITH mieiAmici AS (
        SELECT utentea AS amico FROM amici WHERE utenteb = '${username}'
        UNION
        SELECT utenteb AS amico FROM amici WHERE utentea = '${username}'
      )
      SELECT amico as username, CASE WHEN sum(endedtask.tim) IS NULL THEN 0 ELSE sum(endedtask.tim) END as points
      FROM mieiAmici left join endedtask on amico = endedtask.username
      group by amico
      order by points desc
      limit  15
	  

      ";
  $res = pg_query($db_conn,$query);
  $result_array = array();
  while ($tuple = pg_fetch_array($res, null, PGSQL_ASSOC)) {
      array_push($result_array, $tuple);
  }
  $query="select username, CASE WHEN sum(endedtask.tim) IS NULL THEN 0 ELSE sum(endedtask.tim) END as points
  from endedtask
  where username='${username}'
  group by username
  ";
  $res = pg_query ($db_conn,$query);
  $tuple = pg_fetch_array($res, null, PGSQL_ASSOC);
  array_push($result_array, $tuple);
  $points = array_column($result_array, 'points');
  array_multisort($points,SORT_DESC,$result_array);
  echo json_encode($result_array);

?>