<?php
include('db_conn.php'); 
session_start(); 
?>

<?php 
$username = $_POST['oldUsername'];
$type = $_POST['type'];
$newUsername = $_POST['newUsername'];



switch ($type) {
    case 'updateUsername': 
        $query = "update utente set username='${newUsername}' where username='${username}'";
        break;
    case 'updatePassword':
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