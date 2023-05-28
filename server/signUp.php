
<!DOCTYPE html>
<html>
    <head><?php 
  include( 'db_conn.php');  
  session_start();
?></head>
    <body>
<?php 
        if($db_conn){
            $user = $_POST['userSignInput'];
            $user= trim($user);
            $query = "select * from utente where username = $1 ";
            $res = pg_query_params($db_conn,$query,array($user));
            if ($tuple = pg_fetch_array($res,null,PGSQL_ASSOC)){
                header("location: ../model/signUpForm.html?signup=failed1");
            }
            else{

                $ClearPsw =  $_POST['passwordSignInput'];
                $ClearPsw= trim($ClearPsw);
                $psw = password_hash( $ClearPsw,PASSWORD_BCRYPT,$options=['max_length'=>14]);
                $query ="insert into utente values ($1,$2)";
                $res = pg_query_params($db_conn, $query, array($user,$psw));
                if ($res){
                    header("location: ../model/loginForm.html?signup=success");
                }
                else
                    header("location: ../model/signUpForm.html?signup=failed2");
            }
        }
        ?>

</body>
</html>