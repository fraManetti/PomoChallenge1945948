<?php 
        $db_conn = pg_connect("host=localhost port=5432 dbname=pomochallenge 
        user=postgres password=pomodoro") or die ('Connection error-impossibile connettersi al server' . pg_last_error());
    // if($_SERVER["REQUEST_METHOD"] !="POST"){
    //     header("Location: ../model/index.html");
    // }
    // else{
    //     $db_conn = pg_connect("host=localhost port=5432 dbname=pomochallenge 
    //     user=postgres password=pomodoro") or die ('Connection error-impossibile connettersi al server' . pg_last_error());
    // }
?>
<!DOCTYPE html>
<html>
    <head></head>
    <body>
<?php 
        if($db_conn){
            $user = $_POST['userLogInput'];
            $user= preg_replace('/\s/','',$user);
            $query = "select * from utente where username=$1";
            $res = pg_query_params($db_conn,$query,array($user));
            if (!($tuple = pg_fetch_array($res,null,PGSQL_ASSOC))){
                echo "<h1>  user non registrato</h1>";           

            }
            else{
               // $psw = password_hash( $_POST['passwordSignInput'],PASSWORD_BCRYPT,$options=['max_length'=>14]);
                $psw =  $_POST['passwordLogInput'];
                $psw= preg_replace('/\s/','',$psw);
                $query ="select* from utente where username=$1 and paswd=$2";
                $res = pg_query_params($db_conn, $query, array($user,$psw));
                if (!($tuple=pg_fetch_array($res,null,PGSQL_ASSOC)))
                    echo '<h1>login non riuscita</h1> ';
                else{
                    session_start();
                    if(!isset($_SESSION["username"]))
                       $_SESSION["username"]=$user;
                       //echo $_SESSION["username"];
                       header ("Location: ./index.php");

            }
        }}
        ?>

</body>
</html>