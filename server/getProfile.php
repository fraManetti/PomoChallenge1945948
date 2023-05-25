<?php
  include( 'db_conn.php');  
  session_start(); 
?>
<?php 
    $username= $_SESSION['username'];
    $query ="select percorso,sum(tim)
    from endedtask join imgutente on username=utente
    where utente='${username}'
    group by percorso";
    $res = pg_query ($query);
    if(!$res) echo "errore";
    if ($tuple = pg_fetch_array($res, null, PGSQL_NUM)) {
        echo json_encode($tuple);
    }


?>