<?php

$host = 'localhost';
$user = 'ttjdgh1';
$pw = '1234';
$dbName = 'eatTogether';
$mysqli = new mysqli($host, $user, $pw, $dbName);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // 클라이언트에서 전송된 이메일 값을 받아옵니다.
  $email = $_POST['email'];
  $email = addslashes($email);

  // 이메일 중복을 확인하기 위해 데이터베이스에서 해당 이메일을 조회하는 SQL 쿼리를 실행합니다.
  $query = "SELECT * FROM user_accounts WHERE email = '{$email}'";
  $result = mysqli_query($mysqli, $query);

  if ($result) {
    // 이메일이 중복된 경우
    if (mysqli_num_rows($result) > 0) {
      // 중복된 이메일이 존재하면 'duplicate'를 반환합니다.
      echo "duplicate";
    } else {
      // 중복된 이메일이 존재하지 않으면 회원 정보를 삽입하는 쿼리를 실행합니다.
      $name = addslashes($_POST['name']);
      $password = addslashes($_POST['password']);
      $gender = addslashes($_POST['gender']);

      $insertQuery = "INSERT INTO user_accounts (name, email, password, gender) VALUES ('$name', '$email', '$password', '$gender')";

      if ($mysqli->query($insertQuery)) {
        // 회원 정보 삽입이 성공하면 'success'를 반환합니다.
        echo "success";
      } else {
        // 회원 정보 삽입이 실패하면 'error'를 반환합니다.
        echo "error";
      }
    }
  } else {
    // 쿼리 실행 오류가 발생한 경우 'error'를 반환합니다.
    echo "error";
  }
}

mysqli_close($mysqli);
