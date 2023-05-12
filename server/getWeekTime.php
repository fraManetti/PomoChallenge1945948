<?php
  include( 'db_conn.php');  
  session_start(); 
?>
<?php 
    //$myvarValue = $_POST['period'];  
    $cookie = $_SESSION["username"]; 
    $query = "
        WITH days AS (
        SELECT generate_series(
          '2023-05-08'::date,
          '2023-05-14'::date,
          '1 day'
        ) AS day
      )
      SELECT
        date_trunc('day', days.day) AS day,
        CASE WHEN SUM(endedtask.tim) IS NULL THEN 0 ELSE SUM(endedtask.tim) END AS total_tim
      FROM days
      LEFT JOIN endedtask
        ON date_trunc('day', to_date(endedtask.dat, 'DD-MM-YYYY')) = days.day
        AND endedtask.username = '{$cookie}'
      GROUP BY days.day
      ORDER BY day
    ";

    $res = pg_query($db_conn, $query);
    
        $result_array = array();
        while ($tuple = pg_fetch_array($res, null, PGSQL_NUM)) {
            
            array_push($result_array, $tuple);
        } 
        echo json_encode($result_array);
    
    
?>