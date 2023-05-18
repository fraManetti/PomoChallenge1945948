<?php
  include( 'db_conn.php');  
  session_start(); 
?>
<?php 
    $username = $_SESSION["username"]; 
    $query = "    
    WITH hours AS (
        SELECT (n || ':00:00')::time AS hour
        FROM generate_series(0, 23) AS n
    )
	select hour,
	CASE WHEN sum(tim)::numeric/(EXTRACT(DOY FROM CURRENT_DATE))::numeric IS NULL THEN 0
	ELSE sum(tim)::numeric/(EXTRACT(DOY FROM CURRENT_DATE))::numeric END as tempo
	from endedtask right join hours on (endedtask.ora::time = hours.hour and username = '{$username}')
	
	group by hour
	order by hour
      
";

      $res = pg_query($db_conn, $query);
      //echo $query;
        $result_array = array();
        while ($tuple = pg_fetch_array($res, null, PGSQL_NUM)) {
            
            array_push($result_array, $tuple);
        } 
        echo json_encode($result_array); 
    
?>