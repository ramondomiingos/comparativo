<?php
$redis = new Redis();
$redis->connect("localhost",6379);
$redis->auth("password");
foreach ($_GET as $key => $value) {
    echo 'key:'.$value."  value:". $redis->get($value)." <br>";
}
echo  'finalizado!';
?>