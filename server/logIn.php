<?php 
  include( 'db_conn.php');  
?>
<?php 
        if($db_conn){
            $user = $_POST['userLogInput'];
            $user= preg_replace('/\s/','',$user);
            $query = "select * from utente where username=$1";
            $res = pg_query_params($db_conn,$query,array($user));
            if (!($tuple = pg_fetch_array($res,null,PGSQL_ASSOC))){
                header("location: ../model/loginForm.html?login=failed1");

            }
            else{
               // $psw = password_hash( $_POST['passwordSignInput'],PASSWORD_BCRYPT,$options=['max_length'=>14]);
                $psw =  $_POST['passwordLogInput'];
                $psw= preg_replace('/\s/','',$psw);
                $query ="select* from utente where username=$1 and paswd=$2";
                $res = pg_query_params($db_conn, $query, array($user,$psw));
                if (!($tuple=pg_fetch_array($res,null,PGSQL_ASSOC))){
                    header("location: ../model/loginForm.html?login=failed2");
                }
                else{
                    session_start();
                    if(!isset($_SESSION["username"]))
                       $_SESSION["username"]=$user;
                       $remember = $_POST['remember'];
                       if(isset ($remember))
                        setcookie("loggedUser",$user,time()+3600,"/");
                       header ("Location: ./index.php");

            }
        }}
        ?>