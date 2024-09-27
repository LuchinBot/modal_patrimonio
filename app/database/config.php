<?php

$host = "10.31.1.7";
$dbname = "drasam_suite";
$username = "root";
$password = "Drasam$2024..";

try {
  $db = new PDO("mysql:host=" . $host . ";dbname=" . $dbname, $username, $password);
  $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $db->exec('SET CHARACTER SET UTF8');
 //echo "Connected successfully";
} catch (PDOException $e) {
  echo "Connection failed: " . $e->getMessage();
}