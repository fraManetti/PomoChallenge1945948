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

        $newUsername= preg_replace('/\s/','',$newUsername);
        
        $query= "select * from utente where username='${newUsername}'";
        $res = pg_query($db_conn,$query);
        $tuple = pg_fetch_array($res,null,PGSQL_ASSOC);
        if($tuple) {
            echo "Username già in uso";
            break;} 

        $query = "update utente set username='${newUsername}' where username='${username}'";
        $_SESSION["username"] = $newUsername;
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
        $newPass= preg_replace('/\s/','',$newPass);
        $query = "update utente set paswd='${newPass}' where paswd='${oldPass}' and username='${username}' ";
        echo "Password correttamente aggiornata";
        break;

    default:
        # code...
        break;
}

$res = pg_query($db_conn,$query);


if (!$res) {
    header("HTTP/1.1 500 Internal Server Error");
    exit();
}
?>