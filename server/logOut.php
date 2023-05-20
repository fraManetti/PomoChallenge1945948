<?php
session_start();
unset($_SESSION['username']);
session_destroy();
if (isset($_COOKIE[session_name()])) {
    setcookie(session_name(), "", time() - 3600, "/");
}
setcookie('taskList', "", time() - 3600, "/");
setcookie('cookie_timestamp', "", time() - 3600, "/");
setcookie('server_timestamp', "", time() - 3600, "/");
setcookie('loggedUser', "", time() - 3600, "/");
header("Location: ../model/index.html");
?>