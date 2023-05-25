
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
            $user= preg_replace('/\s/','',$user);
            $query = "select * from utente where username = $1 ";
            $res = pg_query_params($db_conn,$query,array($user));
            if ($tuple = pg_fetch_array($res,null,PGSQL_ASSOC)){
                header("location: ../model/signUpForm.html?signup=failed1");
            }
            else{

               // $psw = password_hash( $_POST['passwordSignInput'],PASSWORD_BCRYPT,$options=['max_length'=>14]);
                $psw =  $_POST['passwordSignInput'];
                $psw= preg_replace('/\s/','',$psw);
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