<?php 
    if($_SERVER["REQUEST_METHOD"] !="POST"){
        header("Location: ../model/index.html");
    }
    else{
        $db_conn = pg_connect("host=localhost port=5432 dbname=pomochallenge 
        user=postgres password=pomodoro") or die ('Connection error-impossibile connettersi al server' . pg_last_error());
    }
?>
<!DOCTYPE html>
<html>
    <head></head>
    <body>
<?php 
        if($db_conn){
            $user = $_POST['userLogInput'];
            $query = "select * from utente where username=$1";
            $res = pg_query_params($db_conn,$query,array($user));
            if (!($tuple = pg_fetch_array($res,null,PGSQL_ASSOC))){
                echo "<h1>  user non registrato</h1>";           

            }
            else{
               // $psw = password_hash( $_POST['passwordSignInput'],PASSWORD_BCRYPT,$options=['max_length'=>14]);
                $psw =  $_POST['passwordLogInput'];
                $query ="select* from utente where username=$1 and paswd=$2";
                $res = pg_query_params($db_conn, $query, array($user,$psw));
                if (!($tuple=pg_fetch_array($res,null,PGSQL_ASSOC)))
                    echo "<h1>login non riuscita</h1>";
                else
                    echo "<h1>login riuscita</h1>";
            }
        }
        ?>

</body>
</html>