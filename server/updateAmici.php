<?php
  include( '../server/db_conn.php');  
  session_start(); 
?>
<?php             
    $amico = $_POST['amico'];
    $username = $_SESSION['username'];
    $type = $_POST['type'];
    switch ($type) {
        case 'delAmico': //Eliminare un amico   
            $query = "delete from amici where (utentea= '${username}' and utenteb='${amico}') or (utentea = '${amico}' and utenteb ='${username}')";
            break;

        case 'reqAmico': //Invia richiesta di amicizia (sia dalla barra che dal bottone aggiungi)
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

        case 'delOutgoingReq': //Elimina richiesta uscente
            $query="delete from richieste where richiedente ='${username}' and accettante= '${amico}'";
            break;

        case 'delIncomingReq': //Elimina richiesta entrante
            $query="delete from richieste where richiedente ='${amico}' and accettante= '${username}'";
            break;

        case 'acceptReq': //Accetta richiesta entrante
            $query="insert into amici values('${username}', '${amico}')";
            $res = pg_query ($db_conn,$query);
            if (!$res) {
                header("HTTP/1.1 500 Internal Server Error");
                exit();
              }
            $query="delete from richieste where richiedente ='${amico}' and accettante= '${username}'";
            break;

        default:
            break;
    }
    $res = pg_query ($db_conn,$query);
    if (!$res) {
        header("HTTP/1.1 500 Internal Server Error");
        exit();
      }
?>