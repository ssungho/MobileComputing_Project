<?php
include 'db_config.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

$title = $_POST['title'];
$store_name = $_POST['store_name'];
$description = $_POST['description'];
$numberOfPeople = $_POST['numberOfPeople'];
$date = $_POST['date'];

$sql = "INSERT INTO user_post (title, store_name, description, numberOfPeople, date) VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssss", $title, $store_name, $description, $numberOfPeople, $date);
$result = $stmt->execute();

if ($result) {
  echo json_encode(['message' => 'Event added successfully']);
} else {
  echo json_encode(['message' => 'Error adding event']);
}

$conn->close();
?>
