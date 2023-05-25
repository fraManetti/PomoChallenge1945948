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
                       $query = "select percorso from  imgutente where utente='${user}'";
                       $res = pg_query($query);
                       if($tuple=pg_fetch_array($res,null,PGSQL_ASSOC)){
                        $path = $tuple['percorso'];
                        if (file_exists($path)){
                        setcookie("profilepic",$path,time() + 30*24*60*6,"/");
                       }
                       else 
                       setcookie("profilepic","",time()-3600,"/");
                    }
                       if(isset ($_POST['remember']))
                        setcookie("loggedUser",$user,time() + 30*24*60*6,"/");
                       header ("Location: ../model/index.php");

            }
        }}
        ?>