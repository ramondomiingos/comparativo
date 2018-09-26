<?php
require 'db.php';
$con = mysqli_connect(HOST, USER, PASS, DB);
foreach ($_GET as $key => $value) {
    $sql = "SELECT valor FROM  `key_value` where chave='".$value."'";
    echo $sql.'<br>';
   $res= mysqli_query($con, $sql);
   echo mysqli_fetch_array($res)[0]."<br>";
}
echo  'finalizado!';
?>