
<!DOCTYPE html>
<html>
    <head><?php 
error_reporting(E_ALL);
ini_set('display_errors', 1);
  include( 'db_conn.php');  
  // if($_SERVER["REQUEST_METHOD"] !="POST"){
    //     header("Location: ../model/index.html");
    // }
    // else{
    //     $db_conn = pg_connect("host=localhost port=5432 dbname=pomochallenge 
    //     user=postgres password=pomodoro") or die ('Connection error-impossibile connettersi al server' . pg_last_error());
    // }
?></head>
    <body>
<?php 
        if($db_conn){
            $user = $_POST['userSignInput'];
            $user= preg_replace('/\s/','',$user);
            $query = "select * from utente where username = $1 ";
            $res = pg_query_params($db_conn,$query,array($user));
            if ($tuple = pg_fetch_array($res,null,PGSQL_ASSOC)){
                echo "<h1> cambia user</h1>";
            }
            else{

               // $psw = password_hash( $_POST['passwordSignInput'],PASSWORD_BCRYPT,$options=['max_length'=>14]);
                $psw =  $_POST['passwordSignInput'];
                $psw= preg_replace('/\s/','',$psw);
                $query ="insert into utente values ($1,$2)";
                $res = pg_query_params($db_conn, $query, array($user,$psw));
                if ($res){
                     echo '<script> alert ("reg riuscita")</script>';
                    header ("Location: ../model/loginForm.html");}
                else
                    echo "<h1>reg fallita</h1>";
            }
        }
        ?>

</body>
</html>