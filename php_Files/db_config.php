<?php
$servername = "localhost";
$username = "ttjdgh1";
$password = "1234";
$dbname = "eatTogether";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
?>