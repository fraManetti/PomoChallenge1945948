<?php
session_start();
session_destroy();
header("Location: ../model/index.html");
?>