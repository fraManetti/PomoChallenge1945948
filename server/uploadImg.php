<?php 
include('db_conn.php'); 
session_start(); 
?>
<?php 
$username = $_SESSION['username'];
if (isset($_FILES['image'])) {
    $errors = array();
    $file_name = $_FILES['image']['name'];
    $file_size = $_FILES['image']['size'];
    $file_tmp = $_FILES['image']['tmp_name'];
    $file_type = $_FILES['image']['type'];
    $file_ext = strtolower(end(explode('.', $_FILES['image']['name'])));
    
    $extensions = array("jpeg", "jpg", "png");
    
    if (in_array($file_ext, $extensions) === false) {
        $errors[] = "Estensione non consentita, scegli un file JPEG o PNG.";
    }
    
    if ($file_size > 2097152) {
        $errors[] = 'La dimensione del file deve essere inferiore a 2 MB';
    }
    
    if (empty($errors) == true) {
        $image_path = "../storedImg/" . $file_name;
        move_uploaded_file($file_tmp, "../storedImg/" . $file_name);
        echo "Successo";
        $query = "insert into imgutente values ('${username}','${image_path}')";
        $res = pg_query($query);
        if(!$res)
            echo "error";

    } else {
        print_r($errors);
    }
}
?>

