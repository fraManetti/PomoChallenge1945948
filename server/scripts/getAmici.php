<?php
  include( 'db_conn.php');  
  session_start(); 
?>
<?php 
$username = $_POST['username'];
    $query = "select * from amici where utentea = ${username} or utenteb = ${username} ";
    $res = pg_query ($db_conn,$query);
    while ($tuple = pg_fetch_array($res, null, PGSQL_ASSOC)) {
        if ($tuple.utentea == $username)
            $tuple_json = json_encode($tuple.utenteb);
        else 
            $tuple_json = json_encode($tuple.utentea);

        $tuple_json = json_encode($tuple);
        downloadAmici(' . $tuple_json . ');
    }
?>