<?php
$redis = new Redis();
$redis->connect("localhost",6379);
$redis->auth("password");
foreach ($_POST as $key => $value) {
   // echo 'key:'.$key."  value:".$value." <br>";
   // $redis->set($key, $value);

print $key.'.value : ' . $redis->get($key) . "\n";

}
echo  'finalizado!';
?>