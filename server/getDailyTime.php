<?php
  include( 'db_conn.php');  
  session_start(); 
?>
<?php 
    $username = $_SESSION["username"]; 
    $dat = date('d-m-Y');
    $query = "    
    WITH hours AS (
        SELECT (n || ':00:00')::time AS hour
        FROM generate_series(0, 23) AS n
    )
          SELECT
            date_trunc('hour', hours.hour) AS hour,
            CASE WHEN SUM(endedtask.tim) IS NULL THEN 0 ELSE SUM(endedtask.tim) END AS total_tim
          FROM hours
          LEFT JOIN endedtask
            ON  hours.hour = (endedtask.ora)::time
            AND endedtask.username = '{$username}' AND to_date(endedtask.dat, 'DD-MM-YYYY') = '${dat}'
          GROUP BY hours.hour
          ORDER BY hour
      
";
    $res = pg_query($db_conn, $query);
    
        $result_array = array();
        while ($tuple = pg_fetch_array($res, null, PGSQL_NUM)) {
            
            array_push($result_array, $tuple);
        } 
        echo json_encode($result_array);
    
?>