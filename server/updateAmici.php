<?php
  include( 'db_conn.php');  
  session_start(); 
?>
<?php             
    $amico = $_POST['amico'];
    $username = $_SESSION['username'];
    $type = $_POST['type'];
    switch ($type) {
        case 'delAmico':    
            $query = "delete from amici where (utentea= '${username}' and utenteb='${amico}') or (utentea = '${amico}' and utenteb ='${username}')";
            break;
        case 'reqAmico':
            $query = "select username from utente where username ='${amico}'";
            $res = pg_query($query);
            if(!$tuple = pg_fetch_array($res,null,PGSQL_ASSOC)){
                echo "Utente non esiste!";
                break;}
            $query = "select * from richieste where richiedente='${username}' and accettante ='${amico}'";
            $res =pg_query($query);
            if($tuple = pg_fetch_array($res,null,PGSQL_ASSOC)){
                echo "Richiesta già inviata!";
                break;}           
            $query = "select * from amici where (utentea='${username}' and utenteb='${amico}') or (utentea='${amico}' and utenteb='${username}') ";
            $res =pg_query($query);
            if($tuple = pg_fetch_array($res,null,PGSQL_ASSOC)){
                echo "Utente già amico!";
                break;}
            $query="insert into richieste values ('${username}','${amico}')";
            echo "";
            break;
        case 'delOutgoingReq':
            $query="delete from richieste where richiedente ='${username}' and accettante= '${amico}'";
            break;
        case 'delIncomingReq':
            $query="delete from richieste where richiedente ='${amico}' and accettante= '${username}'";
            break;
        case 'acceptReq':
            $query="insert into amici values('${username}', '${amico}')";
            $res = pg_query ($db_conn,$query);
            if (!$res) {
                header("HTTP/1.1 500 Internal Server Error");
                //echo '<script> alert ("inserisci amico valido");</script>';
                exit();
              }
            $query="delete from richieste where richiedente ='${amico}' and accettante= '${username}'";
            break;        
        default:
            # code...
        break;
    }
    $res = pg_query ($db_conn,$query);
    if (!$res) {
        //header("HTTP/1.1 500 Internal Server Error");
        //echo '<script> alert ("inserisci amico valido");</script>';
        exit();
      }
?>