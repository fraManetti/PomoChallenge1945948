<?php
  include( 'db_conn.php');  
  session_start(); 
?>
<?php 
    //$myvarValue = $_POST['period'];
    $parametro1 = $_POST['parametro1'];
    $cookie = $_SESSION["username"]; 
    $query = "
        WITH days AS (
        SELECT generate_series(
          date_trunc('week', to_date('{$parametro1}', 'DD-MM-YYYY'))::date,
          date_trunc('week', to_date('{$parametro1}', 'DD-MM-YYYY'))::date + interval '6 days',
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
    //echo $parametro1;
          $result_array = array();
        while ($tuple = pg_fetch_array($res, null, PGSQL_NUM)) {
            
            array_push($result_array, $tuple);
        } 
        echo json_encode($result_array);   
    
    
?>