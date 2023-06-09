// registerUser.php
<?php

  $host = 'localhost';
  $user = 'ttjdgh1';
  $pw = '1234';
  $dbName = 'eatTogether';
  $mysqli = new mysqli($host, $user, $pw, $dbName);

  $name = $_POST['name'];
  $name = addslashes($name);
  $email = $_POST['email'];
  $email = addslashes($email);
  $password = $_POST['password'];
  $password = addslashes($password);
  $gender = $_POST['gender']
  $gender = addslashes($gender);
    

  $sql = "insert into user_accounts (
      name,
      email,
      password,
      gender
  )";
  
  $sql = $sql. "values (
      '$name',
      '$email',
      '$password',
      '$gender'
  )";

  if($mysqli->query($sql)){ 
    echo ''; 
  }else{ 
    echo '';
  }

  mysqli_close($mysqli);
  
?>