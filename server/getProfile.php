<?php
  include( 'db_conn.php');  
  session_start(); 
?>
<?php 
    $username= $_POST['profile'];
    $query ="select CASE WHEN percorso IS NULL THEN 
    'https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg' 
    ELSE percorso END AS percorso,
    CASE WHEN sum(tim) IS NULL THEN 
    0 
    ELSE sum(tim) END AS tim
    
    from utente u left join endedtask e on u.username=e.username left join imgutente on u.username=utente
    where u.username='${username}'
    group by percorso
    
    ";
    $res = pg_query ($query);
    if(!$res) echo "errore";
    if ($tuple = pg_fetch_array($res, null, PGSQL_NUM)) {
        echo json_encode($tuple);
    }
    else
        echo"errore";


?>