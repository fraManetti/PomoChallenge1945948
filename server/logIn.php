<?php 
  include( 'db_conn.php');  
?>
<?php 
        if($db_conn){
            $user = $_POST['userLogInput'];
            $user= trim($user);
            $query = "select * from utente where username=$1";
            $res = pg_query_params($db_conn,$query,array($user));
            if (!($tuple = pg_fetch_array($res,null,PGSQL_ASSOC))){
                header("location: ../model/loginForm.html?login=failed1");

            }
            else{
                $psw =  $_POST['passwordLogInput'];
                $psw = trim($psw);
                $query ="select paswd from utente where username=$1";
                $res = pg_query_params($db_conn, $query, array($user));
                if (!($tuple=pg_fetch_array($res,null,PGSQL_ASSOC))){
                    header("location: ../model/loginForm.html?login=failed2");
                }
                else{
                    if (password_verify($psw, trim($tuple['paswd']))){
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

            }else{
                header("location: ../model/loginForm.html?login=failed2");
            }}
            
        }}
        ?>