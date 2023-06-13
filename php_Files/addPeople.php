<?php
include 'db_config.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

$eventId = $_POST['eventId']; // 클라이언트에서 전송한 이벤트 ID

// 이벤트 ID에 해당하는 행의 현재 numberOfPeople 값을 조회
$selectSql = "SELECT numberOfPeople FROM user_post WHERE id = ?";
$selectStmt = $conn->prepare($selectSql);
$selectStmt->bind_param("i", $eventId);
$selectStmt->execute();
$selectResult = $selectStmt->get_result();

if ($selectResult->num_rows > 0) {
  $row = $selectResult->fetch_assoc();
  $currentNumberOfPeople = (int)$row['numberOfPeople']; // 문자열을 숫자로 변환
  
  // 현재 numberOfPeople 값을 1 증가시킴
  $updatedNumberOfPeople = $currentNumberOfPeople + 1;
  
  // numberOfPeople 값을 업데이트
  $updateSql = "UPDATE user_post SET numberOfPeople = ? WHERE id = ?";
  $updateStmt = $conn->prepare($updateSql);
  $updateStmt->bind_param("si", $updatedNumberOfPeople, $eventId);
  $updateResult = $updateStmt->execute();

  if ($updateResult) {
    echo json_encode(['message' => 'Event updated successfully']);
  } else {
    echo json_encode(['message' => 'Error updating event']);
  }
} else {
  echo json_encode(['message' => 'Event not found']);
}

$conn->close();
?>
