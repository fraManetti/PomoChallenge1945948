<?php
include('db_conn.php'); 
session_start(); 
?>

<?php 

$type = $_POST['type'];

switch ($type) {
    case 'updateUsername': 
        $username = $_POST['oldUsername'];
        $newUsername = $_POST['newUsername'];

        $newUsername= trim($newUsername);
        
        $query= "select * from utente where username='${newUsername}'";
        $res = pg_query($db_conn,$query);
        $tuple = pg_fetch_array($res,null,PGSQL_ASSOC);
        if($tuple) {
            echo "Username già in uso";
            break;} 
        $query = "update utente set username='${newUsername}' where username='${username}'";
        $_SESSION["username"] = $newUsername;
        echo "Username Correttamente Aggiornato";
        break;
    case 'confirmNewPassword':
        $username = $_SESSION["username"];
        $oldPass = $_POST["oldPass"];
        $query= "select * from utente where paswd='${oldPass}' and username='${username}'";
        $res = pg_query($db_conn,$query);

        $tuple = pg_fetch_array($res,null,PGSQL_ASSOC);
        if(!$tuple) {
            echo "Password corrente inserita non corretta";
            break;} 
        $newPass = $_POST["newPass"];
        $newPass= trim($newPass);
        $query = "update utente set paswd='${newPass}' where paswd='${oldPass}' and username='${username}' ";
        echo "Password correttamente aggiornata";
        break;
    case 'deleteAccount':
        $username=$_SESSION['username'];
        $query = "select percorso from imgutente where utente = '${username}'";
        $res = pg_query ($query);
        if (file_exists($filePath=pg_fetch_array($res,null,PGSQL_ASSOC)['percorso'])) {
            unlink($filePath);
            }        
        $query = "delete from utente where username ='${username}'";
        $res = pg_query($query);
        if($res)
            echo("Cancellazione Riuscita!");
        
        break;        
        default:
        # code...
        break;
}

$res = pg_query($db_conn,$query);


if (!$res) {
    //header("HTTP/1.1 500 Internal Server Error");
    exit();
}
?>