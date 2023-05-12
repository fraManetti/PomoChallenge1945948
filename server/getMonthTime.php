<?php
  include( 'db_conn.php');  
  session_start(); 
?>
<?php 
//    $myvarValue = $_POST['period']; 
//    $date = "01-{$myvarValue}-2023"; 
    
    $cookie = $_SESSION["username"]; 
    $query = "    
    WITH months AS (
        SELECT generate_series(
          '2023-01-01'::date,
          '2023-12-01'::date,
          '1 month'
        ) AS month
      )
      SELECT
        date_trunc('month', months.month) AS month,
        CASE WHEN SUM(endedtask.tim) IS NULL THEN 0 ELSE SUM(endedtask.tim) END AS total_tim
      FROM months
      LEFT JOIN endedtask
        ON date_trunc('month', to_date(endedtask.dat, 'DD-MM-YYYY')) = months.month
        AND endedtask.username = '{$cookie}'
      GROUP BY months.month
      ORDER BY month
      
";
    $res = pg_query($db_conn, $query);
    
        $result_array = array();
        while ($tuple = pg_fetch_array($res, null, PGSQL_NUM)) {
            
            array_push($result_array, $tuple);
        } 
        echo json_encode($result_array);
    
?>