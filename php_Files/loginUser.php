<?php

$host = 'localhost';
$user = 'ttjdgh1';
$pw = '1234';
$dbName = 'eatTogether';
$mysqli = new mysqli($host, $user, $pw, $dbName);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // 클라이언트에서 전송된 이메일과 비밀번호를 받아온다.
  $email = addslashes($_POST['email']);
  $password = addslashes($_POST['password']);

  // 아이디 비밀번호가 일치하는 회원이 있는지 확인하는 쿼리.
  $query = "SELECT * FROM user_accounts WHERE email = '{$email}' AND password = '{$password}'";
  $result = mysqli_query($mysqli, $query);

  if ($result) {
    // 이메일이 존재할 경우
    if (mysqli_num_rows($result) > 0) {
        echo "success";
    } else {
        echo "error";
    }
  } else {
    echo "error";
  }
}

mysqli_close($mysqli);

?>