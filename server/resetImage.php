<?php 
  include( 'db_conn.php');  
  session_start();
?>
<?php 
    $username = $_SESSION['username'];
    //prima mi prendo la vecchia path e se esiste rimuovo il file dal server 
    $query ="select percorso from imgutente where utente ='${username}'";
    $res =pg_query($query);
    if($tuple =pg_fetch_array($res,null,PGSQL_ASSOC))
        {
            $filePath =$tuple['percorso'];
            if (file_exists($filePath)) {
                unlink($filePath);
                }
        }
        //aggiorno db
    $query = "delete from imgutente where utente = '${username}'";
    $res = pg_query ($query);
    if (!$res)
        echo "errore";
    else 
        echo "success";
    if (file_exists($filePath)) {
        unlink($filePath);
        }
?>