<?php
require 'db.php';
$con = mysqli_connect(HOST, USER, PASS, DB);
foreach ($_GET as $key => $value) {
    $sql = "INSERT INTO `key_value`(`chave`, `valor`) VALUES ('".$key."', '".$value."')";
    echo $sql.'<br>';
    mysqli_query($con, $sql);
}
echo  'finalizado!';
?>