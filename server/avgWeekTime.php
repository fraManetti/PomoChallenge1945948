<?php
  include( 'db_conn.php');  
  session_start(); 
?>
<?php 
    $username = $_SESSION["username"]; 
    $query = "    
    WITH weekDay AS (
        SELECT generate_series(1, 7) AS n
    )
    SELECT w.n,
        CASE
            WHEN SUM(tim) IS NULL THEN 0
            ELSE SUM(tim)::numeric / (SELECT COUNT(*) AS count_lunedi
    FROM generate_series(
        date_trunc('year', current_date),  -- Inizio dell'anno corrente
        current_date,                       -- Data corrente
        '1 day'                             -- Incremento di 1 giorno
    ) AS dates
    WHERE EXTRACT(DOW FROM dates)  = w.n)
        END AS tempo
    FROM weekDay w
    LEFT JOIN endedtask ON EXTRACT(DOW FROM TO_DATE(endedtask.dat, 'DD-MM-YYYY')) = w.n AND username = '{$username}'
    GROUP BY w.n
    ORDER BY w.n
      
";

      $res = pg_query($db_conn, $query);
      //echo $query;
        $result_array = array();
        while ($tuple = pg_fetch_array($res, null, PGSQL_NUM)) {
            
            array_push($result_array, $tuple);
        } 
        echo json_encode($result_array); 
    
?>