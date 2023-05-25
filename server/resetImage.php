<?php 
  include( 'db_conn.php');  
  session_start();
?>
<?php 
    $username = $_SESSION['username'];
    $filePath = $_POST['path'];
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