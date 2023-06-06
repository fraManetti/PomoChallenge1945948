<?php 
include('db_conn.php'); 
session_start(); 
?>
<?php 
$username = $_SESSION['username'];
if (isset($_FILES['image'])) {
    //parsing del file 
    $errors = array();
    $file_name = $_FILES['image']['name'];
    $file_size = $_FILES['image']['size'];
    $file_tmp = $_FILES['image']['tmp_name'];
    $file_type = $_FILES['image']['type'];
    $filename_parts = explode('.', $_FILES['image']['name']);
    $file_ext = strtolower(end($filename_parts));
        
    $extensions = array("jpeg", "jpg", "png");
    //controllo se estensione consentita
    if (in_array($file_ext, $extensions) === false) {
        $errors[] = "Estensione non consentita, scegli un file JPEG o PNG.";
    }
    //controllo se dimensione consentita
    if ($file_size > 2097152) {
        $errors[] = 'La dimensione del file deve essere inferiore a 2 MB';
    }
    
    if (empty($errors) == true) {
        //associo hash univoco all'immagine da salvare
        $random_data = openssl_random_pseudo_bytes(16);
        $file_name = hash('sha256', $random_data) . "." .$file_ext;
        $image_path = "../storedImg/" . $file_name;
        //salvo l'immagine nella cartella storedImg del server
        move_uploaded_file($file_tmp, "../storedImg/" . $file_name);
        //inserisco nel db la path associata all'utente
        $query ="select percorso from imgutente where utente ='${username}'";
        $res =pg_query($query);
        if($tuple =pg_fetch_array($res,null,PGSQL_ASSOC))
            {
                $filePath =$tuple['percorso'];
                if (file_exists($filePath)) {
                    unlink($filePath);
                    }
            }
        $query = "insert into imgutente (utente, percorso) values ('${username}','${image_path}') ON CONFLICT (utente) DO UPDATE SET percorso = EXCLUDED.percorso";

        $res = pg_query($query);
        if(!$res)
            echo "error";
        else{
            echo "$image_path";

            exit;
        }

    } else {
        http_response_code(400);
        echo $errors[0];
        exit;
    }
}
?>
