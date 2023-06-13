<?php
include 'db_config.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

$sql = "SELECT id, title, store_name, description, numberOfPeople, date, currPeople FROM user_post ORDER BY date ASC";
$result = $conn->query($sql);

$posts = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        array_push($posts, $row);
    }
    echo json_encode($posts);
} else {
    echo json_encode(['message' => 'No posts found']);
}

$conn->close();
?>
